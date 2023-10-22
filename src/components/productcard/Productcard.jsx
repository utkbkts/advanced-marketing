import React, { useContext, useEffect } from "react";
import myContext from "../../context/data/Mycontext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { message } from "antd";
const Productcard = () => {
  const context = useContext(myContext);
  const { mode, products ,    searchkey,
    filterprice,
    filtertype,
    setsearchkey,
    setfiltertype,
    setfilterprice} = context;
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const addtocart = (products) => {
    dispatch(addToCart({ item: products }));
    message.success("Cart added");
  };
  useEffect(()=>{
  localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  
  return (
    <div>
      <div className="relative mt-10">
        <h3 className="text-4xl">Our Collection</h3>
        <span className=" border-red-700 w-28  absolute bottom-0 border-b-2"></span>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center mt-24">
        {products.filter((obj)=>obj.title.toLowerCase().includes(searchkey)).filter((obj)=>obj.category.toLowerCase().includes(filtertype)).map((item, index) => {
          const { title, price, description, imageUrl } = item;
          return (
            <div key={index} className="shadow-md h-full flex  flex-col gap-2 p-2">
              <img
                className="w-[400px] h-[400px]"
                src={imageUrl}
                alt=""
              />
              <span style={{ color: mode === "dark" ? "white" : "" }}>
               {title}
              </span>
              <div
                className="flex items-center gap-1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                <span>
                  <AiOutlineShoppingCart />
                </span>
                <span>${price}</span>
              </div>
              <button
                onClick={() => addtocart(item)}
                className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-700 duration-300 transition-all"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productcard;
