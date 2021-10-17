import { Document } from "mongoose";
import IComment from "./comment";
import IUser from "./user";

export default interface IPost extends Document {
  postId: string;
  user: IUser;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  comments: IComment[];
}
