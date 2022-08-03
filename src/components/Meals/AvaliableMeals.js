import MealsItem from "./MealsItem/MealsItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvalabileMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = fetch(
        "https://nesho-react-default-rtdb.firebaseio.com/meals.json"
      )
        .then((res) => res.json())
        .then((data) => {
          let meals = [];
          for (let key in data) {
            meals.push(data[key]);
          }
          setMeals(meals);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setHttpError(true);
        });
    };
    fetchMeals();
  }, []);
  if (isLoading) {
    return (
      <section className={classes.load}>
        <h1>Loading ...</h1>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes["fail-load"]}>
        <h1>Fail to Load </h1>
      </section>
    );
  }

  const mealsList = meals.map((m) => (
    <MealsItem
      key={m.id}
      id={m.id}
      name={m.name}
      description={m.description}
      price={m.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvalabileMeals;
