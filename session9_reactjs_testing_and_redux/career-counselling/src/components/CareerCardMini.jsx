export default function CareerCardMini({ title, category }) {
  return (
    <div className="mini-card">
      <h4>{title}</h4>
      <small>{category}</small>
    </div>
  );
}