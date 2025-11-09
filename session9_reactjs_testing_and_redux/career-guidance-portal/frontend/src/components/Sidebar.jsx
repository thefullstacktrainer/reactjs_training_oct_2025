import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigationItems = [];
  if (user?.role === "admin") {
    navigationItems.push(
      { path: "/dashboard", label: "Dashboard" },
      { path: "/students", label: "Students" },
      { path: "/sessions", label: "Sessions" },
      { path: "/mentors", label: "Mentors" },
      { path: "/analytics", label: "Analytics" },
      { path: "/live-analytics", label: "Live Analytics" },
      { path: "/logs", label: "Logs" },
      { path: "/activity", label: "Activity" }
    );
  } else if (user?.role === "mentor") {
    navigationItems.push(
      { path: "/dashboard", label: "Dashboard" },
      { path: "/students", label: "Students" },
      { path: "/sessions", label: "Sessions" },
      { path: "/live-analytics", label: "Live Analytics" },
      { path: "/activity", label: "Activity" }
    );
  }

  return (
    <aside className="w-60 bg-gray-800 text-white p-4 h-screen fixed">
      <h2 className="text-xl font-bold mb-4">Portal Menu</h2>
      <ul className="space-y-2">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="block p-2 rounded hover:bg-gray-700">{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
