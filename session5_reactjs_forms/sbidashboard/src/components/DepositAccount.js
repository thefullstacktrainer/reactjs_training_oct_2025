const { useState } = React;

function DepositAccount() {
  const [balance, setBalance] = useState(100000);

  return (
    <div className="account-card">
      <h3>🏦 Deposit Account</h3>
      <p>Balance: {helper.formatCurrency(balance)}</p>
      <p>Interest: (3.5%)</p>

      <div className="actions">
        <button onClick={() => setBalance(balance + 1000)}>Deposit ₹1000</button>
        <button onClick={() => setBalance(balance - 1000)}>Withdraw ₹1000</button>
      </div>
    </div>
  );
}
