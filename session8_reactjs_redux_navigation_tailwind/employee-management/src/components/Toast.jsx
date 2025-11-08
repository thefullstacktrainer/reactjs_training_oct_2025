import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const color =
    type === "error"
      ? "bg-red-600"
      : type === "info"
      ? "bg-blue-600"
      : "bg-green-600";

  return (
    <div
      className={`${color} fixed top-6 right-6 text-white px-4 py-2 rounded shadow-md text-sm z-50`}
    >
      {message}
    </div>
  );
}
