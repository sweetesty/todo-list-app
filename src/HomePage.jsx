import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "./assets/woman-1.png"; 
import whyImage from "./assets/todo.png";  


const Bubble = ({ size, x, y, delay, duration }) => (
  <motion.div
    className="absolute rounded-full bg-purple-300 opacity-20"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{ y: [0, -30, 0], x: [0, 20, -20, 0] }}
    transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
  />
);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-purple-100 via-purple-200 to-purple-100 text-gray-900 overflow-hidden min-h-screen">
      
      
      <div className="absolute inset-0 overflow-hidden">
        <Bubble size={80} x="10%" y="20%" delay={0} duration={6} />
        <Bubble size={120} x="50%" y="10%" delay={2} duration={8} />
        <Bubble size={60} x="80%" y="30%" delay={1} duration={5} />
        <Bubble size={100} x="25%" y="70%" delay={1.5} duration={7} />
        <Bubble size={70} x="75%" y="60%" delay={0.5} duration={6} />
      </div>

    
      <section className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-16 gap-10">
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 text-purple-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            FREE Online Task Manager
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Organize and manage your team like a boss with our task manager – free, intuitive, and full of powerful features.
          </motion.p>
          <motion.button
            onClick={() => navigate("/login")}
            className="relative bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="absolute inset-0 bg-white opacity-10 blur-xl animate-pulse"></span>
            Get Started
          </motion.button>
        </div>
        <div className="flex-1 flex justify-center">
          <motion.img
            src={heroImage}
            alt="Task Manager Screenshot"
            className="max-w-md w-full rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
        </div>
      </section>

      
      <section className="relative z-10 py-20 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        <div className="flex-1">
          <motion.img
            src={whyImage}
            alt="Why Choose Us"
            className="rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-6 text-purple-800">
            Why Choose Our Task Manager?
          </h2>
          <ul className="space-y-4 text-lg text-purple-900">
            <li>✅ <strong>Free Forever:</strong> Unlimited users, no credit card required.</li>
            <li>✅ <strong>Easy to Use:</strong> Invite team members, create projects, and assign tasks in minutes.</li>
            <li>✅ <strong>Versatile:</strong> Kanban boards, calendars, reports, automation tools, and more.</li>
          </ul>
        </div>
      </section>

      
      <section className="py-20 px-6 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-purple-800">
          Features That Boost Productivity
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: "📊", title: "Kanban & Gantt", desc: "Visualize projects, track progress, and manage timelines easily." },
            { emoji: "💬", title: "Collaboration Tools", desc: "Built-in chat, video calls, and meetings keep your team connected." },
            { emoji: "📱", title: "Mobile Friendly", desc: "iOS & Android apps let you manage tasks on the go." }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl shadow-lg bg-purple-50 hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-4xl block mb-3">{feature.emoji}</span>
              <h3 className="text-xl font-bold mb-2 text-purple-800">{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="py-20 px-6 text-center bg-purple-100 text-purple-900">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Organize Your Tasks?
        </h2>
        <motion.button
          onClick={() => navigate("/login")}
          className="relative bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold overflow-hidden shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <span className="absolute inset-0 bg-white opacity-10 blur-xl animate-pulse"></span>
          Get Started for Free
        </motion.button>
      </section>
    </div>
  );
}
