const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.port || 5000;

// MidlleWare
app.use(cors());
app.use(express.json());

// Connecting with Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v0zz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    // Creating DB
    const database = client.db("tourism_db");
    const servicesCollection = database.collection("tourism_services");

    // GET API
    app.get("/services", async (req, res) => {
      console.log("get api is working");
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log("its working");
  res.send("Bismillahir Rahmanir Rahim. Alhamdulillah! I started!");
});

app.listen(port, () => {
  console.log("The app is running in port: ", port);
});