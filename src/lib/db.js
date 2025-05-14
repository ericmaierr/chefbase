import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("chefbasedb"); // select database

//////////////////////////////////////////
// Rezept
//////////////////////////////////////////

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

// Rezept gemäss id bekommen
async function getRecipe(id) {
  let rezept = null;
  try {
    const collection = db.collection("rezepte");
    const query = { _id: new ObjectId(id) }; // filter by id
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
  rezept.poster = "/images/placeholder.jpg"; // default poster
  rezept.length = [];
  rezept.recommended = false;
  rezept.watchlist = true;
  rezept.instructions = [];
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
    const query = { _id: new ObjectId(id) }; // filter by id
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
    const query = { _id: new ObjectId(id) }; // filter by id
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

// export all functions so that they can be used in other files
export default {
  getRecipes,
  getRecommended,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
