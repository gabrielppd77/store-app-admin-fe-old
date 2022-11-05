import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "./styles/theme";

import Routes from "./routes/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <ToastContainer position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;
