import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  onAddItem: () => {},
  onRemoveItem: () => {},
  clearItems: () => {},
});
export default CartContext;
