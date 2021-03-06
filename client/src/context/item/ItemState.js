import React, { useReducer } from "react";
import ItemContext from "./itemContext";
import itemReducer from "./itemReducer";
import axios from "axios";

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
  ITEM_ERROR,
  GET_TOTAL
} from "../types";

const ItemState = props => {
  const initialState = {
    current: null,
    filtered: null,
    items: null,
    error: null,
    total: 0
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get Items
  const getItems = async () => {
    try {
      const res = await axios.get("/api/items");

      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Item
  const addItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/items", item, config);
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Item
  const deleteItem = async id => {
    try {
      await axios.delete(`/api/items/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear items
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  // Set Current item
  const setCurrent = item => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // Clear Current item
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update item
  const updateItem = async item => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/items/${item._id}`, item, config);

      dispatch({
        type: UPDATE_ITEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Filter items
  const filterItems = text => {
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Get Total
  const getTotal = total => {
    dispatch({ type: GET_TOTAL, payload: total });
  };

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        total: state.total,
        addItem,
        deleteItem,
        setCurrent,
        clearCurrent,
        updateItem,
        filterItems,
        clearFilter,
        getItems,
        clearItems,
        getTotal
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
