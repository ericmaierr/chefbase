import db from '$lib/db.js';

export const actions = {
create: async ({ request }) => {
    const data = await request.formData();
    let rezept = {
name: data.get("name"),
length: data.get("length"),
    }
    await db.createRezept(rezept);
    return { success: true }
}
}