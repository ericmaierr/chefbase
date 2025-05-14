<script>
  import RezeptKarte from "$lib/components/RezeptKarte.svelte";
  let { data } = $props();
</script>

<div>
  <a href="/rezepte/create" class="btn btn-primary">Neues Rezept hinzufügen</a>
</div>

<div class="row mt-3">
  {#each data.rezepte as rezept}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <RezeptKarte {rezept}></RezeptKarte>
    </div>
  {/each}
</div>
