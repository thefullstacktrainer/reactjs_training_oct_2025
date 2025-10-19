const { useState } = React;

function SBIDashboard({name : customerName, accountNumber, branch, hasDeposit}) {
    console.log(hasDeposit)
    return (<div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>SBI Banking Dashboard</h2>
        <p>Customer : {customerName}</p>
        <p>Account Number : {accountNumber}</p>
        <p>Branch : {branch}</p>
        <hr/>

        {hasDeposit && <DepositAccount />}
    </div>);
}

function DepositAccount(){
    const [balance, setBalance] = useState(100000);
    return (<div style={{ border :"1px solid #0077b6", padding: "10px", margin: "10px" }}>
        <h3>Deposit Account</h3>
        <p>Balance : Rs:{balance}</p>
        <p>Interest : (3.5%)</p>
        <button onClick={() => setBalance(balance + 1000)}>Deposit 1000</button>
        <button onClick={() => setBalance(balance - 1000)}>Withdraw 1000</button>
    </div>)
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<SBIDashboard name="Harish" accountNumber="46858" branch="Andheri East"
    hasDeposit={true} />)
