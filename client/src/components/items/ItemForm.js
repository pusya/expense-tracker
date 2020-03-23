import React, { useState, useContext, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";

const ItemForm = () => {
  const itemContext = useContext(ItemContext);
  const { addItem, updateItem, clearCurrent, current } = itemContext;

  useEffect(() => {
    if (current !== null) {
      setItem(current);
    } else {
      setItem({
        text: "",
        amount: ""
      });
    }
  }, [itemContext, current]);

  const [item, setItem] = useState({
    text: "",
    amount: ""
  });

  const { text, amount } = item;

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addItem(item);
    } else {
      updateItem(item);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary"> {current ? "Edit Item" : "Add Item"}</h2>
      <input
        type="text"
        placeholder="Text"
        name="text"
        value={text}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value={current ? "Update Item" : "Add Item"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ItemForm;
