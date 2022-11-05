import { Components, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Components {
    MuiLoadingButton: {
      defaultProps: {
        fullWidth: boolean;
        variant: string;
        size: string;
      };
    };
  }
}

const componentsOverrides: Components<Omit<Theme, "components">> = {
  MuiTextField: {
    defaultProps: {
      size: "small",
      fullWidth: true,
    },
  },
  MuiButton: {
    defaultProps: {
      fullWidth: true,
      variant: "contained",
      size: "small",
      color: "secondary",
    },
    styleOverrides: {
      root: {
        textTransform: "none",
      },
    },
  },
  MuiLoadingButton: {
    defaultProps: {
      fullWidth: true,
      variant: "contained",
      size: "small",
    },
  },
};

export default componentsOverrides;
