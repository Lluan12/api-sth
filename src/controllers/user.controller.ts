import { Request, Response } from "express";
import _userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT, SECRET_KEY } from "../configuration/config";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await _userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Credentials are not valid" });
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(404).json({ message: "Credentials are not valid" });
      return;
    }
    if (!SECRET_KEY) {
      res.status(500).json({ messge: "Secret key not provided" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, username: user.name, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await _userModel.find();
    if (!users) {
      res.status(404).json({ message: "there are not users" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await _userModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, SALT!);
  const dateNow = new Date(Date.now());
  try {
    const user = await _userModel.insertOne({
      name,
      email,
      password: passwordHash,
      created: dateNow,
      updated: dateNow,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const user = await _userModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (name) user.name = name;
    if (email) user.email = email;
    user.updated = new Date(Date.now());
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await _userModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json("User not found");
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userController = {
  loginUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
