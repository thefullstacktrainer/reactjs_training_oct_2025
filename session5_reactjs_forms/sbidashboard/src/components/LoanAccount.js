const { useState } = React;
function LoanAccount() {
    const [loanAmount, updateLoanAmount] = useState(1000000);
    const [emisPaid, updateEmisPaid] = useState(12);
    return (<div className="account-card">
        <h3>Loan Account</h3>
        <p>Outstanding Loan : Rs: {helper.formatCurrency(loanAmount)}</p>
        <p>EMIs paid : {emisPaid}</p>
        <button onClick={() => {
            updateLoanAmount(loanAmount - 10000);
            updateEmisPaid(emisPaid + 1)
        }
        }>Pay EMI 10000</button>
    </div>)
}