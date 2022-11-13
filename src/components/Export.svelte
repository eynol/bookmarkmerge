<script type="ts">
	import { exportJSON, exportHTML } from '../stores/app';
	import { RadioButtonGroup, RadioButton, Button } from 'carbon-components-svelte';
	$: exportType = 'json';

	function handleExport() {
		if (exportType === 'json') {
			exportJSON();
		} else if (exportType === 'html') {
			exportHTML();
		}
		console.log(exportType);
	}
</script>

<RadioButtonGroup legendText="Export file type" bind:selected={exportType}>
	<RadioButton value="json" labelText="JSON" />
	<RadioButton value="html" labelText="HTML" />
</RadioButtonGroup>

<Button on:click={handleExport}>Export {exportType === 'json' ? 'TargetFolder' : 'Primary'}</Button>
