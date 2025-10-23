import mongoose from "mongoose";


const elementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    value:{
      type: String,
      required: true,
    },
    html_value:{
      type: String,
      required: true,
    },
    markdown_value:{
      type: String,
      required: true,
    },
    props: {
      type: Object,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Element = mongoose.model("Element", elementSchema);

export default Element;
