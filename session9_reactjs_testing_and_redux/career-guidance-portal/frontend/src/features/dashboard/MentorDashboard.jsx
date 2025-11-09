import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LiveSessionsFeed from "../sessions/LiveSessionsFeed";

export default function MentorDashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">🧑‍🏫 Welcome, {user?.name} (Mentor)</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link to="/sessions" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">My Sessions</Link>
        <Link to="/mentees" className="p-4 bg-gray-100 dark:bg-gray-800 rounded hover:shadow text-center">My Mentees</Link>
      </div>
      <div className="mt-6">
        <LiveSessionsFeed />
      </div>
    </div>
  );
}
