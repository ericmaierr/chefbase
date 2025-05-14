<script>
  let { rezept } = $props();
</script>

<div class="rezept-karte">
  <div>
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>
  <div class="details">
    <a href="https://chefbase.netlify.app/meine_rezepte/{rezept._id}">
      {rezept.name}
    </a>
    <div>
      Dauer: {rezept.length} min
    </div>
  </div>
</div>

<style>
  .rezept-karte {
    border: 1px solid #e3e2c0;
    height: 100%;
    background-color: #e3e2c0;
    color: #000000;
  }
  .details {
    padding: 0.5em;
  }
  .rezept-karte a {
    font-weight: bold;
    color: inherit;
    text-decoration: none;
  }
</style>
