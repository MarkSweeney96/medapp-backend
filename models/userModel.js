const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, minlength: 7, unique: true },
  password: { type: String, required: true, minlength: 5 },
  name: { type: String, required: true, minlength: 5 },
  address: { type: String, required: true, minlength: 10 },
  phone: { type: String, required: true, minlength: 5 },
  //availability: [{ type: Schema.Types.ObjectId, ref: 'availability' }],
});

module.exports = User = mongoose.model("user", userSchema);
