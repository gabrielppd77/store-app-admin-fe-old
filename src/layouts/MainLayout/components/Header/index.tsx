import {
  AppBar,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import useMenuStore from "@stores/useMenuStore";

import { nameApp } from "@services/utils";

export default function Header() {
  const theme = useTheme();
  const matchSmallScren = useMediaQuery(theme.breakpoints.down("sm"));
  const { changeMenu } = useMenuStore();

  return (
    <AppBar
      position="fixed"
      sx={{
        ...(!matchSmallScren && {
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={changeMenu}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {nameApp()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
