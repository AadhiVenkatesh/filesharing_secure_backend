// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Email setup for nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Sign-up
exports.signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });

    await user.save();

    // Generate verification token
    const verificationCode = crypto.randomBytes(16).toString("hex");
    const verificationLink = `http://localhost:3000/verify-email/${verificationCode}`;

    // Send verification email
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Verify your email by clicking this link: ${verificationLink}`,
    });

    res
      .status(201)
      .send("User registered successfully! Check your email for verification.");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).send("Invalid credentials");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "jwt_secret_key"
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send("Login failed.");
  }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
  try {
    const { verification_code } = req.params;
    const user = await User.findOneAndUpdate(
      { verification_code },
      { email_verified: true }
    );

    if (!user) return res.status(400).send("Invalid verification link");

    res.status(200).send("Email verified successfully!");
  } catch (error) {
    res.status(500).send("Email verification failed.");
  }
};
