import { useSelector } from "react-redux";
import { Typography, Box, AppBar, Toolbar, Container, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Link as ReactRouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

import { RootState } from "@/store";

const Link = styled(ReactRouterLink)({
  textDecoration: "none",
  color: "inherit",
});

const Header = () => {
  const itemsCount = useSelector((state: RootState) => state.cart.totalCount);
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link to="/">
            <Typography variant="h4">React Store</Typography>
          </Link>
          <Link to="/CartPage">
            <IconButton color="inherit">
              <Typography variant="h6">Cart</Typography>
              <Badge badgeContent={itemsCount ?? "0"} color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
