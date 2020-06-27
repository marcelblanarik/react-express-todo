const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
// register user
router.post("/register", async (req, res) => {
  // validate the user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  if (error)
    return res.status(400).json({
      error: error.details[0].message,
    });
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist)
    return res.status(400).json({
      error: "Email already exists",
    });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });
  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// login route
router.post("/login", async (req, res) => {
  // validate the user
  const { error } = loginValidation(req.body);
  // throw validation errors
  if (error)
    return res.status(400).json({
      error: error.details[0].message,
    });
  const user = await User.findOne({
    email: req.body.email,
  });
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // throw error when email is wrong
  if (!user || !validPassword)
    return res.status(400).json({
      error: "Email or password is wrong",
    });
  // create token
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  res.json({
    error: null,
    data: {
      user,
      token,
    },
  });
});
module.exports = router;
