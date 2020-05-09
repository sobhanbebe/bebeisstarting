const express = require("express");
const router = express.Router();
const models = require("../../models");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
      const allSliders = await models.Slider.find({});
      res.status(200).json(allSliders);
    } catch (error) {
      res.status(500).json({ CODE: 1021 });
    }
  });
  
  router.get("/:sliderId", async (req, res) => {
    const sliderId = req.params.sliderId;
    console.log(sliderId.length);
    //TODO Validate object id
    try {
      mongoose.Types.ObjectId.isValid(sliderId);
      const sliderId = await models.Slider.findById(sliderId);
      res.status(200).json({CODE:1212});
    } catch (error) {
      console.log({ error });
      res.status(500).json({ CODE: 1020 });
    }
  });
  
  // add a new slider              /slider POST {BODY}
  router.post("/", async (req, res) => {
    const {image} = req.body;
    if ((!image)) return res.status(400).json({ CODE: 1021 });
    //TODO : check url is our server
    try {
      const postedImg= await models.Slider({image}).save();
      console.log(postedImg);
      
      res.status(201).json({ CODE: 2012 });
    } catch (error) {
      res.status(500).json({ CODE: 1010 });
    }
  });
  
  //update slider by id            /slider/:sliderId  {body}
  router.put("/:sliderId", async (req, res) => {
    const sliderId = req.params.sliderId;
    try {
      const { fieldChange, newValue } = req.body;
      const update = {};
      update[fieldChange] = newValue;
      await models.Slider.findByIdAndUpdate(sliderId, update);
      res.status(200).json({ CODE: 2052 });
    } catch (error) {
      res.status(500).json({ CODE: 1012 });
    }
  });
  
  //delete a slider by id          /slider/:sliderId
  router.delete("/:sliderId", async (req, res) => {
    const sliderId = req.params.sliderId;
    try {
      mongoose.Types.ObjectId.isValid(sliderId);
      await models.Slider.findByIdAndDelete(sliderId);
      res.status(204).json({ CODE: 2525 });
    } catch (error) {
      res.status(204).json({ CODE: 2424 });
    }
  });
  
  module.exports = router;