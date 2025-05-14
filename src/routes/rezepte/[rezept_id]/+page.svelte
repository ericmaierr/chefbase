<script>
  let { data } = $props();
  let rezept = data.rezept;
</script>

<a href="/rezepte">Back</a>

<h1>{rezept.name}</h1>
<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={rezept.poster} alt="" />
  </div>

  <div class="col">
    <p>Dauer: {rezept.length}</p>
    <p>Zubereitung:</p>
    <!--
    <ul>
      {#each rezept.instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ul>
    -->
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={rezept._id}>
      <button class="btn btn-danger">Rezept löschen</button>
    </form>
  </div>
</div>
