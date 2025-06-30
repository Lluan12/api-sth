import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { join } from "path";

const app = express();

import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.route";
import swaggerDocumentation from "./docs/swagger"

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))
app.use("/api/uploads", express.static(join(__dirname, "../uploads")));
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

export default app;
