"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configuration/config");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Credentials are not valid" });
            return;
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            res.status(404).json({ message: "Credentials are not valid" });
            return;
        }
        if (!config_1.SECRET_KEY) {
            res.status(500).json({ messge: "Secret key not provided" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.name, email: user.email }, config_1.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const getUsers = async (_req, res) => {
    try {
        const users = await user_model_1.default.find();
        if (!users) {
            res.status(404).json({ message: "there are not users" });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        console.log(user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt_1.default.hashSync(password, config_1.SALT);
    const dateNow = new Date(Date.now());
    try {
        const user = await user_model_1.default.insertOne({
            name,
            email,
            password: passwordHash,
            created: dateNow,
            updated: dateNow,
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    try {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        user.updated = new Date(Date.now());
        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.userController = {
    loginUser,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
