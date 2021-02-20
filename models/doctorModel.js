const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  department: { type: String, required: true},
  user: { type: Schema.Types.ObjectId, required: true },
   author: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = Doctor = mongoose.model("doctor", doctorSchema);
