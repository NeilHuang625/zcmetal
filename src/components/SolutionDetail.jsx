import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { solutions } from "../data/solutions";

export default function SolutionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // 查找匹配的案例
    const foundSolution = solutions.find(item => item.id === id);
    setSolution(foundSolution);
    setLoading(false);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
  }, [id]);

  // 暂停视频当组件卸载时
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // 处理导航到首页Get Quote部分
  const handleGetQuoteClick = () => {
    // 使用sessionStorage存储标记，表示在加载首页后需要滚动到get-quote部分
    sessionStorage.setItem('scrollToSection', 'get-quote');
    
    // 然后导航到首页
    navigate('/');
  };

  // 监听Home页面加载完成后的滚动需求
  useEffect(() => {
    // 这段代码仅在组件挂载时执行一次
    const handleStorageChange = () => {
      const sectionToScroll = sessionStorage.getItem('scrollToSection');
      if (sectionToScroll) {
        // 清除存储的标记，防止下次刷新页面时再次滚动
        sessionStorage.removeItem('scrollToSection');
        
        // 延迟一下再滚动，确保DOM已完全渲染
        setTimeout(() => {
          const element = document.getElementById(sectionToScroll);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    // 添加监听器来检测storage变化
    window.addEventListener('storage', handleStorageChange);
    
    // 当组件卸载时移除监听器
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading solution details...</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Solution not found</h2>
        <Link to="/solutions" className="text-blue-600 hover:underline">Back to All Solutions</Link>
      </div>
    );
  }

  // 假设方案图片集合
  const galleryImages = solution.galleryImages || [solution.image];
  const video = solution.videos && solution.videos.length > 0 ? solution.videos[0] : null;

  return (
    <div className="bg-white min-h-screen font-poppins">
      {/* 顶部大横幅图片 */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div 
            className="text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {solution.title}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto opacity-90 drop-shadow">
              {solution.subtitle || "Custom metal solution designed for excellence and durability"}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* 项目概述 - 从左到右的布局 */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 inline-block border-b-2 border-blue-500 pb-2">
                Project Overview
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {solution.fullDescription || solution.description}
              </p>
              
              {solution.timeline && (
                <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-xl mb-3 text-gray-800">Timeline</h3>
                  <p className="text-gray-700">{solution.timeline}</p>
                </div>
              )}
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
              <img 
                src={galleryImages[0]} 
                alt={solution.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* 设计挑战和解决方案 - 从右到左的布局 */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              {video ? (
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <video 
                    ref={videoRef}
                    src={video} 
                    controls 
                    poster={solution.image}
                    className="w-full h-auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                  <img 
                    src={galleryImages[galleryImages.length > 1 ? 1 : 0]} 
                    alt={solution.title + " detail"} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 inline-block border-b-2 border-blue-500 pb-2">
                Design Challenge & Solution
              </h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-xl mb-3 text-gray-800">The Challenge</h3>
                <ul className="space-y-3">
                  {(solution.designChallenges || []).map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-3 text-gray-800">Our Solution</h3>
                <p className="text-gray-700 leading-relaxed">
                  {solution.designSolution || "Our team of skilled craftsmen developed a custom solution that perfectly addressed these challenges while exceeding the client's expectations for quality and aesthetics."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* 关键特性 */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            <span className="inline-block border-b-2 border-blue-500 pb-2">Key Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(solution.features || []).map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {feature.split(":")[0] || feature}
                  </h3>
                </div>
                {feature.includes(":") && (
                  <p className="text-gray-600 pl-13">
                    {feature.split(":")[1].trim()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* 客户证言 */}
        {solution.testimonial && (
          <motion.div 
            className="mb-24 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="flex justify-center mb-8">
                <svg className="w-16 h-16 text-blue-400 opacity-30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="text-xl md:text-2xl text-gray-700 leading-relaxed italic text-center mb-8">
                "{solution.testimonial}"
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-lg">{solution.clientName}</p>
                {solution.clientLocation && (
                  <p className="text-gray-600">{solution.clientLocation}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* 项目相册 */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            <span className="inline-block border-b-2 border-blue-500 pb-2">Project Gallery</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                onClick={() => setActiveImageIndex(index)}
                className="h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA 部分 - 更新按钮点击处理函数 */}
        <motion.div 
          className="mb-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className="bg-gray-800 text-white rounded-xl p-10 md:p-16 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Custom Solution?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
              Let's discuss how we can create a similar solution tailored specifically to your property and requirements.
            </p>
            <button 
              onClick={handleGetQuoteClick}
              className="inline-block bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium px-8 py-4 rounded-full transition-colors duration-300 shadow-md text-lg"
            >
              Request Your Custom Solution
            </button>
          </div>
        </motion.div>
        
        {/* 相关方案 */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            <span className="inline-block border-b-2 border-blue-500 pb-2">Related Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.filter(s => s.id !== id).slice(0, 3).map((relatedSolution) => (
              <Link 
                key={relatedSolution.id} 
                to={`/solutions/${relatedSolution.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group block"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={relatedSolution.image} 
                    alt={relatedSolution.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {relatedSolution.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {relatedSolution.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>View details</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}