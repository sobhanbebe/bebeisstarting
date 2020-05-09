const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {adminRoutes} = require('./routes')



//TODO connect to mongodb

mongoose.connect('mongodb://localhost/perni')
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB...',err));
//Express Config 
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.use('/product' ,adminRoutes.product)
app.use('/upload' ,adminRoutes.uploadImage)
app.use('/category' ,adminRoutes.category)
app.use('/banner' ,adminRoutes.banner)
app.use('/slider' ,adminRoutes.slider)

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

