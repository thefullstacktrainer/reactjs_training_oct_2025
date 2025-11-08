import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md text-sm z-50 transition-opacity duration-300">
      {message}
    </div>
  );
}
