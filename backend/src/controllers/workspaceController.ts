const Workspace = require("../models/Workspace");

const createWorkspace = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user._id;

    const { name, description, icon } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({
        success: false,
        message: "Workspace name is required",
      });

      return;
    }

    const workspaceName = name.trim();

    const slug = `${workspaceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${Date.now()}`;

    const workspace = await Workspace.create({
      name: workspaceName,
      slug,
      ownerId: userId,
      description: description?.trim() || "",
      icon: icon?.trim() || "workspace",
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    console.error("Create workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create workspace",
    });
  }
};

const getWorkspaces = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user._id;

    const workspaces = await Workspace.find({
      ownerId: userId,
    }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      workspaces,
    });
  } catch (error) {
    console.error("Get workspaces error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
    });
  }
};

const getWorkspace = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const workspace = await Workspace.findOne({
      _id: id,
      ownerId: userId,
    });

    if (!workspace) {
      res.status(404).json({
        success: false,
        message: "Workspace not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    console.error("Get workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workspace",
    });
  }
};

const updateWorkspace = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const { name, description, icon } = req.body;

    const workspace = await Workspace.findOne({
      _id: id,
      ownerId: userId,
    });

    if (!workspace) {
      res.status(404).json({
        success: false,
        message: "Workspace not found",
      });

      return;
    }

    if (name !== undefined) {
      if (!name.trim()) {
        res.status(400).json({
          success: false,
          message: "Workspace name cannot be empty",
        });

        return;
      }

      workspace.name = name.trim();
    }

    if (description !== undefined) {
      workspace.description = description.trim();
    }

    if (icon !== undefined) {
      workspace.icon = icon.trim();
    }

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    console.error("Update workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update workspace",
    });
  }
};

const deleteWorkspace = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const workspace = await Workspace.findOne({
      _id: id,
      ownerId: userId,
    });

    if (!workspace) {
      res.status(404).json({
        success: false,
        message: "Workspace not found",
      });

      return;
    }

    await Workspace.deleteOne({
      _id: id,
      ownerId: userId,
    });

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    console.error("Delete workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete workspace",
    });
  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
};

export {};
