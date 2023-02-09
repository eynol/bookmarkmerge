import { download } from '$lib/download'
import { writable, derived, get } from 'svelte/store'

import { Toast } from '../util/message'


export interface BookmarkNode {
	add_date: string
	children: BookmarkNode[]
	id: string
	last_modified: string,
	name: string,
	personal_toolbar_folder?: boolean
	// 书签有 icon 和 url,文件夹没有
	icon?: string,
	href?: string,
}
export interface BookmarkFileTree {
	children?: BookmarkNode[],
	name: string,
	text: string
}


export const currentStep = writable(0)
export const files = writable<BookmarkFileTree[]>([])
export const primaryFile = writable<string>('');

export const sortedFiles = derived([files, primaryFile], ([$files, $primaryFile]) => {
	console.log($files, $primaryFile, 'udpated');
	const primaryFileTree = $files.find(x => x.name === $primaryFile)
	if (primaryFileTree) {
		return [
			primaryFileTree,
			...$files.filter(x => x.name !== $primaryFile),
		]
	}
	return $files.slice()
}, [])

export const primaryFileUrls = derived([primaryFile, files], ([$primaryFile, $files]) => {
	const urlSet = new Set();
	const file = $files.find(x => x.name === $primaryFile);
	if (file) {
		const queue: (BookmarkNode)[] = [file] as unknown as BookmarkNode[]
		while (queue.length) {
			const current = queue.shift();
			if (current?.children) {
				queue.push(...current.children)
			}
			if (current?.href) {
				urlSet.add(current.href)
			}
		}
	}
	return urlSet;
}, new Set())


export const targetFolder = writable<string[]>([])

const getDefaultWorkingTree = () => ({
	name: 'root',
	children: [],
	text: '',
})
export const workingTree = writable<BookmarkFileTree>(getDefaultWorkingTree());







export function mergeTwoTree(treeA: BookmarkNode | BookmarkFileTree, treeB: BookmarkNode | BookmarkFileTree) {

	if (!treeA.children) {
		treeA.children = [];
	}
	if (!treeB.children) {
		treeB.children = [];
	}

	const { children } = treeA;
	const another = treeB.children;
	console.group(treeA.name)
	if (another.length) {
		// if net tree has elements , merge them to current tree
		const names = new Set(children.map(item => item.name))
		another.forEach(item => {
			if (!names.has(item.name)) {
				console.log('pushing ', item.name, item);
				children.push(item);
				updateModified(treeA)
			} else {
				// if they have the same name


				// merge it
				const mergeToEle = children.find(x => x.name === item.name);
				if (mergeToEle && 'href' in mergeToEle && item.href === mergeToEle.href) {
					// its link,ignore it;
					console.log('same link', item)
					return
				}
				console.log('merging', item.name, mergeToEle, item);
				if (mergeToEle) {
					mergeTwoTree(mergeToEle, item);
				}
			}

		})
		Toast.fire("Merged tree success");
	}
	console.groupEnd()

}

function updateModified(root: any) {
	const now = Math.floor(Date.now() / 1000);

	root.last_modified = now.toString()
}


/** merge folder to another folder */
export function mergeToTargetFolder(srcPaths: string[]) {
	const targetPaths: string[] = get(targetFolder);
	if (!targetPaths || !targetPaths.length) {
		return Toast.fire('Please set a folder as target')
	}
	if (!srcPaths || srcPaths.length === 0) {
		return Toast.fire('path is empty')
	}

	if (targetPaths.join('') === srcPaths.join('')) {
		Toast.fire('Same folder, cancel merge');
		return
	}

	const treeList = get(files);
	const targetRoot = treeList.find(x => x.name === targetPaths[0]);
	const srcRoot = treeList.find(x => x.name === srcPaths[0]);


	// merge two tree check
	if (!targetRoot || !srcRoot) {
		return Toast.fire('not found')
	}
	if (targetRoot === srcRoot) {
		if (srcPaths.every(x => targetPaths.includes(x))) {
			return Toast.fire('Not allowed');
		}
	}
	const destTarget = findNodeByPath(targetRoot, targetPaths.slice(1))
	const srcTarget = findNodeByPath(srcRoot, srcPaths.slice(1))

	// merge two tree check
	if (!srcTarget || !destTarget) {
		return Toast.fire('not found')
	}
	console.log('merging', srcTarget, destTarget)
	mergeTwoTree(destTarget, srcTarget);

	/** remove src node */
	destTarget.children = destTarget.children?.slice() ?? []
	srcTarget.children = []

	// delete src target 
	const srcParentPath = srcPaths.slice(1);
	srcParentPath.pop();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const srcParent = findNodeByPath(srcRoot, srcParentPath.slice())!;
	const srcTargetIndex = srcParent.children?.findIndex(x => x.name === srcTarget.name) ?? 0;
	srcParent.children = [
		...srcParent.children!.slice(0, srcTargetIndex),
		...srcParent.children!.slice(srcTargetIndex + 1)
	];

	// touch update ,so that svelte can update
	updateNodeByPath(srcRoot, srcPaths.slice(1))
	updateNodeByPath(targetRoot, targetPaths.slice(1))

	console.log('after merge tree', { srcPaths, targetPaths, srcTarget, destTarget })

	files.set([...treeList.map(x => Object.assign({}, x))])

	console.log(treeList)

}
/** remove duplicated urls */
export function removeDuplicatedUrls(paths: string[]) {
	const targetFiles = get(files);
	const targetRoot = targetFiles.find(x => x.name === paths[0]);
	if (!targetRoot) {
		return Toast.fire('not found')
	}
	const target = findNodeByPath(targetRoot, paths.slice(1))
	if (!target) {
		return Toast.fire('no folder found in this path')
	}
	const urls = get(primaryFileUrls)
	const filterNotContainedNode = (node: BookmarkNode) => {
		if (!node) { return null }

		if ('href' in node) {
			return urls.has(node.href) ? null : node;
		} else if (node.children) {
			const children = node.children.map(filterNotContainedNode).filter((x): x is BookmarkNode => Boolean(x))
			if (children.length) {
				node.children = children;
				return Object.assign({}, node);
			} else {
				return null
			}
		} else {
			console.warn('异常情况哦')
		}
	}
	if (target.children) {
		target.children = target.children.map(filterNotContainedNode).filter((x): x is BookmarkNode => Boolean(x))
		// if (target.children.length === 0) {
		// 	target.children = undefined;
		// }
	}
	updateNodeByPath(targetRoot, paths.slice(1))
	files.set([...targetFiles.map(x => Object.assign({}, x))])
}

