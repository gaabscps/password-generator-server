import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const connection = await databaseConnection();

connection.on("error", (erro) => {
  console.error("Connection error", erro);
});

connection.once("open", () => {
  console.log("Connected Successfully");
});

const app = express();
routes(app);

app.use(errorHandler);

export default app;
