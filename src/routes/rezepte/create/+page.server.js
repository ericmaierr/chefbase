import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    let rezept = {
      name: data.get("name"),
      length: data.get("length"),
      instructions: data
        .getAll("instructions")
        .map(s => s.trim())
        .filter(Boolean)
    };

    const rezeptId = await db.createRecipe(rezept);

    const names = data.getAll('ingredientsName');
    const quantities = data.getAll('ingredientsQuantity').map(Number);
    const units = data.getAll('ingredientsUnit');

    // 4) für jede Zeile: Zutat finden/erstellen und Link anlegen
    for (let i = 0; i < names.length; i++) {
      const name = names[i].trim();
      if (!name) continue;  // überspringe leere Zeilen

      // Zutat holen oder neu anlegen
      const ingredientId = await db.createIngredient(name);

      // Menge und Einheit
      const quantity = quantities[i];
      const unit = units[i];

      // Zuordnung in rezeptzutaten speichern
      await db.createRecipeIngredient({ rezept_id: rezeptId, ingredient_id: ingredientId, quantity, unit });
    }

    return { success: true };
  },
};
