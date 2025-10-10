import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

// Get all todos
app.get("/todos", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
});

// Add new todo
app.post("/todos", async (req, res) => {
    const { task } = req.body;
    const result = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [task]);
    res.json(result.rows[0]);
});

// Toggle complete
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    await pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id]);
    res.json({ message: "Todo updated" });
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Todo deleted" });
});

app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
