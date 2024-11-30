import mongoose from "mongoose";
import { PlatformSchema } from "../models/Platform.js";

const passwordSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    password: { type: String },
    platform: PlatformSchema,
    auth2fa: { type: Boolean },
  },
  { collection: "password", versionKey: false }
);

const password = mongoose.model("password", passwordSchema);

export default password;
