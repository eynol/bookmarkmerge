<script>
  import { files, workingTree } from "../stores/app";

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
          console.time("bookmaring " + item.name);
         
          item.children = bookmark(item.text);
          console.timeEnd("bookmaring " + item.name);
          return item;
        })
        .filter((item) => !!item.children);

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
      reader.onload = () => {
        let text = reader.result;
        let index = 0;

        text = text.replace(/><\/A>/gim, () => `>(blank${index++})</A>`);
        resolve({ name: file.name.trim(), text: text });
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
</script>

<xy-button on:click={fileInput.click()}>Import Bookmark Files</xy-button>
<xy-button on:click={console.log($workingTree)}>Log working tree</xy-button>
<input
  hidden
  type="file"
  multiple
  accept=".html"
  bind:this={fileInput}
  on:change={onSelectFiles}
/>
