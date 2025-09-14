import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-purple-700 text-white py-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Esther Todo List App. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="#"
            className="text-purple-200 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-purple-200 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
