import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
});

const projectModel = mongoose.model("Project", projectSchema, "projects");

export default projectModel;
