import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./api/routes/users";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const PORT: number = Number(<string>process.env.PORT) || 8080;
const MONGO_ATLAS_ADDR: string = <string>process.env.MONGO_ATLAS_ADDR;

mongoose
  .connect(MONGO_ATLAS_ADDR)
  .then(() => {
    console.log("Database is now connected");

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

// setting up CORS
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Acess-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  }
);

app.use("/api/users", userRoutes);

interface Error {
  status?: number;
  message?: string;
}

app.use((req, res: express.Response, next: express.NextFunction) => {
  const error = new Error("Incorrect URL page not found");
  res.status(404);
  next(error);
});

app.use((error: Error, req: express.Request, res: express.Response) => {
  res.status(error.status || 404).json({
    error: {
      message: error.message,
    },
  });
});

// const dbOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// };
