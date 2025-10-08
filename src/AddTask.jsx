
import React, { useState } from "react";
import { motion } from "framer-motion";

function AddTask({ userId }) {
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const currentUserId = userId || storedUser?.id;

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const addTask = async () => {
    if (!text.trim() || !currentUserId) return;

    const newTask = {
      text,
      category,
      completed: false,
      userId: currentUserId, // ✅ attach userId
    };

    try {
      await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      // Let AllTasks.jsx know we added something
      window.dispatchEvent(new Event("tasksUpdated"));

      // Reset form
      setText("");
      setCategory("General");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-5 text-center">
        Add New Task
      </h2>

      <motion.div
        className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 flex flex-col gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task name"
          className="flex-1 w-full p-2 sm:p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          whileFocus={{ scale: 1.02, borderColor: "#7C3AED" }}
        />

        <motion.select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 w-full p-2 sm:p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          whileFocus={{ scale: 1.02, borderColor: "#7C3AED" }}
        >
          {["Healing", "Fun", "Self Love", "Growth", "Adventure", "General"].map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          )}
        </motion.select>

        <motion.button
          onClick={addTask}
          className="flex-1 w-full bg-purple-700 text-white font-bold p-2 sm:p-3 rounded-lg hover:bg-purple-600 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Task
        </motion.button>
      </motion.div>
    </div>
  );
}

export default AddTask;
