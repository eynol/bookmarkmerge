<script>
  import { files, workingTree, mergeGroupIds } from "./stores/app";
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
    const file = new Blob([treeHtml], { type: "text/html" });
    a.href = URL.createObjectURL(file);
    const today = new Date();
    const todayTxt = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    a.download = "bookmarks_merged_" + todayTxt + ".html";
    document.body.append(a);
    a.click();
    XyMessage.info("Download success");
  }

  function handleMergeGroup(evt) {
    if ($mergeGroupIds.length === 0) {
      XyMessage.info(
        "please click the target group's [merge] to merge into target"
      );
    } else if ($mergeGroupIds.length === 1) {
      XyMessage.info("going to merge two group");
    }
    $mergeGroupIds = [...$mergeGroupIds, evt.detail];
  }
  function clearMerge() {
    $mergeGroupIds = [];
  }
  //   import { debug } from "_svelte@3.38.2@svelte/internal";
  //   debug($files);
</script>

<ReadFile on:read={handleRead} />
<xy-button on:click={displayTree}>Generate</xy-button>
<xy-button on:click={downloadFile}>Download</xy-button>
<xy-button on:click={clearMerge}>ClearMerge</xy-button>
<br />
<Folder open {...$workingTree || {}} on:mergegroup={handleMergeGroup} />

<pre>
  {treeHtml}
</pre>
