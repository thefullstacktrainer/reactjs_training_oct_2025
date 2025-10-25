

function SBIDashboard({ name: customerName, accountNumber, branch, hasDeposit, hasLoan, hasCreditCard }) {
    console.log(hasDeposit)
    return (<div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>SBI Banking Dashboard</h2>
        <p>Customer : {customerName}</p>
        <p>Account Number : {accountNumber}</p>
        <p>Branch : {branch}</p>
        <hr />

        {hasDeposit && <DepositAccount />}
     {hasLoan && <LoanAccount />}
        {hasCreditCard && <CreditCardAccount />}
    </div>);
}

