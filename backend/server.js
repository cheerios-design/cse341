const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const professionalData = {
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
};

app.get("/professional", (req, res) => {
  res.json(professionalData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
