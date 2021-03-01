//import express router
const router = require("express").Router();
//import model
const Prescription = require("../models/prescriptionModel");

//router endpoint configutations

// test router with test response
// router.get("/test", (req,res) => {
//   res.send("router test");
// });



//router for viewing all prescriptions
router.get("/", async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.json(prescriptions);
  } catch(err) {
    res.status(500).send();
  }
});

//router for creating a new prescription
router.post("/create", async (req,res) => {
  try {
    const {patient, doctor, date, time, medication, notes, complete} = req.body;


    const newPrescription = new Prescription({
      patient, doctor, date, time, medication, notes, complete
    });
    const savedPrescription = await newPrescription.save();
    res.json(savedPrescription);
  } catch (err) {
    res.status(500).send();
  }

});

//router for editing a prescription
router.put("/edit/:id", async (req, res) => {
  try {
    const {patient, doctor, date, time, medication, notes, complete} = req.body;
    const prescriptionId = req.params.id;

    const originalPrescription = await Prescription.findById(prescriptionId);
    if(!originalPrescription)
      return res.status(400).json({msg: "Prescription with this ID does not exist"});



  // update values for each prescription detail
  originalPrescription.patient = patient;
  originalPrescription.doctor = doctor;
  originalPrescription.date = date;
  originalPrescription.time = time;
  originalPrescription.medication = medication;
  originalPrescription.notes = notes;
  originalPrescription.complete = complete;

  const savedPrescription = await originalPrescription.save();
  res.json(savedPrescription);

  } catch(err) {
    res.status(500).send();
  }

});

//router for deleting a prescription by its id
router.delete("/delete/:id", async (req, res) => {
  try {
    const prescriptionId = req.params.id;

    //validation
    if(!prescriptionId)
      return res.status(400).json({msg: "Prescription ID not found"});

    const existingPrescription = await Prescription.findById(prescriptionId);
    if(!existingPrescription)
      return res.status(400).json({msg: "Prescription with this ID does not exist"});

    await existingPrescription.delete();

    res.json(existingPrescription);

  } catch(err) {
    res.status(500).send();
  }
});

module.exports = router;
