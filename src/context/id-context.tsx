import { createContext, ReactNode, useContext, useRef } from "react";

interface IdContextValue {
  getId: () => string;
}

const IdContext = createContext<IdContextValue | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const idRef = useRef(1);

  const getId = () => {
    idRef.current += 1;
    return `${idRef.current}`;
  };

  return <IdContext.Provider value={{ getId }}>{children}</IdContext.Provider>;
};

export const useId = (): IdContextValue => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error("useId must be used within an IdProvider");
  }
  return context;
};
