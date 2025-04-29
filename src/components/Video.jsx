import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Video() {
  // 状态管理
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 使用自定义Hook监测滚动
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  // 视频引用管理
  const videoRefs = useRef({});
  const carouselRef = useRef(null);

  // 加载视频数据
  useEffect(() => {
    async function loadVideoData() {
      try {
        // 使用Vite的import.meta.glob动态导入
        const videoModules = import.meta.glob('../assets/video/**/*.mp4');
        const thumbnailModules = import.meta.glob('../assets/video/**/*.jpg');
        
        // 视频文件夹从1到10的映射数据
        const videoItems = [];
        
        // 首先读取所有的视频和缩略图路径
        const videoPaths = Object.keys(videoModules);
        const thumbnailPaths = Object.keys(thumbnailModules);
        
        // 视频标题映射
        const titleMap = {
            '1': 'Robust Single-Side Swing Gate',
            '2': 'Unique Dual-Swing Gate Design',
            '3': 'Seamless Gate Integration with Home Design',
            '4': 'Single-Sided Swing Gate with Full Automation',
            '5': 'Heavy-Duty Sliding Gate for Steep Driveway',
            '6': 'Custom Fence and Sliding Gate Combo',
            '7': 'Elegant Dual-Gate and Fence Design',
            '8': 'Privacy-Focused Gate and Fence Solution',
            '9': 'Full-Service Metal Work and Installation',
            '10': 'Comprehensive Metal Work to Installation'
        };
        
        // 视频描述映射 
        const descriptionMap = {
            '1': 'A powerful and sturdy single-side swing gate designed for strength and durability.',
            '2': 'An eye-catching dual-swing gate with a unique custom design.',
            '3': 'An extra-long automatic sliding gate that perfectly matches the architectural style of the house.',
            '4': 'A Complete Driveway Access System with Keypad, Remote Control, and Exit Sensor.',
            '5': 'A solid and forceful sliding gate engineered for challenging sloped driveways.',
            '6': 'Tailor-made fence and sliding gate solution designed to meet the client’s specific requirements.',
            '7': 'A premium-quality integrated gate and fence system featuring elegant tones and upscale design.',
            '8': 'A beautifully crafted gate and fence setup that prioritizes privacy without compromising aesthetics.',
            '9': 'End-to-end service from precision metal work to final gate and fence installation.',
            '10': 'Turnkey metal work project, covering everything from custom fabrication to complete installation.'
        };
        
        // 处理文件名，提取文件夹编号
        for (let i = 1; i <= 10; i++) {
          const folderNum = i.toString();
          
          // 查找匹配的视频和缩略图
          const videoPath = videoPaths.find(path => path.includes(`/${folderNum}/${folderNum}.mp4`));
          const thumbnailPath = thumbnailPaths.find(path => path.includes(`/${folderNum}/${folderNum}.jpg`));
          
          if (videoPath && thumbnailPath) {
            // 添加到视频数据数组
            videoItems.push({
              id: i,
              title: titleMap[folderNum] || `Video Project ${folderNum}`,
              description: descriptionMap[folderNum] || `Custom metal work project showcase.`,
              videoPath: videoPath,
              thumbnailPath: thumbnailPath,
            });
          }
        }
        
        // 异步加载所有视频和缩略图
        const loadedVideos = await Promise.all(
          videoItems.map(async (item) => {
            const videoModule = await videoModules[item.videoPath]();
            const thumbnailModule = await thumbnailModules[item.thumbnailPath]();
            
            return {
              ...item,
              src: videoModule.default,
              thumbnail: thumbnailModule.default
            };
          })
        );
        
        setVideoData(loadedVideos);
        setLoading(false);
      } catch (error) {
        console.error("Error loading video data:", error);
        setLoading(false);
      }
    }
    
    loadVideoData();
  }, []);

  // 自动播放第一个视频缩略图
  useEffect(() => {
    if (isSectionVisible && videoData.length > 0 && !activeVideo) {
      setTimeout(() => {
        if (videoRefs.current[videoData[0].id]) {
          videoRefs.current[videoData[0].id].play().catch(err => console.log("Autoplay prevented:", err));
        }
      }, 1000);
    }
  }, [isSectionVisible, videoData, activeVideo]);

  // 切换到指定视频
  const handleDragEnd = (e, info) => {
    if (!carouselRef.current) return;
    
    // 计算当前滑动方向和距离
    const dragDistance = info.offset.x;
    const itemWidth = carouselRef.current.offsetWidth * 0.4; // 视频项宽度的40%
    
    // 如果拖动距离足够大，切换到下一个或上一个
    if (Math.abs(dragDistance) > itemWidth * 0.3) {
      // 向左拖动，切换到下一个
      if (dragDistance < 0 && currentIndex < videoData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      // 向右拖动，切换到上一个
      else if (dragDistance > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // 导航到上一个视频
  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 导航到下一个视频
  const nextVideo = () => {
    if (currentIndex < videoData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 直接跳转到指定索引的视频
  const goToVideo = (index) => {
    setCurrentIndex(index);
  };

  // 打开视频播放器
  const openVideoPlayer = (video) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden'; // 防止背景滚动
  };

  // 关闭视频播放器
  const closeVideoPlayer = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto'; // 恢复滚动
  };
  
  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeVideo) {
        if (e.key === 'Escape') {
          closeVideoPlayer();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          prevVideo();
        } else if (e.key === 'ArrowRight') {
          nextVideo();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo, currentIndex]);

  // 为标题和内容定义动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3, 
        duration: 0.5 
      }
    }
  };
  
  const indicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.6 }
    }
  };
  
  // 加载状态
  if (loading) {
    return (
      <section 
        ref={sectionRef}
        id="videos"
        className="py-20 bg-gray-900 text-white font-poppins"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Work in Action</h2>
          <div className="flex justify-center mt-10">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 mt-4">Loading videos...</p>
        </div>
      </section>
    );
  }

  // 没有视频的状态
  if (videoData.length === 0) {
    return (
      <section 
        ref={sectionRef}
        id="videos"
        className="py-20 bg-gray-900 text-white font-poppins"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Work in Action</h2>
          <p className="text-gray-400">No videos available at the moment. Please check back later.</p>
        </div>
      </section>
    );
  }

  // 计算轮播偏移量
  const carouselX = -currentIndex * 40; // 40%的宽度

  return (
    <section 
      id="videos"
      ref={sectionRef} 
      className="py-20 bg-gray-900 text-white overflow-hidden font-poppins"
    >
      <div className="container mx-auto px-4">
        {/* 标题部分 - 使用Framer Motion动画 */}
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          animate={isSectionVisible ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work in Action</h2>
          <p className="text-gray-400 max-w-7xl mx-auto">
            Watch our skilled craftsmen in action as they create and install custom metal works for our valued clients.
          </p>
        </motion.div>

        {/* 视频轮播控制区 */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate={isSectionVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* 导航按钮 */}
          <motion.button
            onClick={prevVideo}
            className={`absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-90 hover:scale-110'
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous video"
            whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextVideo}
            className={`absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-all ${
              currentIndex === videoData.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-90 hover:scale-110'
            }`}
            disabled={currentIndex === videoData.length - 1}
            aria-label="Next video"
            whileHover={{ scale: currentIndex === videoData.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: currentIndex === videoData.length - 1 ? 1 : 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* 改进的视频轮播 - 使用Framer Motion */}
          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div 
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{ x: `${carouselX}vw` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {videoData.map((video, index) => (
                <motion.div
                  key={video.id}
                  className="min-w-[80vw] md:min-w-[40vw] p-3"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: isSectionVisible ? 1 : 0, 
                    y: isSectionVisible ? 0 : 50,
                    transition: { 
                      delay: 0.2 + (index * 0.1),
                      duration: 0.5
                    }
                  }}
                >
                  <motion.div 
                    className={`bg-gray-800 rounded-lg overflow-hidden shadow-xl transition-all duration-300 ${
                      currentIndex === index ? 'border-2 border-blue-500' : ''
                    }`}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    onClick={() => openVideoPlayer(video)}
                    animate={{ 
                      scale: currentIndex === index ? 1.05 : 1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* 视频缩略图 */}
                    <div className="relative aspect-video bg-gray-900 overflow-hidden group cursor-pointer">
                      <video
                        ref={el => videoRefs.current[video.id] = el}
                        className="w-full h-full object-cover"
                        src={video.src}
                        poster={video.thumbnail}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => {
                          if (currentIndex === index) {
                            e.target.play().catch(err => console.log(err));
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      
                      {/* 播放按钮覆盖层 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                        <motion.div 
                          className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600/80 group-hover:bg-blue-600 transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* 视频信息 */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 视频导航指示器 */}
          <motion.div 
            className="flex justify-center mt-8"
            initial="hidden"
            animate={isSectionVisible ? "visible" : "hidden"}
            variants={indicatorVariants}
          >
            {videoData.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => goToVideo(index)}
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  scale: currentIndex === index ? 1.2 : 1,
                  backgroundColor: currentIndex === index ? "#3b82f6" : "#4b5563"
                }}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* 全屏视频播放器 - 使用AnimatePresence实现平滑过渡 */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* 关闭按钮 */}
              <motion.button
                onClick={closeVideoPlayer}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              
              {/* 视频播放器 */}
              <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto max-h-[80vh]"
                  src={activeVideo.src}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                />
              </div>
              
              {/* 视频信息 */}
              <motion.div 
                className="mt-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold">{activeVideo.title}</h3>
                <p className="text-gray-300 mt-2">
                  {activeVideo.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}