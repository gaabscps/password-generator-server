import express from "express";
import PasswordController from "../controllers/passwordController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/passwords", PasswordController.listPassword, pagination);
routes.get("/passwords/generate", PasswordController.generateRandomPassword);
routes.get("/passwords/search", PasswordController.listPasswordByPlatform);
routes.get("/passwords/:id", PasswordController.getPasswordById);

routes.post("/passwords", PasswordController.addPassword);

routes.put("/passwords/:id", PasswordController.updatePassword);

routes.delete("/passwords/:id", PasswordController.deletePassword);

export default routes;
