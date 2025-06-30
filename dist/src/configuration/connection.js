"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
//const url = DB_URI;
const url = "mongodb://localhost:27017";
mongoose_1.default
    .connect(url, { dbName: config_1.DB_NAME })
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.log(err);
});
exports.default = mongoose_1.default;
