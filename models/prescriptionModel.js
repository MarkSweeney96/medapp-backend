const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new mongoose.Schema({

  patient: {type: String, required: true},
  doctor: {type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  medication: {type: String, required: true},
  notes: {type: String, required: true},
  complete: {type: String, required: true}
},{
    timestamps: true
  });

module.exports = Prescription = mongoose.model("prescription", prescriptionSchema);
