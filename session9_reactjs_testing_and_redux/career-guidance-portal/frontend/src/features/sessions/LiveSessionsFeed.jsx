import { useSelector } from "react-redux";
export default function LiveSessionsFeed() {
  const { liveSessions } = useSelector((state) => state.sessionEvents);
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">🟢 Live Feed</h3>
      {liveSessions.length === 0 && <p>No new sessions yet...</p>}
      <ul className="space-y-1">
        {liveSessions.map((session) => (
          <li key={session.id} className="border-b py-1">
            <span className="font-medium">{session.title}</span> – {session.mentor}
            <span className="text-xs text-gray-500 ml-2">{new Date(session.createdAt).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
