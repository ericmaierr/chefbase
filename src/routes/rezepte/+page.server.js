import db from "$lib/db.js";

export async function load() {
  const rezepte = await db.getRecipes();
  return { rezepte };
}