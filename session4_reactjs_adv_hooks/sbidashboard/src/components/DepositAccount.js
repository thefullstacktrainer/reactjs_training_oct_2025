const { useState } = React;
function DepositAccount() {
    const [balance, setBalance] = useState(100000);
    return (<div style={{ border: "1px solid #0077b6", padding: "10px", margin: "10px" }}>
        <h3>Deposit Account</h3>
        <p>Balance : Rs: {formatCurrency(balance)}</p>
        <p>Interest : (3.5%)</p>
        <button onClick={() => setBalance(balance + 1000)}>Deposit 1000</button>
        <button onClick={() => setBalance(balance - 1000)}>Withdraw 1000</button>
    </div>)
}