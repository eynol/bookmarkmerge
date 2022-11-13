<script>
	import { sortedFiles as files, primaryFile, targetFolder } from '../stores/app';
	import { Grid, Row, Column, Tile, Button, Checkbox } from 'carbon-components-svelte';
	import Folder from './Folder.svelte';
</script>

<div style={`overflow:auto; overscroll-behavior-x: none;`}>
	<div class="container" style:width={`${500 * $files.length}px`}>
		{#each $files as file}
			<div style="width:500px;padding:0 10px;box-sizing: border-box;">
				<Tile>
					{#if $primaryFile === file.name}
						<Button
							size="small"
							on:click={() => {
								primaryFile.set(file.name);
							}}>Current file is primary file</Button
						>
					{:else}
						<Button
							size="small"
							kind="tertiary"
							on:click={() => {
								primaryFile.set(file.name);
							}}>Set As Primary</Button
						>
					{/if}
				</Tile>
				<Tile content={file.name}>
					<Folder node={file} open />
				</Tile>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
	}
</style>
