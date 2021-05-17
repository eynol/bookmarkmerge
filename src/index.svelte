<script>
  import { files, workingTree } from "./stores/app";
  import ReadFile from "./components/ReadFile.svelte";
  import ListFiles from "./components/ListFiles.svelte";
  import Folder from "./components/Folder";
  import { generateTemplate } from "./util/genTemplate";

  function handleRead({ detail: { children } }) {
    console.log("xx", children);
  }

  let treeHtml = "";
  function displayTree() {
    console.time('generateTemplate')
    treeHtml = generateTemplate($workingTree);
    console.timeEnd('generateTemplate')
  }
  //   import { debug } from "_svelte@3.38.2@svelte/internal";
  //   debug($files);
</script>

<ReadFile on:read={handleRead} /><xy-button on:click={displayTree}>Generate</xy-button>
<br />
<Folder open {...$workingTree || {}} />

<pre>
  {treeHtml}
</pre>
