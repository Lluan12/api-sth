"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const pathUploads = (0, path_1.join)(__dirname, "../../uploads");
const ALLOW_FORMAT = ["image/png", "image/jpg", "image/jpeg"];
const middlewareMulter = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, _file, cb) {
            const id = req.params.id;
            fs_1.default.mkdirSync((0, path_1.join)(pathUploads, id), { recursive: true });
            cb(null, (0, path_1.join)(pathUploads, id));
        },
        filename(_req, file, cb) {
            const name = file.originalname;
            cb(null, name);
        },
    }),
    fileFilter: (_req, file, cb) => {
        if (ALLOW_FORMAT.includes(file.mimetype))
            cb(null, true);
        else
            cb(new Error("Format not valid "));
    },
    preservePath: true,
});
exports.default = middlewareMulter;
