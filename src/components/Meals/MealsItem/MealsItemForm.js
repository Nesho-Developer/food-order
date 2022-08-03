import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealsItemForm.module.css";
const MealsItemForm = (props) => {
  const amountRef = useRef();
  const [formIsValid, setFormIsValid] = useState(true);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(amountRef.current.value);
    const enteredAmount = amountRef.current.value;
    const number = +enteredAmount;
    if (enteredAmount.trim() === "" || number < 1 || number > 10) {
      setFormIsValid(false);
      return;
    }
    setFormIsValid(true);
    props.onAddToCart(number);
  };
  return (
    <form className={classes.form} onSubmit={handleFormSubmit}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: props.is,
          type: "number",
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button type="submit">+ add</button>
      {!formIsValid && <p>enter a valid number</p>}
    </form>
  );
};
export default MealsItemForm;
