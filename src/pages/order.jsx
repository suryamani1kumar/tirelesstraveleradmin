import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../utils/fetchData";

const Order = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.fetchApi);

  useEffect(() => {
    dispatch(getData(`getAllOrder`));
  }, []);
  return <div>Order</div>;
};

export default Order;
