import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#50514F",
    },
    secondary: {
      main: "#CBD4C2",
    },
    background: {
      default: "#f3f4f6",
    },
  },
  typography: {
    fontSize: 14,
    h1: { fontSize: "6rem" },
    h2: { fontSize: "3.75rem" },
    h3: { fontSize: "3rem" },
    h4: { fontSize: "2.125rem" },
    h5: { fontSize: "1.5rem" },
    h6: { fontSize: "1.25rem" },
  },
});

export default theme;
