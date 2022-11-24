const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Ferdous! Dashing Handsome Guy 😎");
});

app.get("/about", (req, res) => {
  res.send("Zihad Dashing Handsome Guy 😎. Shob meye tar jonne pagol");
});

app.get("/profession", (req, res) => {
  res.send("Ferdous Zihad is a Professional Lover 😎😍");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// // userName : adminDB
// // pass : fTHTcrpRTW7E1XdH

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kxkmed0.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     const serviceCollection = client
//       .db("tiffin-Bhai-Db")
//       .collection("services");

//     const reviewCollection = client.db("tiffin-Bhai-Db").collection("reviews");

//     app.get("/3services", async (req, res) => {
//       const query = {};
//       const cursor = serviceCollection.find(query).sort({ _id: -1 }).limit(3);
//       const services = await cursor.toArray();
//       res.send(services);
//     });
//     app.get("/services", async (req, res) => {
//       const query = {};
//       const cursor = serviceCollection.find(query);
//       const services = await cursor.toArray();
//       res.send(services);
//     });

//     app.post("/addService", async (req, res) => {
//       const service = req.body;
//       const result = await serviceCollection.insertOne(service);
//       res.send(result);
//     });

//     app.post("/addReview", async (req, res) => {
//       const review = req.body;
//       const result = await reviewCollection.insertOne(review);
//       res.send(result);
//     });

//     app.delete("/review/:rid", async (req, res) => {
//       const id = req.params.rid;
//       const query = { _id: ObjectId(id) };
//       const result = await reviewCollection.deleteOne(query);
//       res.send(result);
//     });

//     app.get("/services/:sId", async (req, res) => {
//       const id = req.params.sId;
//       const query1 = { _id: ObjectId(id) };
//       const query2 = { serviceId: id };
//       const cursor1 = serviceCollection.findOne(query1);
//       const service = await cursor1;
//       const cursor2 = reviewCollection.find(query2);
//       const reviews = await cursor2.toArray();
//       res.send({ service, reviews });
//     });

//     app.get("/user-review/:uId", async (req, res) => {
//       const id = req.params.uId;
//       const query = { userId: id };
//       const cursor = reviewCollection.find(query);
//       const reviews = await cursor.toArray();
//       res.send(reviews);
//     });
//   } finally {
//   }
// }
// run().catch((err) => {
//   console.log("error");
// });
