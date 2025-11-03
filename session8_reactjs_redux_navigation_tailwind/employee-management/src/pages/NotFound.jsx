import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1 style={{ fontSize: "2rem", color: "tomato" }}>404 - Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          backgroundColor: "#003366",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
