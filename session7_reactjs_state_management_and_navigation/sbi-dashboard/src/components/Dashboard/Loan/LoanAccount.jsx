import helper from "../../../utils/helper";

export default function LoanAccount() {
  const loanAmount = 1000000;
  const emisPaid = 12;

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>Outstanding Loan: {helper.formatCurrency(loanAmount)}</p>
      <p>EMIs Paid: {emisPaid}</p>
      <p>Use tabs above to see Loan Details or Loan History.</p>
    </div>
  );
}
