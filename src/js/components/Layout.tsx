import { Container, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";

const AppContainer = styled(Container)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Layout = () => {
  return (
    <Stack sx={{ height: "100vh", overflowY: "auto", bgcolor: "background.default" }}>
      <Header />
      <AppContainer maxWidth="xl" sx={{ py: 3 }}>
        <Outlet />
      </AppContainer>
    </Stack>
  );
};

export default Layout;
