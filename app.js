var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//routers
const api = process.env.API_URL;

const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

//Middlewar
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// http://localhost:3000/api/v1/products

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000;

// server
app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
