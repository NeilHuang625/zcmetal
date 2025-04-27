import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Navbar() {
  // State to manage the menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 初始值改为 true 以显示导航栏，或者创建一个单独的状态
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  // 追踪当前hover的菜单项
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // 获取当前路由信息和导航函数
  const location = useLocation();
  const navigate = useNavigate();
  
  // 确定哪些路由需要黑色logo和按钮
  const isDarkRoute = () => {
    // 在这里添加需要黑色主题的路由路径
    const darkRoutes = ['/solutions', '/services', '/fences', '/gates', '/balustrades', '/metal-works'];
    return darkRoutes.some(route => location.pathname.startsWith(route));
  };
  
  // 检查当前是否在需要黑色主题的路由
  const useDarkTheme = isDarkRoute();
  
  // 检查是否在首页
  const isHomePage = location.pathname === '/';

  // 处理导航和滚动
  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      // 如果在首页，直接滚动到对应部分
      scrollToSection(sectionId);
    } else {
      // 如果不在首页，先导航到首页，然后滚动到对应部分
      if (sectionId === 'solutions') {
        // 特殊处理 - 直接导航到解决方案页面
        navigate('/solutions');
      } else {
        // 使用 sessionStorage 存储需要滚动的目标
        sessionStorage.setItem('scrollToSection', sectionId);
        navigate('/');
      }
    }
    
    // 关闭菜单
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // 平滑滚动到指定元素
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // 对于暗色路由，只要有滚动就显示背景
      if (useDarkTheme) {
        setIsScrolled(window.scrollY > 10); // 设置一个很小的阈值
      } else {
        // 非暗色路由保持原有逻辑
        setIsScrolled(window.scrollY > 200);
      }

      // 导航栏隐藏/显示逻辑
      if (window.scrollY > 200) {
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
  }, [useDarkTheme]); // 添加 useDarkTheme 作为依赖

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

  // 检查并执行滚动操作（当从其他页面回到首页时）
  useEffect(() => {
    if (isHomePage) {
      const sectionToScroll = sessionStorage.getItem('scrollToSection');
      if (sectionToScroll) {
        // 清除标记
        sessionStorage.removeItem('scrollToSection');
        
        // 延迟滚动，确保页面已完全加载
        setTimeout(() => {
          scrollToSection(sectionToScroll);
        }, 500);
      }
    }
  }, [isHomePage, location.pathname]);

  // 菜单项配置
  const menuItems = [
    { id: 'services', label: 'Services' },
    { id: 'about-us', label: 'About' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'recent-work', label: 'Work' },
    { id: 'videos', label: 'Videos' },
    { id: 'get-quote', label: 'Get Quote' },
    { id: 'contact', label: 'Contact' }
  ];

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
                isScrolled || useDarkTheme ? "" : "filter brightness-0 invert"
              }`}
            />
          </a>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigation('get-quote')}
              className="bg-gradient-to-r from-gray-500 to-gray-800 text-white px-5 py-2 rounded-full font-extralight tracking-wider border border-gray-400 shadow-lg transition transform hover:scale-105 hover:cursor-pointer hover:from-gray-700 hover:to-gray-900 hover:border-gray-300"
            >
              Get Quote
            </button>

            {/* Burger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-50 w-10 h-10 flex flex-col justify-center items-center focus:outline-none hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out 
                  ${
                    isMenuOpen
                      ? "bg-white"
                      : isScrolled || useDarkTheme
                      ? "bg-gray-800"
                      : "bg-white"
                  }
                  ${
                    isMenuOpen
                      ? "rotate-45 translate-y-1.5"
                      : "-translate-y-1"
                  }`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out 
                  ${
                    isMenuOpen
                      ? "bg-white"
                      : isScrolled || useDarkTheme
                      ? "bg-gray-800"
                      : "bg-white"
                  }
                  ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out 
                  ${
                    isMenuOpen
                      ? "bg-white"
                      : isScrolled || useDarkTheme
                      ? "bg-gray-800"
                      : "bg-white"
                  }
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
                    flex flex-col justify-center items-end
                    ${
                      isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
      >
        <ul className="text-right space-y-6 pr-10 md:pr-16 lg:pr-36">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`text-2xl text-right md:text-3xl hover:cursor-pointer font-semibold transition-all duration-300
                          block transform w-full ${
                            hoveredItem === null || hoveredItem === item.id 
                              ? "text-white hover:translate-x-2" 
                              : "text-gray-500"
                          }`}
              >
                {item.label}
              </button>
            </li>
          ))}
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
