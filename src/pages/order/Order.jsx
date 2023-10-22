import React, { useContext } from "react";
import myContext from "../../context/data/Mycontext";
import Loading from "../../Loading";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user"))?.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  if (loading) {
    return <Loading />;
  }
  console.log(order);
  if (!order) {
    return (
      <h2 className="text-center text-2xl text-black flex justify-center items-center h-screen">
        No Orders
      </h2>
    );
  }

  return (
    <div className="h-full pt-10 mt-5 flex flex-wrap">
      {order.map((item) => (
        <div key={item?.id} className="flex flex-wrap h-full  w-1/2 ">
          <div className="flex  shadow-sm shadow-black w-full p-2">
            <div className="flex flex-col p-2">
            <h3 className="uppercase text-2xl">Title: {item?.cart[0].title}</h3>
            <span>Description: {item?.cart[0].description}</span>
            <span>Count: {`${item?.cart[0].count}`}</span> 
            <span>Date: {`${item?.cart[0].date}`}</span>
            <span>$: {`${item?.cart[0].price}`}</span>
            </div>
            <img className="w-28" src={item?.cart[0].imageUrl} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
