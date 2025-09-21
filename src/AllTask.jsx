import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:3001/tasks";

export default function AllTasks({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("General");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const categories = [
    { name: "General", icon: "📋" },
    { name: "Healing", icon: "🌸" },
    { name: "Growth", icon: "🌱" },
    { name: "Adventure", icon: "🌍" },
    { name: "Self Love", icon: "💖" },
    { name: "Fun", icon: "🎉" },
  ];

  // 🔹 Load tasks from backend
  const loadTasks = async () => {
    const res = await fetch(`${API_URL}/${userId}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    if (userId) {
      loadTasks();
    }

    // 👂 Listen for tasksUpdated event from AddTask.jsx
    const handler = () => loadTasks();
    window.addEventListener("tasksUpdated", handler);

    return () => {
      window.removeEventListener("tasksUpdated", handler);
    };
  }, [userId]);

  // 🔹 Toggle task completion
  const toggleCompleted = async (id, completed) => {
    await fetch(`${API_URL}/${userId}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    loadTasks();
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${userId}/${id}`, { method: "DELETE" });
    loadTasks();
  };

  // 🔹 Edit task
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    await fetch(`${API_URL}/${userId}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editingText }),
    });
    setEditingId(null);
    setEditingText("");
    loadTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // 🔹 Filter by category
  const filteredTasks =
    activeCategory === "General"
      ? tasks
      : tasks.filter((task) => task.category === activeCategory);

  return (
    <div className="w-full min-h-screen px-4 py-6 md:px-6 lg:px-8 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 text-center">
        All Tasks
      </h2>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 w-full max-w-4xl">
        {categories.map((category) => (
          <motion.button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold shadow-md text-sm sm:text-base transition-colors ${
              activeCategory === category.name
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            <span>{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Task list */}
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <div className="flex flex-col gap-4 w-full max-w-4xl">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full bg-purple-200 hover:bg-purple-300"
              >
                <div className="flex items-center gap-3 mb-2 md:mb-0 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id, !task.completed)}
                    className="w-5 h-5 text-purple-700 accent-purple-700"
                  />
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 px-2 py-1 rounded border border-purple-400 focus:outline-none"
                    />
                  ) : (
                    <span
                      className={`font-medium break-words ${
                        task.completed
                          ? "text-purple-500 line-through"
                          : "text-purple-700"
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mt-2 md:mt-0">
                  <span
                    className={`text-sm ${
                      task.completed ? "text-purple-400" : "text-purple-500"
                    }`}
                  >
                    {task.category}
                  </span>

                  {editingId === task.id ? (
                    <>
                      <motion.button
                        onClick={() => saveEdit(task.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                      >
                        Save
                      </motion.button>
                      <motion.button
                        onClick={cancelEdit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-400 hover:bg-gray-300 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                      >
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        onClick={() => startEdit(task)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => deleteTask(task.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded shadow text-sm sm:text-base"
                      >
                        Delete
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-purple-500 italic text-center mt-6"
          >
            No tasks in this category
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
