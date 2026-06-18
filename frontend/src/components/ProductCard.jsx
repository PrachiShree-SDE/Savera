import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 m-2 w-64 shadow-sm hover:shadow-lg transition bg-white">

      {/* IMAGE */}
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "https://placehold.co/300";
        }}
      />

      {/* BRAND + CATEGORY */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{product.brand}</span>
        <span>{product.category}</span>
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-semibold mt-1">
        {product.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description}
      </p>

      {/* PRICE */}
      <p className="text-green-600 font-bold mt-2 text-lg">
        ₹{product.price}
      </p>

      {/* BUTTON */}
      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;