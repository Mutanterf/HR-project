const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.send("HR API is running...");
});

app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.employee_id, e.first_name, e.last_name, e.email, 
             d.department_name, j.job_title, e.salary
      FROM employees e
      JOIN departments d ON e.department_id = d.department_id
      JOIN jobs j ON e.job_id = j.job_id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/employees/managers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.employee_id, e.first_name, e.last_name, e.salary, 
             m.first_name AS manager_first_name, m.last_name AS manager_last_name
      FROM employees e
      LEFT JOIN employees m ON e.manager_id = m.employee_id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/employees/ranking", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.employee_id, e.first_name, e.last_name, d.department_name, e.salary,
             RANK() OVER (PARTITION BY d.department_name ORDER BY e.salary DESC) AS salary_rank
      FROM employees e
      JOIN departments d ON e.department_id = d.department_id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/employees/index", async (req, res) => {
  try {
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_employee_name ON employees (first_name, last_name);
    `);
    res.send("Index created successfully.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
