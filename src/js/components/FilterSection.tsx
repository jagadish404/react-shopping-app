import { FilterType } from "../types";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { selectFilter } from "../reducers/filterSlice";
import { Alert, Box, Checkbox, FormControlLabel, Stack } from "@mui/material";

const FilterSection = () => {
  const { entities: filters, selected: filtersSelected } = useSelector((state: RootState) => state.filters);
  const dispatch = useAppDispatch();

  const updateFilter = (value: string) => {
    const dataFilter = value.split("_");

    if (dataFilter && dataFilter.length === 2) {
      const [type, value] = dataFilter;

      dispatch(selectFilter({ type: type as FilterType, value }));
    }
  };

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
    return <Alert severity="info">No filters!!</Alert>;
  }

  return (
    <>
      {filters.map((filter) => (
        <Stack mb={2} key={filter.name}>
          <Box mb={1} textTransform={"capitalize"}>
            {filter.name}
          </Box>
          {filter.values.map((value) => (
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={value}
              key={`${filter.name}_${value}`}
              data-filter={`${filter.name}_${value}`}
              onChange={() => updateFilter(`${filter.name}_${value}`)}
              checked={isChecked(filter.name, value)}
            />
          ))}
        </Stack>
      ))}
    </>
  );
};

export default FilterSection;
