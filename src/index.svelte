<script>
  import { files,workingTree } from "./stores/app";
  import ReadFile from "./components/ReadFile.svelte";
  import ListFiles from "./components/ListFiles.svelte";
  import Folder from "./components/Folder";

  function handleRead({ detail: { children } }) {
    console.log("xx", children);
  }


//   import { debug } from "_svelte@3.38.2@svelte/internal";
  //   debug($files);
</script>


<ReadFile on:read={handleRead} />
<br />
<Folder open {...$workingTree||{}} />

