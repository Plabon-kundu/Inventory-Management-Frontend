const MovementLogTable = ({ logs }) => {
  return (
    <div className="table-container">
      <table className="movement-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Warehouse</th>
            <th>User</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.product}</td>
              <td>{log.warehouse}</td>
              <td>{log.user}</td>
              <td>{log.type}</td>
              <td>{log.quantity}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementLogTable;