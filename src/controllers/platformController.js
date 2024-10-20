import { platform } from "../models/Platform.js";

class PlatformController {
  static async listPlatform(req, res) {
    try {
      const platformList = await platform.find({});
      res.status(200).json(platformList);
    } catch (error) {
      res
        .status(500)
        .status.json({ message: `${error.message} - Failed to get platforms` });
    }
  }

  static async addPlatform(req, res) {
    try {
      const newPlatform = await platform.create(req.body);
      res
        .status(201)
        .json({ message: "Platform created", platform: newPlatform });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to add platform` });
    }
  }

  static async getPlatformById(req, res) {
    try {
      const id = req.params.id;
      const platformById = await platform.findById(id);
      res.status(200).json(platformById);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to get platform by id` });
    }
  }

  static async updatePlatform(req, res) {
    try {
      const id = req.params.id;
      await platform.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Platform updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to update platform` });
    }
  }

  static async deletePlatform(req, res) {
    try {
      const id = req.params.id;
      await platform.findByIdAndDelete(id);
      res.status(200).json({ message: "Platform deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete platform` });
    }
  }
}

export default PlatformController;
