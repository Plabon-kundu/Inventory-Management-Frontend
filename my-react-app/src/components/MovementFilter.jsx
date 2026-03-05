const MovementFilter = ({
  filterType,
  setFilterType,
  filterProduct,
  setFilterProduct,
  filterDate,
  setFilterDate
}) => {
  return (
    <div className="filter-container">

      <select value={filterType} onChange={e => setFilterType(e.target.value)}>
        <option value="">All Types</option>
        <option value="SALE">Sale</option>
        <option value="PURCHASE">Purchase</option>
      </select>

      <input
        type="text"
        placeholder="Search Product..."
        value={filterProduct}
        onChange={e => setFilterProduct(e.target.value)}
      />

      <input
        type="date"
        value={filterDate}
        onChange={e => setFilterDate(e.target.value)}
      />

      {/* Optional: you can keep a Filter button if you want */}
      {/* <button>Filter</button> */}

    </div>
  );
};

export default MovementFilter;