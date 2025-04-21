"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
    rating: 4.5,
    category: "Bestseller",
    price: 12.99,
    details:
      "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London's most desirable areas.",
  },
  {
    id: 2,
    title: "Educated",
    author: "Tara Westover",
    description:
      "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    category: "New Release",
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
    category: "Bestseller",
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

const brands = [
  {
    name: "Penguin",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Penguin_Books_logo.svg/1200px-Penguin_Books_logo.svg.png",
  },
  {
    name: "HarperCollins",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/HarperCollins_logo.svg/1200px-HarperCollins_logo.svg.png",
  },
  {
    name: "Simon & Schuster",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Simon_%26_Schuster_logo.svg/1200px-Simon_%26_Schuster_logo.svg.png",
  },
  {
    name: "Macmillan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Macmillan_Publishers_logo.svg/1200px-Macmillan_Publishers_logo.svg.png",
  },
  {
    name: "Hachette",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Hachette_Book_Group_logo.svg/1200px-Hachette_Book_Group_logo.svg.png",
  },
];

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Biography",
  "Self-Help",
];

const testimonials = [
  {
    name: "micheal Johnson",
    comment: "This bookstore has the best collection I've ever seen!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Michael Chen",
    comment: "Great recommendations and fast delivery. Very satisfied!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ramy Rodriguez",
    comment:
      "Found so many rare books here that I couldn't find anywhere else.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

function EmblaCarousel({
  books,
  options = {},
  showAddToCart = false,
  onAddToCart,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, ...options }, [
    Autoplay({ delay: 3000 }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="embla h-full w-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {books.map((book) => (
            <div className="embla__slide h-full relative" key={book.id}>
              <img
                src={book.images[0]}
                alt={book.title}
                className="w-full h-full object-cover "
                loading="eager"
              />
              {showAddToCart && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg max-w-md">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{book.author}</p>
                    <button
                      onClick={() => onAddToCart(book)}
                      className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-all duration-200"
                    >
                      Add to Cart - ${book.price}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          position: relative;
          flex: 0 0 100%;
        }
      `}</style>
    </div>
  );
}

function Glider({ items, onAddToCart }) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleItems(1);
      else if (width < 768) setVisibleItems(2);
      else if (width < 1024) setVisibleItems(3);
      else setVisibleItems(4);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= items.length - visibleItems ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? items.length - visibleItems : prev - 1
    );
  };

  return (
    <div className="relative">
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * (100 / visibleItems)}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200">
                <div className="relative h-48">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => onAddToCart(item)}
                    className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {item.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ${item.price}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill={
                            i < Math.floor(item.rating)
                              ? "currentColor"
                              : "none"
                          }
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const heroRef = useRef();
  const titleRef = useRef();

  const handleProductClick = (id) => router.push(`/products/${id}`);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (book) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === book.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  // Faster transition variants
  const fastFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const fastFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-50">
      {/* Cart Notification */}
      <AnimatePresence>
        {showCartNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Embla Carousel */}
      <section className="relative  min-h-[535px] flex items-center justify-center   overflow-hidden">
        <EmblaCarousel books={books} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            ref={titleRef}
            initial="hidden"
            animate="visible"
            variants={fastFadeUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Discover Your Next Favorite Book
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fastFadeUp}
            transition={{ delay: 0.1 }}
            className="text-xl text-white mb-8"
          >
            Explore our curated collection of bestsellers and hidden gems
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fastFadeUp}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-all duration-200">
              Browse Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brand Marquee Section */}
      <section className="py-10 bg-white overflow-hidden">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fastFadeUp}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center mb-8"
        >
          Trusted by Leading Publishers
        </motion.h2>

        <div className="relative h-20 w-full">
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
                
              }}
            >
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="mx-8 flex-shrink-0"
                >
                  <span
                    className="h-12 object-contain text-3xl font-bold opacity-70 hover:opacity-100 transition-opacity duration-50"
                    
                  >{brand.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fastFadeUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Featured Books
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.slice(0, 4).map((book) => (
              <motion.div
                key={book.id}
                initial="hidden"
                whileInView="visible"
                variants={fastFadeUp}
                transition={{ delay: book.id * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-10"
              >
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleProductClick(book.id)}
                >
                  <img
                    src={book.images[0]}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(book.id);
                      }}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill={wishlist.includes(book.id) ? "red" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ${book.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(book);
                      }}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section with Glider */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fastFadeUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Bestsellers
          </motion.h2>

          <Glider items={books} onAddToCart={addToCart} />
        </div>
      </section>

      {/* New Releases Section with Embla Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fastFadeUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            New Releases
          </motion.h2>

          <div className="relative h-96">
            <EmblaCarousel
              books={[...books].reverse()}
              options={{ loop: true, dragFree: true }}
              showAddToCart={true}
              onAddToCart={addToCart}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fastFadeUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Browse Categories
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                variants={fastFadeUp}
                whileHover={{ scale: 1.05 }}
                transition={{
                  
                  hover: { duration: 0.05 },
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <p className="text-gray-500 mt-1">120+ books</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fastFadeUp}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            What Readers Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={fastFadeUp}
                whileHover={{ y: -10 }}
                transition={{
                  
                  hover: { duration: 0.1 },
                }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
     

      {/* Cart Icon */}
      <div className="fixed top-24 right-1 z-50">
        <button
          className="relative p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={() => router.push("/cart")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
