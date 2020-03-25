import React, { useContext, useEffect } from "react";
import Items from "../items/Items";
import ItemForm from "../items/ItemForm";
import ItemFilter from "../items/ItemFilter";
import Total from "../items/Total";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ItemForm />
      </div>
      <div>
        <Total />
        <ItemFilter />
        <Items />
      </div>
    </div>
  );
};

export default Home;
