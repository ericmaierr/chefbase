<script>
    let { form } = $props();
</script>

<a href="https://chefbase.netlify.app/rezepte">Back</a>

<h1>Rezept hinzufügen</h1>

<form method="POST" action="?/create">
    <div class="mb-3">
        <label for="" class="form-label">Name</label>
        <input name="title" class="form-control" type="text" />
    </div>
    <div class="mb-3">
        <label for="" class="form-label">Length</label>
        <input name="length" class="form-control" type="text" />
    </div>
    <button type="submit" class="btn button-primary">Rezept hinzufügen</button>
</form>

{#if form?.success}
<p>Rezept hinzugefügt</p>
{/if}
