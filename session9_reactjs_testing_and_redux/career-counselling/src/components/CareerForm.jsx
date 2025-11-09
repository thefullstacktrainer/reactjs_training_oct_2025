export default function CareerForm() {
  return (
    <form aria-label="career application form">
      <h2>Career Counselling Form</h2>

      <label htmlFor="fullname">Full Name</label>
      <input
        id="fullname"
        type="text"
        placeholder="Enter your full name"
        value="Lakshmikant Deshpande"
        onChange={() => {}}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        aria-label="Email Address"
        onChange={() => {}}
      />

      <img
        src="/career.png"
        alt="Career logo"
        title="Career Path Info"
        width="50"
      />

      <button type="submit" data-testid="submit-btn">
        Submit
      </button>
    </form>
  );
}
