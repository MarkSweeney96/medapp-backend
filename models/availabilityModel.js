const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new mongoose.Schema({
  staff: { type: Schema.Types.ObjectId, ref: 'user' },
  // day: { type: String, required: true, minlength: 5 },
  // day: { type: String, required: true, minlength: 5 },
  // day: { type: String, required: true, minlength: 5 },
});

module.exports = Availability = mongoose.model("availability", availabilitySchema);
