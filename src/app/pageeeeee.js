"use client";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Mock data for products
const bestSellers = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
    price: 24.99,
    discountPrice: 19.99,
    rating: 4.5,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 27.0,
    discountPrice: null,
    rating: 4.8,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 3,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description:
      "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast.",
    price: 18.99,
    discountPrice: 14.99,
    rating: 4.7,
    isNew: false,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 4,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer.",
    price: 22.5,
    discountPrice: 17.5,
    rating: 4.6,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const newArrivals = [
  {
    id: 5,
    title: "Project Hail Mary",
    author: "Andy Weir",
    description:
      "A lone astronaut must save the earth from disaster in this incredible new science-based thriller.",
    price: 28.99,
    discountPrice: 24.99,
    rating: 4.9,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: 6,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description:
      "Klara is an Artificial Friend with outstanding observational qualities who watches the behavior of those who come into the store.",
    price: 25.0,
    discountPrice: null,
    rating: 4.3,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ],
  },
];

const featuredCategories = [
  {
    id: 1,
    name: "Science Fiction",
    books: [
      {
        id: 9,
        title: "Dune",
        image:
          "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 10,
        title: "The Martian",
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 11,
        title: "Neuromancer",
        image:
          "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 2,
    name: "Biographies",
    books: [
      {
        id: 12,
        title: "Becoming",
        image:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 13,
        title: "Steve Jobs",
        image:
          "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 14,
        title: "Educated",
        image:
          "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];


const brands = [
  {
    id: 1,
    name: "Penguin",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "HarperCollins",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Random House",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "Simon & Schuster",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    name: "Macmillan",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 6,
    name: "Hachette",
    logo: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

export default function Home() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (images, index = 0) => {
    setCurrentImages(images);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-gray-50">
      {/* Title Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to Our Bookstore
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Discover your next favorite read from our vast collection
        </p>
      </div>

      {/* Brand Marquee Section */}
      <div className="bg-white py-6 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex items-center space-x-12 animate-marquee whitespace-nowrap">
            {brands.map((brand) => (
              <div key={brand.id} className="flex-shrink-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  title={brand.name}
                />
              </div>
            ))}
            {/* Duplicate for seamless looping */}
            {brands.map((brand) => (
              <div key={`duplicate-${brand.id}`} className="flex-shrink-0">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  title={brand.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative h-[80vh]">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          <SwiperSlide className="bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4 text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Explore our curated collection of bestsellers, new releases, and
                timeless classics.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Shop Now
              </button>
            </motion.div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center px-4 text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Summer Reading Sale
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Get up to 30% off on selected titles. Limited time offer!
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                View Deals
              </button>
            </motion.div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Best Sellers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Best Sellers
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Our most popular books loved by readers worldwide
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bestSellers.map((book, index) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full cursor-pointer"
                  loading="lazy"
                  onClick={() => openLightbox(book.images)}
                />
                {book.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Best Seller
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#" className="font-medium">
                      {book.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                </div>
                <div className="text-right">
                  {book.discountPrice ? (
                    <>
                      <p className="text-sm font-medium text-gray-900">
                        ${book.discountPrice}
                      </p>
                      <p className="text-xs text-gray-500 line-through">
                        ${book.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">
                      ${book.price}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(book.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({book.rating})
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            New Arrivals
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Fresh off the press - discover our latest additions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main New Arrivals Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">
              Featured New Releases
            </h3>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1}
              className="h-full"
            >
              {newArrivals.map((book) => (
                <SwiperSlide
                  key={book.id}
                  className="flex flex-col md:flex-row gap-6"
                >
                  <div
                    className="w-full md:w-1/3 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(book.images)}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold">{book.title}</h4>
                        <p className="text-gray-600">{book.author}</p>
                      </div>
                      {book.isNew && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-700 text-sm">
                      {book.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(book.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({book.rating})
                        </span>
                      </div>
                      <div className="text-right">
                        {book.discountPrice ? (
                          <>
                            <span className="text-lg font-bold text-gray-900">
                              ${book.discountPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-1">
                              ${book.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${book.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Two Small Sliders */}
          <div className="space-y-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <Swiper
                  modules={[Thumbs, Navigation]}
                  spaceBetween={20}
                  slidesPerView={2}
                  navigation
                >
                  {category.books.map((book) => (
                    <SwiperSlide
                      key={book.id}
                      className="cursor-pointer"
                      onClick={() => openLightbox([book.image])}
                    >
                      <div className="bg-gray-200 rounded-lg overflow-hidden mb-2">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {book.title}
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deal of the Day */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-2">Deal of the Day</h3>
            <p className="mb-4">Limited time offer on selected titles</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">50% OFF</p>
                <p className="text-sm">On all hardcover books</p>
              </div>
              <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="mb-4">
              Pre-order the most anticipated books of the year
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">Pre-order</p>
                <p className="text-sm">Get them before they are gone</p>
              </div>
              <button className="bg-white text-purple-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                View Titles
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={currentImages.map((img) => ({ src: img }))}
        index={currentIndex}
      />

      {/* Add the animation to your Tailwind config or CSS */}
    
    </div>
  );
}
