import { Document } from "mongoose";
import IPost from "./post";

export default interface IUser extends Document {
  userId: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  avater: string;
  about: string;
  posts: IPost[];
  followers: IUser[];
  following: IUser[];
}
