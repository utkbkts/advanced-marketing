import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/Mycontext";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/AuthSlice";
import { message } from "antd";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const context = useContext(myContext);
  const { user, isLoading, Message, isSuccess, isError } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      email,
      name,
      password,
      selectedFile,
    };
    if (email && name && password && selectedFile) {
      dispatch(register(userdata));
    }
  };
  useEffect(() => {
    if (isError) {
      message.error(Message);
    }

    if (isSuccess || user) {
      message.success("Login successful");
      navigate("/");
    }
    if (isLoading === false) {
      dispatch(reset());
    }
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px] h-[400px] bg-gray-700 rounded-sm shadow-md shadow-black">
        <h3 className="text-white font-bold text-center p-4 tracking-wider">
          Signup
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 ">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            type="text"
            placeholder="Name"
            className="p-2 rounded-sm placeholder:text-gray-400 outline-none"
          />
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            type="email"
            placeholder="email"
            className="p-2 rounded-sm placeholder:text-gray-400 outline-none"
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            type="password"
            placeholder="password"
            className="p-2 rounded-sm placeholder:text-gray-400 outline-none"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <label
                className="text-white"
                htmlFor="fileInput"
                style={{ cursor: "pointer" }}
              >
                Select photo
              </label>
              <input
                id="fileInput"
                type="file"
                className=""
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            {selectedFile && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                  }}
                />
                <button
                  className="text-white absolute -top-2 -right-2"
                  onClick={() => setSelectedFile(null)}
                >
                  X
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 w-full rounded-sm"
          >
            Signup
          </button>
          <div>
            <span className="text-white">
              Do you have an account ?{" "}
              <Link
                className="text-yellow-400 hover:text-yellow-600"
                to={"/login"}
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
