import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Item from "./Item";
import Spinner from "../layout/Spinner";
import ItemContext from "../../context/item/itemContext";

const Items = () => {
  const itemContext = useContext(ItemContext);

  const { items } = itemContext;

  return (
    <Fragment>
      {items.map(item => (
        <Item item={item} />
      ))}
    </Fragment>
  );
};

export default Items;
