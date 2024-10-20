import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  { collection: "platform", versionKey: false }
);

const platform = mongoose.model("platform", PlatformSchema);

export { platform, PlatformSchema };
