import NotFound from "../errors/NotFound.js";
import password from "../models/Password.js";
import InvalidData from "../errors/InvalidData.js";
import { platform } from "../models/Platform.js";

class PasswordController {
  static async generateRandomPassword(req, res) {
    const length = req.query.length || 8;
    const uppercase = req.query.uppercase || false;
    const lowercase = req.query.lowercase || false;
    const numbers = req.query.numbers || false;
    const symbols = req.query.symbols || false;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allChars = "";
    let password = "";

    if (uppercase) {
      allChars += uppercaseChars;
      password +=
        uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }

    if (lowercase) {
      allChars += lowercaseChars;
      password +=
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }

    if (numbers) {
      allChars += numberChars;
      password += numberChars[Math.floor(Math.random() * numberChars.length)];
    }

    if (symbols) {
      allChars += symbolChars;
      password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    res.status(200).json({ password });
  }

  static async listPassword(req, res, next) {
    try {
      // Get all passwords
      const passwordList = await password.find({});
      res.status(200).json(passwordList);
    } catch (error) {
      next(error);
    }
  }

  static async addPassword(req, res, next) {
    //TODO: Handle Errors
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
      next(error);
    }
  }

  static async getPasswordById(req, res, next) {
    try {
      const id = req.params.id;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const passwordById = await password.findById(id);
        res.status(200).json(passwordById);
      } else next(new NotFound("Password not found"));
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    const id = req.params.id;
    const newPassword = req.body;

    try {
      // Validate ID format
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new NotFound("Id "));
      }

      // Verify if password exists
      const currentPassword = await password.findById(id);
      if (!currentPassword) {
        return res.status(404).json({ message: "Password not found" });
      }

      // Handle platform update if necessary
      if (
        newPassword.platform &&
        newPassword.platform !== currentPassword.platform?.toString()
      ) {
        const platformFound = await platform.findById(newPassword.platform);
        if (!platformFound) {
          return res.status(404).json({ message: "Platform not found" });
        }
        newPassword.platform = platformFound;
      }

      // Update password
      await password.findByIdAndUpdate(id, newPassword, { new: true });
      res.status(200).json({ message: "Password updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deletePassword(req, res, next) {
    //TODO: Handle Errors
    try {
      const id = req.params.id;
      await password.findByIdAndDelete(id);
      res.status(200).json({ message: "Password deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async listPasswordByPlatform(req, res, next) {
    //TODO: Handle Errors
    const platformId = req.query.platform;

    try {
      const passwordByPlatform = await password.find({
        "platform._id": platformId,
      });
      res.status(200).json(passwordByPlatform);
    } catch (error) {
      next(error);
    }
  }
}

export default PasswordController;
