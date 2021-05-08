<script>
    import { files } from "../stores/app";
    files.subscribe(value=>{
        console.log(value);
    })
</script>

<ul>
    {#each $files as file}
        <li>{file.name}</li>
    {/each}
</ul>
