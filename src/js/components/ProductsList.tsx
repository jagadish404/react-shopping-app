import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, Box, Stack, styled, Typography } from "@mui/material";

import Product from "./Product";
import NoResults from "./NoResults";
import { fetchData } from "../reducers/productSlice";
import { RootState, useAppDispatch } from "@/store";
import FilterSection from "./FilterSection";

const ProductsGrid = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "1rem",
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
    <Stack component="section" direction={"row"} flex={"1 1 auto"} sx={{ columnGap: 2 }}>
      <Box component="aside" flex={"0 0 auto"} sx={{ p: 2, bgcolor: "background.paper" }}>
        <FilterSection />
      </Box>
      <Box component={"section"} sx={{ p: 2, bgcolor: "background.paper" }} flex={"1 1 auto"}>
        <Typography variant="h6" mb={1}>
          Products List
        </Typography>
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
      </Box>
    </Stack>
  );
};

export default ProductsList;
