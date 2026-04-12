export async function fetchCareers() {
  const res = await fetch("/api/careers");
  if (!res.ok) throw new Error("Network error");
  return res.json();
}
