const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kxkmed0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client
      .db("Buy-my-book")
      .collection("userCollection");
    const catagories = client.db("Buy-my-book").collection("catagories");
    const products = client.db("Buy-my-book").collection("products");
    const orders = client.db("Buy-my-book").collection("orders");

    app.post("/addProduct", async (req, res) => {
      const product = req.body;
      const result = await products.insertOne(product);
      res.send(result);
    });
    app.post("/makeOrder", async (req, res) => {
      const order = req.body;
      const result = await orders.insertOne(order);
      res.send(result);
    });

    app.post("/addUser", async (req, res) => {
      const user = req.body;
      user.role === "seller" ? (user.isSeller = true) : (user.isSeller = false);
      user.role === "admin" ? (user.isAdmin = true) : (user.isAdmin = false);
      user.role === "buyer" ? (user.isBuyer = true) : (user.isBuyer = false);
      const query = { email: user.email };
      const data = await userCollection.find(query).toArray();

      if (data.length === 0) {
        const result = await userCollection.insertOne(user);
        res.send(result);
        console.log(result);
      } else {
        res.send("User Allready added");
        console.log("User Allready added");
      }
    });

    // get admin role
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

    // get seller role
    app.get("/users/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ isSeller: user?.role === "seller" });
    });
    // get buyer role
    app.get("/users/buyer/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send({ isBuyer: user?.role === "buyer" });
    });

    // loading Catagory
    app.get("/catagories", async (req, res) => {
      const query = {};
      const result = await catagories.find(query).toArray();
      res.send(result);
    });

    app.get("/all-seller", async (req, res) => {
      const query = { role: "seller" };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/all-buyer", async (req, res) => {
      const query = { role: "buyer" };
      const result = await userCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/advertiseItems", async (req, res) => {
      const query = { isAdv: true };
      const result = await products.find(query).toArray();
      res.send(result);
    });

    app.get("/catagories/:cid", async (req, res) => {
      const cid = req.params.cid;
      const query1 = { catagory: cid, status: "none" };
      const query2 = { id: cid };

      const catagoryInfo = await catagories.findOne(query2);
      const catagoryProducts = await products.find(query1).toArray();
      res.send({ catagoryInfo, catagoryProducts });
    });

    app.get("/seller-products/:email", async (req, res) => {
      const email = req.params.email;
      const query = { sellerEmail: email };
      const result = await products.find(query).toArray();
      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await products.deleteOne(query);
      res.send(result);
    });

    app.delete("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/myBookings/:email", async (req, res) => {
      const email = req.params.email;
      const query = { BuyerEmail: email };
      const result = await orders.find(query).toArray();
      res.send(result);
    });

    app.put("/product/MakeAd/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          isAdv: true,
        },
      };
      const result = await products.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    app.put("/bookPurchase/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          isAdv: false,
          status: "sold",
        },
      };
      const result = await products.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => {
  console.log("error");
});

app.get("/", (req, res) => {
  res.send("Hello Ferdous! Dashing Handsome Guy 😎");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
