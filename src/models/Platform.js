import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: [true, "Name is required"] },
    link: { type: String, required: [true, "Link is required"] },
  },
  { collection: "platform", versionKey: false }
);

const platform = mongoose.model("platform", PlatformSchema);

export { platform, PlatformSchema };
