const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes

// Get all hanzi
app.get("/hanzi", async (req, res) => {
  try {
    const allHanzi = await pool.query("SELECT * FROM hanzi");

    res.json(allHanzi.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a hanzi
app.get("/hanzi", async (req, res) => {
  const { hsk_level, hsk_section } = req.query;

  try {
    const hanzi = await pool.query(
      "SELECT * FROM hanzi WHERE hsk_level = $1 AND hsk_section = $2",
      [hsk_level, hsk_section]
    );

    res.json(hanzi.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error fetching hanzi");
  }
});

// Post a hanzi -- only for testing and seeding
app.post("/hanzi", async (req, res) => {
  try {
    const { character, pinyin, english, hsk_level, hsk_section } = req.body;

    const newHanzi = await pool.query(
      "INSERT INTO hanzi (character, pinyin, english, hsk_level, hsk_section) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [character, pinyin, english, hsk_level, hsk_section]
    );

    res.json(newHanzi.rows[0]); // Send back the inserted row as a response
  } catch (err) {
    console.error("Error:", err.message);
    if (err.code === "42P01") {
      res.status(404).send("Database or table does not exist.");
    } else {
      res.status(500).send("Server Error");
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
