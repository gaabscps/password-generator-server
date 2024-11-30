import { platform } from "../models/index.js";
class PlatformController {
  static async listPlatform(req, res, next) {
    // "/platform?itemPerPage=5&page=1&sorting=_id:-1"
    try {
      const searchPlatform = platform.find();

      req.result = searchPlatform;

      next();
    } catch (error) {
      next(error);
    }
  }

  static async addPlatform(req, res, next) {
    // "/platform"
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
    // "/platform/:id"
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
    // "/platform/:id"
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
    // "/platform/:id"
    //TODO: Handle Errors
    try {
      const id = req.params.id;
      await platform.findByIdAndDelete(id);
      res.status(200).json({ message: "Platform deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async filterPlatform(req, res, next) {
    // "/platform/filter?name=name"
    try {
      const { name } = req.query;

      if (!name) {
        return res.status(400).json({ message: "Params 'name' not found" });
      }

      const platformFound = await platform.findOne({
        name: { $regex: new RegExp(name, "i") },
      });

      if (!platformFound) {
        return res.status(404).json({ message: "Platform not found" });
      }

      res.status(200).json(platformFound);
    } catch (error) {
      next(error);
    }
  }
}

export default PlatformController;
