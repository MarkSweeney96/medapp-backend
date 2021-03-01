//import express router
const router = require("express").Router();
//import model
const Doctor = require("../models/doctorModel");

//router for creating a new doctor
router.post("/create", async (req,res) => {
  try {
    const {department, user} = req.body;

    const newDoctor = new Doctor({
      department, user
    });
    const savedDoctor = await newDoctor.save();
    res.json(savedDoctor);
  } catch (err) {
    res.status(500).send();
  }

});

module.exports = router;
