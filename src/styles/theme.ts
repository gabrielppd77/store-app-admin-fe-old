import { createTheme } from "@mui/material";

import paletteOverrides from "./paletteOverrides";
import componentsOverrides from "./componentsOverrides";

const theme = createTheme({
  components: componentsOverrides,
  palette: paletteOverrides,
});

export default theme;
