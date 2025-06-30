import app from "./app";
import { PORT } from "./configuration/config";
import "./configuration/connection";

app.listen(PORT, () => {
  console.log(`Listening in the port: ${PORT}`);
});

export default app;
