<script>
  import RezeptKarte from "$lib/components/RezeptKarte.svelte";
  let { data } = $props();

  let filter = $state("");

  let filteredRecipes = $derived.by(() => {
    if (filter === "") {
      return data.rezepte;
    }
    const regex = new RegExp(`\\b${filter}`, "i");
    return data.rezepte.filter((r) => regex.test(r.name));
  });
</script>

<header>
  <h2>Alle Rezepte</h2>

  <div class="search">
    <input
      type="text"
      placeholder="Rezepte suchen..."
      aria-label="Rezepte suchen"
      bind:value={filter}
      class="border rounded px-2 py-1 w-full mb-4"
    />
  </div>

  <a href="/rezepte/create" class="btn btn-success"> Rezept hinzufügen </a>
</header>

<div>
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
</div>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .search {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .search input {
    width: 100%;
    max-width: 500px;
    margin: 0 1rem;
    margin-top: 1.5rem;
    box-sizing: border-box;
  }
</style>
