import { ToastContainer, toast, Bounce } from "react-toastify";
import { createContext, useContext, useState, useMemo, useEffect } from "react";

const CartContext = createContext();

import { initialProducts } from "../data/product";

export const CartProvider = (props) => {
  // FEATURE 1: Initialize state from LocalStorage so data persists on refresh
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("vantix_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const products = initialProducts;

  // FEATURE 1: Save to LocalStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("vantix_cart", JSON.stringify(cart));
  }, [cart]);

  // Add item into the cart
  const addToCart = (product) => {
    toast.success("Item Added to Cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove Item from cart
  const removeFromCart = (productId, removeAll = false) => {
    toast.success("Item Removed From Cart", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (!existingItem) return prevCart;

      if (removeAll || existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      } else {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        clearCart,
        addToCart,
        removeFromCart,
        cartTotal,
        cartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);