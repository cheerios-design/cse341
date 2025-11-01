const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 8080;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

let professionalCollection;

async function run() {
  try {
    await client.connect();
    const db = client.db("cse341");
    professionalCollection = db.collection("professional");
    console.log("Connected to MongoDB");

    // Optional: Seed the database if it's empty
    const count = await professionalCollection.countDocuments();
    if (count === 0) {
      await professionalCollection.insertOne({
        professionalName: "John Doe",
        base64Image: "", // Placeholder for base64 image
        nameLink: {
          firstName: "John",
          url: "#",
        },
        primaryDescription: "A passionate software developer.",
        workDescription1:
          "Experienced in building web applications with modern technologies.",
        workDescription2: "Skilled in both frontend and backend development.",
        linkTitleText: "Connect with me:",
        linkedInLink: {
          text: "LinkedIn",
          link: "https://www.linkedin.com/",
        },
        githubLink: {
          text: "GitHub",
          link: "https://github.com/",
        },
      });
    }

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run();

app.get("/professional", async (req, res) => {
  const data = await professionalCollection.findOne();
  res.json(data);
});
