import React, { useState, useEffect } from "react";
import initialTasks from "./bucket.json"

const CompletedTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("myBucketList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myBucketList", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-pink-600 mb-5">Completed Tasks</h2>
      <ul className="w-full max-w-md">
        {tasks.filter(task => task.done).map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-3 p-3 rounded bg-pink-300"
          >
            <span className="line-through text-pink-50 font-bold">
              [{task.category}] {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTasks;
