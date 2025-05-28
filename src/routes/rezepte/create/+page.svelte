<script>
  let { form } = $props();

  let steps = $state([""]);

  function addStep() {
    steps = [...steps, ""];
  }

let ingredients = $state([
  { name: "", quantity: "", unit: "" }
 ]);

  function addIngredient() {
    ingredients = [
      ...ingredients,
      { name: '', quantity: '', unit: '' }
    ];
  }
</script>

<h1>Rezept hinzufügen</h1>
<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input
      name="name"
      class="form-control"
      type="text"
      placeholder="Name"
      required
    />
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Dauer</label>
    <input
      name="length"
      class="form-control"
      type="number"
      placeholder="Dauer in Minuten"
      required
    />
  </div>

  <fieldset class="mb-3">
  <legend>Zutaten</legend>

  {#each ingredients as ing, i}
    <div class="row mb-2 gx-2">
      <div class="col">
        <input
          name="ingredientsName"
          class="form-control"
          type="text"
          placeholder="Zutat"
          bind:value={ingredients[i].name}
          required={i === 0}
        />
      </div>
      <div class="col">
        <input
          name="ingredientsQuantity"
          class="form-control"
          type="number"
          placeholder="Menge"
          bind:value={ingredients[i].quantity}
          required={i === 0}
        />
      </div>
      <div class="col">
        <select
          name="ingredientsUnit"
          class="form-select"
          bind:value={ingredients[i].unit}
          required={i === 0}
        >
          <option value="" disabled selected>Einheit</option>
          <option value="Stück">Stück</option>
          <option value="EL">EL</option>
          <option value="TL">TL</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="Prise">Prise</option>
        </select>
      </div>
    </div>
  {/each}

  {#if ingredients[ingredients.length - 1].name.trim() !== ''}
    <button
      type="button"
      class="btn btn-secondary mb-3"
      onclick={addIngredient}
    >
      Zutat hinzufügen
    </button>
  {/if}
</fieldset>

  <div class="mb-3">
    <label for="" class="form-label">Anleitung</label>
    {#each steps as step, i}
      <input
        name="instructions"
        class="form-control mb-2"
        type="text"
        placeholder={`Schritt ${i + 1}`}
        bind:value={steps[i]}
        required={i === 0}
      />
    {/each}

    {#if steps[steps.length - 1].trim() !== ""}
      <button type="button" class="btn btn-secondary" onclick={addStep}>
        Schritt hinzufügen
      </button>
    {/if}
  </div>

  <button type="submit" class="btn btn-primary"> Rezept hinzufügen </button>
</form>

{#if form?.success}
    <p>Rezept wurde erfolgreich angelegt!
    </p>
{/if}