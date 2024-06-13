const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://eliteestate-solutions.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Verify Token Middleware

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s1tjtzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const propertyCollection = client
      .db("eliteEstateSolutions")
      .collection("property");
    const usersCollection = client
      .db("eliteEstateSolutions")
      .collection("users");
    const wishlistsCollection = client
      .db("eliteEstateSolutions")
      .collection("wishlist");
    const offersCollection = client
      .db("eliteEstateSolutions")
      .collection("offer");
    const reviewsCollection = client
      .db("eliteEstateSolutions")
      .collection("reviews");

    //JWT :

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      res.send({ token });
    });

    //Middleware:
    const verifyToken = (req, res, next) => {
      // console.log(req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Forbidden Access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Forbidden Access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const verifyAgent = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role == "agent";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role == "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // create-payment-intent
    app.post("/create-payment-intent", async (req, res) => {
      const price = req.body.price;
      const priceInCent = parseFloat(price) * 100;
      if (!price || priceInCent < 1) return;
      // generate clientSecret
      const { client_secret } = await stripe.paymentIntents.create({
        amount: priceInCent,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
      // send client secret as response
      res.send({ clientSecret: client_secret });
    });

    //Users:
    //get all users :
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //save user :
    app.put("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "user already in db" });
      } else {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      }
    });

    //find individual user
    //
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    //delete a user:
    app.delete(
      "/users/delete/:id",

      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.deleteOne(query);
        res.send(result);
      }
    );

    //update user role
    app.patch(
      "/users/update/:email",

      async (req, res) => {
        const email = req.params.email;
        const user = req.body;
        const query = { email };
        const updatedDoc = {
          $set: {
            ...user,
          },
        };
        const result = await usersCollection.updateOne(query, updatedDoc);
        res.send(result);
      }
    );

    //Properties:

    //add property
    app.post("/properties", async (req, res) => {
      const property = req.body;
      const result = await propertyCollection.insertOne(property);
      res.send(result);
    });

    //get all property with sorted and searched value
    app.get("/properties", async (req, res) => {
      const search = req.query.search || "";
      const minPrice = parseInt(req.query.minPrice) || 0;
      const maxPrice = parseInt(req.query.maxPrice) || Infinity;
      let query = {
        propertyLocation: { $regex: search, $options: "i" },
        minPrice: { $gte: minPrice, $lte: maxPrice },
      };
      let options = {};
      const result = await propertyCollection.find(query, options).toArray();
      res.send(result);
    });

    //get single property data
    app.get("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertyCollection.findOne(query);
      res.send(result);
    });
    //get all property by agent:
    app.get(
      "/my-listings/:email",

      async (req, res) => {
        const email = req.params.email;
        let query = { "agentInfo.agent_email": email };
        const result = await propertyCollection.find(query).toArray();
        res.send(result);
      }
    );

    //get verified properties only:
    app.get("/property/verified", async (req, res) => {
      const query = { verification_status: "verified" };
      const result = await propertyCollection.find(query).toArray();
      res.send(result);
    });

    //get advertisement properties
    app.get("/advertisement", async (req, res) => {
      const query = { advertisement: "yes" };
      const result = await propertyCollection.find(query).toArray();
      res.send(result);
    });

    
    //update a property :
    app.patch("/properties/:id", async (req, res) => {
      const property = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedProperty = {
        $set: {
          ...property,
        },
      };
      const result = await propertyCollection.updateOne(query, updatedProperty);
      res.send(result);
    });

    //update a property status:
    app.patch(
      "/properties/update/:id",

      async (req, res) => {
        const id = req.params.id;
        const verify = req.body;
        const query = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            ...verify,
          },
        };
        const result = await propertyCollection.updateOne(query, updatedDoc);
        res.send(result);
      }
    );
    //delete a property
    app.delete(
      "/properties/:id",

      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await propertyCollection.deleteOne(query);
        res.send(result);
      }
    );

    //delete Fraud Agent properties:
    app.delete(
      "/properties/fraud/:email",

      async (req, res) => {
        const email = req.params.email;
        const query = { "agentInfo.agent_email": email };
        const result = await propertyCollection.deleteMany(query);
        res.send(result);
      }
    );

    //wishlist:
    app.post("/wishlist", async (req, res) => {
      const property = req.body;
      const query = {
        buyer_email: property?.buyer_email,
        propertyTitle: property?.propertyTitle,
      };
      const isExist = await wishlistsCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "already added in wishlist" });
      }
      const result = await wishlistsCollection.insertOne(property);
      res.send(result);
    });
    //get specific wishlist :
    app.get("/wishlists/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistsCollection.findOne(query);
      res.send(result);
    });

    //delete a specific wishlist
    app.delete("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistsCollection.deleteOne(query);
      res.send(result);
    });

    //get wishlist by individual users
    app.get("/wishlist/:email", async (req, res) => {
      const email = req.params.email;
      const query = { buyer_email: email };
      const result = await wishlistsCollection.find(query).toArray();
      res.send(result);
    });

    //Offer:
    //post a offer collection:
    app.post("/offers", async (req, res) => {
      const offer = req.body;
      const query = {
        propertyTitle: offer.propertyTitle,
        agent_email: offer.agent_email,
        buyerEmail: offer.buyerEmail,
      };
      const isExist = await offersCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "already added in wishlist" });
      }
      const result = await offersCollection.insertOne(offer);
      res.send(result);
    });

    //get individual offered properties:
    app.get("/offer/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await offersCollection.findOne(query);
      res.send(result);
    });

    //get individual offer by a buyer:
    app.get("/offers/:email", async (req, res) => {
      const email = req.params.email;
      const query = { buyerEmail: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });

    //get all offers of an agent:
    app.get("/offers/request/:email", async (req, res) => {
      const email = req.params.email;
      const query = { agent_email: email };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });

    //update offer for accepting status:
    app.patch("/offers/update/:id", async (req, res) => {
      //update one
      const id = req.params.id;
      const verify = req.body;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...verify,
        },
      };
      const result = await offersCollection.updateOne(query, updatedDoc);

      //update many:
      const offer = await offersCollection.findOne({ _id: new ObjectId(id) });
      const propertyTitle = offer.propertyTitle;
      await offersCollection.updateMany(
        { propertyTitle, _id: { $ne: new ObjectId(id) } },
        { $set: { status: "rejected" } }
      );
      res.send(result);
    });

    //update offer for rejecting status:
    app.patch("/offers/update/reject/:id", async (req, res) => {
      //update one
      const id = req.params.id;
      const verify = req.body;
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...verify,
        },
      };
      const result = await offersCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    //update offer for sold:
    app.put("/offers/sold/:id", async (req, res) => {
      //update one
      const id = req.params.id;
      const verify = req.body;
      const options = { upsert: true };
      const query = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...verify,
        },
      };
      const result = await offersCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    //get sold properties of individual agents:
    app.get("/offers/sold/:email", async (req, res) => {
      const email = req.params.email;
      const query = { agent_email: email, status: "bought" };
      const result = await offersCollection.find(query).toArray();
      res.send(result);
    });

    //Review:
    //post a review:
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const query = {
        property_title: review.property_title,
        reviewer_email: review.reviewer_email,
      };
      const isExist = await reviewsCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "already added in review list" });
      }

      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    //get all reviews:
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    //get latest reviews:
    app.get("/reviews/latest", async (req, res) => {
      const result = await reviewsCollection
        .find()
        .sort({ review_time: -1 })
        .limit(4)
        .toArray();
      res.send(result);
    });

    //get reviews for a user:
    app.get("/reviews/:email", async (req, res) => {
      const email = req.params.email;
      const query = {
        reviewer_email: email,
      };
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    //get reviews by individual property
    app.get("/review", async (req, res) => {
      const { property_title } = req.query;
      const result = await reviewsCollection.find({ property_title }).toArray();
      res.send(result);
    });

    //delete a review:
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Elite Estate Solutions..");
});

app.listen(port, () => {
  console.log(`Elite Estate Solutions is running on port ${port}`);
});
