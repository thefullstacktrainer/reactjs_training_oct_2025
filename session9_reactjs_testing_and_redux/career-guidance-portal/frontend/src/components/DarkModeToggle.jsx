import { useEffect, useState } from "react";
export default function DarkModeToggle(){
  const [isDarkMode, setIsDarkMode]=useState(localStorage.theme==="dark");
  useEffect(()=>{
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.theme = isDarkMode ? "dark" : "light";
  },[isDarkMode]);
  return (
    <button onClick={()=>setIsDarkMode(!isDarkMode)} className="ml-4 bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded">
      {isDarkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
