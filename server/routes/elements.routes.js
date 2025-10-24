import express from "express";
import {
  getAllElements,
  getElementById,
  createElement,
  updateElement,
  deleteElement,
} from "../controllers/element.controller.js";

const router = express.Router();

// GET all elements
router.get("/", getAllElements);

// GET element by ID
router.get("/:id", getElementById);

// POST create new element
router.post("/", createElement);

// PUT update element by ID
router.put("/:id", updateElement);

// DELETE element by ID
router.delete("/:id", deleteElement);

export default router;