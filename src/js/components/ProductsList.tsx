import { useEffect } from "react";
import { useSelector } from "react-redux";

import Product from "./Product";
import NoResults from "./NoResults";

import "../../css/productsList.css";

import { fetchData } from "../reducers/productSlice";
import { selectFilter } from "../reducers/filterSlice";
import FilterSection from "./FilterSection";
import Header from "./Header";
import { RootState, useAppDispatch } from "@/store";
import { FilterType } from "../types";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { entities: productsList, status: fetchStatus } = useSelector((state: RootState) => state.products);
  const { entities: filters, selected: filtersSelected } = useSelector((state: RootState) => state.filters);
  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const updateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataFilter = e.target.getAttribute("data-filter")?.split("_");

    if (dataFilter && dataFilter.length === 2) {
      const [type, value] = dataFilter;

      dispatch(selectFilter({ type: type as FilterType, value }));
    }
  };

  function getFilteredProducts() {
    const { price: priceFilter, brand: brandFilter } = filtersSelected;

    if (priceFilter?.length === 0 && brandFilter?.length === 0) {
      return productsList;
    }

    return productsList.filter(({ brand, price }) => {
      const index = priceFilter?.findIndex((value) => {
        const [minPrice, maxPrice] = value.split("-");
        return minPrice < price && price < maxPrice;
      });
      const includesPrice = priceFilter?.length && priceFilter.length > 0 && index !== -1;

      return (
        (priceFilter?.length === 0 || includesPrice) && (brandFilter?.length === 0 || brandFilter?.includes(brand))
      );
    });
  }

  return (
    <div className="App-page">
      <Header />
      <div className="App-body">
        <div className="Left-panel">
          <FilterSection filters={filters} filtersSelected={filtersSelected} onFilterChange={updateFilter} />
        </div>
        <div className="Right-panel">
          <h4>Products List</h4>
          {fetchStatus === "pending" && <div>Loading products..</div>}
          {fetchStatus === "fulfilled" && (
            <div className="Products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Product
                    key={`${product.brand}_${product.name}_${product.price}`}
                    product={product}
                    productIndex={index}
                  />
                ))
              ) : (
                <NoResults content="No products!" />
              )}
            </div>
          )}
          {fetchStatus === "failed" && <div>Error while fetching data!!</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
