<script>
  import RezeptKarte from "$lib/components/RezeptKarte.svelte";
  let { data } = $props();
</script>

<h1>Willkommen bei ChefBase</h1>
<h2>Empfohlene Rezepte</h2>

<div class="row mt-3">
  {#each data.rezepte as rezept}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <RezeptKarte {rezept}></RezeptKarte>
    </div>
  {/each}
</div>