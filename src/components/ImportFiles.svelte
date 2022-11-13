<script lang="ts">
	import { files as appFiles, currentStep, type BookmarkFileTree } from '../stores/app';
	import {
		Content,
		Grid,
		Row,
		Column,
		breakpointObserver,
		FileUploaderDropContainer,
		FileUploaderItem,
		Button
	} from 'carbon-components-svelte';
	//@ts-ignore
	import bookmark from 'netscape-bookmark-tree/dist/bookmark.ast.esm.js';

	import { Edit } from 'carbon-icons-svelte';
	const screenSize = breakpointObserver().largerThan('md');
	$: cols = $screenSize ? 2 : 1;
	console.log('fff', $appFiles);
	async function onSelectFiles(files: readonly File[]) {
		if (files && files.length) {
			// Selected some files
			const fileList = files;
			let textResults = await Promise.all(Array.from(fileList).map(readAsText));

			textResults = textResults
				.map((item) => {
					console.time('bookmaring ' + item.name);
					console.log({ item });

					item.children = bookmark(item.text);
					console.log('after', { item });
					console.timeEnd('bookmaring ' + item.name);
					return item;
				})
				.filter((item) => !!item.children);

			// update files with same name

			//
			appFiles.update((list) => {
				const names = textResults.map((x) => x.name).filter(Boolean);
				// remove old files
				const oldList = list.filter((item) => !names.includes(item.name));
				// append selected files
				return oldList.concat(textResults);
			});
			//
			console.log(textResults, $appFiles);
		}
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

<Content>
	<Grid padding>
		<Row {cols}>
			<Column>
				<div class:center={$appFiles.length === 0}>
					<FileUploaderDropContainer
						multiple
						labelText="Drag and drop files here or click to upload"
						on:change={(e) => {
							console.log('files', e.detail);
							onSelectFiles(e.detail);
						}}
					/>
				</div>
			</Column>
			{#if $appFiles.length > 0}
				<Column sm={{ span: 4, offset: 0 }} md={{ span: 4, offset: 0 }}>
					{#each $appFiles as file, index}
						<FileUploaderItem
							name={file.name}
							title={file.name}
							status="edit"
							on:delete={() => appFiles.update((list) => list.filter((x, i) => i !== index))}
						/>
					{/each}
					<Row>
						<Column loading="loading">
							<div>
								<Button
									icon={Edit}
									on:click={() => {
										currentStep.set(1);
									}}>Start edit these files</Button
								>
							</div>
						</Column>
					</Row>
				</Column>
			{/if}
		</Row>
	</Grid>
</Content>

<style>
	.center {
		text-align: center;
	}
</style>
