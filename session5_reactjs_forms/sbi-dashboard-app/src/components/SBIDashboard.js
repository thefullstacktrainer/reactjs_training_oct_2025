import { useState, useEffect } from 'react';
import bankingService from "../services/bankingService";
import DepositAccount from "./DepositAccount";
import LoanAccount from "./LoanAccount";
import CreditCardAccount from "./CreditCardAccount";

function SBIDashboard() {
  const [customer, setCustomer] = useState({});
  const [rates, setRates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const custDetails = bankingService.getCustomerDetails();
    setCustomer(custDetails);
    bankingService.fetchInterestRates().then((data) => setRates(data));
  }, []);

  const accounts = [
    { name: "Deposit", show: customer.hasDeposit, component: <DepositAccount /> },
    { name: "Loan", show: customer.hasLoan, component: <LoanAccount /> },
    { name: "Credit Card", show: customer.hasCreditCard, component: <CreditCardAccount /> },
  ];

  const filteredAccounts = accounts.filter((acc) => {
    const matchType =
      filterType === "all" || acc.name.toLowerCase().includes(filterType.toLowerCase());
    const matchSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase());
    return acc.show && matchType && matchSearch;
  });

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

        {/* <div className="filter-bar">
          <input
            type="text"
            placeholder="Search account type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Accounts</option>
            <option value="deposit">Deposit</option>
            <option value="loan">Loan</option>
            <option value="credit">Credit Card</option>
          </select>
        </div> */}

        <div className="cards-grid">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((acc, idx) => <div key={idx}>{acc.component}</div>)
          ) : (
            <p className="no-results">No accounts match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}


export default SBIDashboard;