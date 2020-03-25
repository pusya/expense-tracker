import React, { Fragment, useContext, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";

const Total = () => {
  const itemContext = useContext(ItemContext);
  const { total, getTotal, items } = itemContext;

  useEffect(() => {
    if (items !== null) {
      const amounts = items.map(item => item.amount);
      const totalExpense = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
      getTotal(totalExpense);
    }
  }, [items]);

  return (
    <Fragment>
      <h2>Total Expense</h2>
      <h2>${total}</h2>
    </Fragment>
  );
};

export default Total;
