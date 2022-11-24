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
const testData = {
  name: "rakib",
  age: 20,
};
async function run() {
  try {
    const productCollection = client
      .db("Buy-my-book")
      .collection("productsCollection");
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productCollection.find(query).toArray();
      res.send(products);
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
