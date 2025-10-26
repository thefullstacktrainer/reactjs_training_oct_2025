export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function logEvent(message) {
  console.log("[SBI Log]: " + message);
}

export function formatDateTime(isoString) {
  try {
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return isoString;
  }
}

const helper = { formatCurrency, logEvent, formatDateTime };
export default helper;
