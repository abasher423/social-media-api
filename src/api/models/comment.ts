import mongoose from "mongoose";
import IReact from "../interfaces/comment";
const { Schema } = mongoose;

const reactionSchema = new Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
      min: 5,
      max: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReact>("Reaction", reactionSchema);
