const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const prot = process.env.PORT || 5000;

const origin = ["http://localhost:5173", "https://https://prodify-x.web.app"];
//Middlewares
app.use(
  cors({
    origin: origin,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rnw6wso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("Prodify");
const products_collection = database.collection("Prodify_Product");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // products related API's
    // get all products
    app.get("/products", async (req, res) => {
      const result = await products_collection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Prodify server is running...");
});

app.listen(prot, () => {
  console.log(`Prodify server is running in port ${prot}`);
});
