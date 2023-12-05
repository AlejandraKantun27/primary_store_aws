require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/authentication.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/promotionalproducts.routes")(app);
require("./app/routes/purchases.routes")(app);
require("./app/routes/users.routes")(app);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
