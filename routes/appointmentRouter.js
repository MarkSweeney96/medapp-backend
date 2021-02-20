//import express router
const router = require("express").Router();
//import model
const Appointment = require("../models/appointmentModel");

//router endpoint configutations

// test router with test response
// router.get("/test", (req,res) => {
//   res.send("router test");
// });

//router for viewing all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch(err) {
    res.status(500).send();
  }
});

//router for creating a new appointment
router.post("/create", async (req,res) => {
  try {
    const {patient, doctor_nurse, date, time, symptoms, notes, status} = req.body;

    //validation
    if (!patient || !doctor_nurse || !date || !time || !status)
      // bad request response if any of the above fields are empty
      return res.status(400).json({msg: "Not all required fields have been entered!"});

    if (patient.length < 5)
      // bad request response if patient is not minimum 5 characters long
      return res.status(400).json({msg: "Patient must be at least 5 characters long"});

    if (doctor_nurse.length < 5)
      // bad request response if doctor_nurse is not minimum 5 characters long
      return res.status(400).json({msg: "Doctor/Nurse must be at least 5 characters long"});

    if (date.length !== 10)
      // bad request response if date is not 10 characters long
      return res.status(400).json({msg: "Date must be 10 characters long"});

    if (time.length !== 5)
      // bad request response if time is not 5 characters long
      return res.status(400).json({msg: "Time must be 5 characters long"});

    if (status.length < 7)
      // bad request response if status is not minimum 7 characters long
      return res.status(400).json({msg: "Status must be at least 7 characters long"});

    const newAppointment = new Appointment({
      patient, doctor_nurse, date, time, symptoms, notes, status
    });
    const savedAppointment = await newAppointment.save();
    res.json(savedAppointment);
  } catch (err) {
    res.status(500).send();
  }

});

//router for editing an appointment
router.put("/edit/:id", async (req, res) => {
  try {
    const {patient, doctor_nurse, date, time, symptoms, notes, status} = req.body;
    const appointmentId = req.params.id;

    //input validation
    if (!patient || !doctor_nurse || !date || !time || !status)
      // bad request response if any of the above fields are empty
      return res.status(400).json({msg: "Not all required fields have been entered!"});

    if (patient.length < 5)
      // bad request response if patient is not minimum 5 characters long
      return res.status(400).json({msg: "Patient must be at least 5 characters long"});

    if (doctor_nurse.length < 5)
      // bad request response if doctor_nurse is not minimum 5 characters long
      return res.status(400).json({msg: "Doctor/Nurse must be at least 5 characters long"});

    if (date.length !== 10)
      // bad request response if date is not 10 characters long
      return res.status(400).json({msg: "Date must be 10 characters long"});

    if (time.length !== 5)
      // bad request response if time is not 5 characters long
      return res.status(400).json({msg: "Time must be 5 characters long"});

    if (status.length < 7)
      // bad request response if status is not minimum 7 characters long
      return res.status(400).json({msg: "Status must be at least 7 characters long"});

  //ID validation
    if(!appointmentId)
      return res.status(400).json({msg: "Appointment ID not found"});

    const originalAppointment = await Appointment.findById(appointmentId);
    if(!originalAppointment)
      return res.status(400).json({msg: "Appointment with this ID does not exist"});

  // update values for each appointment detail
  originalAppointment.patient = patient;
  originalAppointment.doctor_nurse = doctor_nurse;
  originalAppointment.date = date;
  originalAppointment.time = time;
  originalAppointment.symptoms = symptoms;
  originalAppointment.notes = notes;
  originalAppointment.status = status;

  const savedAppointment = await originalAppointment.save();
  res.json(savedAppointment);

  } catch(err) {
    res.status(500).send();
  }

});

//router for deleting an appointment by its id
router.delete("/delete/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    //validation
    if(!appointmentId)
      return res.status(400).json({msg: "Appointment ID not found"});

    const existingAppointment = await Appointment.findById(appointmentId);
    if(!existingAppointment)
      return res.status(400).json({msg: "Appointment with this ID does not exist"});

    await existingAppointment.delete();

    res.json(existingAppointment);

  } catch(err) {
    res.status(500).send();
  }
});

module.exports = router;
