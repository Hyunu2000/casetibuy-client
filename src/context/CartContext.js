import { createContext, useState } from "react";

// Context 생성
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        setCartCount,
        totalPrice,
        setTotalPrice,
        cartList,
        setCartList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
