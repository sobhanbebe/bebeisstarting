const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const swaggerUi = require("swagger-ui-express");
const { adminRoutes, userRoutes } = require("./routes");

//TODO connect to mongodb

mongoose
  .connect(
    "mongodb+srv://admin:sobhanbebe@cluster0-wegfy.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true  }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// mongodb+srv://root:<password>@cluster0-fyrf6.mongodb.net/test?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://root:Mehrad1234!@cluster0-fyrf6.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
// mongoose.connect(
//   "mongodb://localhost:27017/node-blog",
//   { useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log("Some problem with the connection " + err);
//     } else {
//       console.log("The Mongoose connection is ready");
//     }
//   }
// );

//Express Config
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/admin/product", adminRoutes.product);
app.use("/api/v1/admin/upload", adminRoutes.uploadImage);
app.use("/api/v1/admin/category", adminRoutes.category);
app.use("/api/v1/admin/banner", adminRoutes.banner);
app.use("/api/v1/admin/slider", adminRoutes.slider);

app.use("/api/v1/slider", userRoutes.slider);
app.use("/api/v1/category", userRoutes.category);
app.use("/api/v1/banner", userRoutes.banner);
app.use("/api/v1/product", userRoutes.product);
app.use("/api/v1/login", userRoutes.login);
app.use("/api/v1/signup", userRoutes.signup);
app.use("/api/v1/cart", userRoutes.cart);


// CORS Settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//404 Error
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404).json("Not found");
});

module.exports = app;
