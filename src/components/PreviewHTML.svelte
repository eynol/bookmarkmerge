<script type="ts" context="module">
	import { writable, get } from 'svelte/store';
	import { workingTree } from '../stores/app';
	export let previewModalVisiable = writable(false);
	export let treeHtml = writable('');

	export function openPreviewHTMLModal() {
		console.time('generateTemplate');
		treeHtml.set(generateTemplate(get(workingTree)));
		console.timeEnd('generateTemplate');

		previewModalVisiable.set(true);
	}

	export function hideModal() {
		previewModalVisiable.set(false);
	}

	export function downloadHTMLFile() {
		const a = document.createElement('a');
		const treeHtml = generateTemplate(get(workingTree));
		const file = new Blob([treeHtml], { type: 'text/html' });
		a.href = URL.createObjectURL(file);
		const today = new Date();
		const todayTxt = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
		a.download = 'bookmarks_merged_' + todayTxt + '.html';
		document.body.append(a);
		a.click();
		swal.fire(
			'Download success',
			'You can use browser default bookmark manager to import this downloaded file',
			'success'
		);
	}
</script>

<script type="ts">
	import { CodeSnippet, Row, Grid, Modal, Header as HeaderCarbon } from 'carbon-components-svelte';
	import { tick } from 'svelte';
	import swal from 'sweetalert2';

	import { generateTemplate } from '../util/genTemplate';
</script>

<Modal
	bind:open={$previewModalVisiable}
	modalHeading="Preview HTML"
	primaryButtonText="OK"
	secondaryButtonText="Close"
	on:transitionend={(e) => {
		if (!e.detail.open) {
			$treeHtml = '';
		}
	}}
	on:click:button--primary={hideModal}
	on:click:button--secondary={hideModal}
	on:close
	on:submit
>
	{#if $treeHtml}
		<CodeSnippet type="multi" expanded code={$treeHtml} feedback="Copied to clipboard" />
	{/if}
</Modal>
