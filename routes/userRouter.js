const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// test router with test response
// router.get("/test", (req, res) => {
//   res.send("it's working");
// });

// register router, post request with a request and response object
router.post("/register", async (req, res) => {

  try {
    // let errors = [];
    const {email, password, passwordCheck, name, address, phone} = req.body;

    // validation
    if (!email || !password || !passwordCheck || !name || !address || !phone)
      // bad request response if any of the above fields are empty
      return res.status(400).json({msg: "Not all fields have been entered!"});
      // errors.push({msg: "Not all fields have been entered!"});
      if (email.length < 7)
        // bad request response if email is not minimum 7 characters long
        return res.status(400).json({msg: "Email must be at least 7 characters long"});
          // errors.push({msg: "Not all fields have been entered!"});
    if (password.length < 5)
      // bad request response if password is not minimum 5 characters long
      return res.status(400).json({msg: "Password must be at least 5 characters long"});
    if(password !== passwordCheck)
      // bad request response if password does not match passwordCheck
      return res.status(400).json({msg: "Passwords entered do not match"});
    if (name.length < 5)
      // bad request response if name is not minimum 5 characters long
      return res.status(400).json({msg: "Name must be at least 5 characters long"});
    if (address.length < 10)
      // bad request response if address is not minimum 10 characters long
      return res.status(400).json({msg: "Address must be at least 10 characters long"});
    if (phone.length < 5)
      // bad request response if phone is not minimum 5 characters long
      return res.status(400).json({msg: "Phone must be at least 5 characters long"});

      // return res.status(400).json(errors);
    // if user with entered email already exists throw error and display error message
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res .status(400) .json({msg: "An account with this email already exists!"});

    //bcrypt used to hash users passwords to keep them securely stored in the database
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //creates new user to be saved in the mongodb database
    const newUser = new User({
      email,
      password: passwordHash,
      name,
      address,
      phone
    });

    //saves new user and outputs it as a response to the front end
    const savedUser = await newUser.save();
    res.json(savedUser);

    // if an error occurs when registering a new user the error message is displayed
  } catch (err) {
    res.status(500).json({error: err.message });
  }

});

// login router, post request with a request and response object
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password)
    // bad request response if email and password field is empty
    return res.status(400).json({msg: "Please enter both email and password to login"});

    // get user by email
    const user = await User.findOne({ email: email });
    // if user does not exist display error message
    if (!user)
      return res.status(400).json({msg: "An account with this email does not exist"});

    // checks to see if the password the user entered matches the hashed password stored in the mongodb database
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password the user entered doesn't match the hashed password
    // in the database tell the user the password is incorrect
    if (!isMatch)
      return res.status(400).json({msg: "Password is incorrect"});

    // json web token retrieve for the id of the currently logged in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // json response to display an auth token, id and name of currently logged in user
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      }
    })


  } catch (err) {
    res.status(500).json({error: err.message });
  }

});

// router to allow logged in users to delete their own account
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({error: err.message });
  }

});

//router to verify true or false response if token exists and is valid
//i.e. valid user is logged in
router.post("/tokenIsValid", async (req, res) => {
  try {
    //gets auth token from request
    const token = req.header("x-auth-token");
    //false responce if token is invalid
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //false responce if token is not verified by json web token secret
    if (!verified) return res.json(false);

    //verify user exists in the database
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);


  } catch (err) {
    res.status(500).json({error: err.message });
  }

});

// gets info for currently logged in user
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
});

module.exports = router;
