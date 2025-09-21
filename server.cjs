const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Path to tasks file
const TASKS_FILE = path.join(__dirname, "tasks.json");

// Middleware
app.use(cors());
app.use(express.json());

// Load tasks from file
function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) return {};
  return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8"));
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// ✅ Get tasks for a user
app.get("/tasks/:userId", (req, res) => {
  const { userId } = req.params;
  const tasks = loadTasks();
  res.json(tasks[userId] || []);
});

// ✅ Add a new task for a user
app.post("/tasks/:userId", (req, res) => {
  const { userId } = req.params;
  const { text, category } = req.body; // 👈 FIXED: use text + category
  const tasks = loadTasks();

  if (!tasks[userId]) tasks[userId] = [];
  const newTask = {
    id: Date.now(),
    text,                // 👈 was missing before
    category: category || "General", // default category
    completed: false
  };

  tasks[userId].push(newTask);

  saveTasks(tasks);
  res.status(201).json(newTask);
});

// ✅ Update a task (toggle complete or edit text)
app.put("/tasks/:userId/:id", (req, res) => {
  const { userId, id } = req.params;
  const { completed, text, category } = req.body;
  const tasks = loadTasks();

  if (!tasks[userId]) return res.status(404).json({ error: "User not found" });

  const task = tasks[userId].find(t => t.id == id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (completed !== undefined) task.completed = completed;
  if (text !== undefined) task.text = text;
  if (category !== undefined) task.category = category;

  saveTasks(tasks);
  res.json(task);
});

// ✅ Delete a task
app.delete("/tasks/:userId/:id", (req, res) => {
  const { userId, id } = req.params;
  const tasks = loadTasks();

  if (!tasks[userId]) return res.status(404).json({ error: "User not found" });

  tasks[userId] = tasks[userId].filter(t => t.id != id);
  saveTasks(tasks);

  res.json({ success: true });
});

// ✅ Serve frontend (Vite build from dist)
app.use(express.static(path.join(__dirname, "dist")));

app.get((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
