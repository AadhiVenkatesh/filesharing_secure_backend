// controllers/fileController.js
const File = require("../models/File");
const crypto = require("crypto");

// File upload
exports.uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const allowedTypes = ["pptx", "docx", "xlsx"];
    const fileType = file.mimetype.split("/")[1];

    if (!allowedTypes.includes(fileType))
      return res.status(400).send("Invalid file type.");

    const encryptedUrl = crypto.randomBytes(16).toString("hex");
    const newFile = new File({
      file_name: file.originalname,
      file_type: fileType,
      encrypted_url: encryptedUrl,
      uploaded_by: req.user.userId,
    });

    await newFile.save();
    res.status(201).send("File uploaded successfully!");
  } catch (error) {
    res.status(500).send("File upload failed.");
  }
};

// List uploaded files
exports.listFiles = async (req, res) => {
  try {
    const files = await File.find({ uploaded_by: req.user.userId });
    res.status(200).send(files);
  } catch (error) {
    res.status(500).send("Could not list files.");
  }
};

// Download file
exports.downloadFile = async (req, res) => {
  try {
    const { file_id } = req.params;
    const file = await File.findById(file_id);

    if (!file) return res.status(404).send("File not found.");

    if (req.user.role !== "Client User")
      return res.status(403).send("Access denied.");

    res.status(200).send({
      downloadLink: `http://localhost:3000/download/${file.encrypted_url}`,
    });
  } catch (error) {
    res.status(500).send("Download failed.");
  }
};
