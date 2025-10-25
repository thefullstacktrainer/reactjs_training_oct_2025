const { useState, useEffect } = React;

function SBIDashboard() {
    // { name: customerName, accountNumber, branch, hasDeposit, hasLoan, hasCreditCard }
    const [customer, setCustomer] = useState({});
    const [rates, setRates] = useState({});

    useEffect(() => {
        const custDetails = bankingService.getCustomerDetails();
        console.log(custDetails)
        console.log(customer)
        setCustomer(custDetails);
        console.log(customer)
        bankingService.fetchInterestRates().then((data) => setRates(data))
    }, [])

    return (<div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>SBI Banking Dashboard</h2>
        <p>Customer : {customer.name}</p>
        <p>Account Number : {customer.accountNumber}</p>
        <p>Branch : {customer.branch}</p>
        <hr />
        {rates.deposit && <p>Fetched interest rated -- Deposit : {rates.deposit}%
            | Loan : {rates.loan}% | Credit : {rates.credit}%</p>}
        {customer.hasDeposit && <DepositAccount />}
        {customer.hasLoan && <LoanAccount />}
        {customer.hasCreditCard && <CreditCardAccount />}
    </div>);
}

