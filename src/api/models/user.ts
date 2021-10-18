import mongoose from "mongoose";
import IUser from "../interfaces/user";
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    first: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    last: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  avatar: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    min: 5,
    max: 150,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.virtual("fullName").get(function (this: IUser) {
  return this.name.first + this.name.last;
});

userSchema.virtual("followersCount").get(function (this: { followers: IUser[] }) {
  return this.followers.length;
});

userSchema.virtual("followingCount").get(function (this: { following: IUser[] }) {
  return this.following.length;
});

export default mongoose.model<IUser>("User", userSchema);
