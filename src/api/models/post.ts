import mongoose from "mongoose";
import IPost from "../interfaces/post";
import commentSchema from "./comment";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    body: {
      type: String,
      required: true,
      min: 5,
      max: 200,
    },
    image: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

postSchema.virtual("commentCount").get(function (this: IPost) {
  return this.comments.length;
});

export default mongoose.model<IPost>("Post", postSchema);
