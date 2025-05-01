import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 假设您已经安装了framer-motion
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenRuler, faTruck, faWarehouse, faToolbox } from '@fortawesome/free-solid-svg-icons';

import weldingVideo from '../assets/video/metalwork/1.mp4';
import videoThumbnail from '../assets/video/metalwork/1.jpeg';

// 定义服务详情数据
const servicesData = {
  gates: {
    title: "Gates",
    description: "Our custom gates provide both security and aesthetic appeal for your property.",
    longDescription: "At Z&C Metal, we specialize in creating premium custom gates that perfectly balance security, functionality, and visual appeal. Our gates are designed to complement your property's architecture while providing reliable security. Using high-quality materials and precision craftsmanship, we ensure that each gate we create is built to last and operates smoothly for years to come.",
    features: [
      "Automated sliding gates for convenience and security",
      "Elegant swing gates with custom designs",
      "Driveway gates engineered for durability",
      "Integration with security systems",
      "Weather-resistant materials and finishes",
      "Custom designs to match your architectural style"
    ]
  },
  fences: {
    title: "Fences",
    description: "Our custom fences provide privacy, security, and enhance the appearance of your property with elegant designs and durable materials.",
    longDescription: "Our fencing solutions combine functionality, durability, and aesthetics to create boundaries that not only secure your property but also enhance its visual appeal. We work with a variety of materials including aluminum, steel, and wrought iron to create fences that withstand the test of time and weather. Each fence is designed to complement your property's style while meeting your specific requirements for privacy, security, and aesthetics. From modern minimalist designs to more ornate traditional styles, we have the expertise to create the perfect fence for your needs.",
    features: [
      "Louvre fences for privacy with airflow",
      "Boundary fences with custom height options",
      "Privacy screens with decorative elements",
      "Garden fences that enhance landscaping",
      "Secure perimeter solutions",
      "Custom height and design options"
    ]
  },
  balustrades: {
    title: "Balustrades",
    description: "Our balustrades provide safety and style for staircases, balconies, and elevated areas, crafted with attention to detail and design integrity.",
    longDescription: "Our balustrades combine safety and style to create elegant solutions for staircases, balconies, and other elevated areas. Using premium quality materials, we design and craft balustrades that meet all safety regulations while adding a touch of sophistication to your space. Our experienced team works closely with you to understand your aesthetic preferences and functional requirements, ensuring that the final product perfectly complements your property. From sleek modern designs to more traditional styles, we can create balustrades that enhance the beauty of your home or commercial space.",
    features: [
      "Aluminum railings with custom finishes",
      "Complete staircase systems",
      "Balcony guards with unobstructed views",
      "Walkway balustrades for safety",
      "Low-maintenance materials",
      "Seamless integration with existing architecture"
    ]
  },
  "metal-works": {
    title: "Metal Works",
    description: "Our custom metal works include structural and decorative elements crafted with precision and artistic vision to enhance any space.",
    longDescription: "Our metal fabrication services cover a wide range of structural and decorative elements designed to enhance both residential and commercial spaces. With a combination of traditional craftsmanship and modern technology, we create bespoke metal works that are both functional and visually striking. Our team of skilled artisans and engineers can transform your ideas into reality, whether you need structural components, decorative elements, or custom-designed fixtures. We pride ourselves on our attention to detail and commitment to quality, ensuring that each piece we create meets the highest standards of craftsmanship.",
    features: [
      "Structural components with precision engineering",
      "Decorative elements with artistic flair",
      "Custom brackets and supports",
      "Precision sheet metal fabrication"
    ],
    // 为metal-works添加新的数据结构
    process: [
      {
        title: "We Design",
        description: "Our design process begins with understanding your vision. We collaborate closely with you to sketch, model, and refine your metal work concept. Using state-of-the-art CAD software, we create precise blueprints that ensure perfect execution of your project, whether it's structural components or decorative elements.",
        icon: "pencil-alt"
      },
      {
        title: "We Manufacture",
        description: "In our fully equipped workshop, our skilled craftsmen bring designs to life using premium materials and precision machinery. We employ various techniques including cutting, bending, welding, and finishing to fabricate custom metal products that meet the highest quality standards. Every weld, joint, and finish is executed with meticulous attention to detail.",
        icon: "cog"
      },
      {
        title: "We Deliver",
        description: "We handle logistics with the same care as our manufacturing. Your completed metal works are carefully packaged and transported to ensure they arrive at your location in perfect condition. Our team coordinates delivery times to accommodate your schedule, making the process as smooth and convenient as possible.",
        icon: "truck"
      },
      {
        title: "We Install",
        description: "Our professional installation team ensures your metal works are perfectly placed and securely fitted. Whether mounting structural elements or positioning decorative pieces, we work efficiently while protecting your property. After installation, we conduct thorough quality checks and clean the area, leaving you with a finished product ready to enjoy.",
        icon: "wrench"
      }
    ],
    // 焊接视频URL (示例，您需要替换为实际的视频URL)
    weldingVideoUrl: weldingVideo
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);

  // 添加此函数以检测移动设备
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);
  
  // 根据serviceId找到对应的服务数据
  const serviceData = servicesData[serviceId] || {
    title: "Service Details",
    description: "Information about this service is not available.",
    longDescription: "",
    features: []
  };

  // 检查是否是金属加工页面
  const isMetalWorks = serviceId === 'metal-works';
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        let imageFiles = [];
        
        // 使用Vite的方式导入图片，并且根据单数形式的文件夹名称
        if (serviceId === 'gates') {
          imageFiles = await importGateImages();
        } else if (serviceId === 'fences') {
          imageFiles = await importFenceImages();
        } else if (serviceId === 'balustrades') {
          imageFiles = await importBalustradeImages();
        } else if (serviceId === 'metal-works') {
          imageFiles = await importMetalworkImages();
        }
        
        setImages(imageFiles);
        if (imageFiles.length > 0) {
          setSelectedImage(imageFiles[0]);
        }
      } catch (error) {
        console.error("Error loading images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, [serviceId]);
  
  // Vite使用的异步导入方法
  const importGateImages = async () => {
    const imageModules = import.meta.glob('../assets/images/gallery/gate/*.{png,jpg,jpeg,svg}');
    return await loadImagesFromModules(imageModules);
  };
  
  const importFenceImages = async () => {
    const imageModules = import.meta.glob('../assets/images/gallery/fence/*.{png,jpg,jpeg,svg}');
    return await loadImagesFromModules(imageModules);
  };
  
  const importBalustradeImages = async () => {
    const imageModules = import.meta.glob('../assets/images/gallery/balustrade/*.{png,jpg,jpeg,svg}');
    return await loadImagesFromModules(imageModules);
  };
  
  const importMetalworkImages = async () => {
    const imageModules = import.meta.glob('../assets/images/gallery/metalwork/*.{png,jpg,jpeg,svg}');
    return await loadImagesFromModules(imageModules);
  };
  
  // 辅助函数，用于从模块导入中加载图片
  const loadImagesFromModules = async (modules) => {
    const imagePromises = Object.entries(modules).map(async ([path, importFunc]) => {
      const imported = await importFunc();
      return imported.default;
    });
    
    return Promise.all(imagePromises);
  };
  
  // 处理导航到首页联系部分
  const handleContactClick = () => {
    sessionStorage.setItem('scrollToSection', 'contact');
    navigate('/');
  };
  
  // 打开大图查看
  const openLightbox = (image) => {
    setSelectedImage(image);
    setShowLightbox(true);
    document.body.style.overflow = "hidden"; // 防止背景滚动
  };
  
  // 关闭大图查看
  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = "auto"; // 恢复滚动
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-5rem-4rem)]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

