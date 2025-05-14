import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let rezept = {
      name: data.get("name"),
      length: data.get("length"),
      recommended: data.get("recommended"),
      watchlist: data.get("watchlist"),
      instructions: data.get("instructions"),
    };
    await db.createRecipe(recipe);
    return { success: true };
  },
};
