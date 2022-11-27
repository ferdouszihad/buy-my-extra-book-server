const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
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

    app.post("/addUser", async (req, res) => {
      const user = req.body;
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

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.find(query).toArray();
      res.send(result[0]);
    });

    // loading Catagory
    app.get("/catagories", async (req, res) => {
      const query = {};
      const result = await catagories.find(query).toArray();
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
