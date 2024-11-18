// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", authMiddleware, fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
