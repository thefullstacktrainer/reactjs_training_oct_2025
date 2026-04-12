import bankingService from "../../../services/bankingService";
import helper from "../../../utils/helper";

export default function LoanHistory() {
  const history = bankingService.fetchLoanHistory();

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Loan History</h4>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {helper.formatDateTime(item.date)} - {helper.formatCurrency(item.amount)}
          </li>
        ))}
      </ul>
    </div>
  );
}
