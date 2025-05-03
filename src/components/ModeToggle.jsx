import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const appliedTheme = theme === "system" ? getSystemTheme() : theme;

    root.classList.remove("light", "dark");
    root.classList.add(appliedTheme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {      
      const current = prev === "system" ? getSystemTheme() : prev;
      return current === "light" ? "dark" : "light";
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-10 h-10 rounded-full border bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Sun className="h-5 w-5 text-yellow-500 dark:hidden" />
        <Moon className="h-5 w-5 text-gray-200 hidden dark:block" />
        <span className="sr-only">Toggle Theme</span>
      </button>
    </div>
  );
}
