const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //gets auth token from request
    const token = req.header("x-auth-token");
    // if no token was given
    if (!token)
    // return 401 unauthorized status as response with error message
    return res.status(401).json({ msg: "No authorization token, authorization denied!" });

    //verifies the token and checks if JWT_SECRET is correct
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res.status(401).json({ msg: "Token verification failed, authorization denied!" });

    //get id from verified object get user id
    req.user = verified.id;
    next();


  } catch (err) {
    res.status(500).json({error: err.message });
  }

};
//exports this file as middleware called 'auth'
module.exports = auth;
