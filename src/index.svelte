
<script>
    import ReadFile from './components/ReadFile.svelte';
    function handleRead ({detail:{result}}){
        console.log('xx',result)
    }
</script>
<ReadFile on:read={handleRead} />