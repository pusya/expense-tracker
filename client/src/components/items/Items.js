import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SingleItem from "./SingleItem";
import Spinner from "../layout/Spinner";
import ItemContext from "../../context/item/itemContext";

const Items = () => {
  const itemContext = useContext(ItemContext);

  const { items, filtered, getItems, loading } = itemContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  if (items !== null && items.length === 0 && !loading) {
    return <h4>Please add a item</h4>;
  }
  return (
    <Fragment>
      {items !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(item => (
                <CSSTransition key={item._id} timeout={300} classNames="item">
                  <SingleItem item={item} />
                </CSSTransition>
              ))
            : items.map(item => (
                <CSSTransition key={item._id} timeout={300} classNames="item">
                  <SingleItem item={item} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Items;
