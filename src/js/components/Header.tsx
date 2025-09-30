import { useSelector } from "react-redux";
import { Typography, Box, AppBar, Toolbar, Container, Link } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { RootState } from "@/store";

const Header = () => {
  const itemsCount = useSelector((state: RootState) => state.cart.count);
  return (
    <Box component="header">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Link variant={"h4"} href="/" sx={{ color: "inherit", textDecoration: "none" }}>
              React Store
            </Link>
            <Link href="/CartPage" color="inherit">
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
    </Box>
  );
};

export default Header;
