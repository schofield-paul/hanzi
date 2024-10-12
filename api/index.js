const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(express.json());

const corsOptions = {
  origin: [
    "https://www.hanzi-app.com",
    "https://www.hanzi-app.com/",
    "http://192.168.1.95:3000",
    "http://localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

const translationRoutes = require("./translationAPI");
const promptRoutes = require("./promptAPI");
const synthesizeSpeech = require("./synthesizeSpeech");

const port = process.env.PORT || 3005;

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.decode(token);
    req.user = { sub: decoded.sub };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

app.use("/translate", translationRoutes);
app.use("/prompts", validateToken, promptRoutes);
app.use("/synthesize", synthesizeSpeech);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
