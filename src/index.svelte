<script>
  import { files } from "./stores/app";
  import ReadFile from "./components/ReadFile.svelte";
  import ListFiles from "./components/ListFiles.svelte";
  import Folder from "./components/Folder";

  function handleRead({ detail: { result } }) {
    console.log("xx", result);
  }

//   import { debug } from "_svelte@3.38.2@svelte/internal";
  //   debug($files);
</script>

<ReadFile on:read={handleRead} />
<ListFiles />
{#each $files as file}
  <Folder name="Root" children={file.result} />
{/each}
