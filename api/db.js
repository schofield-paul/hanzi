const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "your_password",
  database: "hanzi_database",
  port: 5432,
});

module.exports = pool;
