const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Contacts API",
    description: "Contacts API for CSE341",
  },
  host: "cse341-contacts-w01.onrender.com", // Replace with your actual Render URL
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
