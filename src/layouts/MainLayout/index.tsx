import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { useAuthContext } from "@hooks/useAuth";
import useMenuStore from "@stores/useMenuStore";

import Header from "./components/Header";
import Menu from "./components/Menu";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AuthenticatedLayout() {
  const { isAuthenticated } = useAuthContext();
  const { isOpenMenu } = useMenuStore();

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu />
      <Main open={isOpenMenu}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
