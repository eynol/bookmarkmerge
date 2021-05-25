<svelte:options immutable={true} />

<script>
  import FolderOpen from "../img/folder.open.svg.svelte";
  import FolderClose from "../img/folder.close.svg.svelte";
  import FileIcon from "../img/file.svg.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let name = "";
  export let children = [];
  export let href = "";

  export let open = false;
  function toggle() {
    open = !open;
  }
  function handleSubfolderEvent(event) {
    const path = (event && event.detail) || [];
    path.unshift(name);
    dispatch("mergegroup", path);
  }

  function fireMergeEvent() {
    const path = [name];
    dispatch("mergegroup", path);
  }
</script>

{#if href}
  <div>
    <FileIcon />&nbsp;<a {href} target="_blank">{name}</a>
  </div>
{:else}
  <div on:click={toggle}>
    <svelte:component this={open ? FolderOpen : FolderClose} />
    &nbsp;
    <span>{name}</span>
    &nbsp;
    <span class="btn" on:click|stopPropagation={fireMergeEvent}>[merge]</span>
  </div>
{/if}
{#if children && children.length && open}
  <ul>
    {#each children as { name, children, href }}
      <li>
        <svelte:self
          {name}
          {children}
          {href}
          on:mergegroup={handleSubfolderEvent}
        />
      </li>
    {/each}
  </ul>
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
  .btn {
    cursor: pointer;
  }
</style>
