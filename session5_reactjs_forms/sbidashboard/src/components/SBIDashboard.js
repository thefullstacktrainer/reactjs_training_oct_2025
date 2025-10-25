const { useState, useEffect } = React;

function SBIDashboard() {
    const [customer, setCustomer] = useState({});
    const [rates, setRates] = useState({});

    useEffect(() => {
        const custDetails = bankingService.getCustomerDetails();
        setCustomer(custDetails);
        bankingService.fetchInterestRates().then((data) => setRates(data));
    }, []);

    return (
        <div>
            <div className="dashboard-header">SBI Banking Dashboard</div>

            <div className="dashboard-container">
                <div className="customer-info">
                    <p><strong>Customer:</strong> {customer.name}</p>
                    <p><strong>Account Number:</strong> {customer.accountNumber}</p>
                    <p><strong>Branch:</strong> {customer.branch}</p>
                    <hr style={{ margin: "1rem 0" }} />
                    {rates.deposit && (
                        <p>
                            <strong>Interest Rates:</strong> Deposit {rates.deposit}% | Loan {rates.loan}% | Credit {rates.credit}%
                        </p>
                    )}
                </div>

                <div className="cards-grid">
                    {customer.hasDeposit && <DepositAccount />}
                    {customer.hasLoan && <LoanAccount />}
                    {customer.hasCreditCard && <CreditCardAccount />}
                </div>
            </div>
        </div>
    );
}
