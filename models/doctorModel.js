const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  department: { type: String, required: true, minlength: 5 }
});

module.exports = Doctor = mongoose.model("doctor", doctorSchema);
