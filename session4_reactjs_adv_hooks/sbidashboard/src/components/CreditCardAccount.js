const { useState } = React;
function CreditCardAccount() {
    const [creditLimit, setCreditLimit] = useState(1000000);
    const [spent, setSpent] = useState(200000);
    const [available, setAvailable] = useState(creditLimit - spent)
    function updateCreditAmount(amount) {
        setSpent(spent + amount)
        setAvailable(available - amount)
    }
    return (<div style={{ border: "1px solid #0077b6", padding: "10px", margin: "10px" }}>
        <h3>Credit Card</h3>
        <p>Credit Limit : Rs:{creditLimit}</p>
        <p>Spent : {spent}</p>
        <p>Available : {available}</p>
        <button onClick={() => updateCreditAmount(10000)}>Spend 10000</button>
    </div>)
}