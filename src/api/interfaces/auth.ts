import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUserInfo extends Request {
  user: JwtPayload;
}
