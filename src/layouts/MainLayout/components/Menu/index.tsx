import { styled } from "@mui/material/styles";
import { Drawer, useTheme, useMediaQuery, List, Divider } from "@mui/material";

import ListItem from "./components/ListItem";

import useMenuStore from "@stores/useMenuStore";

import menus from "@services/menus";
import { nameApp } from "@services/utils";

const menuWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "center",
}));

export default function Menu() {
  const theme = useTheme();
  const isSmallScren = useMediaQuery(theme.breakpoints.down("sm"));

  const { changeMenu, isOpenMenu } = useMenuStore();

  return (
    <Drawer
      sx={{
        width: menuWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: menuWidth,
          boxSizing: "border-box",
        },
      }}
      variant={isSmallScren ? "temporary" : "persistent"}
      anchor="left"
      open={isOpenMenu}
      onClose={changeMenu}
    >
      <DrawerHeader>{nameApp()}</DrawerHeader>
      <Divider />
      <List>
        {menus.map((menu) => (
          <ListItem
            icon={menu.icon}
            label={menu.label}
            link={menu.link}
            key={menu.link}
          />
        ))}
      </List>
    </Drawer>
  );
}
