import React, { useState } from "react";
import Greeting from "./components/Greeting";
import WelcomeUser from "./components/WelcomeUser";
import CareerStatus from "./components/CareerStatus";
import CareerListSnapshot from "./components/CareerListSnapshot";
import CareerGrid from "./components/CareerGrid";

import CareerList from "./components/CareerList";

import CareerFormInteractive from "./components/CareerFormInteractive";

import CareerFetcher from "./components/CareerFetcher";

import CareerLoader from "./components/CareerLoader";

export default function App() {
  const careers = [
    { id: 1, title: "Data Scientist", description: "Analyze data and build models" },
    { id: 2, title: "Cloud Architect", description: "Design scalable systems" },
    { id: 3, title: "AI Engineer", description: "Develop intelligent solutions" },
  ];

  const mockCareers = [
    { id: 1, title: "Cloud Engineer" },
    { id: 2, title: "Data Scientist" },
    { id: 3, title: "AI Researcher" },
  ];

  const gridCareers = [
    { id: 1, title: "DevOps Engineer", category: "IT Infrastructure" },
    { id: 2, title: "Product Manager", category: "Management" },
  ];

  const [simulateError, setSimulateError] = useState(false);

  async function loadCareers() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateError) reject(new Error("Failed to fetch"));
        else
          resolve([
            { id: 1, title: "AI Engineer" },
            { id: 2, title: "Cloud Architect" },
            { id: 3, title: "Data Analyst" },
          ]);
      }, 1500);
    });
  }

  return (
    <div className="app-container" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Career Counselling Portal – Testing Showcase</h1>

      <section style={{ marginBottom: "2rem" }}>
        <Greeting />
        <WelcomeUser name="Lakshmikant" />

        <div style={{ marginTop: "1.5rem" }}>
          <h3>Conditional Rendering Example</h3>
          <CareerStatus isRegistered={true} />
          <CareerStatus isRegistered={false} />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <h3>List Rendering Example</h3>
          <CareerListSnapshot careers={mockCareers} />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <h3>Nested Component Example (Career Grid)</h3>
          <CareerGrid careers={gridCareers} />
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Available Career Paths</h2>
        <CareerList careers={careers} />
        <div style={{ marginTop: "2rem" }}>
          <h3>Empty State Example</h3>
          <CareerList careers={[]} />
        </div>
      </section>


      <section style={{ marginTop: "3rem" }}>
        <h2>Interactive Career Counselling Form</h2>
        <CareerFormInteractive />
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>Async CareerFetcher Example</h2>
        <p>This component simulates an async API call. Toggle error mode below.</p>
        <button
          onClick={() => setSimulateError(prev => !prev)}
          style={{
            marginBottom: "1rem",
            background: simulateError ? "#d9534f" : "#5cb85c",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {simulateError ? "Switch to Success Mode" : "Switch to Error Mode"}
        </button>
        <CareerFetcher loadCareers={loadCareers} />
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2>CareerLoader (Service API + Retry Logic)</h2>
        <p>
          This component calls <code>fetchCareers()</code> from
          <code>src/services/api.js</code>.
          If the API fails, it displays an error with a retry button.
        </p>
        <CareerLoader />
      </section>
    </div>
  );
}
