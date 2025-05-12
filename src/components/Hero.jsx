import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_with_name.svg"; // Import as a URL
import backgroundVideo from "../assets/video/video.mp4"; // 导入视频文件
// 假设您有一个视频缩略图
import videoThumbnail from "../assets/images/gallery/gate/Gate1.jpg"; // 您需要创建这个文件

export default function Hero() {
  // 定义要轮换显示的文字数组和对应的链接
  const rotatingItems = [
    { text: "Gates", link: "/gates" },
    { text: "Fences", link: "/fences" },
    { text: "Balustrades", link: "/balustrades" },
    { text: "Metal Works", link: "/metal-works" }
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animation, setAnimation] = useState("animate-flipIn"); // 初始动画为翻转进入
  const [isPaused, setIsPaused] = useState(false); // 控制动画是否暂停
  const intervalRef = useRef(null); // 用于存储interval引用
  
  // 控制页面元素的进场动画
  const [elementsLoaded, setElementsLoaded] = useState(false);
  // 检测是否在微信浏览器中
  const [isWechat, setIsWechat] = useState(true);
  // 控制视频是否正在播放
  const [videoPlaying, setVideoPlaying] = useState(false);
  // 创建视频引用
  const videoRef = useRef(null);

  // 组件挂载时检测环境并触发进场动画
  useEffect(() => {
    // 检测是否为微信浏览器
    const isWechatBrowser = /MicroMessenger/i.test(navigator.userAgent);
    setIsWechat(isWechatBrowser);
    
    // 设置页面元素加载状态
    setElementsLoaded(true);
  }, []);

  // 开始文字轮换
  const startRotation = () => {
    // 清除已有的interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // 创建新的interval
    intervalRef.current = setInterval(() => {
      // 先应用翻转出去动画
      setAnimation("animate-flipOut");
      
      // 翻转动画完成后更换单词并应用翻转进入动画
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingItems.length);
        setAnimation("animate-flipIn");
      }, 500); // 500ms后切换单词，与翻转动画时长匹配
      
    }, 3000); // 每3秒更换一次
  };

  // 组件挂载和卸载时的处理
  useEffect(() => {
    // 等待页面元素进场动画完成后再开始文字轮换
    const timer = setTimeout(() => {
      if (!isPaused) {
        startRotation();
      }
    }, 1000); // 1秒后开始轮换，给足够时间完成进场动画
    
    // 组件卸载时清除interval和timer
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // 鼠标悬停事件处理
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
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
  
  // 处理视频播放按钮点击
  const handlePlayVideo = () => {
    if (videoRef.current) {
      // 尝试播放视频
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 视频成功播放
            setVideoPlaying(true);
          })
          .catch(error => {
            // 视频播放失败
            console.error("视频播放失败:", error);
            alert("视频播放失败，请尝试点击播放按钮或使用其他浏览器查看。");
          });
      }
    }
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center w-full font-poppins overflow-hidden">
      {/* 背景视频层 */}
      <div className="absolute inset-0 w-full h-full">
        {!isWechat ? (
          // 非微信环境 - 自动播放视频
          <video
            autoPlay
            preload="metadata"
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1500"
            style={{ 
              filter: "brightness(0.6)",
              opacity: elementsLoaded ? 0.5 : 0 
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // 微信环境 - 显示视频封面和播放按钮
          <div className="absolute inset-0 w-full h-full">
            {/* 视频元素 */}
            <video
              ref={videoRef}
              preload="metadata"
              loop
              muted
              playsInline
              poster={videoThumbnail}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                filter: "brightness(0.6)",
                opacity: videoPlaying ? 0.5 : 0 
              }}
            >
              <source src={backgroundVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* 视频封面背景 - 当视频未播放时显示 */}
            {!videoPlaying && (
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
                style={{ 
                  backgroundImage: `url(${videoThumbnail})`,
                  filter: "brightness(0.6)",
                  opacity: elementsLoaded ? 0.5 : 0 
                }}
              ></div>
            )}
            
            {/* 播放按钮 - 当视频未播放时显示 */}
            {!videoPlaying && elementsLoaded && (
              <div 
                onClick={handlePlayVideo}
                className="absolute  cursor-pointer right-10 top-22 z-10"
              >
                <div className="bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all transform hover:scale-110 shadow-xl">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 内容区 */}
      <div className="relative z-10 text-center w-full px-6">
        <img
          src={logo}
          alt="ZC Metal Logo"
          className={`w-48 h-48 mx-auto mb-4 filter brightness-0 invert transition-all duration-1000 ${
            elementsLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
          }`}
        />
        <h1 
          className={`text-4xl md:text-6xl tracking-normal leading-tight mb-6 transition-all duration-1000 delay-300 ${
            elementsLoaded ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-10'
          }`}
        >
          Modern. Durable. Reliable.
        </h1>
        <div className={`h-16 md:h-20 mb-8 perspective-500 transition-all duration-500 delay-400 ${
          elementsLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link 
            to={rotatingItems[currentWordIndex].link}
            className={`inline-block text-2xl md:text-4xl text-blue-400 font-semibold tracking-wide ${animation} hover:text-blue-300 cursor-pointer transition-all duration-200`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {rotatingItems[currentWordIndex].text}
          </Link>
        </div>
        <p 
          className={`text-lg md:text-2xl text-gray-200 tracking-normal mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${
            elementsLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          Custom-Built for Every Home and Business
        </p>
        <div 
          className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 delay-1200 ${
            elementsLoaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          <button 
            onClick={() => scrollToSection('services')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition cursor-pointer"
          >
            View Services
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
