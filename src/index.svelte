
<script>
    import ReadFile from './components/ReadFile.svelte';
    import ListFiles from './components/ListFiles.svelte';
    import Tree from './components/Tree.d3.svelte'
    function handleRead ({detail:{result}}){
        console.log('xx',result)
    }
</script>
<ReadFile on:read={handleRead} />
<ListFiles />
<Tree />