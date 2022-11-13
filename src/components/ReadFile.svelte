<script type="ts">
	import { files, type BookmarkFileTree } from '../stores/app';
	import { Button } from 'carbon-components-svelte';
	// @ts-ignore
	import bookmark from 'netscape-bookmark-tree';

	let fileInput: HTMLInputElement;
	let handleClick = () => {
		fileInput.click();
	};

	async function onSelectFiles(e) {
		if (fileInput.files && fileInput.files.length) {
			// Selected some files
			const { files: fileList } = fileInput;
			let textResults = await Promise.all(Array.from(fileList).map(readAsText));

			textResults = textResults
				.map((item) => {
					console.time('bookmaring ' + item.name);

					item.children = bookmark(item.text);
					console.timeEnd('bookmaring ' + item.name);
					return item;
				})
				.filter((item) => !!item.children);

			// update files with same name

			//
			files.update((list) => {
				const names = textResults.map((x) => x.name).filter(Boolean);
				// remove old files
				const oldList = list.filter((item) => !names.includes(item.name));
				// append selected files
				return oldList.concat(textResults);
			});
			//
			console.log({ textResults });
		}
		// restore to default value
		fileInput.value = '';
	}

	async function readAsText(file: File): Promise<BookmarkFileTree> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				let text = reader.result as string;
				let index = 0;

				text = text.replace(/><\/A>/gim, () => `>(blank${index++})</A>`);
				resolve({ name: file.name.trim(), text: text });
			};
			reader.onerror = reject;
			reader.readAsText(file);
		});
	}
</script>

<Button on:click={handleClick}>Import Bookmark Files Into Workspace</Button>
<input hidden type="file" multiple accept=".html" bind:this={fileInput} on:change={onSelectFiles} />
