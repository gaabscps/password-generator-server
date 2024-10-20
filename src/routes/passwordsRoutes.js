import express from "express";
import PasswordController from "../controllers/passwordController.js";

const routes = express.Router();

routes.get("/passwords", PasswordController.listPassword);
routes.get("/passwords/:id", PasswordController.getPasswordById);

routes.post("/passwords", PasswordController.addPassword);

routes.put("/passwords/:id", PasswordController.updatePassword);

routes.delete("/passwords/:id", PasswordController.deletePassword);

export default routes;