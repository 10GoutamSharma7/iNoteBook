const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'JWT_SECRETisthejwtwebtoken';
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// ROUTE:1 - Create a User using: POST "/api/auth/createuser" , No login required
router.post(
  '/createuser',
  [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const error = validationResult(req);
    let success = false;
    if (!error.isEmpty()) {
      return res.status(400).json({ success, errors: error.array()});
    }

    //Check whether the user with this email already exists
    try{
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({success, error: "Sorry user already exists"})
      }

      //Creating a secure password by adding salt and internal hashing for the user by bcryptjs
      const salt = bcrypt.genSaltSync(10);
      const secpass = bcrypt.hashSync(req.body.password, salt);

      //Creating a new User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      }); 

      //Creating token for Authentication and Verification of user
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
    }

    catch (error){
      console.error(error.message);
      res.status(500).send("!!!!!!!!!!!----Some Error Occurred----!!!!!!!!!!!")
    }
  }
);


// ROUTE:2 - Authenticate a User using: POST "/api/auth/login"
router.post(
  '/login',
  [
  body('email', 'Enter a Valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array()});
    }

    const {email, password} = req.body;
    let success = false;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({success, error: "Please Login with correct Credentials"});
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({success, error: "Please Login with correct Credentials"});
      }
      //Creating token for Authentication and Verification of user
      const data = {
        user:{
          id: user.id
        }
      }
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success, authtoken});
    }

    catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error !!")
    }
  }
);


// ROUTE:3 - Get/Fetch LoggedIn user details using: POST "/api/auth/getuser" Login Required
router.post(
  '/getuser',
  fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    }
    catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error !!")
    }
  }
);



module.exports = router;
