import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(__dirname, "..", "public", "temp");
// Define storage options for Multer

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, p); // specify the folder to store uploaded files
  },
  filename: (req, file, callback) => {
    // Create a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize Multer with the storage configuration
export const upload = multer({ storage: storage });
