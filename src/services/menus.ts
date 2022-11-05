interface menuProps {
  icon: string;
  label: string;
  link: string;
}

const menus = [
  {
    icon: "dashboard",
    label: "Dash Board",
    link: "/dashboard",
  },
] as menuProps[];

export default menus;
