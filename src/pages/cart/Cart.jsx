import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/Mycontext";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "../../redux/cartSlice";
import { message } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Cart = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const { cart } = useSelector((state) => state.cart);
  const [totalamount, settotalamount] = useState(0);
  const dispatch = useDispatch();
  const deletecart = (item) => {
    dispatch(removeFromCart(item));
    message.success("Deleted Successfully");
  };
  // Sepet miktarını hesapla
  useEffect(() => {
    let temp = 0;
    cart.forEach((c) => {
      temp = temp + parseInt(c.price) * c.count; // Ürün sayısı ile çarpın
    });
    settotalamount(temp);
  }, [cart]);

  const shipping = parseInt(5);
  const kdvPercentage = 0.08; // 8% KDV
  const kdv = totalamount * kdvPercentage;
  const grandtotal = totalamount + shipping + kdv;
  //buy card
  const [name, setname] = useState("");
  const [address, setadress] = useState("");
  const [pincode, setpincode] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [city, setcity] = useState("");
  const buynow = async () => {

    if (
      name === "" ||
      address === "" ||
      pincode === "" ||
      phonenumber === "" ||
      city === ""
    ) {
      message.error("All fields are required");
    }
 
  
    const addressInfo = {
      name,
      address,
      pincode,
      phonenumber,
      city,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    
    let options = {
      key: import.meta.env.VITE_REACT_APP_KEY,
      key_secret: import.meta.env.VITE_REACT_APP_ID,
      amount: parseInt(grandtotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Shopping World",
      description: "for testing",
      handler: function (response) {
        message.success("Payment successfully");

        const paymentId = response.razorpay_payment_id;
        
        const orderInfo = {
          cart,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
        email:JSON.parse(localStorage.getItem("user")).email,
        userId:JSON.parse(localStorage.getItem("user")).uid,
        paymentId
      };
      try {
        const orderRef = collection(db,"orders");
        addDoc(orderRef,orderInfo)
      } catch (error) {
        console.log(error);
      }
    },
      theme: {
        color: "#3399c",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };
  return (
    <div
      className={`h-full pt-28 ${mode === "dark" ? "bg-gray-100" : ""}`}
      style={{
        backgroundColor: mode === "dark" ? "#282c34" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 ">
          {cart.map((item, index) => {
            const { title, price, description, imageUrl } = item;
            return (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <img
                  src={imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2
                      className="text-lg font-bold text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {title}
                    </h2>
                    <h2
                      className="text-sm  text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {description}
                    </h2>
                    <p
                      className="mt-1 text-xs font-semibold text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ${price}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        onClick={() => dispatch(increaseCount(item.id))}
                        className="text-black cursor-pointer hover:text-gray-600 transition-all duration-300 font-bold text-xl border px-2"
                      >
                        +
                      </span>
                      <span>{item.count}</span>
                      <span
                        onClick={() => dispatch(decreaseCount(item))}
                        className="text-black cursor-pointer hover:text-gray-600 transition-all duration-300 font-bold text-xl border px-2"
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => deletecart(item)}
                    className="mt-4 cursor-pointer flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          style={{
            backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="mb-2 flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Subtotal
            </p>
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              ${totalamount}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              KDV
            </p>
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              8%
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Shipping
            </p>
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              ${shipping}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-3">
            <p
              className="text-lg font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Total
            </p>
            <div className>
              <p
                className="mb-1 text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ${grandtotal}
              </p>
            </div>
          </div>
          <Modal
            name={name}
            address={address}
            city={city}
            pincode={pincode}
            phonenumber={phonenumber}
            setcity={setcity}
            setname={setname}
            setadress={setadress}
            setpincode={setpincode}
            setphonenumber={setphonenumber}
            buynow={buynow}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
