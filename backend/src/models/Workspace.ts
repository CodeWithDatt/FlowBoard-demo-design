const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    icon: {
      type: String,
      trim: true,
      default: "workspace",
    },
  },
  {
    timestamps: true,
  },
);

const Workspace =
  mongoose.models.Workspace || mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;

export {};
