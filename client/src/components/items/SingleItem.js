import React, { useContext } from "react";
import PropTypes from "prop-types";
import ItemContext from "../../context/item/itemContext";

const SingleItem = ({ item }) => {
  const itemContext = useContext(ItemContext);
  const { deleteItem, setCurrent, clearCurrent } = itemContext;
  const { text, amount, _id } = item;

  const onDelete = () => {
    deleteItem(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <ul className="list">
        <li>
          <i className="fas fa-shopping-cart" /> {text}
        </li>
        <li className="badge badge-primary">
          <i className="fas fa-dollar-sign" /> {parseFloat(amount).toFixed(2)}
        </li>
      </ul>
      <div className="button-wrapper">
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(item)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

SingleItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default SingleItem;
