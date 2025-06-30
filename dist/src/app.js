"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = require("path");
const app = (0, express_1.default)();
const user_route_1 = __importDefault(require("./routes/user.route"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const swagger_1 = __importDefault(require("./docs/swagger"));
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", (_req, res) => {
    res.send("API funcionando");
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api/uploads", express_1.default.static((0, path_1.join)(__dirname, "../uploads")));
app.use("/api/users", user_route_1.default);
app.use("/api/projects", project_route_1.default);
exports.default = app;
