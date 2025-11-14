const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 3333;
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/aaa", upload.single("aaa"), (req, res) => {
  console.log("File received:", req.file);
  console.log("Other form data:", req.body);
  res.send("File uploaded successfully.");
});

app.post(
  "/bbb",
  upload.array("bbb", 2),
  (req, res) => {
    console.log("File received:", req.files);
    console.log("Other form data:", req.body);
    res.send("File uploaded successfully.");
  },
  (err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(400).end("Too many files uploaded");
    }
  }
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
