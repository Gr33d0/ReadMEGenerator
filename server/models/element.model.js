import mongoose from "mongoose";
import { type } from "os";

const ElementSchema = new mongoose.Schema({
  tagHtml: { type: String, required: true },
  tagMarkDown: { type: String, required: true },
  value: { type: String, required: true },
  url: { type: String, required: false },
  show:{type: Boolean , required: false},
}, { _id: true }); // cada elemento tem _id próprio

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: [ElementSchema],
  align: { type: String, required: false, default: 'left' },
  height: { type: String, required: false, default: '26' },
  spacing: { type: String, required: false, default: '12' },
  user: { type: String, required: false , default: "Gr33d0"}, // opcional
  createdAt: { type: Date, default: Date.now }
});



const List = mongoose.model('List', ListSchema);

export default List;