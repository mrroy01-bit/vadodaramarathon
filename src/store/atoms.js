import { atom } from "recoil";

export const pastEventsAtom = atom({
  key: "pastEventsAtom",
  default: [],
});

export const faqAtom = atom({
  key: "faqAtom",
  default: [],
});

// EditorJS related atoms
export const editorInstancesAtom = atom({
  key: "editorInstancesAtom",
  default: new Map(), // Map to store multiple editor instances by ID
});

export const editorStatesAtom = atom({
  key: "editorStatesAtom",
  default: new Map(), // Map to store editor states (ready, initializing, destroyed) by ID
});

export const editorDataAtom = atom({
  key: "editorDataAtom",
  default: new Map(), // Map to store editor data by ID
});

export const mobileLayoutStateAtom = atom({
  key: "mobileLayoutStateAtom",
  default: new Map(), // Map to store mobile layout toggle states by editor ID
});
