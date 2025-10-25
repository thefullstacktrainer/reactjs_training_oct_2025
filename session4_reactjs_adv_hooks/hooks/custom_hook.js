const { useState } = React;

function useBankBalance(initialBalance = 0) {
    const [balance, setBalance] = useState(initialBalance);

    const deposit = (amount = 1000) => {
        setBalance(prev => prev + amount);
        console.log(`Deposited ${amount} into the account`)
    }

    const withdraw = (amount = 1000) => {

        setBalance(prev => {
            if (prev - amount < 0) {
                alert("Insufficient balance")
                return prev;
            } else {
                console.log(`Withdrew ${amount} into the account`)
                return prev - amount;
            }
        });
    }

    return [balance, deposit, withdraw]
}

function BankAccount() {
    const [balance, deposit, withdraw] = useBankBalance(10000);

    return (
        <div style={{ padding: "20px", border: "1px solid #0077b6", margin: "10px" }}>
            <h2>Bank Account</h2>
            <p> Balance : {balance}</p>
            <button onClick={() => deposit(1000)}>Deposit</button>
            <button onClick={() => withdraw(3000)}>Withdraw</button>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<BankAccount />)