import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckoutShow, setCheckoutShow] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [isSubmitedSuccess, setSubmitedSecess] = useState(false);
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.onRemoveItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.onAddItem({ ...item, amount: 1 });
  };
  const items = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));
  const total = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const orderSubmitHandler = () => {
    setCheckoutShow(true);
  };
  const submitOrderHandler = (user) => {
    setSubmitting(true);
    fetch("https://nesho-react-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: user,
        items: cartCtx.items,
      }),
    })
      .then((res) => {
        setSubmitting(false);
        setSubmited(true);
        setSubmitedSecess(true);
        cartCtx.clearItems()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const cartModal = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>{items}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{total}</span>
      </div>
      {isCheckoutShow && <Checkout onConfirm={submitOrderHandler} />}
      {!isCheckoutShow && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            close
          </button>
          {hasItems && (
            <button onClick={orderSubmitHandler} className={classes.button}>
              order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
  const submittingContent = (
    <div>
      <p>submitting the order ...</p>
    </div>
  );
  const submitedContent = (
    <div>
      <p>submitting sucessfully </p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          close
        </button>
      </div>
    </div>
  );
  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !isSubmited && cartModal}
      {isSubmitting && submittingContent}
      {!isSubmitting && isSubmited && submitedContent}
    </Modal>
  );
};
export default Cart;
