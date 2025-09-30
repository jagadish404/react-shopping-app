import { Link } from "react-router-dom";
import { addItemToCart } from "../reducers/cartSlice";
import { ProductData } from "@/js/types";

import "../../css/productsList.css";
import { useAppDispatch } from "@/store";
import { Button, ButtonGroup, Card, CardActions, CardContent, styled, Typography } from "@mui/material";

interface ProductProps {
  product: ProductData;
  productIndex: number;
  count?: number;
}

const ProductCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  maxHeight: "400px",
  width: "250px",
  margin: "1rem",
  gap: "0.25rem",
});

const ProductCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  flex: "1 1 auto",
});

const ProductImage = styled("img")({
  minWidth: "80px",
});

const Product: React.FC<ProductProps> = ({ product, productIndex, count = 0 }) => {
  const dispatch = useAppDispatch();

  const { image, name, price } = product;

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <ProductCard>
      <ProductCardContent>
        <Link to={`/ProductDetails/${productIndex}`}>
          <ProductImage data-testid="product-image" alt={image} src={`./assets/${image}`} />
        </Link>
        <Typography align="center">{name}</Typography>
        <Typography variant="h6">${price}</Typography>
      </ProductCardContent>
      <CardActions>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button variant="outlined">-</Button>
          <Button variant="contained" size="large" fullWidth={false} onClick={handleAddToCart}>
            Add To Cart
          </Button>
          <Button variant="outlined">+</Button>
        </ButtonGroup>
      </CardActions>
    </ProductCard>
  );
};

export default Product;
export type { ProductData, ProductProps };
