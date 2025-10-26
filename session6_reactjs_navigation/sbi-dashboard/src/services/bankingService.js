import helper from "../utils/helper";

const bankingService = {
  getCustomerDetails: () => ({
    name: "Harish",
    accountNumber: "46564",
    branch: "Andheri East",
    hasDeposit: true,
    hasLoan: true,
    hasCreditCard: true,
  }),

  fetchInterestRates: async () => {
    helper.logEvent("Fetching interest rates...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ deposit: 3.5, loan: 9.0, credit: 14.5 });
      }, 1000);
    });
  },
};

export default bankingService;
