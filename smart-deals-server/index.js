const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://smartDeals:pTVr78OqIFOeDLSV@cluster0.yaijel2.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Smart server is Running..");
});

//  MongoDB Pinged
async function run() {
  try {
    await client.connect();

    const db = client.db("smart_db");
    const productCollection = db.collection("products");
    const bidsCollection = db.collection("bids"); // create BIDS and catch It's

    // Get => Find all Products
    app.get("/products", async (req, res) => {
      //     const projectFields = {title: 1, price_min: 1, seller_contact: 1}
      //   const cursor = productCollection.find().sort({price_min: 1}).skip(2).limit(5).project(projectFields);
      console.log(req.query);
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }

      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Latest Products
    app.get("/latest-products", async (req, res) => {
      const cursor = productCollection.find().sort({ created_at: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Get => find a single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) };
      // const result = await productCollection.findOne(query);
      const result = await productCollection.findOne({_id: id});
      res.send(result);
    });

    // Post => create products
    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    // Update Products
    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const updateProducts = req.body;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: {
          name: updateProducts.name,
          price: updateProducts.price,
        },
      };
      const result = await productCollection.updateOne(query, update);
      res.send(result);
    });

    // Delete Product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // bids related apis > get by email
    app.get("/bids", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //
    app.get("/products/bids/:_id", async(req,res) =>{
      const _id = req.params._id;
      const query = {product: _id};
      const cursor = bidsCollection.find(query).sort({bid_price: -1})
      const result = await cursor.toArray()
      res.send(result) 
    })

    // create bids by POST
    app.post("/bids", async (req, res) => {
      const newBid = req.body;
      const result = await bidsCollection.insertOne(newBid);
      res.send(result);
    });

    // delete bids
    app.delete("/bids/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bidsCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
