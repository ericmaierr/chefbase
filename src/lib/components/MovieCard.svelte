<script>
  let { movie } = $props();
</script>

<div class="movie-card">
  <div>
    <img class="img-fluid" src={movie.poster} alt="" />
  </div>
  <div class="details">
    <a href="http://localhost:5173/movies/{movie._id}">
      {movie.title}
    </a>
    <div>
      Jahr: {movie.year}
    </div>
    <div>
      Dauer: {movie.length}
    </div>
  </div>
</div>

<style>
  .movie-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .movie-card a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
</style>
