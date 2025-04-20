import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import gate1 from "../assets/images/gate111.jpg";
import gate2 from "../assets/images/gate222.jpg";
import gate3 from "../assets/images/gate333.jpg";
import gate4 from "../assets/images/gate666.jpg";
import gate5 from "../assets/images/gate555.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
import "./Work.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const solutions = [
  {
    title: "Custom Gates",
    image: gate1,
    description: "Tailored gate solutions for homes and commercial sites.",
  },
  {
    title: "Automation Systems",
    image: gate3,
    description: "Remote and smart automation options for gates.",
  },
  {
    title: "Fencing Solutions",
    image: gate2,
    description: "Durable, stylish fencing for privacy and security.",
  },
  {
    title: "Maintenance Services",
    image: gate4,
    description: "Professional care to keep your gate running smoothly.",
  },
  {
    title: "Custom Designs",
    image: gate5,
    description: "Unique designs tailored to your property.",
  },
];

export default function Work() {
  const swiperRef = useRef(null);

  return (
    <section className="bg-black py-12 sm:py-16 md:py-22 px-4 sm:px-6 md:px-20 font-poppins">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-zinc-50">
        Our Work
      </h2>

      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="workSwiper"
        breakpoints={{
          // 当窗口宽度大于等于 640px
          640: {
            spaceBetween: 30,
          },
        }}
      >
        {solutions.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-md hover:shadow-lg transition overflow-hidden relative max-h-[400px] sm:max-h-[600px] md:max-h-[800px]">
              {/* 相对定位的容器用于定位绝对定位的元素 */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />

              {/* 左上角名称 - 响应式字体和位置 */}
              <div className="absolute top-3 sm:top-5 md:top-8 left-4 sm:left-6 md:left-10 px-3 sm:px-4 py-1 sm:py-2 bg-gray-100/10 backdrop-blur-xs rounded-full shadow-md">
                <h3 className="text-lg sm:text-xl md:text-3xl tracking-wider text-zinc-50">
                  {item.title}
                </h3>
              </div>

              {/* 左下角按钮 - 响应式大小和位置 */}
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-4 sm:left-6 md:left-10">
                <button className="bg-zinc-100 hover:bg-gray-700 hover:text-zinc-50 hover:cursor-pointer text-gray-900 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 tracking-wide shadow-lg group flex items-center">
                  <span>View Case</span>
                  <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </div>

              {/* 右上角导航按钮 - 响应式大小和位置 */}
              <div className="absolute top-3 sm:top-5 md:top-10 right-4 sm:right-6 md:right-8 flex space-x-2 sm:space-x-3 md:space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    swiperRef.current.swiper.slidePrev();
                  }}
                  className="bg-black/50 backdrop-blur-xs hover:bg-black/30 hover:cursor-pointer hover:scale-105 text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    swiperRef.current.swiper.slideNext();
                  }}
                  className="bg-black/50 backdrop-blur-xs hover:bg-black/30 hover:cursor-pointer hover:scale-105 text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
