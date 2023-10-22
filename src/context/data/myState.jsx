import React, { useEffect, useState } from "react";
import Mycontext from "./Mycontext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { message } from "antd";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Mystate = (props) => {
  const [mode, setMode] = useState("light");
  const navigate = useNavigate();
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(51, 54, 61)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  //onauthuser
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(authuser);
      } else {
        setuser(null);
      }
    });
  }, []);
  const [loading, setloading] = useState(false);
 
  const [product, setproduct] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    uid: user?.uid,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const addproduct = async () => {
    if (
      product.title == null ||
      product.price == null ||
      product.imageUrl == null ||
      product.category == null ||
      product.description == null
    ) {
      return message.error("all fields are required");
    }
    try {
      const productData = {
        ...product,
        uid: user ? user.uid : null, 
      };
      const productRef = collection(db, "products");
      await addDoc(productRef, productData);
      message.success("add product successfully");
      getProductData();
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  
  
  //getproduct
  const [products, setproducts] = useState([]);
  const getProductData = async () => {
    setloading(true);
    try {
      const q = query(
        collection(db, "products"),
        orderBy("time")
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setproducts(productArray);
        setloading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  //update
  const edithandle = async (item) => {
    setproduct(item);
  };
  const updateProduct = async () => {
    setloading(true);
    try {
      await setDoc(doc(db, "products", product.id), product);
      // Belge güncellendikten sonra "product" nesnesini temizleyin
      setproduct({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      getProductData();
      setloading(false);
      message.success("Update successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      message.error(error);
      setloading(false);
    }
  };
  //deleteproduct
  const deleteProduct = async (item) => {
    setloading(true);
    try {
      await deleteDoc(doc(db, "products", item.id));
      setloading(false);
      message.success("Deleted Successfully");
      getProductData();
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  //order
  const [order, setOrder] = useState([]);
  const getorderData = async () => {
    setloading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "orders")); // Koleksiyon başvurusunu al
      const orderArray = [];

      querySnapshot.forEach((doc) => {
        orderArray.push(doc.data());
      });

      setOrder(orderArray);
      setloading(false);
    } catch (error) {
      message.error(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getorderData();
  }, []);

  //userdata
  const [userdata, setuserdata] = useState([]);
  const getuserdata = async () => {
    setloading(true);
    try {
      const result = await getDocs(collection(db, "users"));
      const userArray = [];
      result.forEach((doc) => {
        userArray.push(doc.data());
        setloading(false);
      });
      setuserdata(userArray);
      setloading(false);
    } catch (error) {
      message.error(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getuserdata();
  }, []);

  //search
  const [searchkey,setsearchkey]=useState("")
  const [filtertype,setfiltertype]=useState("")
  const [filterprice,setfilterprice]=useState("")
  return (
    <Mycontext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setloading,
        product,
        setproduct,
        addproduct,
        products,
        edithandle,
        deleteProduct,
        updateProduct,
        order,
        userdata,
        searchkey,
        filterprice,
        filtertype,
        setsearchkey,
        setfiltertype,
        setfilterprice
      }}
    >
      {props.children}
    </Mycontext.Provider>
  );
};

export default Mystate;
