import { Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../reducers/cartSlice";
import { ProductData } from "@/js/types";

import { useAppDispatch } from "@/store";
import { Box, CardContent, IconButton, Stack, styled, Typography } from "@mui/material";
import { AddCircle, Remove } from "@mui/icons-material";
import theme from "../theme";

interface ProductProps {
  product: ProductData;
  productIndex: number;
  count?: number;
}

const CartItemCard = styled(Stack)({
  flexDirection: "row",
  padding: "0.5rem",
  maxHeight: "400px",
  gap: "1rem",
  backgroundColor: theme.palette.background.paper,
});

const CartItemCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  flex: "0 1 auto",
  padding: 0,
});

const ProductImage = styled("img")({
  minWidth: "180px",
});

const CartItemDetails = styled(Stack)({
  flexDirection: "column",
  alignItems: "flex-start",
  flex: "1 1 auto",
});

const CartItem: React.FC<ProductProps> = ({ product, productIndex, count = 0 }) => {
  const dispatch = useAppDispatch();

  const { image, name, price } = product;

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(product));
  };

  return (
    <CartItemCard>
      <CartItemCardContent>
        <Link to={`/ProductDetails/${productIndex}`}>
          <ProductImage data-testid="product-image" alt={image} src={`./assets/${image}`} />
        </Link>
        <Box>
          <IconButton
            aria-label="remove item from cart"
            size="small"
            disabled={count <= 0}
            onClick={handleRemoveFromCart}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography component="span" sx={{ mx: 1 }}>
            {count}
          </Typography>
          <IconButton aria-label="add item to cart" size="small" onClick={handleAddToCart}>
            <AddCircle fontSize="small" />
          </IconButton>
        </Box>
      </CartItemCardContent>
      <CartItemDetails>
        <Typography align="center" variant="body2">
          {name}
        </Typography>
        <Typography variant="h6">${price}</Typography>
      </CartItemDetails>
    </CartItemCard>
  );
};

export default CartItem;
export type { ProductData, ProductProps };
