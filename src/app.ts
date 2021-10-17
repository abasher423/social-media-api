import express from "express";
import cors from "cors";

import dbconnect from "./api/db/dbconnection";
import userRoutes from "./api/routes/users";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// connecting to mongodb
dbconnect();

// setting up CORS
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

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
