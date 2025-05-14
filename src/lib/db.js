import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("chefbasedb"); // select database

//////////////////////////////////////////
// Rezepte
//////////////////////////////////////////

// Get all Rezepte
async function getRezepte() {
  let rezepte = [];
  try {
    const collection = db.collection("rezepte");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    rezepte = await collection.find(query).toArray();
    rezept.forEach((rezept) => {
      rezept._id = rezept._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return rezepte;
}

// Get Rezept by id
async function getRezept(id) {
  let rezept = null;
  try {
    const collection = db.collection("rezepte");
    const query = { _id: new ObjectId(id) }; // filter by id
    rezept = await collection.findOne(query);

    if (!rezept) {
      console.log("Kein Rezept gefunden mit id " + id);
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

// create Rezept
// Example Rezept object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createRezept(rezept) {
  rezept.poster = "/images/placeholder.jpg"; // default poster
  rezept.actors = [];
  rezept.watchlist = false;
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

// update Rezept
// Example Rezept object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated Rezept or null, if Rezept could not be updated
async function updateRezept(rezept) {
  try {
    let id = rezept._id;
    delete rezept._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("rezepte");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: rezept });

    if (result.matchedCount === 0) {
      console.log("Kein Rezept gefunden mit id " + id);
      // TODO: errorhandling
    } else {
      console.log("Rezept mit id " + id + " wurde geändert.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete Rezept by id
// returns: id of the deleted Rezept or null, if Rezept could not be deleted
async function deleteRezept(id) {
  try {
    const collection = db.collection("rezepte");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("Kein Rezept gefunden mit id " + id);
    } else {
      console.log("Rezept mit id " + id + " wurde gelöscht.");
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
  getRezepte,
  getRezept,
  createRezept,
  updateRezept,
  deleteRezept,
};
