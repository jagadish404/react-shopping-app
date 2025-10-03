import { Typography } from "@mui/material";

const ProductNotFound = () => {
  return (
    <Typography align="center" sx={{ mt: 4 }}>
      <Typography variant="h2">Product Not Found</Typography>
      <Typography variant="body1">The product you are looking for does not exist.</Typography>
    </Typography>
  );
};

export default ProductNotFound;
