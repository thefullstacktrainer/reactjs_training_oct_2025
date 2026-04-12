export default function CareerListSnapshot({ careers }) {
  return (
    <ul>
      {careers.map((career) => (
        <li key={career.id}>{career.title}</li>
      ))}
    </ul>
  );
}
