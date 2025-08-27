import React, { useState, useEffect } from "react";
import initialTasks from "./bucket.json"



function AllTask() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myBucketList");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("myBucketList", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const categoryColors = {
    Healing: "bg-pink-200",
    Fun: "bg-pink-200",
    "Self-Love": "bg-pink-200",
    Growth: "bg-pink-200",
    Adventure: "bg-pink-200",
    General: "bg-pink-200",
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-5 text-center">All Tasks</h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center mb-5 gap-2">
        {["All", "Healing", "Fun", "Self-Love", "Growth", "Adventure", "General"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded font-bold text-sm md:text-base ${
              filter === cat
                ? "bg-pink-600 text-white"
                : "bg-pink-200 text-pink-700 hover:bg-pink-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="w-full max-w-md">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 p-3 rounded ${categoryColors[task.category]}`}
          >
            <label className="flex items-start sm:items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(index)}
                className="w-5 h-5 accent-pink-500 mt-1 sm:mt-0"
              />
              <span className={`font-bold text-pink-700 ${task.done ? "text-pink-900" : ""}`}>
                [{task.category}] {task.text}
              </span>
            </label>
            <button
              onClick={() => deleteTask(index)}
              className="mt-2 sm:mt-0 bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 text-sm md:text-base"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTask;
