import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "./config";

const url = DB_URI!;
//const url = "mongodb://localhost:27017"

mongoose
  .connect(url, {dbName: DB_NAME})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose;
