import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      
      if (!foundUser.id) {
        foundUser.id = Date.now().toString();
        const updatedUsers = users.map((u) =>
          u.email === foundUser.email ? foundUser : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      
      const loggedInUser = {
        id: foundUser.id,
        name: foundUser.name || "User",
        email: foundUser.email,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      
      if (onLogin) onLogin(loggedInUser);

  
      setAlert({ type: "success", message: `✅ Welcome, ${loggedInUser.name}!` });

      
      setTimeout(() => {
        navigate("/all"); 
      }, 1200);
    } else {
      setAlert({ type: "error", message: "❌ Incorrect email or password!" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-6">
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          Login
        </h2>

        {alert && (
          <div
            className={`p-3 mb-4 rounded text-center ${
              alert.type === "error"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 shadow-md"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-700 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
