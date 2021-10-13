import { RequestHandler } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const users_get_all: RequestHandler = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const users_get_user: RequestHandler = async (req, res) => {
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

const users_register: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // check if email address exists already
    const users = await User.find({ email });

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
const users_login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const authenticated = await bcrypt.compare(password, user.password);
      if (authenticated) {
        const token = jwt.sign(
          {
            // data we want to pass to the client (payload)
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          <string>process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          message: "Authentication successfull",
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid email address or password" }); // invalid password
      }
    } else {
      res.status(401).json({ message: "Invalid email address or password" }); // invalid email
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const users_update_user: RequestHandler = async (req, res) => {
  try {
    const userId: string = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      const { email, password, firstName, lastName } = req.body;
      user.email = email || user.email;
      user.password = password
        ? await bcrypt.hash(password, 10)
        : user.password;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();
      res.status(200).json({
        message: "Account successfully updated",
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const users_delete_user: RequestHandler = async (req, res) => {
  try {
    const userId: string = req.params.userId;
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      res.status(200).json({
        message: "User successfully deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/api/users",
          description: "Create an individual user",
          body: {
            email: "string",
            password: "string",
            firstName: "string",
            lastName: "string",
          },
        },
      });
    } else {
      res.status(400).json({ message: "User already deleted " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export default {
  users_get_all,
  users_get_user,
  users_register,
  users_login,
  users_update_user,
  users_delete_user,
};
