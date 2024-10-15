const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/file-upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ success: "File upload Successful" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.listen(7070, () => console.log("App running on http://localhost:7070"));
