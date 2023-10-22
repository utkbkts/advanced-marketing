import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/Mycontext";
import { Link, useNavigate } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { BiLogoFlutter } from "react-icons/bi";
import Mobile from "./Mobile";
import { logout, reset } from "../../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const Navbar = ({ user }) => {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [show, setshow] = useState("top");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));
  const [lastscrollY, setlastscrollY] = useState(0);
  const {cart} = useSelector((state) => state.cart);
  const handleToggleMode = () => {
    toggleMode();
    const modeElement = document.querySelector(".mode");
    modeElement.classList.add("animate-mode");
    setTimeout(() => {
      modeElement.classList.remove("animate-mode");
    }, 1000);
  };
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastscrollY) {
        setshow("hide");
      } else {
        setshow("show");
      }
    } else {
      setshow("top");
    }
    setlastscrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastscrollY]);
  const onlogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    message.success("Logout Succesfully");
    navigate("/login");
  };
  return (
    <>
      {/* TOP NAVBAR */}
      <div
        className="Top-navbar"
        style={{
          backgroundColor: mode === "dark" ? "rgb(62 64 66)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <BiLogoFlutter size={50} />
        <h2>Get free delivery on orders over $300</h2>
      </div>
      {/* NAVBAR MİDDLE */}
      <div
        className={`navbar-position ${show}`}
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <header className="navbar">
          <div className="top-n">
            <BiLogoFlutter size={50} />
          <Link to={"/"}>  <span style={{ color: mode === "dark" ? "white" : "" }}>
              SHOPPING WORLD
            </span></Link>
          </div>
          <ul>
            <li>
              {" "}
              <Link
                to={"/addproduct"}
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Add Products
              </Link>
            </li>
            {/* {admin?.email === "utkbktss5@gmail.com" ? (
              <li>
                {" "}
                <Link
                  to={"/order"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order
                </Link>
              </li>
            ) : (
              ""
            )} */}
              <li>
                {" "}
                <Link
                  to={"/order"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={"/dashboard"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Admin
                </Link>
              </li>
            {user ? (
              <>
                <button
                  onClick={onlogout}
                  className="bg-red-700 py-1 px-2 text-white rounded-sm hover:bg-red-500 duration-300 transition-all"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Logout
                </button>
                <li className="name">
                  <img src={user?.photoURL} alt="" />
                  <span>{user?.displayName}</span>
                </li>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <li style={{ color: mode === "dark" ? "white" : "" }}>
                    {" "}
                    Login
                  </li>
                </Link>
                <Link to={"/signup"}>
                  <li style={{ color: mode === "dark" ? "white" : "" }}>
                    {" "}
                    Register
                  </li>
                </Link>
              </>
            )}
            <div className={"mode"} onClick={handleToggleMode}>
              {mode === "light" ? (
                <FiSun size={20} />
              ) : (
                <BsFillCloudSunFill size={20} />
              )}
            </div>
            {/* Cart */}
            <div className="">
              <Link
                to={"/cart"}
                className="group -m-2 flex items-center p-2"
                style={{ color: mode === "dark" ? "white" : "" }}
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span
                  className=" text-sm font-medium text-gray-700 group-"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {cart.length}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </ul>
        </header>
        <Mobile user={user} handleToggleMode={handleToggleMode} />
      </div>
    </>
  );
};

export default Navbar;
