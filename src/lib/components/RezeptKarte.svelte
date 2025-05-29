<script>
  let { rezept } = $props();
</script>
<a
href={"/rezepte/" + rezept._id}
class="recipe-card">
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
    /* macht das <a> zum Block-Element */
    display: block;

    /* Rahmen, Hintergrund, Schrift */
    border: 1px solid #800020;
    background-color: #800020;
    color: #F5F1E9;

    /* nur untere Ecken abrunden */
    border-radius: 0.8rem;

    /* verhindert, dass Bilder über die Rundung hinausragen */
    overflow: hidden;

    /* kein Unterstrich, Hand-Cursor */
    text-decoration: none;
    cursor: pointer;

    /* padding kommt über .details, height:100% entfernt */
  }

  .recipe-card img {
    /* sicherstellen, dass das Bild die volle Breite nimmt */
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