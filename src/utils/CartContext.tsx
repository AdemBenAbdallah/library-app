import { PropsWithChildren, createContext, useContext } from "react";

export interface CartContextType {
  totalProducts: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const totalProducts = 0;

  return <CartContext.Provider value={{ totalProducts }}>{children}</CartContext.Provider>;
};
