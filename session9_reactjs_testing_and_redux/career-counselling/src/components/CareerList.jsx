import CareerCard from "./CareerCard";

export default function CareerList({ careers = [] }) {
  if (careers.length === 0) {
    return <p>No careers available</p>;
  }

  return (
    <div className="career-list">
      <h2>Available Career Paths</h2>
      {careers.map((career) => (
        <CareerCard
          key={career.id}
          title={career.title}
          description={career.description}
        />
      ))}
    </div>
  );
}
