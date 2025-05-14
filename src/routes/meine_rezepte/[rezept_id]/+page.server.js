import db from '$lib/db.js';

export async function load({ params }) {
    const rezept = await db.getRezept(params.rezept_id);
  if (!rezept) {
    throw error('Rezept nicht gefunden');
  }
  return { rezept };
}