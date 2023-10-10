<script lang="ts">
  import { onMount } from 'svelte';

  let data: string;

  onMount(async () => {
    const resp = await fetch('/api/db');
    console.log(resp);
    data = await resp.json();
  });
</script>

TODO:

{JSON.stringify(data)}
