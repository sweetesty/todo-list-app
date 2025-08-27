import React, { useState, useEffect } from "react";
import initialTasks from "./bucket.json"

function  AddTask () {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myBucketList");
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    localStorage.setItem("myBucketList", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text) return;
    const newTask = { text, category, done: false };
    setTasks([...tasks, newTask]);
    setText("");
    setCategory("General");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-5">Add New Task</h2>
      <div className="w-full max-w-md flex flex-col space-y-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task name"
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {["Healing", "Fun", "Self-Love", "Growth", "Adventure", "General"].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="bg-pink-500 text-white font-bold p-2 rounded hover:bg-pink-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