// 渲染不同的图标，使用固定尺寸容器确保一致性
const renderIcon = (iconName) => {
  return (
    <div className="flex items-center justify-center w-18 h-18">
      {(() => {
        switch (iconName) {
          case "pencil-alt":
            return <FontAwesomeIcon icon={faPenRuler} size="4x" />;
          case "cog":
            return <FontAwesomeIcon icon={faWarehouse} size="4x" />;
          case "truck":
            return <FontAwesomeIcon icon={faTruck} size="4x" />;
          case "wrench":
            return <FontAwesomeIcon icon={faToolbox} size="4x" />;
          default:
            return null;
        }
      })()}
    </div>
  );
};

const handleStartVideo = () => {
  if (videoRef.current) {
    videoRef.current.play();
    setVideoStarted(true);
  }
};

  return (
    <div className="w-full bg-white font-poppins tracking-wide">
      {/* 改进的标题区域 */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 overflow-hidden">
        <div className="px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 relative">
                {serviceData.title}
                <span className="absolute -bottom-1 left-0 w-16 h-1 bg-blue-600 rounded-full"></span>
              </h1>
              <p className="text-gray-600 max-w-2xl mt-3">
                {serviceData.description}
              </p>
            </div>
            
            {images.length > 0 && (
              <div className="hidden md:flex -space-x-3">
                {images.slice(0, 3).map((image, idx) => (
                  <div 
                    key={idx} 
                    className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm"
                    style={{ zIndex: 3-idx }}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                {images.length > 3 && (
                  <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center text-white text-xs shadow-sm" style={{ zIndex: 0 }}>
                    +{images.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* 装饰性几何形状 */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mb-12 -mr-12 opacity-90"></div>
        <div className="absolute top-0 right-8 w-6 h-6 bg-blue-100 rounded-full opacity-70"></div>
        <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-blue-200 rounded-full opacity-80"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-4 py-6">

        {/* Metal Works 专属内容 - 修改布局为横向排列 */}
        {isMetalWorks && (
          <div className="mb-8 max-w-[1500px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full mr-2.5"></span>
              Our Metal Works Process
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* 左侧流程步骤 - 垂直排列 */}
              <div className="md:w-2/3 space-y-4">
                {serviceData.process && serviceData.process.map((step, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-3 mr-4 text-blue-600">
                        {renderIcon(step.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
            {/* 右侧视频 - 在中等及以上尺寸屏幕显示 */}
            {serviceData.weldingVideoUrl && (
              <div className="md:w-1/3 mt-6 md:mt-0">
                <motion.div 
                  className="sticky top-24 rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="aspect-[9/16] md:h-auto relative">
                    <video 
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      preload="metadata"
                      playsInline
                      muted
                      autoPlay={!isMobile}  // 在非移动设备上尝试自动播放
                      loop
                      poster={isMobile ? videoThumbnail : undefined}  // 为移动设备添加封面图
                    >
                      <source src={serviceData.weldingVideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                      <track kind="captions" srcLang="en" src={videoThumbnail} />
                      <track kind="descriptions" srcLang="en" src={videoThumbnail} />
                    </video>
                    {isMobile && !videoStarted && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 cursor-pointer"
                        onClick={handleStartVideo}
                      >
                        <div className="bg-white rounded-full p-4 shadow-lg">
                          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-3 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700">Our Welding Process</h3>
                    <p className="text-xs text-gray-500 mt-1">See our precision metalworking techniques in action</p>
                  </div>
                </motion.div>
              </div>
            )}
            </div>
          </div>
        )}
        
        {/* 特性列表 */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
            <span className="w-1.5 h-5 bg-blue-600 rounded-full mr-2.5"></span>
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {serviceData.features.map((feature, index) => (
              <li 
                key={index} 
                className="flex items-start"
              >
                <span className="bg-green-100 rounded-full p-1 text-green-600 mr-2 flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 图片展示区 - 响应式网格 */}
        {images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full mr-2.5"></span>
              Gallery
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => openLightbox(image)}
                >
                  <img 
                    src={image} 
                    alt={`${serviceData.title} example ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-5 text-white shadow-sm">
          <h3 className="text-lg font-medium mb-2">Interested in our {serviceData.title.toLowerCase()}?</h3>
          <p className="mb-4 opacity-90 text-sm">Contact us today for a personalized consultation and free quote.</p>
          <button 
            onClick={handleContactClick}
            className="inline-flex items-center px-5 py-2 bg-white text-blue-700 font-medium rounded-full text-sm hover:bg-gray-100 transition-colors hover:cursor-pointer"
          >
            Contact Us
            <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 全屏灯箱 */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-full max-h-[85vh]">
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
          
          {/* 导航箭头 */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button 
              onClick={() => {
                const currentIndex = images.indexOf(selectedImage);
                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                setSelectedImage(images[prevIndex]);
              }}
              className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button 
              onClick={() => {
                const currentIndex = images.indexOf(selectedImage);
                const nextIndex = (currentIndex + 1) % images.length;
                setSelectedImage(images[nextIndex]);
              }}
              className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}