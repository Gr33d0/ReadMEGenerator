import mongoose from "mongoose";


const IconSchema = new mongoose.Schema({
    name: { type: String, required: false, default: "javascript" ,unique: true},
    category: { type: String, required: false, default: "techs" },
    url: { type: String, required: false, default: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  },
    createdAt: { type: Date, default: Date.now }
});

const Icon = mongoose.model('Icon', IconSchema);
export default Icon;