import { useSelector } from "react-redux";
import { Stack, styled, Typography } from "@mui/material";

import Product from "./Product";
import NoResults from "./NoResults";
import Header from "./Header";
import { RootState } from "@/store";

const ProductsGrid = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
});

const CartPage = () => {
  const { entities: cartItems, count } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <Typography variant="h6">My Cart({count})</Typography>
      <ProductsGrid>
        {count > 0 ? (
          cartItems.map((product, index) => (
            <Product key={`${product.brand}_${product.name}_${product.price}`} product={product} productIndex={index} />
          ))
        ) : (
          <NoResults content="No products added to cart!" />
        )}
      </ProductsGrid>
    </>
  );
};

export default CartPage;
