import password from "../models/Password.js";
import { platform } from "../models/Platform.js";

class PasswordController {
  static async listPassword(req, res) {
    try {
      // Get all passwords
      const passwordList = await password.find({});
      res.status(200).json(passwordList);
    } catch (error) {
      res
        .status(500)
        .status.json({ message: `${error.message} - Failed to get passwords` });
    }
  }

  static async addPassword(req, res) {
    const newPassword = req.body;
    try {
      const platformFound = await platform.findById(newPassword.platform);
      const passwordBody = platformFound?._doc
        ? {
            ...newPassword,
            platform: { ...platformFound._doc },
          }
        : { ...newPassword };

      const passwordCreated = await password.create(passwordBody);
      res
        .status(201)
        .json({ message: "Password created", password: passwordCreated });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to add password` });
    }
  }

  static async getPasswordById(req, res) {
    try {
      const id = req.params.id;
      const passwordById = await password.findById(id);
      res.status(200).json(passwordById);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to get password by id` });
    }
  }

  static async updatePassword(req, res) {
    const newPassword = req.body;
    const id = req.params.id;
    try {
      // Validate required fields
      if (!newPassword || !id) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Verify if password exists and get current password
      const currentPassword = await password.findById(id);
      if (!currentPassword) {
        return res.status(404).json({ message: "Password not found" });
      }

      // verify if platform exists and update password with platform
      let passwordBody = newPassword;
      if (
        newPassword.platform &&
        newPassword.platform !== currentPassword.platform?._id.toString()
      ) {
        const platformFound = await platform.findById(newPassword.platform);
        if (!platformFound) {
          return res.status(404).json({ message: "Platform not found" });
        }
        passwordBody = { ...newPassword, platform: platformFound._doc };
      }

      // Update password
      await password.findByIdAndUpdate(id, passwordBody);
      res.status(200).json({ message: "Password updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update password - " + error.message });
    }
  }

  static async deletePassword(req, res) {
    try {
      const id = req.params.id;
      await password.findByIdAndDelete(id);
      res.status(200).json({ message: "Password deleted" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Failed to delete password` });
    }
  }

  static async listPasswordByPlatform(req, res) {
    const platformId = req.query.platform;

    try {
      const passwordByPlatform = await password.find({
        "platform._id": platformId,
      });
      res.status(200).json(passwordByPlatform);
    } catch (error) {
      console.error(
        `Error fetching passwords for platform ${platformId}: ${error.message}`
      );
      res.status(500).json({
        message: `${error.message} - Failed to get password by platform`,
      });
    }
  }
}

export default PasswordController;
