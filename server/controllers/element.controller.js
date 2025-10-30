import List from "../models/element.model.js";

export const getAllElements = async (req, res) => {
  try {
    // Simulate fetching elements from a database
    const elements = await List.find();
    res.status(200).json(elements);
  } catch (error) {
    console.error("Error fetching elements:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getElementById = async (req, res) => {
  try {
    const element = await List.findById(req.params.id);
    if (!element) {
      return res.status(404).json({ message: "Element not found" });
    }
    res.status(200).json(element);
  } catch (error) {
    console.error("Error fetching element:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createElement =  async (req, res) => {
  try {
    const newElement = await List.create(req.body);
    
    res.status(201).json(newElement);
  } catch (error) {
    console.log(req.body)
    console.error("Error creating element:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateElement = async (req, res) => {
  try {
    const element = await List.findByIdAndUpdate(req.params.id, req.body);
    if (!element) {
      return res.status(404).json({ message: "Element not found" });
    }

    const updatedElement = await List.findById(req.params.id);

    res.status(200).json(updatedElement);
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteElement = async (req, res) => {
  try {
    const element = await List.findByIdAndDelete(req.params.id);
    if (!element) {
      return res.status(404).json({ message: "Element not found" });
    }
    res.status(200).json({ message: "Element deleted successfully" });
  } catch (error) {
    console.error("Error deleting element:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
