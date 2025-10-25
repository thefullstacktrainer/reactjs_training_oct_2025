function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function logEvent(message) {
  console.log("[SBI Log]: " + message);
}

const helper = { formatCurrency, logEvent };
