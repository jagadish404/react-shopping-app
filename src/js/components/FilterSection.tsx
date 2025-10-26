import { FilterType } from "../types";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { selectFilter, clearFilter } from "../reducers/filterSlice";
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";

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

  const clearFilterByType = (filterName: FilterType) => {
    dispatch(clearFilter({ type: filterName }));
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
        <Stack mb={1} key={filter.name} sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
          <Stack
            mb={1}
            textTransform={"capitalize"}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            direction={"row"}
          >
            <Typography variant="body1" fontWeight={600}>
              {filter.name}
            </Typography>
            <Button variant="text" onClick={() => clearFilterByType(filter.name)}>
              Clear
            </Button>
          </Stack>
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
