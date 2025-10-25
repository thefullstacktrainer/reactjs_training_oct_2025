const { useState } = React;
function CreditCardAccount() {
    const [creditLimit, setCreditLimit] = useState(1000000);
    const [spent, setSpent] = useState(200000);
    const [available, setAvailable] = useState(creditLimit - spent)
    function updateCreditAmount(amount) {
        setSpent(spent + amount)
        setAvailable(available - amount)
    }
    return (<div className="account-card">
        <h3>Credit Card</h3>
        <p>Credit Limit : Rs: {helper.formatCurrency(creditLimit)}</p>
        <p>Spent : {helper.formatCurrency(spent)}</p>
        <p>Available : {helper.formatCurrency(available)}</p>
        <button onClick={() => updateCreditAmount(10000)}>Spend 10000</button>
    </div>)
}