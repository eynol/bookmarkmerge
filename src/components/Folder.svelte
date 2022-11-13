<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:options immutable={true} />

<script type="ts">
	import FolderOpen from '$lib/images/folder.open.svg.svelte';
	import FolderClose from '$lib/images/folder.close.svg.svelte';
	import FileIcon from '$lib/images/file.svg.svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		type BookmarkFileTree,
		type BookmarkNode,
		targetFolder,
		mergeToTargetFolder,
		removeDuplicatedUrls,
		moveNodeToTargetFolder
	} from '../stores/app';
	import { OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import { Toast } from '../util/message';
	const dispatch = createEventDispatcher();

	export let node: BookmarkNode;

	export let path: string[] = [];

	$: childPath = [...path, node.name];
	$: isTargetFolder = $targetFolder.join('') === childPath.join('');

	export let open = false;
	function toggle() {
		open = !open;
	}

	function menuActionSelectHandler(e: any) {
		console.log(childPath);
		e.stopPropagation();
	}
	function menuActionDeleteHandler(e: any) {
		const path = [node.id];
		dispatch('delete-link', path);
		e.stopPropagation();
	}

	function handleDragStart(e: DragEvent) {
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.setData(
				'text',
				JSON.stringify({
					type: node.href ? 'link' : 'folder',
					path: childPath
				})
			);
		}
	}

	function handleDragDrop(e: DragEvent) {
		e.preventDefault();
		let data = e.dataTransfer?.getData('text');
		if (data) {
			const { type, path } = JSON.parse(data);
			moveNodeToTargetFolder({
				type,
				from: path,
				to: childPath
			});
		}
		console.log(data);
	}
</script>

{#if node}
	{#if node.href}
		<div
			draggable="true"
			on:dragover={(e) => {
				e.preventDefault();
			}}
			on:drop={handleDragDrop}
			on:dragstart={handleDragStart}
		>
			<FileIcon />&nbsp;
			<a class="link" href={node.href} rel="noreferrer" target="_blank">{node.name}</a>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span on:click|stopPropagation>
				<OverflowMenu size="sm">
					<OverflowMenuItem on:click={() => targetFolder.set(childPath)}>
						move to target
					</OverflowMenuItem>
					<OverflowMenuItem on:click={menuActionDeleteHandler} danger>delete</OverflowMenuItem>
				</OverflowMenu>
			</span>
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class:is-target-folder={isTargetFolder}
			on:dragstart={handleDragStart}
			draggable="true"
			on:drop={handleDragDrop}
			on:click={toggle}
			on:dragover={(e) => {
				e.preventDefault();
			}}
		>
			<svelte:component this={open ? FolderOpen : FolderClose} />
			&nbsp;
			<span>{node.name}</span>
			<span on:click|stopPropagation>
				<OverflowMenu size="sm">
					<OverflowMenuItem
						on:click={() => {
							targetFolder.set(childPath);
							Toast.fire('added to target folder');
						}}
					>
						set as target
					</OverflowMenuItem>
					<OverflowMenuItem
						hasDivider
						on:click={() => {
							mergeToTargetFolder(childPath);
						}}
					>
						merge to target
					</OverflowMenuItem>
					<OverflowMenuItem on:click={menuActionSelectHandler}>child to target</OverflowMenuItem>
					<OverflowMenuItem
						on:click={() => {
							removeDuplicatedUrls(childPath);
						}}
						hasDivider
						danger>remove duplicated</OverflowMenuItem
					>
				</OverflowMenu>
			</span>
		</div>
	{/if}
	{#if node.children && node.children.length && open}
		<ul>
			{#each node.children as file (file)}
				<li>
					<svelte:self node={file} path={childPath} />
				</li>
			{/each}
		</ul>
	{/if}
{/if}

<style>
	ul {
		list-style: none;
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		border-left: solid 1px black;
	}
	div {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
	}
	.is-target-folder {
		border: 2px solid #d023a6;
	}
	.link {
		word-break: break-all;
	}
</style>
