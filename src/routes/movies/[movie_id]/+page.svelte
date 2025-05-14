<script>
    export let data;
    const { movie } = data;
</script>

<a href="http://localhost:5173/movies">Back</a>

<div class="container">
    <img
      class="poster"
      src={movie.poster}
      alt={"Poster von " + movie.title}
    />
  
    <div class="info">
      <h1>{movie.title}</h1>
      <p><strong>Jahr:</strong> {movie.year}</p>
      <p><strong>Dauer:</strong> {movie.length} Minuten</p>
  
      <p><strong>Cast</p>
      <ul>
        {#each movie.actors as actor}
          <li>{actor}</li>
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