import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  tagHtml: { type: String, required: true },
  tagMarkDown: { type: String, required: true },
  value: { type: String, required: true },
  align: { type: String, required: false, default: 'left' },
}, { _id: true }); // cada elemento tem _id próprio

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: [ElementSchema],
  user: { type: String, required: false , default: "Gr33d0"}, // opcional
  createdAt: { type: Date, default: Date.now }
});

const List = mongoose.model('List', ListSchema);

export default List;