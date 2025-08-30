import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

const app = express();

import userRouter from "./routes/user.route";
import projectRouter from "./routes/project.route";
import swaggerDocumentation from "./docs/swagger";

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("API funcionando");
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

export default app;
