import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

export default function Navbar() {
  // State to manage the menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 初始值改为 true 以显示导航栏，或者创建一个单独的状态
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 当滚动超过 400px 时改变导航栏样式
      setIsScrolled(window.scrollY > 400);

      // 只有当滚动超过 400px 后才隐藏/显示导航栏
      if (window.scrollY > 400) {
        // 导航栏行为: 向下滚动隐藏，向上滚动显示
        setShowNavbar(window.scrollY < window.lastScrollY);
        window.lastScrollY = window.scrollY;
      } else {
        // 当回到顶部区域时，保持导航栏显示
        setShowNavbar(true);
      }
    };

    // 初始化上次滚动位置
    window.lastScrollY = 0;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 当菜单打开时禁止滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 font-poppins transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-white/90 backdrop-blur shadow-md"
              : "bg-transparent"
          }
          transform ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center z-50">
            <img
              src={logo}
              alt="Z&C METAL Logo"
              className={`h-10 ${
                isScrolled ? "" : "filter brightness-0 invert"
              }`}
            />
          </a>
          <div className="flex items-center space-x-4">
            <a
              href="#quote"
              className="bg-gradient-to-r from-gray-500 to-gray-800 text-white px-5 py-2 rounded-full font-extralight tracking-wider border border-gray-400 shadow-lg transition transform hover:scale-105 hover:cursor-pointer hover:from-gray-700 hover:to-gray-900 hover:border-gray-300"
            >
              Get Quote
            </a>

            {/* Burger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 ${
                  isMenuOpen
                    ? "bg-white"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                } transition-all duration-300 ease-out 
                              ${
                                isMenuOpen
                                  ? "rotate-45 translate-y-1.5"
                                  : "-translate-y-1"
                              }`}
              ></span>
              <span
                className={`block w-6 h-0.5 ${
                  isMenuOpen
                    ? "bg-white"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                } transition-all duration-300 ease-out 
                              ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 ${
                  isMenuOpen
                    ? "bg-white"
                    : isScrolled
                    ? "bg-gray-800"
                    : "bg-white"
                } transition-all duration-300 ease-out 
                              ${
                                isMenuOpen
                                  ? "-rotate-45 -translate-y-1.5"
                                  : "translate-y-1"
                              }`}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full screen menu overlay - 独立于导航栏 */}
      <div
        className={`fixed inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 
                    z-40 transition-all duration-500
                    flex flex-col justify-center items-center
                    ${
                      isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
      >
        <ul className="text-center space-y-8">
          <li>
            <a
              href="#products"
              className="text-gray-200 text-3xl font-semibold hover:text-gray-400 transition-all duration-300
                        block transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-200 text-3xl font-semibold hover:text-gray-400 transition-all duration-300
                        block transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-200 text-3xl font-semibold hover:text-gray-400 transition-all duration-300
                        block transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Decorative elements - metallic style */}
        <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-gray-400 opacity-50"></div>
        <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-gray-400 opacity-50"></div>

        {/* Additional metallic decorative elements */}
        <div className="absolute top-1/4 left-10 w-16 h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-1 bg-gradient-to-r from-gray-700 to-gray-500"></div>
      </div>
    </>
  );
}
