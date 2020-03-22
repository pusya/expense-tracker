import React, { useReducer } from "react";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import uuid from "uuid";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR
} from "../types";

const ItemState = props => {
  const initialState = {
    items: [
      {
        text: "Grocery",
        amount: "40"
      },
      {
        text: "shopping",
        amount: "50"
      }
    ]
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  return (
    <ItemContext.Provider
      value={{
        items: state.items
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
