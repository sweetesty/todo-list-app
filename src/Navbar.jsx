import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavBar({ userName, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="bg-purple-700 text-white shadow-lg"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/all")}
        >
          {userName ? `Hello, ${userName}` : "Welcome"}
        </div>

        
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>

    
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } sm:flex sm:items-center sm:gap-4`}
        >
          {["All Tasks", "Add Task", "Completed"].map((item, idx) => {
            const path =
              item === "All Tasks"
                ? "/all"
                : item === "Add Task"
                ? "/add"
                : "/completed";
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255,255,255,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={path}
                  className="block px-3 py-1 rounded hover:bg-purple-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            );
          })}

          {userName && (
            <motion.button
              onClick={() => {
                onLogout();
                navigate("/");
                setIsOpen(false);
              }}
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="block px-3 py-1 rounded bg-purple-500 hover:bg-purple-600 transition font-semibold mt-2 sm:mt-0"
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
