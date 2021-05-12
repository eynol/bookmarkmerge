<svelte:options immutable={true} />

<script>
  import FolderOpen from "../img/folder.open.svg.svelte";
  import FolderClose from "../img/folder.close.svg.svelte";
  import FileIcon from "../img/file.svg.svelte";
  export let name = "";
  export let children = [];
  export let href = "";

  export let open = false;
  function toggle() {
    open = !open;
  }
</script>

{#if href}
  <div><FileIcon />&nbsp;<a {href} target="_blank">{name}</a></div>
{:else}
  <div on:click={toggle}>
    <svelte:component this={open ? FolderOpen : FolderClose} />
    &nbsp;
    <span>{name}</span>
  </div>
{/if}
{#if children && children.length && open}
  <ul>
    {#each children as { name, children, href }}
      <li>
        <svelte:self {name} {children} {href} />
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
</style>
