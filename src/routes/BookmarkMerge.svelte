<script>
	import {
		Button,
		OverflowMenu,
		OverflowMenuItem,
		Content,
		CodeSnippet,
		Row,
		Grid,
		Modal,
		FileUploaderDropContainer,
		ContentSwitcher,
		Switch,
		Tile,
		Header as HeaderCarbon
	} from 'carbon-components-svelte';
	import { tick } from 'svelte';
	import { currentStep } from '../stores/app';
	import swal from 'sweetalert2';
	import ReadFile from '../components/ReadFile.svelte';
	import ListFiles from '../components/ListFiles.svelte';
	import Folder from '../components/Folder.svelte';
	import { generateTemplate } from '../util/genTemplate';
	import Header from './Header.svelte';
	import { text } from 'svelte/internal';
	import PreviewHtml, {
		openPreviewHTMLModal,
		downloadHTMLFile
	} from '../components/PreviewHTML.svelte';

	import ImportFiles from '../components/ImportFiles.svelte';
	import Export from '../components/Export.svelte';
	//   import { debug } from "_svelte@3.38.2@svelte/internal";
	//   debug($files);
</script>

<ContentSwitcher bind:selectedIndex={$currentStep}>
	<Switch text="Inport files" />
	<Switch text="Edit" />
	<Switch text="Export" />
</ContentSwitcher>
<!-- <Grid>
	<Row>
		<OverflowMenu>
			<OverflowMenuItem on:click={openPreviewHTMLModal} text="Preview HTML" />
			<OverflowMenuItem on:click={downloadHTMLFile} text="Download HTML" />
		</OverflowMenu>
	</Row>
</Grid> -->
<br />

{#if $currentStep === 0}
	<ImportFiles />
{:else if $currentStep === 1}
	<ListFiles />
{:else if $currentStep === 2}
	<Export />
{/if}
<PreviewHtml />
