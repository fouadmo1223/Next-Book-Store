"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./../page.module.css";

// Import icons
import {
  FaHome,
  FaStore,
  FaInfoCircle,
  FaEnvelope,
  FaBook,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function NavBar() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typically the md breakpoint
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close menu when resizing to larger screens
      }
    };

    // Check on mount and on resize
    checkScreenSize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const isActive = (path) => pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/products", name: "Store", icon: <FaStore /> },
    { path: "/about", name: "About", icon: <FaInfoCircle /> },
    { path: "/contact", name: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <>
      <nav
        className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}
        style={{
          background: isSticky ? "grey" : "#333",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          position: isSticky ? "sticky" : "static",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div
          className={styles.logoContainer}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaBook
            style={{ fontSize: "28px", marginRight: "10px", color: "#4CAF50" }}
          />
          <Link href="/">
            <span
              className={styles.logoText}
              style={{
                fontSize: "24px",
                fontWeight: "700",
                background: "linear-gradient(90deg, #4CAF50, #8BC34A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
              }}
            >
              Book Store
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "25px",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((item) => (
              <li
                className={`${styles.navLink} ${
                  isActive(item.path) ? styles.active : ""
                }`}
                key={item.path}
              >
                <Link href={item.path}>
                  <span
                    className={`${styles.navLink} ${
                      isActive(item.path) ? styles.active : ""
                    }`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "18px",
                      fontWeight: "500",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      color: isActive(item.path) ? "#4CAF50" : "white",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div
          style={{
            background: "#333",
            position: "sticky",
            top: isSticky ? "70px" : "70px",
            left: 0,
            right: 0,
            zIndex: 999,
            padding: "10px 20px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "18px",
                      fontWeight: "500",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      color: isActive(item.path) ? "#4CAF50" : "white",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
