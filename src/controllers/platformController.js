import { platform } from "../models/Platform.js";

class PlatformController {
  static async listPlatform(req, res, next) {
    try {
      const platformList = await platform.find({});
      res.status(200).json(platformList);
    } catch (error) {
      next(error);
    }
  }

  static async addPlatform(req, res, next) {
    //TODO: Handle Errors
    try {
      const newPlatform = await platform.create(req.body);
      res
        .status(201)
        .json({ message: "Platform created", platform: newPlatform });
    } catch (error) {
      next(error);
    }
  }

  static async getPlatformById(req, res, next) {
    //TODO: Handle Errors
    try {
      const id = req.params.id;
      const platformById = await platform.findById(id);
      res.status(200).json(platformById);
    } catch (error) {
      next(error);
    }
  }

  static async updatePlatform(req, res, next) {
    //TODO: Handle Errors
    try {
      const id = req.params.id;
      await platform.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Platform updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deletePlatform(req, res, next) {
    //TODO: Handle Errors
    try {
      const id = req.params.id;
      await platform.findByIdAndDelete(id);
      res.status(200).json({ message: "Platform deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export default PlatformController;
