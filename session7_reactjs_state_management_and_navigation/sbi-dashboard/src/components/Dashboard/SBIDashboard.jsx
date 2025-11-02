import { useEffect, useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import DepositAccount from "./DepositAccount";
import CreditCardAccount from "./CreditCardAccount";
import LoanAccount from "./Loan/LoanAccount";
import LoanDetails from "./Loan/LoanDetails";
import LoanHistory from "./Loan/LoanHistory";
import bankingService from "../../services/bankingService";
import FeedbackForm from "../Feedback/FeedbackForm";

export default function SBIDashboard() {
  const [customer, setCustomer] = useState({});
  const [rates, setRates] = useState({});

  useEffect(() => {
    setCustomer(bankingService.getCustomerDetails());
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
          {customer.hasCreditCard && <CreditCardAccount />}
          {customer.hasLoan && (
            <div className="account-card">
              <h3>💸 Loan Accounts</h3>
              <nav>
                <NavLink to="loan/details" className={({ isActive }) => isActive ? "active" : ""}>Details</NavLink>
                <NavLink to="loan/history" className={({ isActive }) => isActive ? "active" : ""}>History</NavLink>
              </nav>

              <Routes>
                <Route path="loan/details" element={<LoanDetails />} />
                <Route path="loan/history" element={<LoanHistory />} />
                <Route path="loan/*" element={<LoanAccount />} />
              </Routes>
            </div>
          )}
        </div>

        <div className="feedback-section">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
