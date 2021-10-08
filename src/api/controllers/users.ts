import { RequestHandler } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user";

export const users_get_all: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const users_get_user: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({ _id: userId });
    res.status(200).json({
      user,
      request: {
        type: "POST",
        description: "Create a User",
        url: "http://localhost:5000/api/users",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const users_register: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // check if email address exists already
    const users = await User.find({ email });
    console.log(users);

    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      if (hashedPassword) {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          password: hashedPassword,
          email,
          firstName,
          lastName,
        });

        await user.save();
        res.status(201).json({
          message: "Account successfully created",
          user: user,
        });
      }
    } else {
      res.status(401).json({
        message: "An account with that email address already exists",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// jwt login
export const users_login: RequestHandler = async (req, res) => {};
