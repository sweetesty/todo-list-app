import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
  Navigate,
} from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./login";
import Signup from "./Signup";
import AllTasks from "./AllTask";
import AddTask from "./AddTask";
import CompletedTasks from "./CompletedTask";
import NotFound from "./NotFound";
import Footer from "./Footer";

// Navbar component
function Navbar({ userName }) {
  return (
    <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        {userName ? `${userName}'s Tasks` : "Task Manager"}
      </h1>
      <nav className="flex gap-4">
        <Link className="hover:underline" to="/all">
          All Tasks
        </Link>
        <Link className="hover:underline" to="/add">
          Add Task
        </Link>
        <Link className="hover:underline" to="/completed">
          Completed
        </Link>
      </nav>
    </header>
  );
}

// Main App content
function AppContent() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setUserId(savedUser.id);
      setUserName(savedUser.name);
    }
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: userId, name: userName })
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [userId, userName]);

  // Hide navbar on login/signup/home
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar userName={userName} />}
      <main className="flex-grow p-4 md:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(user) => {
                  setUserId(user.email);
                  setUserName(user.name);
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                onSignup={(user) => {
                  setUserId(user.email);
                  setUserName(user.name);
                }}
              />
            }
          />

          {userId ? (
            <>
              <Route path="/all" element={<AllTasks userId={userId} />} />
              <Route path="/add" element={<AddTask userId={userId} />} />
              <Route
                path="/completed"
                element={<CompletedTasks userId={userId} />}
              />
            </>
          ) : (
            <>
              <Route path="/all" element={<Navigate to="/login" replace />} />
              <Route path="/add" element={<Navigate to="/login" replace />} />
              <Route
                path="/completed"
                element={<Navigate to="/login" replace />}
              />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// App wrapper with HashRouter
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
