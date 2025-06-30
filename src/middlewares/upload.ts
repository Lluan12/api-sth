import multer from "multer";
import { join } from "path";
import fs from "fs"

const pathUploads = join(__dirname, "../../uploads");
const ALLOW_FORMAT = ["image/png", "image/jpg", "image/jpeg"];

const middlewareMulter = multer({
  storage: multer.diskStorage({
    destination(req, _file, cb) {
      const id = req.params.id;
      fs.mkdirSync(join(pathUploads, id), { recursive: true })
      cb(null, join(pathUploads, id));
    },
    filename(_req, file, cb) {
      const name = file.originalname;
      cb(null, name);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (ALLOW_FORMAT.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Format not valid "));
  },
  preservePath: true,
  
});

export default middlewareMulter;
