import { useContext } from "react";
import CartContext from "../../../store/CartContext";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (item) => {
    console.log("sddsdsd", item);
    cartCtx.onAddItem({
      id: props.id,
      name: props.name,
      amount: item,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3> {props.name}</h3>
        <div className={classes.description}> {props.description}</div>
        <div className={classes.price}> ${props.price}</div>
      </div>
      <MealsItemForm id={props.id} onAddToCart={addToCartHandler} />
    </li>
  );
};
export default MealsItem;
