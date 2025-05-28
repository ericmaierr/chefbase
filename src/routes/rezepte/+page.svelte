<script>
  import RezeptKarte from "$lib/components/RezeptKarte.svelte";
  let { data } = $props();

  let filter = $state("");

  let filteredRecipes = $derived.by(() => {
    if (filter === "") {
      return data.rezepte;
    }
    const regex = new RegExp(`^${filter}`, "i");
    return data.rezepte.filter(r => regex.test(r.name));
  });
</script>

<section class="p-4">
  <input
    type="text"
    placeholder="Rezepte suchen..."
    aria-label="Rezepte suchen"
    bind:value={filter}
    class="border rounded px-2 py-1 w-full mb-4"
  />

  {#if filteredRecipes.length === 0}
    <p>Keine Rezepte gefunden.</p>
  {:else}
    <div class="row mt-3">
      {#each filteredRecipes as rezept}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
          <RezeptKarte {rezept} />
        </div>
      {/each}
    </div>
  {/if}
</section>