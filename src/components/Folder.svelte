<svelte:options immutable={true} />

<script>
  import { afterUpdate, beforeUpdate } from "svelte";

  export let name = "";
  export let children = [];
  export let href = "";

  beforeUpdate(() => {
    console.log(name, children);
  });
</script>

{#if href}
  <a href={href}>{name}</a>
{:else}
  <span>({name})</span>
{/if}
{#if children && children.length}
  <ul>
    {#each children as item}
      <li>
        <svelte:self {...item} />
      </li>
    {/each}
  </ul>
{/if}


<style>
    ul{
        list-style: none;
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
    }
</style>