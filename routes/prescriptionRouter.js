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

//router for viewing one prescription
router.get("/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    res.json(prescription);
  } catch(err) {
    res.status(500).send();
  }
});

//router for creating a new prescription
router.post("/create", async (req,res) => {
  try {
    const {patient, doctor, date, time, medication, notes, complete} = req.body;

    //validation
    if (!patient || !doctor || !date || !time || !medication || !notes || !complete)
      // bad request response if any of the above fields are empty
      return res.status(400).json({msg: "Not all fields have been entered!"});

    if (patient.length < 5)
      // bad request response if patient is not minimum 5 characters long
      return res.status(400).json({msg: "Patient must be at least 5 characters long"});

    if (doctor.length < 5)
      // bad request response if doctor is not minimum 5 characters long
      return res.status(400).json({msg: "Doctor must be at least 5 characters long"});

    if (date.length !== 10)
      // bad request response if date is not 10 characters long
      return res.status(400).json({msg: "Date must be in the correct format: YYYY-MM-DD"});

    if (time.length !== 5)
      // bad request response if time is not 5 characters long
      return res.status(400).json({msg: "Time must be in the correct format: 24HR 00:00"});

    if (medication.length < 4)
      // bad request response if medication is not minimum 4 characters long
      return res.status(400).json({msg: "Medication must be at least 4 characters long"});

    if (notes.length < 10)
      // bad request response if notes is not minimum 10 characters long
      return res.status(400).json({msg: "Notes must be at least 10 characters long"});

      //THIS CODE CAUSED AN ERROR. FRONT END SUBMITS THIS VALUE AS "No" BY DEFAULT
    //if (complete !== "Yes" || complete !== "No")
      // bad request response if complete is not "yes" or "no"
      //return res.status(400).json({msg: "Complete must be filled in as 'Yes' or 'No' "});


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

//router for editing a prescription
router.put("/complete/:id", async (req, res) => {
  try {
    const {complete} = req.body;
    const prescriptionId = req.params.id;

    const originalPrescription = await Prescription.findById(prescriptionId);
    if(!originalPrescription)
      return res.status(400).json({msg: "Prescription with this ID does not exist"});

  // update values for each prescription detail
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
