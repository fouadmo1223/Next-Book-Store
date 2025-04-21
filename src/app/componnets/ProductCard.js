"use client";

import Link from "next/link";

import { useState } from "react";
import {
  FaHeart,
  FaArrowRight,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const handleAction = (action) => {
    console.log(`${action} product with ID: ${product.id}`);
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case "sale":
        return "bg-red-500 text-white";
      case "new":
        return "bg-blue-500 text-white";
      case "bestseller":
        return "bg-purple-500 text-white";
      case "limited":
        return "bg-yellow-500 text-gray-900";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className="relative w-full max-w-xs rounded-xl overflow-hidden shadow-md bg-white transition-all duration-300 hover:shadow-lg border border-gray-100 flex flex-col"
      style={{ height: "400px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div
          className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full ${getBadgeStyle(
            product.badge
          )} shadow-md`}
        >
          {product.badge === "sale" && "Sale"}
          {product.badge === "new" && "New"}
          {product.badge === "bestseller" && "Bestseller"}
          {product.badge === "limited" && "Limited"}
        </div>
      )}

      {/* Image with Lightbox */}
      <div
        className="relative h-56 w-full cursor-zoom-in overflow-hidden flex-shrink-0"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Icons (appear on card hover) */}
        <div
          className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Heart Icon */}
          <a
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:text-red-500 hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
              handleAction("favorited");
            }}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-600 text-xl hover:text-red-500" />
            )}
          </a>

          {/* Cart Icon */}
          <a
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              handleAction("added-to-cart");
            }}
          >
            <FaShoppingCart className="text-gray-600 text-xl" />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm mr-2">
                ${product.originalPrice}
              </span>
            )}
            <span className="font-bold text-gray-900 text-lg">
              ${product.price}
            </span>
          </div>

          {/* View Link */}
          <Link
            href={`/products/${product.id}`}
            className="flex items-center justify-between px-5 py-2 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-300 group cursor-pointer no-underline"
           
          >
            <span className="text-sm">View</span>
            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: product.images }]}
        />
      )}
    </div>
  );
}
