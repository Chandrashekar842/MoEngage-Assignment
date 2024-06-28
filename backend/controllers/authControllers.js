import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_KEY;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwt_secret, { expiresIn: "1h" });
};

export const postSignUp = async (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }
  } catch (err) {
    console.log("postSignUp error", err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = User.create({
    email: email,
    username: username,
    password: hashedPassword,
  }).then(() => {
    return res.status(200).json({ message: "user created successfully" });
  });
};

export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "user doesnt exist" });
  }

  await bcrypt
    .compare(password, user.password)
    .then((doMatch) => {
      if (doMatch) {
        const token = generateToken(user._id);
        return res
          .status(200)
          .json({ message: "Login successful", token: token });
      }
      return res.status(402).json({ message: "Incorrect Password" });
    })
    .catch((err) => console.log(err));
};
