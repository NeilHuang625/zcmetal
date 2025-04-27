import { useState } from "react";
import { Link } from "react-router-dom";
import useScrollAnimation from "../hooks/useScrollAnimation";

import gatesImage from "../assets/images/services/gates.jpg";
import fencesImage from "../assets/images/services/fences.jpg";
import balustgradesImage from "../assets/images/services/balustrades.jpg"; 
import metalWorksImage from "../assets/images/services/metal-works.jpg";

export default function Services() {
  // 使用自定义Hook监测滚动
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.07, // 当组件10%进入视口时触发
    rootMargin: '0px' // 稍微延迟触发效果
  });

  // 服务数据
  const services = [
    {
      id: "gates",
      title: "Gates",
      image: gatesImage,
      features: ["Automated sliding gates", "Swing gates", "Driveway gates", "Pedestrian gates"]
    },
    {
      id: "fences",
      title: "Fences",
      image: fencesImage,
      features: ["Louvre fences", "Boundary fences", "Privacy screens", "Garden fences"]
    },
    {
      id: "balustrades", 
      title: "Balustrades", 
      image: balustgradesImage,
      features: [ "Aluminum railings", "Staircase systems", "Balcony guards","Walk path balustrades"]
    },
    {
      id: "metal-works",
      title: "Metal Works",
      image: metalWorksImage,
      features: ["Structural components", "Decorative elements", "Custom brackets", "Sheet metal work"]
    }
  ];

  const [hoveredService, setHoveredService] = useState(null);

  return (
    <section ref={sectionRef} className="py-24 font-poppins overflow-hidden" id="services">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-700 hover:shadow-xl group ${
                isSectionVisible 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isSectionVisible ? `${index * 200}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* 图片容器 */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* 渐变叠加层 */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90"
              ></div>
              
              {/* 文本内容 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out">
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <ul 
                  className={`text-gray-300 ml-5 list-disc transition-all duration-500 ${
                    hoveredService === service.id ? 'opacity-100 max-h-40 mb-4' : 'opacity-0 max-h-0'
                  }`}
                >
                  {service.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
                <Link 
                  to={`/${service.id}`} 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  <span>Explore More</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}