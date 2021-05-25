import { writable, derived, get } from 'svelte/store'

export const files = writable([])

const getDefaultWorkingTree = () => ({
	name: 'root',
	children: []
})
export const workingTree = writable(getDefaultWorkingTree());

files.subscribe($files => {
	if (!$files.length) {
		workingTree.set(getDefaultWorkingTree())
		return
	}

	let favoriteFolderName = $files[0].children.find(x => x.personal_toolbar_folder).name;

	console.time('merge-all')

	const merged = $files.reduce((fileA, fileB) => {

		const toolbar = fileB.children.find(x => x.personal_toolbar_folder);
		toolbar.name = favoriteFolderName;
		console.time('merge' + fileA.name + fileB.name)
		mergeTwoTree(fileA, fileB)
		console.timeEnd('merge' + fileA.name + fileB.name)
		return fileA;
	})
	console.timeEnd('merge-all')

	workingTree.set(merged);

})
workingTree.subscribe(data => {
	console.log('working tree updated', data);
})

export function mergeTwoTree(treeA, treeB) {

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
				let mergeToEle = children.find(x => x.name === item.name);
				if ('href' in mergeToEle && item.href === mergeToEle.href) {
					// its link,ignore it;
					console.log('same link', item)
					return
				}
				console.log('merging', item.name, mergeToEle, item);
				mergeTwoTree(mergeToEle, item);
			}

		})
		XyMessage.info("Merged tree success");
	}
	console.groupEnd()

}

function updateModified(root) {
	const now = Math.floor(Date.now() / 1000);

	root.last_modified = now.toString()
}

export const mergeGroupIds = writable([]);
mergeGroupIds.subscribe(nextList => {
	if (nextList.length === 2) {
		console.log('going to merge')
		const srcPath = nextList[0].slice();
		const destPath = nextList[1].slice();

		if (srcPath.join('') === destPath.join('')) {
			XyMessage.error('Same node');
			mergeGroupIds.set([])
			return
		}


		const root = get(workingTree)
		const srcTarget = findNodeByPath(root, srcPath.slice(1))

		const destTarget = findNodeByPath(root, destPath.slice(1))


		// merge two tree
		mergeTwoTree(destTarget, srcTarget);

		destTarget.children = destTarget.children.slice()
		srcTarget.children = []

		// delete src target 
		const srcParentPath = srcPath.slice(1);
		srcParentPath.pop();
		const srcParent = findNodeByPath(root, srcParentPath.slice())
		const srcTargetIndex = srcParent.children.findIndex(x => x.name === srcTarget.name)
		srcParent.children = [
			...srcParent.children.slice(0, srcTargetIndex),
			...srcParent.children.slice(srcTargetIndex + 1)
		];

		// touch update
		updateNodeByPath(root, srcPath.slice(1))
		updateNodeByPath(root, destPath.slice(1))
		console.log(srcPath, destPath, srcTarget, destTarget)

		workingTree.set({ ...root })
		mergeGroupIds.set([])
	}
})

function findNodeByPath(node, path = []) {
	if (!node) {
		return null;
	}
	if (path.length) {
		let name = path.shift();
		let target = node.children.find(x => x.name === name);

		if (target) {
			return findNodeByPath(target, path)
		}

	}
	return node
}
function updateNodeByPath(node, path = []) {
	if (!node) {
		return null;
	}
	if (path.length) {
		let name = path.shift();
		let targetIndex = node.children.findIndex(x => x.name === name);

		if (targetIndex > -1) {
			node.children = [
				...node.children.slice(0, targetIndex),
				updateNodeByPath(node.children[targetIndex], path),
				...node.children.slice(targetIndex + 1)
			]
			return node
		}

	}
	return node
}