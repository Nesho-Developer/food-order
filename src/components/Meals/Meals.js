import React from "react";
import AvalabileMeals from "./AvaliableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvalabileMeals />
    </React.Fragment>
  );
};
export default Meals;
