import { useReducer } from "react";
import CartContext from "./CartContext";
const initalstate = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      console.log(action);
      const total = +state.totalAmount + action.item.amount * action.item.price;
      const existItemIndex = state.items.findIndex(
        (i) => i.id === action.item.id
      );
      const existItem = state.items[existItemIndex];
      let updatedItems;
      let updatedItem;
      console.log(existItem);
      if (existItem) {
        updatedItem = {
          ...existItem,
          amount: existItem.amount + action.item.amount,
        };
        console.log(updatedItem);
        updatedItems = [...state.items];
        updatedItems[existItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      console.log({ items: updatedItems, totalAmount: total });
      return { items: updatedItems, totalAmount: total };
    }
    case "REMOVE": {
      const existItemIndex = state.items.findIndex((i) => i.id === action.id);
      const existItem = state.items[existItemIndex];
      const total = state.totalAmount - existItem.price;
      let updatedItems;
      if (existItem.amount === 1) {
        updatedItems = state.items.filter((i) => i.id !== existItem.id);
      } else {
        let updatedItem = { ...existItem, amount: existItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: total,
      };
    }
    case "CLEAR": {
      return initalstate;
    }

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartSate, dispatch] = useReducer(cartReducer, initalstate);
  const onAddItemHandler = (item) => {
    dispatch({ type: "ADD", item: item });
  };
  const onRemoveItemHandler = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };
  const onClearItemsHandler = () => {
    dispatch({ type: "CLEAR" });
  };
  const context = {
    items: cartSate.items,
    totalAmount: cartSate.totalAmount,
    onAddItem: onAddItemHandler,
    onRemoveItem: onRemoveItemHandler,
    clearItems: onClearItemsHandler,
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
