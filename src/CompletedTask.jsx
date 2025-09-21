import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompletedTasks({ userId }) {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const currentUserId = userId || storedUser?.id;

  const [tasks, setTasks] = useState([]);

  // 🔹 Load tasks from backend
  const loadTasks = async () => {
    const res = await fetch(`http://localhost:3001/tasks/${currentUserId}`);
    const data = await res.json();
    setTasks(data);
  };

  // 🔹 Save updates to backend
  const updateTask = async (taskId, updates) => {
    await fetch(`http://localhost:3001/tasks/${currentUserId}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:3001/tasks/${currentUserId}/${taskId}`, {
      method: "DELETE",
    });
    loadTasks();
  };

  const restoreTask = (taskId) => {
    updateTask(taskId, { completed: false });
  };

  useEffect(() => {
    loadTasks();
    window.addEventListener("tasksUpdated", loadTasks); // refresh if AddTask fires event
    return () => window.removeEventListener("tasksUpdated", loadTasks);
  }, [currentUserId]);

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex flex-col items-center p-4 md:p-8 min-h-screen rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center">
        Completed Tasks
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key="completed-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid gap-4 w-full"
        >
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-purple-200 rounded-lg shadow-md flex justify-between items-center hover:shadow-xl hover:bg-purple-300 transition-all duration-300"
              >
                <span className="line-through text-purple-700 font-medium">
                  {task.text}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-purple-500">
                    {task.category}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => restoreTask(task.id)}
                    className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded shadow"
                  >
                    Restore
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTask(task.id)}
                    className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded shadow"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              key="empty-completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-purple-500 italic text-center"
            >
              No completed tasks yet
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
