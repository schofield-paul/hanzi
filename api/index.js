const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

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
app.get("/hanzi/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hanzi = await pool.query("SELECT * FROM hanzi WHERE id = $1", [id]);

    res.json(hanzi.rows[0]);
  } catch (err) {
    console.error(err.message);
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
