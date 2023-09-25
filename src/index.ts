import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "./../.env" });
import db from "./config/db";
import PostController from "./controllers/PostController";
import UserController from "./controllers/UserController";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());

app.use("/api/posts", PostController);

app.use("/api/users", UserController);

app.listen(PORT, () => {
  console.log(`Servidor running. PORT: ${PORT}`);
});
