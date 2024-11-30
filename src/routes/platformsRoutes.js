import express from "express";
import PlatformController from "../controllers/platformController.js";

const routes = express.Router();

routes.get("/platforms", PlatformController.listPlatform);
routes.get("/platforms/:id", PlatformController.getPlatformById);

routes.post("/platforms", PlatformController.addPlatform);
routes.post("/platforms/search", PlatformController.filterPlatform);

routes.put("/platforms/:id", PlatformController.updatePlatform);

routes.delete("/platforms/:id", PlatformController.deletePlatform);

export default routes;
