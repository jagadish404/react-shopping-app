import { Box, Container, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import FilterSection from "./FilterSection";

const AppContainer = styled(Container)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Layout = () => {
  return (
    <Stack sx={{ height: "100vh", overflowY: "auto" }}>
      <Header />
      <AppContainer maxWidth="xl">
        <Stack component="section" direction={"row"} flex={"1 1 auto"}>
          <Box component="aside" flex={"0 0 auto"} sx={{ p: 2, boxShadow: 1 }}>
            <FilterSection />
          </Box>
          <Box component={"section"} sx={{ p: 2 }} flex={"1 1 auto"}>
            <Outlet />
          </Box>
        </Stack>
      </AppContainer>
    </Stack>
  );
};

export default Layout;
