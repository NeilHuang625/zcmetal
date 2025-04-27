import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { solutions } from "../data/solutions"; 

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
import "./Work.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Work() {
  const swiperRef = useRef(null);
  
  // 使用自定义Hook监测滚动
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  return (
    <section 
      id="solutions"
      ref={sectionRef} 
      className="bg-black py-12 sm:py-16 md:py-22 px-4 sm:px-6 md:px-20 font-poppins overflow-hidden"
    >
      <div className={`mb-10 transition-all duration-1000 ${
        isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
      }`}>
        <h2 className="text-2xl md:text-4xl font-semibold mb-3 tracking-wider text-zinc-50">
          Our Solutions
        </h2>
        <p className="text-sm md:text-lg text-zinc-300 tracking-wider max-w-3xl">
          See how our expertise and craftsmanship meet real client needs, transforming properties with custom designs, premium materials, and professional installation.
        </p>
      </div>

      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className={`workSwiper transition-all duration-1000 delay-300 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-x-20'
        }`}
      >
        {solutions.map((item, index) => (
          <SwiperSlide 
            key={index} 
            className={`transition-all duration-700 rounded-lg md:rounded-2xl overflow-hidden w-full ${
              isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: isSectionVisible ? `${300 + (index * 150)}ms` : '0ms'
            }}
          >
            {/* 使用固定高度代替max-height，确保所有设备上高度一致 */}
            <div className="bg-white shadow-md hover:shadow-lg transition overflow-hidden relative h-[500px] sm:h-[600px] md:h-[700px] w-full">
              {/* 图片容器固定尺寸，确保图片始终填充整个区域 */}
              <div className="h-full w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* 黑色渐变蒙层 - 使文字更清晰可见 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60"></div>

              {/* 左上角名称 - 响应式字体和位置 */}
              <div className="absolute top-3 sm:top-5 md:top-8 left-4 sm:left-6 md:left-10 px-3 sm:px-4 py-1 sm:py-2 bg-gray-100/10 backdrop-blur-xs rounded-full shadow-md">
                <h3 className="text-xs sm:text-lg md:text-2xl tracking-wider text-zinc-50">
                  {item.title}
                </h3>
              </div>
              
              {/* 底部描述 - 只在大屏幕显示 */}
              <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-4 sm:left-6 md:left-10 right-4 sm:right-6 md:right-10">
                <p className="text-sm sm:text-base md:text-lg text-zinc-100 max-w-2xl">
                  {item.description}
                </p>
              </div>

              {/* 左下角按钮 - 响应式大小和位置 */}
              <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-4 sm:left-6 md:left-10">
                <Link 
                  to={`/solutions/${item.id}`}
                  className="bg-zinc-100 hover:bg-gray-700 hover:text-zinc-50 hover:cursor-pointer text-gray-900 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-base md:text-lg transition-all duration-300 tracking-wide shadow-lg group flex items-center"
                >
                  <span>View Case</span>
                  <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* 右上角导航按钮 - 响应式大小和位置 */}
              <div className="absolute top-3 sm:top-5 md:top-10 right-4 sm:right-6 md:right-8 flex space-x-2 sm:space-x-3 md:space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    swiperRef.current.swiper.slidePrev();
                  }}
                  className="bg-black/50 backdrop-blur-xs hover:bg-black/30 hover:cursor-pointer hover:scale-105 text-white w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300"
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
                  className="bg-black/50 backdrop-blur-xs hover:bg-black/30 hover:cursor-pointer hover:scale-105 text-white w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-10">
        <Link 
          to="/solutions" 
          className="inline-flex items-center bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full text-base transition-colors duration-300 shadow-md"
        >
          <span>View All Solutions</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
