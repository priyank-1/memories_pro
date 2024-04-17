import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://memories-2yicwymqw-priyank1s-projects-8e251b55.vercel.app",
      "https://memories-pro-client.vercel.app"
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
      console.log("Connected To MongoDB");
    })
  )
  .catch((error) => console.log(error.message));
