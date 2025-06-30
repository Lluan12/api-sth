"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./configuration/config");
require("./configuration/connection");
app_1.default.listen(config_1.PORT, () => {
    console.log(`Listening in the port: ${config_1.PORT}`);
});
exports.default = app_1.default;
