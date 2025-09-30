import { useEffect } from "react";
import { useSelector } from "react-redux";

import Product from "./Product";
import NoResults from "./NoResults";

import "../../css/productsList.css";

import { fetchData } from "../reducers/productSlice";
import FilterSection from "./FilterSection";
import Header from "./Header";
import { RootState, useAppDispatch } from "@/store";
import { Stack, Typography } from "@mui/material";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { entities: productsList, status: fetchStatus } = useSelector((state: RootState) => state.products);
  const { selected: filtersSelected } = useSelector((state: RootState) => state.filters);
  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

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
    <>
      <Typography variant="h5">Products List</Typography>
      {fetchStatus === "pending" && <div>Loading products..</div>}
      {fetchStatus === "fulfilled" && (
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
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
        </Stack>
      )}
      {fetchStatus === "failed" && <div>Error while fetching data!!</div>}
    </>
  );
};

export default ProductsList;
