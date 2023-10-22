import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/Mycontext";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { message } from "antd";
const Mobile = ({ handleToggleMode }) => {
  const [active, setactive] = useState(true);
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("user"));
  const { user, isLoading, Message, isSuccess, isError } = useSelector(
    (state) => state.auth
  );
  const handleclick = () => {
    setactive(!active);
  };
  useEffect(() => {
    // Menü açıldığında, sayfa kaydırmayı engelle
    if (!active) {
      document.body.style.overflow = "hidden";
    } else {
      // Menü kapandığında, sayfa kaydırmayı tekrar etkinleştir
      document.body.style.overflow = "auto";
    }
  }, [active]);
  const onlogout = async () => {
    await dispatch(logout());
    await dispatch(reset());
    message.success("Logout Succesfully");
    navigate("/login");
  };
  return (
    <div className="mobile">
      <div
        className={`hamburger ${!active ? "open" : ""}`}
        onClick={handleclick}
      >
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
        <span
          style={{ background: mode === "dark" ? "white" : "" }}
          className="bar"
        ></span>
      </div>
      <div className={`mobile-back ${active ? "open" : ""}`}>
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
          {admin?.email === "utkbktss5@gmail.com" ? (
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
            )}
          {admin?.email === "utkbktss5@gmail.com" ? (
              <li>
                {" "}
                <Link
                  to={"/dashboard"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}
          {user ? (
            <div className="text-white flex items-center gap-4 flex-col">
              {" "}
              <li className="cursor-pointer" style={{ color: mode === "dark" ? "white" : "" }} onClick={onlogout}>Logout</li>
              <li className="name">
                <img
                  src={user?.photoURL}
                  alt=""
                />
                <span>{user?.displayName}</span>
              </li>
            </div>
          ) : (
            <>
              {" "}
              <li>
                {" "}
                <Link
                  to={"/login"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Login
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={"/signup"}
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Register
                </Link>
              </li>
            </>
          )}

          <div className={"mode"} onClick={handleToggleMode}>
            {mode === "light" ? (
              <FiSun size={20} />
            ) : (
              <BsFillCloudSunFill size={20} />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Mobile;
