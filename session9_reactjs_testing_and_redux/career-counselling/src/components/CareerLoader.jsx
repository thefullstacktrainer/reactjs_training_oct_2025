import { useEffect, useState } from "react";
import { fetchCareers } from "../services/api";

export default function CareerLoader() {
  const [careers, setCareers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    async function load() {
      setStatus("loading");
      try {
        const data = await fetchCareers();
        setCareers(data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
    load();
  }, [attempt]);

  if (status === "loading") return <p>Loading careers...</p>;
  if (status === "error")
    return (
      <div>
        <p role="alert">Failed to load careers.</p>
        <button onClick={() => setAttempt(a => a + 1)}>Retry</button>
      </div>
    );

  return (
    <div>
      <h3>Available Careers</h3>
      <ul>
        {careers.map(c => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
