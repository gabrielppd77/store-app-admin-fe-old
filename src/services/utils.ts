export function nameAppStorage(key = "") {
  return "@" + import.meta.env.VITE_NAME_APP + ":" + key;
}

export function nameApp() {
  return "Store App Admin";
}
