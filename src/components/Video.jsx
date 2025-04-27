import React, { useState, useRef, useEffect } from 'react';
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function Video() {
  // 使用Vite的动态导入获取视频和缩略图
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 动画效果相关
  const [sectionRef, isSectionVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  // 滑动功能状态管理
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  // 控制视频播放
  const videoRefs = useRef({});

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
            '1': 'Robust Single-Side Sliding Gate',
            '2': 'Unique Dual-Swing Gate Design',
            '3': 'Seamless Gate Integration with Home Design',
            '4': 'All-in-One Fence and Gate for Sloped Terrain',
            '5': 'Heavy-Duty Sliding Gate for Steep Driveway',
            '6': 'Custom Fence and Sliding Gate Combo',
            '7': 'Elegant Dual-Gate and Fence Design',
            '8': 'Privacy-Focused Gate and Fence Solution',
            '9': 'Full-Service Metal Work and Installation',
            '10': 'Comprehensive Metal Work to Installation'
        };
        
        // 视频描述映射 
        const descriptionMap = {
            '1': 'A powerful and sturdy single-side sliding gate designed for strength and durability.',
            '2': 'An eye-catching dual-swing gate with a unique custom design.',
            '3': 'An extra-long automatic sliding gate that perfectly matches the architectural style of the house.',
            '4': 'Integrated fence and electric gate system built to accommodate steep terrain.',
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

  // 滑动开始
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // 滑动中
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 滑动速度倍增
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // 滑动结束
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // 计算当前视图中心的视频索引
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const itemWidth = sliderRef.current.offsetWidth / 2.5; // 假设每个项目占容器宽度的40%
      const index = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(Math.min(Math.max(0, index), videoData.length - 1));
    }
  };

  // 触摸设备支持
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // 滚动到指定视频
  const scrollToVideo = (index) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.offsetWidth / 2.5;
      sliderRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  // 上一个视频
  const prevVideo = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToVideo(newIndex);
  };

  // 下一个视频
  const nextVideo = () => {
    const newIndex = Math.min(videoData.length - 1, currentIndex + 1);
    scrollToVideo(newIndex);
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

  // 加载状态
  if (loading) {
    return (
      <section 
        ref={sectionRef}
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
        className="py-20 bg-gray-900 text-white font-poppins"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Work in Action</h2>
          <p className="text-gray-400">No videos available at the moment. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="videos"
      ref={sectionRef} 
      className="py-20 bg-gray-900 text-white overflow-hidden font-poppins"
    >
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <div className={`text-center mb-10 transition-all duration-1000 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work in Action</h2>
          <p className="text-gray-400 max-w-7xl mx-auto">
            Watch our skilled craftsmen in action as they create and install custom metal works for our valued clients.
          </p>
        </div>

   {/* 视频轮播控制 */}
        <div className={`relative transition-all duration-1000 delay-200 ${
          isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0'
        }`}>
          {/* 上一个/下一个按钮 */}
          <button
            onClick={prevVideo}
            className={`absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-90'
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextVideo}
            className={`absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-all ${
              currentIndex === videoData.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-90'
            }`}
            disabled={currentIndex === videoData.length - 1}
            aria-label="Next video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 视频轮播容器 */}
          <div
            ref={sliderRef}
            className={`flex overflow-x-auto snap-x snap-mandatory hide-scrollbar ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {videoData.map((video, index) => (
              <div
                key={video.id}
                className="min-w-[80%] md:min-w-[40%] p-3 snap-center"
              >
                <div 
                  className={`bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-500 ${
                    currentIndex === index ? 'scale-105 border-2 border-blue-500' : 'scale-100'
                  }`}
                  onClick={() => openVideoPlayer(video)}
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
                      onMouseEnter={(e) => e.target.play().catch(err => console.log(err))}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                    
                    {/* 播放按钮覆盖层 */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600/80 group-hover:bg-blue-600 transition-all transform group-hover:scale-110">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* 视频信息 */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
            {/* 视频导航指示器 */}
            <div className={`flex justify-center my-8 transition-all duration-700 delay-100 ${
                isSectionVisible ? 'opacity-100 transform-none' : 'opacity-0'
                }`}>
                {videoData.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => scrollToVideo(index)}
                    className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                        currentIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
      
      {/* 全屏视频播放器 */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            {/* 关闭按钮 */}
            <button
              onClick={closeVideoPlayer}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
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
            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold">{activeVideo.title}</h3>
              <p className="text-gray-300 mt-2">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}