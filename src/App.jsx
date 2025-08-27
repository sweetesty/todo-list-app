import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllTasks from "./AllTask"
import CompletedTasks from "./CompletedTask"
import AddTask from "./AddTask"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-pink-50 flex flex-col">
        {/* Header / Navigation */}
        <header className="bg-pink-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">💖 My Bucket List 💖</h1>
          <nav className="flex flex-wrap justify-center gap-2">
            <Link
              to="/"
              className="bg-pink-300 hover:bg-pink-400 text-pink-900 font-bold px-3 py-1 rounded"
            >
              All Tasks
            </Link>
            <Link
              to="/add"
              className="bg-pink-300 hover:bg-pink-400 text-pink-900 font-bold px-3 py-1 rounded"
            >
              Add Task
            </Link>
            <Link
              to="/completed"
              className="bg-pink-300 hover:bg-pink-400 text-pink-900 font-bold px-3 py-1 rounded"
            >
              Completed Tasks
            </Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-8">
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-pink-600 text-white text-center p-4">
          Made with 💖 by Me
        </footer>
      </div>
    </Router>
  );
}

export default App;