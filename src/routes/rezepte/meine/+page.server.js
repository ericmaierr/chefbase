import db from "$lib/db.js";

export async function load() {
  return {
    rezepte: await db.getWatchlist()
  };
}
