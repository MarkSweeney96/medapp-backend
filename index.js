const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//setup express
const app = express();
app.use(express.json());
app.use(cors());

//used when hosting on a remote server to find appropiate port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

//setup mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

// setup routes as middleware

//user router for userRouter middleware
app.use("/users", require("./routes/userRouter"));

// appointment router for appointmentRouter middleware
app.use("/appointments", require("./routes/appointmentRouter"))
