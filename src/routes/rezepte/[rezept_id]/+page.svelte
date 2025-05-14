<script>
  export let data;
  const { rezept } = data;
</script>

<a href="https://chefbase.netlify.app/rezepte">Back</a>

<div class="container">
  <img class="poster" src={rezept.poster} alt={"Poster von " + rezept.name} />

  <div class="info">
    <h1>{rezept.name}</h1>
    <p><strong>Dauer:</strong> {rezept.length} Minuten</p>
    <p><strong>Zubereitung</strong></p>
    <ol>
      {#each rezept.instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ol>
    <p><strong>Zutaten</strong></p>
    <ul>
      {#each rezept.zutaten as zutat}
        <li>{zutat}</li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .poster {
    max-width: 300px;
    width: 100%;
    height: auto;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
  }

  .info h1 {
    margin-top: 0;
  }
</style>
