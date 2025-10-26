import { useState } from 'react';
import helper from "../utils/helper";

function LoanAccount() {
  const [loanAmount, updateLoanAmount] = useState(1000000);
  const [emisPaid, updateEmisPaid] = useState(12);

  return (
    <div className="account-card">
      <h3>💸 Loan Account</h3>
      <p>Outstanding Loan: {helper.formatCurrency(loanAmount)}</p>
      <p>EMIs paid: {emisPaid}</p>

      <div className="actions">
        <button
          onClick={() => {
            updateLoanAmount(loanAmount - 10000);
            updateEmisPaid(emisPaid + 1);
          }}
        >
          Pay EMI ₹10000
        </button>
      </div>
    </div>
  );
}

export default LoanAccount;
