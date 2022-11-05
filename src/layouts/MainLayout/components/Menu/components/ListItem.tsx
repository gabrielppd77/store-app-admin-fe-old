import { useLocation, useNavigate } from "react-router-dom";

import {
  ListItem as MUIListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";

interface ListItemProps {
  link: string;
  icon: string;
  label: string;
}

export default function ListItem(props: ListItemProps) {
  const { icon, label, link } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isSelected = link === pathname;

  return (
    <MUIListItem>
      <ListItemButton
        sx={(theme) => ({
          borderRadius: theme.shape.borderRadius,
        })}
        selected={isSelected}
        onClick={!isSelected ? () => navigate(link) : undefined}
      >
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </MUIListItem>
  );
}
