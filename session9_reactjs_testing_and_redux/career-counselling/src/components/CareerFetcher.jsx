import { useEffect, useState } from "react";

export default function CareerFetcher({ loadCareers }) {
  const [careers, setCareers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");
      try {
        const data = await loadCareers();
        setCareers(data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
    fetchData();
  }, [loadCareers]);

  if (status === "loading") return <p>Loading careers...</p>;
  if (status === "error") return <p role="alert">Failed to load careers.</p>;

  return (
    <div>
      <h3>Available Careers</h3>
      <ul>
        {careers.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
