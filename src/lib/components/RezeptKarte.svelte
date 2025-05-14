<script>
  let { rezept } = $props();
</script>

<div class="recipe-card">
  <div>
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>
  <div class="details">
    <div class="name">
      <a href={"/rezepte/" + rezept._id}>{rezept.name}</a>
    </div>
    <div>
      Dauer: {rezept.length} min
    </div>
  </div>
</div>

<style>
  .recipe-card {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
  }
  .details {
    padding: 0.5em;
  }
  .name {
    font-weight: bold;
  }
</style>
