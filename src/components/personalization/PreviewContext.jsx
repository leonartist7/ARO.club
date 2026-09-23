"use client";
import { createContext, useContext, useState } from "react";
import { initialLook, initialSpace } from "../../data/personalization/catalog";

const PreviewContext = createContext(null);
export function PersonalizationProvider({ children }) {
  const [look, setLook] = useState(initialLook);
  const [space, setSpace] = useState(initialSpace);
  const reset = () => {
    setLook({ ...initialLook });
    setSpace({ ...initialSpace });
  };
  return (
    <PreviewContext.Provider value={{ look, setLook, space, setSpace, reset }}>
      {children}
    </PreviewContext.Provider>
  );
}
export function usePersonalization() {
  const state = useContext(PreviewContext);
  if (!state) throw new Error("PersonalizationProvider is required");
  return state;
}
