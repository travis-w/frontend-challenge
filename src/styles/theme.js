import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          pageTitle: "h1",
        },
      },
    },
  },
  typography: {
    pageTitle: {
      fontSize: 32,
      fontWeight: 500,
      textAlign: "center",
    },
  },
});
