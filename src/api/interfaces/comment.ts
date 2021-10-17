import { Document } from "mongoose";
import IUser from "./user";

export default interface IComment extends Document {
  commentId: string;
  user: IUser;
  body: string;
  createdAt: Date;
}