function findNodeByPath(node: BookmarkNode | BookmarkFileTree, path: string[] = []): null | BookmarkNode | BookmarkFileTree {
	if (!node) {
		return null;
	}
	if (path.length) {
		const name = path.shift();
		const target = node.children!.find(x => x.name === name);

		if (target) {
			return findNodeByPath(target, path)
		}
		return null

	}
	return node
}
// trigger update, change array instance, so that svelte can detect it
function updateNodeByPath(node: BookmarkNode | BookmarkFileTree, path: string[] = []) {
	if (!node) {
		return null;
	}
	console.log(node, path);
	if (path.length) {
		const name = path.shift();
		const targetIndex = node.children!.findIndex(x => x.name === name);

		if (targetIndex > -1) {
			node.children = [
				...node.children!.slice(0, targetIndex),
				updateNodeByPath(node.children![targetIndex], path),
				...node.children!.slice(targetIndex + 1)
			].filter((x): x is BookmarkNode => Boolean(x))
			return node
		}

	}
	return node
}




export function moveNodeToTargetFolder({ type, from, to }: { type: 'link' | 'folder', from: string[], to: string[] }) {
	const targetFiles = get(files);
	const targetRoot = targetFiles.find(x => x.name === to[0]);
	if (!targetRoot) {
		return Toast.fire('not found')
	}
	const target = findNodeByPath(targetRoot, to.slice(1))
	if (!target) {
		return Toast.fire('no folder found in this path')
	}
	const sourceTraget = targetFiles.find(x => x.name === from[0]);
	if (!sourceTraget) {
		return Toast.fire('not found')
	}
	const source = findNodeByPath(sourceTraget, from.slice(1))
	if (!source) {
		return Toast.fire('no folder found in this path')
	}

	if (target) {
		// 移动到这个链接后面

		const targetParent = findNodeByPath(targetRoot, to.slice(1, -1))
		const targetIndex = targetParent!.children!.findIndex(x => x.name === target.name);

		targetParent!.children!.splice(targetIndex + 1, 0, source as any);

		const sourceParent = findNodeByPath(sourceTraget, from.slice(1, -1));
		sourceParent?.children?.splice(sourceParent.children.findIndex(x => x.name === source.name), 1)


		updateNodeByPath(targetRoot, to.slice(1, -1))
		updateNodeByPath(sourceTraget, from.slice(1, -1))
		files.set([...targetFiles.map(x => Object.assign({}, x))])

	}

	console.log(target, source)
}


export function exportJSON() {

	const targetPaths: string[] = get(targetFolder);
	if (!targetPaths || !targetPaths.length) {
		return Toast.fire('Please set a folder as target')
	}

	const treeList = get(files);
	const targetRoot = treeList.find(x => x.name === targetPaths[0]);

	// merge two tree check
	if (!targetRoot) {
		return Toast.fire('not found')
	}

	const destTarget = findNodeByPath(targetRoot, targetPaths.slice(1))

	function transform(node: BookmarkNode | BookmarkFileTree): any {
		if (node) {
			if ('href' in node) {
				return {
					title: node.name,
					url: node.href
				}
			} else if (node.children) {
				return {
					title: node.name,
					children: node.children.map(transform)
				}
			}
		}
	}

	download('bookmark.json', JSON.stringify(transform(destTarget), null, 2))

}
export function exportHTML() {
	return ''
}