import { Component } from "react";
import { FilterData, FilterType } from "../types";

interface FilterSectionProps {
  filters: FilterData[];
  filtersSelected: { [key in FilterType]?: string[] };
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterSection = ({ filters, filtersSelected, onFilterChange }: FilterSectionProps) => {
  const isChecked = (filterName: FilterType, value: string) => {
    if (!filtersSelected[filterName]) {
      return false;
    }
    return (
      filtersSelected[filterName]?.length > 0 &&
      filtersSelected[filterName]?.findIndex((filterValue) => filterValue === value) !== -1
    );
  };

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
                checked={isChecked(filter.name, value)}
              />
              <label htmlFor={`${filter.name}_${value}`}>{value}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
