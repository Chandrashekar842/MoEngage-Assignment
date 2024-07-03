import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

import { authRouter } from "./routes/Authroutes.js";
import { reviewRouter } from "./routes/Reviewroutes.js";

const app = express();
app.use(cors());

app.use(express.json())

const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

app.use(authRouter)

app.use('/review', reviewRouter)

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
