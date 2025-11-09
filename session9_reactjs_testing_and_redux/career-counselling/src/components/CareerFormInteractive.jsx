import { useState } from "react";

export default function CareerFormInteractive() {
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Career Counselling Registration</h2>

      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="career">Choose Career</label>
      <select
        id="career"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
      >
        <option value="">Select</option>
        <option value="AI Engineer">AI Engineer</option>
        <option value="Cloud Architect">Cloud Architect</option>
      </select>

      <button type="submit">Submit</button>

      {submitted && (
        <p data-testid="success-msg">
          {`Welcome ${name}, you selected ${career}!`}
        </p>
      )}
    </form>
  );
}
