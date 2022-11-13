<script>
	import { Button } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/white.css';
	import { confetti } from '@neoconfetti/svelte';
	import BookmarkMege from './BookmarkMerge.svelte';
	$: won = true;
	console.log(won);
</script>

<svelte:head>
	<title>Bookmark Merge</title>
	<meta name="description" content="Merge your bookmarks" />
</svelte:head>

<section>
	<BookmarkMege />
	{#if won}
		<div
			style="position: absolute; left: 50%; top: 30%"
			use:confetti={{
				force: 0.7,
				stageWidth: window.innerWidth,
				stageHeight: window.innerHeight,
				colors: ['#ff3e00', '#40b3ff', '#676778']
			}}
		/>
	{/if}
</section>
