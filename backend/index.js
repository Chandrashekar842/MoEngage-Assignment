import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { authRouter } from "./routes/Authroutes.js";

const app = express();

app.use(express.json())

const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

app.use(authRouter)

mongoose
  .connect(database_url)
  .then((result) => {
    app.listen(port, () => {
      console.log("listening from port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
