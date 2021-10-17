import { RequestHandler } from "express";
import mongoose from "mongoose";
import Post from "../models/post";

const posts_get_all: RequestHandler = async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts.length > 0) {
      res.status(200).json({
        count: posts.length,
        posts,
      });
    } else {
      res.status(200).json({ message: "No posts created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const posts_get_post: RequestHandler = async (req, res) => {};

const posts_create_post: RequestHandler = async (req, res) => {};

const posts_update_post: RequestHandler = async (req, res) => {};

const posts_delete_post: RequestHandler = async (req, res) => {};

export default {
  posts_get_all,
  posts_get_post,
  posts_create_post,
  posts_update_post,
  posts_delete_post,
};
