const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {type: String, required: true},
  doctor_nurse: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  symptoms: {type: String},
  notes: {type: String},
  status: {type: String, required: true}
}, {
  timestamps: true
});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
