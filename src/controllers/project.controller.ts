import { Request, Response } from "express";
import _projectModel from "../models/project.model";
import { join } from "path";
import fs from "fs";

const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await _projectModel.find();
    if (!projects) {
      res.status(404).json({ message: "There are not projects" });
      return;
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const project = await _projectModel.findById(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createProject = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const dateNow = new Date(Date.now());
  try {
    const project = await _projectModel.insertOne({
      title,
      description,
      images: [],
      created: dateNow,
      updated: dateNow,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const project = await _projectModel.findById(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    if (title) project.title = title;
    if (description) project.description = description;
    project.updated = new Date(Date.now());
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const project = await _projectModel.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json("Project not found");
      return;
    }
    const pathUpload = join(__dirname, "../../uploads", id);
    fs.rmSync(pathUpload, { recursive: true, force: true });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const uploadImage = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!req.files) {
    res.status(400).json({ message: "Images not send" });
    return;
  }
  try {
    const project = await _projectModel.findById(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    console.log(req.files);
    const files = req.files as Express.Multer.File[];
    project.images = files.map((file: Express.Multer.File) =>
      join("uploads", project._id.toString(), file.filename)
    );
    project.updated = new Date(Date.now());
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const projectController = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
};
