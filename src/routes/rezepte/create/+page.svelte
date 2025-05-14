<script>
  let { form } = $props();
</script>

<a href="/rezepte">Back</a>
<h1>Rezept hinzufügen</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Dauer</label>
    <input name="year" class="form-control" type="number" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Anleitung</label>
    <input name="length" class="form-control" type="text" />
  </div>
  <button type="submit" class="btn btn-primary">Rezept hinzufügen</button>
</form>

{#if form?.success}
  <p>Rezept hinzugefügt</p>
{/if}
