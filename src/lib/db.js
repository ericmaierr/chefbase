import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("chefbasedb");

function parseId(id) {
  return (ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id))
    ? new ObjectId(id)
    : id;
}

// Alle Rezepte bekommen
async function getRecipes() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    const query = {};

    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return rezepte;
}

// Alle empfohlenen Rezepte bekommen
async function getRecommended() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    const query = { recommended: true };

    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return rezepte;
}

// Alle gespeicherten Rezepte bekommen
async function getWatchlist() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    const query = { watchlist: true };

    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return rezepte;
}

// Rezept gemäss id bekommen
async function getRecipe(id) {
  let rezept = null;
  try {
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) };
    rezept = await collection.findOne(query);

    if (!rezept) {
      console.log("Kein Rezept mit id " + id);
    } else {
      rezept._id = rezept._id.toString();
    }
  } catch (error) {
    console.log(error.message);
  }
  return rezept;
}

// Rezept hinzufügen
async function createRecipe(rezept) {
  rezept.poster = "/images/placeholder.png";
  rezept.recommended = false;
  rezept.watchlist = true;
  try {
    const collection = db.collection("rezepte");
    const result = await collection.insertOne(rezept);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Rezept aktualisieren
async function updateRecipe(rezept) {
  try {
    let id = rezept._id;
    delete rezept._id;
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) };
    const result = await collection.updateOne(query, { $set: rezept });


    if (result.matchedCount === 0) {
      console.log("Kein Rezept mit id " + id);
    } else {
      console.log("Rezept mit id " + id + " wurde aktualisiert.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Rezept gemäss id löschen
async function deleteRecipe(id) {
  try {
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Rezept mit id " + id);
    } else {
      console.log("Rezept mit id " + id + " wurde erfolgreich gelöscht.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Zutat hinzufügen
export async function createIngredient(name) {
  const col = db.collection("zutaten");
  const existing = await col.findOne({
    name: { $regex: `^${name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, $options: "i" }
  });
  if (existing) {
    return existing._id.toString();
  }
  const result = await col.insertOne({ name });
  return result.insertedId.toString();
}

// Rezeptzutat hinzufügen
export async function createRecipeIngredient({ rezept_id, ingredient_id, quantity, unit }) {
  const col = db.collection("rezeptzutaten");
  await col.insertOne({ rezept_id, ingredient_id, quantity, unit });
}

// Rezeptzutaten bekommen
export async function getRecipeIngredients(rezeptId) {
  const col = db.collection("rezeptzutaten");
  const entries = await col.find({ rezept_id: rezeptId }).toArray();
  return entries.map(e => ({
    ingredient_id: e.ingredient_id,
    quantity: e.quantity,
    unit: e.unit
  }));
}

// Zutat bekommen
export async function getIngredient(id) {
  const col = db.collection("zutaten");
  const doc = await col.findOne({ _id: parseId(id) });
  return doc ? { id: doc._id.toString(), name: doc.name } : null;
}

export default {
  getRecipes,
  getRecommended,
  getWatchlist,
  getRecipe,
  getIngredient,
  getRecipeIngredients,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  createIngredient,
  createRecipeIngredient,
};
