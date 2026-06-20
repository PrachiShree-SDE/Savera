import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/" + id, {
        withCredentials: true,
      });
      console.log(res.data);
      setProduct(res.data);
      setLoading(false); 
    } catch (err) {
      setError("Failed to load product");
      setLoading(false);
    }
  };

 useEffect(() => {
  if (id) {
    fetchProduct();
  }
}, [id]);

if (loading) return <h2>Loading...</h2>;
if (error) return <h2 className="text-red-500">{error}</h2>;
if (!product) return <h2>No product found</h2>;

 return (
  <div className="flex justify-center p-10">
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-6 flex gap-10">

      {/* Product Image */}
      <div className="w-1/2">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="w-1/2 flex flex-col justify-between">

        <div>
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">
            {product.title}
          </h1>

          {/* Brand & Category */}
          <p className="text-lg text-gray-500 mt-1">
            {product.brand} • {product.category}
          </p>

          {/* Price */}
          <h2 className="text-2xl font-semibold text-green-600 mt-4">
            ₹{product.price}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>

          <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>

      </div>
    </div>
  </div>
);
};

export default ProductView;
