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
    console.time("generateTemplate");
    treeHtml = generateTemplate($workingTree);
    console.timeEnd("generateTemplate");
  }
  function downloadFile() {
    const a = document.createElement("a");
    const file = new Blob([treeHtml]);
    a.href = URL.createObjectURL(file);
    const today = new Date();
    const todayTxt = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    a.download = "bookmarks_merged_" + todayTxt+'.html';
    document.body.append(a);
    a.click()
  }
  //   import { debug } from "_svelte@3.38.2@svelte/internal";
  //   debug($files);
</script>

<ReadFile on:read={handleRead} />
<xy-button on:click={displayTree}>Generate</xy-button>
<xy-button on:click={downloadFile}>Download</xy-button>
<br />
<Folder open {...$workingTree || {}} />

<pre>
  {treeHtml}
</pre>
