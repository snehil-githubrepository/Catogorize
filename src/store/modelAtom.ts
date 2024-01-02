import { atom } from "recoil";

export const loginAtom = atom({
  key: "loginAtom",
  default: {
    isOpen: false,
  },
});

export const registerAtom = atom({
  key: "registerAtom",
  default: {
    isOpen: false,
  },
});

export const editAtom = atom({
  key: "editAtom",
  default: {
    isOpen: false,
  },
});
