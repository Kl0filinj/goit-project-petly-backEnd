const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

require("dotenv").config();

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  const client = new MongoClient(process.env.DB_HOST);
  // console.log(client);

  async function run() {
    try {
      const database = client.db('db-testDB');
      const noticesCollection = database.collection('notices');

      const result = await noticesCollection.createIndex({ title: "text" });
      console.log(`Index created: ${result}`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch();
  //   console.log(process.env.DB_HOST);
  return mongoose.connect(process.env.DB_HOST);
};

module.exports = connectMongo;
