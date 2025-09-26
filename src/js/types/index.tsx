export type FilterType = "price" | "brand";

export interface ProductData {
  brand: string;
  name: string;
  price: string;
  image: string;
  desc?: string;
  measurement?: string;
  count?: number;
}

export interface SelectedFilterData {
  type: FilterType;
  value: string[];
}

export interface FilterData {
  name: FilterType;
  values: string[];
}

export interface ProductsResponse {
  products: ProductData[];
  filters: FilterData[];
}
