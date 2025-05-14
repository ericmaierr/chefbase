<script>
    export let data;
    import RezeptKarte from "$lib/components/RezeptKarte.svelte";
    const { rezepte } = data;
</script>

<h1>Wilkommen bei ChefBase</h1>
<p>Rezepte im Trend</p>

<a href="https://chefbase.netlify.app/meine_rezepte/create">
    <button class="button-create"> Neues Rezept hinzufügen </button>
</a>

<p><i>Daten und Bilder generiert mit ChatGPT und DALL-E</i></p>
<div class="row">
    {#each rezepte as rezept}
        <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
            <RezeptKarte {rezept}></RezeptKarte>
        </div>
    {/each}
</div>

<style>
    .button-create {
        padding: 0.5em 1em;
        background-color: #6c0900;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
