<script>
  import RezeptKarte from "$lib/components/RezeptKarte.svelte";
  let { data } = $props();
</script>

<header>
  <h1>Willkommen bei Chefbase</h1>
  <h2>Rezepte im Trend</h2>
</header>
<div class="row mt-3">
  {#each data.rezepte as rezept}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <RezeptKarte {rezept}></RezeptKarte>
    </div>
  {/each}
</div>

<style>
  header {
    padding: 1rem 0;
  }
</style>
