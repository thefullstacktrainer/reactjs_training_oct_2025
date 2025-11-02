import { useState } from "react";
import helper from "../../../utils/helper";

export default function LoanDetails() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [emisPaid, setEmisPaid] = useState(12);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Loan Details</h4>
      <p>Outstanding Loan: {helper.formatCurrency(loanAmount)}</p>
      <p>EMIs Paid: {emisPaid}</p>
      <div className="actions">
        <button onClick={() => { setLoanAmount(loanAmount - 10000); setEmisPaid(emisPaid + 1); }}>
          Pay EMI ₹10000
        </button>
      </div>
    </div>
  );
}
