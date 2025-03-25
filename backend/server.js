const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.get("/", (req, res) => {
  res.send("HR API is running...");
});

app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.employee_id, e.first_name, e.last_name, d.department_name, p.position_name, e.salary
      FROM employees e
      JOIN departments d ON e.department_id = d.department_id
      JOIN positions p ON e.position_id = p.position_id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
