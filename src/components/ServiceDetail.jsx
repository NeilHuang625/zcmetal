import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  
  // 根据serviceId找到对应的服务数据
  const serviceData = servicesData[serviceId] || {
    title: "Service Details",
    description: "Information about this service is not available.",
    longDescription: "",
    features: []
  };
  
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

  return (
    <div className="w-full bg-white font-poppins tracking-wide">
      {/* 改进的标题区域 */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
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
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mb-12 -mr-12 opacity-50"></div>
        <div className="absolute top-0 right-8 w-6 h-6 bg-blue-100 rounded-full opacity-70"></div>
        <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-blue-200 rounded-full opacity-50"></div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-4 py-6">
        
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