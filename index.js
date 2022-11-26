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

    app.get("/user", async (req, res) => {
      const query = { email: "f.zihad333@gmail.com" };
      const result = await userCollection.find(query).toArray();
      if (result) res.send(true);
      else res.send(false);
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
