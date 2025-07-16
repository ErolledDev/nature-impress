"use client";

import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/24/outline";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center">
      <SunIcon className="w-4 h-4 mr-2" aria-hidden="true" />
      <label htmlFor="theme-select" className="sr-only">
        Choose theme
      </label>
      <select
        id="theme-select"
        name="themeSwitch"
        value={theme}
        onChange={e => setTheme(e.target.value)}
        className="bg-transparent border-none outline-none text-sm"
        aria-label="Theme selection">
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;