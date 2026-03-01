import "../pages/SmartReorder.css";

const ReorderAlertBanner = ({ alertMessage }) => {
  // Logic to separate the number for highlighting
  const count = alertMessage.match(/\d+/); // Finds the number in the string
  const text = alertMessage.replace(/\d+/, ""); // Gets the rest of the text

  return (
    <div className="reorder-alert-banner">
      <div className="alert-dot"></div>
      <div className="alert-message">
        <span>{count}</span>{text}
      </div>
    </div>
  );
};

export default ReorderAlertBanner;