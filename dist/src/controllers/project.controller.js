"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const getProjects = async (_req, res) => {
    try {
        const projects = await project_model_1.default.find();
        if (!projects) {
            res.status(404).json({ message: "There are not projects" });
            return;
        }
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const getProject = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await project_model_1.default.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const createProject = async (req, res) => {
    const { title, description } = req.body;
    const dateNow = new Date(Date.now());
    try {
        const project = await project_model_1.default.insertOne({
            title,
            description,
            images: [],
            created: dateNow,
            updated: dateNow,
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const updateProject = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const project = await project_model_1.default.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        if (title)
            project.title = title;
        if (description)
            project.description = description;
        project.updated = new Date(Date.now());
        await project.save();
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        const project = await project_model_1.default.findByIdAndDelete(id);
        if (!project) {
            res.status(404).json("Project not found");
            return;
        }
        const pathUpload = (0, path_1.join)(__dirname, "../../uploads", id);
        fs_1.default.rmSync(pathUpload, { recursive: true, force: true });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const uploadImage = async (req, res) => {
    const id = req.params.id;
    if (!req.files) {
        res.status(400).json({ message: "Images not send" });
        return;
    }
    try {
        const project = await project_model_1.default.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        console.log(req.files);
        const files = req.files;
        project.images = files.map((file) => (0, path_1.join)("uploads", project._id.toString(), file.filename));
        project.updated = new Date(Date.now());
        await project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.projectController = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    uploadImage,
};
