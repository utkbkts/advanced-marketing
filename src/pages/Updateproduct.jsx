import React, { useContext } from "react";
import myContext from "../context/data/Mycontext";

const Updateproduct = () => {
  const context = useContext(myContext)
  const {product,setproduct,updateProduct} = context;
  return (
     <div className="h-screen mt-20">
         <div className=" flex justify-center items-center h-full">
        <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap">
         <div>
            <input
            value={product.title}
            onChange={(e)=>setproduct({...product,title:e.target.value})}
              type="text"
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            />
          </div>
          <div>
            <input
               value={product.price}
               onChange={(e)=>setproduct({...product,price:e.target.value})}
              type="text"
              name="price"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product price"
            />
          </div>
         </div>
         <div className="flex gap-2 flex-wrap">
         <div>
            <input
               value={product.imageUrl}
               onChange={(e)=>setproduct({...product,imageUrl:e.target.value})}
              type="text"
              name="imageurl"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product imageUrl"
            />
          </div>
          <div>
            <input
              value={product.category}
              onChange={(e)=>setproduct({...product,category:e.target.value})}
              type="text"
              name="category"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product category"
            />
          </div>
         </div>
          <div className="w-full">
            <textarea
             value={product.description}
             onChange={(e)=>setproduct({...product,description:e.target.value})}
              cols="30"
              rows="10"
              name="title"
              className=" bg-gray-600 mb-4 px-2 py-2 w-full  rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Product title"
            ></textarea>
          </div>
          <div className=" flex justify-center mb-3">
            <button onClick={updateProduct} className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg">
              Update Product
            </button>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Updateproduct;
