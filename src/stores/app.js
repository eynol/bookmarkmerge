import { writable } from 'svelte/store'

export const files  = writable([])

const getDefaultWorkingTree = ()=>({
	name:'root',
	children:[]
})
export const workingTree = writable(getDefaultWorkingTree());

files.subscribe($files=>{
	console.log('files update',$files)
	if(!$files.length){
		workingTree.set( getDefaultWorkingTree())
		return
	}

	let favorateFolderName = $files[0].children.find(x=>x.personal_toolbar_folder).name;
	
	const merged =	$files.reduce((fileA,fileB)=>{

		const toolbar =  fileB.children.find(x=> x.personal_toolbar_folder);
		toolbar.name = favorateFolderName;
		
		mergeTwoTree(fileA,fileB)
		return fileA;
	})

	workingTree.set(merged);
	
})
workingTree.subscribe(data=>{
	console.log('working treei updated',data);
})

export function mergeTwoTree (treeA, treeB){

	if(!treeA.children){
		treeA.children = [];
	}
	if(!treeB.children){
		treeB.children = [];
	}

	const { children } = treeA;
	const another = treeB.children;
	console.group(treeA.name)
	if(another.length){
		// if net tree has elements , merge them to current tree
		const nameset = new Set(children.map(item=>item.name))
		another.forEach(item=>{
			if(!nameset.has(item.name)){
				console.log('pushing ',item.name,item);
				children.push(item);
			}else{
				// if they have the same name

			
				// merge it
			let	mergeToEle = children.find(x=>x.name === item.name);
			if('href' in mergeToEle && item.href === mergeToEle.href){
				// its link,ignore it;
				console.log('same link',item)
				return
			}
				console.log('merging',item.name, mergeToEle,item);
				mergeTwoTree(mergeToEle, item);
			}
			
		})
			
	}
	console.groupEnd()

	
	
	
} 
