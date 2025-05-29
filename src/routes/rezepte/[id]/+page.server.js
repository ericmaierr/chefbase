import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  // Basis-Rezept laden
  const rezept = await db.getRecipe(params.id);

  // Rohdaten der Rezeptzutaten (mit ID, Menge, Einheit)
  const rawZutaten = await db.getRecipeIngredients(params.id);

  // Vollständigere Zutaten-Objekte mit Namen
  const zutaten = [];
  for (const rz of rawZutaten) {
    const ing = await db.getIngredient(rz.ingredient_id);
    if (ing) {
      zutaten.push({
        name: ing.name,
        quantity: rz.quantity,
        unit: rz.unit
      });
    }
  }

  return { rezept, zutaten };
}
// Rezept löschen
export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteRecipe(data.get("id"));
    redirect(303, "/rezepte");
  },

  // Rezept zur Watchlist hinzufügen
  save: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    await db.updateRecipe({ _id: id, watchlist: true });
  },

  // Rezept aus der Watchlist entfernen
  remove: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    await db.updateRecipe({ _id: id, watchlist: false });
  }
};
