export default function CareerStatus({ isRegistered }) {
  return (
    <div>
      {isRegistered ? (
        <p>Welcome back! Continue your counselling journey.</p>
      ) : (
        <p>Please register to start your career counselling.</p>
      )}
    </div>
  );
}
