import express from "express";
import {
  getAllIcons,
  getIconById,
  createIcon,
  editIcon,
  deleteIcon,

} from "../controllers/icon.controller.js";

const router = express.Router();

// GET all icons
router.get("/", getAllIcons);
// GET icon by ID
router.get("/:id", getIconById);
// POST create new icon
router.post("/", createIcon);
// PUT update icon by ID
router.put("/:id", editIcon);
// DELETE icon by ID
 router.delete("/:id", deleteIcon);

export default router;