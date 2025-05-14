<script>
  let { rezept } = $props();
</script>

<div class="rezept-karte">
  <div>
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>
  <div class="details">
    <a href="https://chefbase.netlify.app/rezepte/{rezept._id}">
      {rezept.name}
    </a>
    <div>
      Dauer: {rezept.length}
    </div>
  </div>
</div>

<style>
  .rezept-karte {
    border: 1px solid #555;
    height: 100%;
    background-color: #444;
    color: white;
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
