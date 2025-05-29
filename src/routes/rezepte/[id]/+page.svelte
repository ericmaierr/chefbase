<script>
  let { data } = $props();
  let { rezept, zutaten } = data;
</script>

<h1>{rezept.name}</h1>
<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>

  <div class="col">
    <h2>Dauer:</h2>
    <p>{rezept.length} min</p>

    <section>
      <h2>Zutaten:</h2>
      <ul>
        {#each zutaten as z}
          <li>{z.quantity} {z.unit} {z.name}</li>
        {/each}
      </ul>
    </section>

    <section>
      <h2>Zubereitung:</h2>
      <ol>
        {#each rezept.instructions as schritt}
          <li>{schritt}</li>
        {/each}
      </ol>
    </section>

    <div class="mt-4 d-flex gap-2">
      <!-- Roter Löschen-Button -->
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={rezept._id} />
        <button type="submit" class="btn btn-danger"> Rezept löschen </button>
      </form>

      <!-- Grüner/Oranger Watchlist-Button -->
      {#if rezept.watchlist}
        <form method="POST" action="?/remove">
          <input type="hidden" name="id" value={rezept._id} />
          <button type="submit" class="btn btn-warning">
            Rezept entfernen
          </button>
        </form>
      {:else}
        <form method="POST" action="?/save">
          <input type="hidden" name="id" value={rezept._id} />
          <button type="submit" class="btn btn-success">
            Rezept speichern
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>
