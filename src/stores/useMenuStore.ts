import create from "zustand";

interface useMenuStoreProps {
  isOpenMenu: boolean;
  changeMenu: () => void;
}

const useMenuStore = create<useMenuStoreProps>((set) => ({
  isOpenMenu: true,
  changeMenu: () =>
    set((store) => ({
      ...store,
      isOpenMenu: !store.isOpenMenu,
    })),
}));

export default useMenuStore;
