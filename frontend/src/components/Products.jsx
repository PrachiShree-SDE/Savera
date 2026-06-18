import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts } from "../utils/productSlice";

const Products = () => {
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/view", {
        withCredentials: true,
      });
      dispatch(setProducts(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-wrap justify-start justify-center items-center">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
