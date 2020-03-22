import React, { useContext } from "react";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/itemContext";

const Item = ({ item }) => {
  const { text, amount, date } = item;

  return (
    <div className="card bg-light">
      <ul className="list">
        <li>
          <i className="fas fa-shopping-cart" /> {text}
        </li>
        <li className="badge badge-primary">
          <i className="fas fa-dollar-sign" /> {amount}
        </li>
      </ul>
      <div class="button-wrapper">
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
