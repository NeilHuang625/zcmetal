import { useState, useEffect, useRef } from 'react';

export default function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  
  useEffect(() => {
    // 添加调试信息
    console.log("useScrollAnimation Hook mounted, domRef:", domRef.current);
    
    // 确保浏览器支持 IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      console.warn("IntersectionObserver not supported");
      setIsVisible(true); // 降级处理
      return;
    }
    
    const observer = new IntersectionObserver(entries => {
      // 添加调试信息
      console.log("IntersectionObserver callback fired", entries);
      
      // 更新可见性状态，根据元素是否在视口中
      const entry = entries[0];
      if (entry) {
        console.log("Element intersection state:", entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });
    
    const currentRef = domRef.current;
    if (currentRef) {
      console.log("Observing element:", currentRef);
      observer.observe(currentRef);
    } else {
      console.warn("Failed to observe - domRef.current is null");
    }
    
    return () => {
      console.log("Cleanup: unobserving element");
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);
  
  return [domRef, isVisible];
}