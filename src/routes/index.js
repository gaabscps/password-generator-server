import express from "express";
import password from "../routes/passwordsRoutes.js";
import platform from "../routes/platformsRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("teste"));

  app.use(express.json(), password, platform);
};

export default routes;
