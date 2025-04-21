"use client";
import { useState, useEffect } from "react";
import ProductList from "../componnets/ProductList";

const books = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description:
      "A psychological thriller about a woman who shoots her husband and then stops speaking.",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    badge: "sale",
    rating: 4.5,
    category: "Fiction",
    price: 12.99,
    details:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London's most desirable areas.",
  },
  {
    id: 2,
    title: "Educated",
    author: "Tara Westover",
    badge: "bestseller",
    description:
      "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    category: "Self-Help",
    price: 14.99,
    details:
      "Tara Westover was 17 the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her 'head-for-the-hills' bag.",
  },
  {
    id: 3,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description:
      "A novel about an abandoned girl who raises herself in the marshes of North Carolina.",
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    category: "Sci-Fi",
    price: 10.99,
    details:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.",
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    description: "A guide to building good habits and breaking bad ones.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    category: "Self-Help",
    price: 11.99,
    details:
      "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
  },
  {
    id: 5,
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "A novel about a library between life and death where each book represents a different life path.",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    category: "Fiction",
    price: 13.99,
    details:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
  },
  {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    description:
      "A science fiction novel about a desert planet and the boy who would become its messiah.",
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    category: "Sci-Fi",
    price: 9.99,
    details:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
  },
];
const categories = [...new Set(books.map((book) => book.category))];
const priceRanges = [
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 - $15", min: 10, max: 15 },
  { label: "Over $15", min: 15, max: Infinity },
];

export default function Products() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [badgeFilter, setBadgeFilter] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    let result = books;

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    // Price filter
    if (priceFilter) {
      result = result.filter(
        (book) => book.price >= priceFilter.min && book.price <= priceFilter.max
      );
    }

    // Rating filter
    if (ratingFilter) {
      result = result.filter((book) => book.rating >= ratingFilter);
    }

    // Badge filter
    if (badgeFilter) {
      result = result.filter((book) => book.badge === badgeFilter);
    }

    setFilteredBooks(result);
  }, [selectedCategories, priceFilter, ratingFilter, badgeFilter]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed left-${
          isSidebarOpen ? "50" : "5"
        } top-21 z-30 p-2 rounded-md bg-white shadow-md lg:hidden`}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-screen overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

          {/* Categories Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Categories</h3>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-3 text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`price-${index}`}
                    name="price-range"
                    checked={
                      priceFilter?.min === range.min &&
                      priceFilter?.max === range.max
                    }
                    onChange={() => setPriceFilter(range)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`price-${index}`}
                    className="ml-3 text-gray-700"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
              <button
                onClick={() => setPriceFilter(null)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-700"
              >
                Clear selection
              </button>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Minimum Rating</h3>
            <div className="flex items-center space-x-2">
              {[4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setRatingFilter(ratingFilter === rating ? null : rating)
                  }
                  className={`px-3 py-1 rounded-full ${
                    ratingFilter === rating
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {rating} ★
                </button>
              ))}
            </div>
          </div>

          {/* Badge Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4">Special Offers</h3>
            <div className="flex flex-wrap gap-2">
              {["sale", "bestseller"].map((badge) => (
                <button
                  key={badge}
                  onClick={() =>
                    setBadgeFilter(badgeFilter === badge ? null : badge)
                  }
                  className={`px-3 py-1 rounded-full capitalize ${
                    badgeFilter === badge
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          {/* Reset All Filters */}
          <button
            onClick={() => {
              setSelectedCategories([]);
              setPriceFilter(null);
              setRatingFilter(null);
              setBadgeFilter(null);
            }}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={` transition-all duration-300 `}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Our Books Collection
          </h2>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>
          <ProductList products={filteredBooks} />
        </div>
      </div>
    </div>
  );
}
