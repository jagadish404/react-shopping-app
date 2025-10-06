import { useSelector } from "react-redux";
import { Stack, styled, Typography } from "@mui/material";

import Product from "./Product";
import NoResults from "./NoResults";
import { RootState } from "@/store";
import CartItem from "./CartItem";
import theme from "../theme";

const ProductsGrid = styled(Stack)({
  gap: "0.1rem",
});

const CartPage = () => {
  const { items: cartItems, totalCount } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <Typography variant="h6" mb={1}>
        My Cart({totalCount})
      </Typography>
      <ProductsGrid>
        {totalCount > 0 ? (
          cartItems.map(({ product, count }, index) => (
            <CartItem
              key={`${product.brand}_${product.name}_${product.price}`}
              product={product}
              productIndex={index}
              count={count}
            />
          ))
        ) : (
          <NoResults content="No products added to cart!" />
        )}
      </ProductsGrid>
    </>
  );
};

export default CartPage;
