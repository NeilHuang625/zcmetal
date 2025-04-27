import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function RecentWork() {
  // 状态管理
  const [displayCount, setDisplayCount] = useState(9); // 初始显示9个项目
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [allWorks, setAllWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 使用自定义Hook并确保它能正确运行
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px' // 修改为标准值，避免潜在问题
  });

  // 在组件加载时获取所有图片
  useEffect(() => {
    async function loadImages() {
      try {
        // 使用Vite的import.meta.glob动态导入所有图片
        const imageModules = import.meta.glob('../assets/images/gallery/**/*.{jpg,jpeg,png,svg}');
        
        // 创建处理所有图片的Promise数组
        const imagePromises = Object.entries(imageModules).map(
          async ([path, importFn]) => {
            // 导入图片模块
            const module = await importFn();
            
            // 从路径中提取信息
            const pathParts = path.split('/');
            const filename = pathParts[pathParts.length - 1];
            
            // 确定类别
            let category = 'others';
            if (path.includes('/gate/')) category = 'gates';
            else if (path.includes('/fence/')) category = 'fences';
            else if (path.includes('/balustrade/')) category = 'balustrades';
            else if (path.includes('/metalwork/')) category = 'metal-works';
            
            // 从文件名生成标题
            const title = filename
              .replace(/\.(jpg|jpeg|png|svg)$/, '')
              .replace(/[0-9]/g, '')
              .replace(/_/g, ' ')
              .replace(/-/g, ' ')
              .trim()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ') || 'Metal Work Project';
              
            return {
              id: filename,
              image: module.default,
              category,
              title
            };
          }
        );
        
        // 等待所有图片处理完成
        const loadedImages = await Promise.all(imagePromises);
        console.log("Loaded images:", loadedImages.length);
        
        // 随机排序并更新状态
        setAllWorks(loadedImages.sort(() => Math.random() - 0.5));
        setLoading(false);
      } catch (error) {
        console.error("Error loading gallery images:", error);
        setLoading(false);
      }
    }
    
    loadImages();
  }, []);

  // 处理"加载更多"
  const handleLoadMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 9, allWorks.length));
  };

  // 打开图片查看器
  const openImageViewer = (work) => {
    setSelectedImage(work);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  };

  // 关闭图片查看器
  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto'; // 恢复滚动
  };

  // 切换到上一张图片
  const goToPrevImage = () => {
    const currentIndex = worksToShow.findIndex(work => work.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + worksToShow.length) % worksToShow.length;
    setSelectedImage(worksToShow[prevIndex]);
  };

  // 切换到下一张图片
  const goToNextImage = () => {
    const currentIndex = worksToShow.findIndex(work => work.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % worksToShow.length;
    setSelectedImage(worksToShow[nextIndex]);
  };

  // 键盘导航支持
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showLightbox) return;
      
      if (e.key === 'ArrowLeft') {
        goToPrevImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox, selectedImage]);

  // 待显示的作品
  const worksToShow = allWorks.slice(0, displayCount);

  // 加载状态
  if (loading) {
    return (
      <section ref={sectionRef} className="bg-gray-100 py-20 font-poppins">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Loading our gallery...</h2>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // 没有图片的状态
  if (allWorks.length === 0) {
    return (
      <section ref={sectionRef} className="bg-gray-100 py-20 font-poppins">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Recent Work</h2>
          <p className="text-gray-600">No gallery images found. Please check back soon!</p>
        </div>
      </section>
    );
  }

  // 主要渲染
  return (
    <section id="recent-work" ref={sectionRef} className="bg-gray-100 py-20 font-poppins overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Recent Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest projects showcasing quality craftsmanship, innovative design, and attention to detail.
          </p>
        </div>

        {/* 类别导航 */}
        <div className={`flex flex-wrap justify-center mb-12 transition-all duration-1000 delay-200 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>
          <Link 
            to="/gates" 
            className="px-6 py-2.5 m-1 bg-white hover:bg-gray-800 hover:text-white rounded-full shadow-sm transition-colors duration-300"
          >
            Gates
          </Link>
          <Link 
            to="/fences" 
            className="px-6 py-2.5 m-1 bg-white hover:bg-gray-800 hover:text-white rounded-full shadow-sm transition-colors duration-300"
          >
            Fences
          </Link>
          <Link 
            to="/balustrades" 
            className="px-6 py-2.5 m-1 bg-white hover:bg-gray-800 hover:text-white rounded-full shadow-sm transition-colors duration-300"
          >
            Balustrades
          </Link>
          <Link 
            to="/metal-works" 
            className="px-6 py-2.5 m-1 bg-white hover:bg-gray-800 hover:text-white rounded-full shadow-sm transition-colors duration-300"
          >
            Metal Works
          </Link>
        </div>

        {/* 作品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {worksToShow.map((work, index) => (
            <motion.div 
              key={work.id}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group"
              onClick={() => openImageViewer(work)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isSectionVisible ? 1 : 0, 
                y: isSectionVisible ? 0 : 20,
                transition: { 
                  delay: 0.1 + (index * 0.05),
                  duration: 0.5
                }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-200">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    console.error(`Error loading image: ${work.image}`);
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
                
                {/* 类别标签 */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs rounded-full capitalize">
                  {work.category.replace('-', ' ')}
                </div>
                
                {/* 悬停时显示的信息层 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-gray-300 mt-1 flex items-center">
                    <span>View details</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        {displayCount < allWorks.length && (
          <div className={`text-center mt-12 transition-all duration-700 ${
            isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: isSectionVisible ? '800ms' : '0ms' }}>
            <motion.button
              onClick={handleLoadMore}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Projects
            </motion.button>
          </div>
        )}

        {/* 所有作品已加载的提示 */}
        {displayCount >= allWorks.length && displayCount > 6 && (
          <div className="text-center mt-12 text-gray-600">
            You've viewed all projects in our gallery.
          </div>
        )}

        {/* 大图查看器 - 使用类似ServiceDetail的灯箱样式 */}
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
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain"
                onError={(e) => {
                  console.error(`Error loading large image: ${selectedImage.image}`);
                  e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
            </div>
            
            {/* 导航箭头 - 左侧 */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button 
                onClick={goToPrevImage}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            {/* 导航箭头 - 右侧 */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button 
                onClick={goToNextImage}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* 图片信息 - 底部 */}
            <div className="absolute bottom-8 left-0 w-full text-center">
              <div className="bg-black bg-opacity-50 text-white py-2 px-4 rounded-lg inline-block">
                <p className="font-medium text-sm mb-1">
                  {selectedImage.title}
                </p>
                <p className="text-xs text-gray-300 capitalize">
                  Category: {selectedImage.category.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}