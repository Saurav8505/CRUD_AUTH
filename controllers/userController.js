const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    mobile,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ message: "User registered" });
  console.log("User Register Successfully !");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Password is wrong" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      },
      "secret",
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ message: "Login succesfull ", token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  console.log("User Login Successfully !");
};

exports.getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
  console.log("Users Data Fetched Successfully !");
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
