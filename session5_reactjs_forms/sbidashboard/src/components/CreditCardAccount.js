const { useState } = React;

function CreditCardAccount() {
  const [creditLimit, setCreditLimit] = useState(1000000);
  const [spent, setSpent] = useState(200000);
  const available = creditLimit - spent;

  function spend(amount) {
    setSpent(spent + amount);
  }

  return (
    <div className="account-card">
      <h3>💳 Credit Card</h3>
      <p>Credit Limit: {helper.formatCurrency(creditLimit)}</p>
      <p>Spent: {helper.formatCurrency(spent)}</p>
      <p>Available: {helper.formatCurrency(available)}</p>

      <div className="actions">
        <button onClick={() => spend(10000)}>Spend ₹10000</button>
      </div>
    </div>
  );
}
