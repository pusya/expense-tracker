import React, { useState, useContext, useEffect } from "react";
import ItemContext from "../../context/item/itemContext";

const ItemForm = () => {
  const itemContext = useContext(ItemContext);

  const [item, setItem] = useState({
    text: "",
    amount: ""
  });

  const { text, amount } = item;

  const onChange = e => setItem({ ...item, [e.target.name]: e.target.value });

  return (
    <form>
      <h2 class="text-primary">Add Item</h2>
      <input
        type="text"
        placeholder="Text"
        name="text"
        value={text}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Amount"
        name="amount"
        value={amount}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Add"
          className="btn btn-primary btn-block"
        ></input>
      </div>
    </form>
  );
};

export default ItemForm;
