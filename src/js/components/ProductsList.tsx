import { useEffect } from "react";
import { useSelector } from "react-redux";

import Product from "./Product";
import NoResults from "./NoResults";

import { fetchData } from "../reducers/productSlice";
import { RootState, useAppDispatch } from "@/store";
import { Alert, Stack, styled, Typography } from "@mui/material";

const ProductsGrid = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
});

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
        <ProductsGrid>
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
        </ProductsGrid>
      )}
      {fetchStatus === "failed" && <Alert severity="error">Error while fetching data!!</Alert>}
    </>
  );
};

export default ProductsList;
