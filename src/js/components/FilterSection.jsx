import React, { Component } from "react";

export default class FilterSection extends Component {
  render() {
    const { filters, filtersSelected, onFilterChange } = this.props;
    if (filters.length === 0) {
      return <div>No filters!!</div>;
    }

    return (
      <div>
        {filters.map((filter) => (
          <div className="Product-filters" key={filter.name}>
            <div className="Product-filter-name">{filter.name}</div>
            {filter.values.map((value) => (
              <div className="Product-filter-value" key={`${filter.name}_${value}`}>
                <input
                  type="checkbox"
                  data-filter={`${filter.name}_${value}`}
                  id={`${filter.name}_${value}`}
                  name={filter.name}
                  onChange={onFilterChange}
                  checked={
                    filtersSelected.length &&
                    filtersSelected.findIndex(
                      (filterData) => filterData.type === filter.name && filterData.value === value
                    ) !== -1
                  }
                />
                <label htmlFor={`${filter.name}_${value}`}>{value}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
