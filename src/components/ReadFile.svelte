<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import bookmark from "netscape-bookmark-tree/dist/bookmark.ast.esm";
  let fileInput = "";
  function readFile(e) {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (e) => {
      console.log(bookmark(fileReader.result));
      //   dispatch("read", {
      //       result:fileReader.result
      //   });
      //   console.log(fileReader.result);
    };
  }
</script>

<input type="file" bind:value={fileInput} on:change={readFile} />
