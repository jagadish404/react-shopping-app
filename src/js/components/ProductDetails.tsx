import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addItemToCart } from "../reducers/cartSlice";
import { RootState, useAppDispatch } from "@/store";
import { Alert, Box, Button, ButtonGroup, Paper, Stack, styled, Typography } from "@mui/material";

const ProductImage = styled("img")({
  maxWidth: "200px",
  maxHeight: "300px",
  height: "100%",
});

const ProductDetailsContainer = styled(Paper)({
  padding: "1rem",
  backgroundColor: "warning.main",
});

const ProductRow = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const ProductLeftCol = styled(Stack)({
  flexBasis: "300px",
  alignItems: "center",
  justifyContent: "center",
  mr: "1rem",
});

const ProductRightCol = styled(Stack)({
  flex: "1 1 50%",
  alignItems: "flex-start",
});

function ProductDetails() {
  const productsList = useSelector((state: RootState) => state.products.entities);
  const { productIndex: index } = useParams();

  if (index === undefined) {
    return <div>Product not found</div>;
  }

  const productIndex = parseInt(index);
  const dispatch = useAppDispatch();
  const productsData = productsList[productIndex];

  const addToCart = () => {
    dispatch(addItemToCart(productsList[productIndex]));
  };

  return (
    <>
      {productsData == void 0 ? (
        <Box>
          <Alert severity="error">Error fetching product details!</Alert>
        </Box>
      ) : (
        <ProductDetailsContainer elevation={3}>
          <Typography variant="h6" component={"div"} mb={1}>
            {productsData.name}
          </Typography>
          <ProductRow>
            <ProductLeftCol>
              <ProductImage alt={productsData.image} src={`../assets/${productsData.image}`} />
            </ProductLeftCol>
            <ProductRightCol spacing={2}>
              <Typography variant="body1">{productsData.measurement}</Typography>
              <Typography variant="h6">${productsData.price}</Typography>
              <Typography variant="body1">{productsData.desc}</Typography>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button variant="outlined">-</Button>
                <Button variant="contained" size="large" fullWidth={false} onClick={addToCart}>
                  Add To Cart
                </Button>
                <Button variant="outlined">+</Button>
              </ButtonGroup>
            </ProductRightCol>
          </ProductRow>
        </ProductDetailsContainer>
      )}
    </>
  );
}

export default ProductDetails;
