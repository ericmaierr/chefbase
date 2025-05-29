import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("chefbasedb"); // select database

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

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return rezepte;
}

// Alle empfohlenen Rezepte bekommen
async function getRecommended() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = { recommended: true };

    // Get all objects that match the query
    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return rezepte;
}

// Alle gespeicherten Rezepte bekommen
async function getWatchlist() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = { watchlist: true };

    // Get all objects that match the query
    rezepte = await collection.find(query).toArray();
    rezepte.forEach((rezept) => {
      rezept._id = rezept._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return rezepte;
}

// Rezept gemäss id bekommen
async function getRecipe(id) {
  let rezept = null;
  try {
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) }; // filter by id
    rezept = await collection.findOne(query);

    if (!rezept) {
      console.log("Kein Rezept mit id " + id);
      // TODO: errorhandling
    } else {
      rezept._id = rezept._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return rezept;
}

// Rezept hinzufügen
async function createRecipe(rezept) {
  rezept.poster = "/images/placeholder.png"; // default poster
  rezept.recommended = false;
  rezept.watchlist = true;
  try {
    const collection = db.collection("rezepte");
    const result = await collection.insertOne(rezept);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// Rezept aktualisieren


// returns: id of the updated recipe or null, if recipe could not be updated
async function updateRecipe(rezept) {
  try {
    let id = rezept._id;
    delete rezept._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: rezept });

  
    if (result.matchedCount === 0) {
      console.log("Kein Rezept mit id " + id);
      // TODO: errorhandling
    } else {
      console.log("Rezept mit id " + id + " wurde aktualisiert.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// Rezept gemäss id löschen
// returns: id of the deleted recipe or null, if recipe could not be deleted
async function deleteRecipe(id) {
  try {
    const collection = db.collection("rezepte");
    const query = { _id: parseId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Rezept mit id " + id);
    } else {
      console.log("Rezept mit id " + id + " wurde erfolgreich gelöscht.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

export async function createIngredient(name) {
  const col = db.collection("zutaten");
  // Suche case-insensitive
  const existing = await col.findOne({
    name: { $regex: `^${name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}$`, $options: "i" }
  });
  if (existing) {
    return existing._id.toString();
  }
  // Neu anlegen
  const result = await col.insertOne({ name });
  return result.insertedId.toString();
}

export async function createRecipeIngredient({ rezept_id, ingredient_id, quantity, unit }) {
  const col = db.collection("rezeptzutaten");
  await col.insertOne({ rezept_id, ingredient_id, quantity, unit });
}

export async function getRecipeIngredients(rezeptId) {
  const col = db.collection("rezeptzutaten");
  const entries = await col.find({ rezept_id: rezeptId }).toArray();
  return entries.map(e => ({
    // wir brauchen nur Menge, Einheit und die Zutat‐ID weiter unten
    ingredient_id: e.ingredient_id,
    quantity: e.quantity,
    unit: e.unit
  }));
}

export async function getIngredient(id) {
  const col = db.collection("zutaten");
  const doc = await col.findOne({ _id: parseId(id) });
  return doc ? { id: doc._id.toString(), name: doc.name } : null;
}

// export all functions so that they can be used in other files
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
