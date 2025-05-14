import db from '$lib/db.js';

export async function load({ params }) {
    const movie = await db.getMovie(params.movie_id);
  if (!movie) {
    throw error('Film nicht gefunden');
  }
  return { movie };
}