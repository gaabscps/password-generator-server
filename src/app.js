import express from "express";
import databaseConnection from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await databaseConnection();

connection.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

connection.once("open", () => {
  console.log("conexão com sucesso");
});

const app = express();
routes(app);

export default app;
