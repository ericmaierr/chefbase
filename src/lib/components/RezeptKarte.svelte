<script>
  let { rezept } = $props();
</script>

<a href={"/rezepte/" + rezept._id} class="recipe-card">
  <div>
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>
  <div class="details">
    <div class="name">
      {rezept.name}
    </div>
    <div>
      Dauer: {rezept.length} min
    </div>
  </div>
</a>

<style>
  .recipe-card {
    display: block;

    border: 1px solid #800020;
    background-color: #800020;
    color: #f5f1e9;

    border-radius: 0.8rem;

    overflow: hidden;

    text-decoration: none;
    cursor: pointer;
  }

  .recipe-card img {
    width: 100%;
    display: block;
  }

  .details {
    padding: 0.5em;
  }

  .name {
    font-weight: bold;
  }
</style>
