<script>
  import { files } from "../stores/app";

  import bookmark from "netscape-bookmark-tree/dist/bookmark.esm";

  console.log(files);
  let fileInput;
  async function onSelectFiles(e) {
    if (fileInput.files.length) {
      // Selected some files
      const { files: fileList } = fileInput;
      let textResults = await Promise.all([].map.call(fileList, readAsText));

      textResults = textResults
        .map((item) => {
          item.result = bookmark(item.text);
          return item;
        })
        .filter((item) => !!item.result);

      files.update((list) => {
        const names = textResults.map((x) => x.name).filter(Boolean);

        const oldList = list.filter((item) => !names.includes(item.name));
        return oldList.concat(textResults);
      });
      //
      console.log(textResults);
    }
    // restore to default value
    fileInput.value = "";
  }

  async function readAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ name: file.name.trim(), text: reader.result });
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
</script>

<xy-button on:click={fileInput.click()}>Import Bookmark Files</xy-button>
<input
  hidden
  type="file"
  multiple
  accept=".html"
  bind:this={fileInput}
  on:change={onSelectFiles}
/>
