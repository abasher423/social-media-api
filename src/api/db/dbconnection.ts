import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import express from "express";

const app = express();
dotenv.config();

const dbOptions = {
  useNewUrlParser: true,
};

const PORT: number = Number(<string>process.env.PORT) || 8080;
const MONGO_ATLAS_ADDR: string = <string>process.env.MONGO_ATLAS_ADDR;

const dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_ATLAS_ADDR, <ConnectOptions>dbOptions);
    console.log("Database is now connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default dbconnect;
