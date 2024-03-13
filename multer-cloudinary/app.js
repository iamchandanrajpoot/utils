import express from "express";
import sequelize from "./config/dbConfig.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import uploadFileCloudinary from "./utils/cloudinary.js";
import { upload } from "./middlewares/multerMIddleware.js";

const app = express();
dotenv.config();

app.post("/upload", upload.single("myImage"), async (req, res) => {
  try {
    console.log(req.file);
    uploadFileCloudinary(req.file.path);
    res.send("everythings goes fine");
    await fs.unlink(req.file.path);
  } catch (error) {
    console.log("error occurred");
  }
});

sequelize
  .sync()
  .then(() => {
    const port = process.env.PORT || 5000;
    console.log("synced models to db");
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
