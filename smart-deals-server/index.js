const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const app = express();
const admin = require("firebase-admin");
const port = process.env.PORT || 3000;

const serviceAccount = require("./smart-deals-firebase-admin-key.json");
const { UserInfo } = require("firebase-admin/auth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middleware
app.use(cors());
app.use(express.json());

// Logger Middleware
const logger = (res, req, next) => {
  console.log("Logging Info");
  next();
};

//
const verifyFireBaseToken = async (req, res, next) => {
  // console.log("In the Verify :", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "unAuthorization access",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      message: "unAuthorization Access",
    });
  }
  try {
    const userInfo = await admin.auth().verifyIdToken(token);
    req.token_email = userInfo.email;
    // console.log("after token vslidation", userInfo);
    next();
  } catch {
    return res.status(401).send({
      message: "unAuthorization Access",
    });
  }
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yaijel2.mongodb.net/?appName=Cluster0`;

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

    // jwt related apis
    app.post("/getToken", (req, res) => {
      const loggedUser = req.body;
      const token = jwt.sign(loggedUser, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    });

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

    // Get => find ID single product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      // const query = { _id: new ObjectId(id) };
      // const result = await productCollection.findOne(query);
      const result = await productCollection.findOne({ _id: id });
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

    // bids related apis >
    // get by email

    app.get("/bids", logger, verifyFireBaseToken, async (req, res) => {
      // console.log("header", req.headers)
      const email = req.query.email;
      const query = {};
      if (email) {
        if (email !== req.token_email) {
          return res.status(403).send({
            message: "forbidden Access",
          });
        }
        query.buyer_email = email;
      }

      const cursor = bidsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // bids single product get by id
    app.get("/products/bids/:_id", verifyFireBaseToken, async (req, res) => {
      const _id = req.params._id;
      const query = { product: _id };
      const cursor = bidsCollection.find(query).sort({ bid_price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    //
    // app.get('/bids', async(req,res) =>{
    //   const cursor = bidsCollection.find();
    //   const result = await cursor.toArray();
    //   res.send(result)
    // })

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
