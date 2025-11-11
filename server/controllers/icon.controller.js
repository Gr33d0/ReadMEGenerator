import Icon from "../models/icons.model.js";

export const getAllIcons = async (req, res) => {
  try {
    const icons = await Icon.find();
    res.status(200).json(icons);
    } catch (error) {
    console.error("Error fetching icons:", error);
    res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createIcon =  async (req, res) => {
    try {
        const newIcon = await Icon.create(req.body);
        res.status(201).json(newIcon);
    } catch (error) {
        console.error("Error creating icon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editIcon = async (req, res) => {
    try {
        const icon = await Icon.findByIdAndUpdate(req.params.id, req.body);
        if (!icon) {
            return res.status(404).json({ message: "Icon not found" });
        }
        res.status(200).json(icon);
    } catch (error) {
        console.error("Error updating icon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getIconById = async (req, res) => {
    try {
        const icon = await Icon.findById(req.params.id);
        if (!icon) {
            return res.status(404).json({ message: "Icon not found" });
        }
        res.status(200).json(icon);
    } catch (error) {
        console.error("Error fetching icon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteIcon = async (req, res) => {
     try {
        const icon = await Icon.findByIdAndDelete(req.params.id);
        if (!icon) {
           return res.status(404).json({ message: "Icon not found" });
    }
         res.status(200).json({ message: "Icon deleted successfully" });
     } catch (error) {
         console.error("Error deleting icon:", error);
         res.status(500).json({ message: "Internal Server Error" });
     }
 };

