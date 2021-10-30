const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

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
    const orderCollection = database.collection("orders");

    // GET API
    app.get("/services", async (req, res) => {
      console.log("get api is working");
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/booking", async (req, res) => {
      console.log("Order get api is working");
      const cursor = orderCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    // POST API
    app.post("/services", async (req, res) => {
      console.log("Lets do post", req.body);
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      res.json(result);
    });

    // Booking new item
    app.post("/booking", async (req, res) => {
      console.log("booking a new item", req.body);
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json("lets try");
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
