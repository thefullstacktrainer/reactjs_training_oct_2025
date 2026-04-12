import CareerCardMini from "./CareerCardMini";

export default function CareerGrid({ careers }) {
  return (
    <section className="career-grid">
      {careers.map((c) => (
        <CareerCardMini key={c.id} title={c.title} category={c.category} />
      ))}
    </section>
  );
}
