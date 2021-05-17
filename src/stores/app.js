import { writable, derived } from 'svelte/store'

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

	}
	console.groupEnd()

}

function updateModified(root) {
	const now = Math.floor(Date.now() / 1000);

	root.last_modified = now.toString()
}
