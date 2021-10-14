import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IUserInfo } from "../interfaces/auth";

const checkAuth = () => {
  return (req: IUserInfo, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split("")[1] as string;
      const decoded = jwt.verify(token, process.env.JWT_KEY as Secret);
      req.user = decoded as JwtPayload;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  };
};

export default checkAuth;
