import React from "react";

interface FilterSectionProps {
  filterType: string | null;
  filterPaymentOption: string | null;
  setFilterType: (type: string | null) => void;
  handlePaymentOptionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  applyFilter: () => void;
  clearFilter: () => void;
}

const FilterData: React.FC<FilterSectionProps> = ({
  filterType,
  filterPaymentOption,
  setFilterType,
  handlePaymentOptionChange,
  applyFilter,
  clearFilter,
}) => {
  return (
    <div className="filter-type">
      <h3>Filter by Business type:</h3>
      <label style={{ fontWeight: "normal" }}>
        <input
          type="radio"
          name="filterType"
          value="Small Business"
          checked={filterType === "Small Business"}
          onChange={() => setFilterType("Small Business")}
        />
        Small Business
      </label>
      <label style={{ fontWeight: "normal" }}>
        <input
          type="radio"
          name="filterType"
          value="Enterprise"
          checked={filterType === "Enterprise"}
          onChange={() => setFilterType("Enterprise")}
        />
        Enterprise
      </label>
      <label style={{ fontWeight: "normal" }}>
        <input
          type="radio"
          name="filterType"
          value="Entrepreneur"
          checked={filterType === "Entrepreneur"}
          onChange={() => setFilterType("Entrepreneur")}
        />
        Entrepreneur
      </label>
      <br />
      <button onClick={applyFilter} className="buttonDesign">
        Apply Filter
      </button>
      <div className="filter-payment">
        <h3>Filter by Payment option:</h3>
        <label style={{ fontWeight: "normal" }}>
          <input
            type="radio"
            name="filterPaymentOption"
            value="Cash on Delivery"
            checked={filterPaymentOption === "Cash on Delivery"}
            onChange={handlePaymentOptionChange}
          />
          Cash on Delivery
        </label>
        <label style={{ fontWeight: "normal" }}>
          <input
            type="radio"
            name="filterPaymentOption"
            value="UPI"
            checked={filterPaymentOption === "UPI"}
            onChange={handlePaymentOptionChange}
          />
          UPI
        </label>
        <label style={{ fontWeight: "normal" }}>
          <input
            type="radio"
            name="filterPaymentOption"
            value="Card payment"
            checked={filterPaymentOption === "Card payment"}
            onChange={handlePaymentOptionChange}
          />
          Card payment
        </label>
        <br />
        <button onClick={applyFilter} className="buttonDesign">
          Apply Filter
        </button>
        <button onClick={clearFilter} className="buttonDesign">
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default FilterData;
