import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NavBar({ userName, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "All Tasks", path: "/all" },
    { name: "Add Task", path: "/add" },
    { name: "Completed", path: "/completed" },
  ];

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setIsOpen(false);
  };

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

        
        <div className="hidden sm:flex sm:items-center sm:gap-4">
          {navLinks.map((link, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255,255,255,0.7)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className="px-3 py-1 rounded hover:bg-purple-600 transition"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          {userName && (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(255,255,255,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition font-semibold"
            >
              Logout
            </motion.button>
          )}
        </div>

    
        <div className="sm:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="sm:hidden px-4 pb-4 flex flex-col gap-2 bg-purple-600"
        >
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="block px-3 py-2 rounded hover:bg-purple-500 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {userName && (
            <button
              onClick={handleLogout}
              className="block px-3 py-2 rounded bg-red-500 hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
