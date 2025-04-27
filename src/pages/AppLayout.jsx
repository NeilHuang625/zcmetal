import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarNav from "../components/SidebarNav";

export default function AppLayout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 定义需要显示侧边栏的路径
  const showSidebarPaths = [
    "/solutions",
    "/services",
    "/gates",
    "/fences",
    "/balustrades",
    "/metal-works"
  ];
  
  // 检查当前路径是否需要显示侧边栏
  // 精确匹配或者以这些路径开头
  const shouldShowSidebar = showSidebarPaths.some(path => 
    currentPath === path || currentPath.startsWith(`${path}/`)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {shouldShowSidebar ? (
        <div className="flex flex-grow pt-16 lg:pt-20">
          {/* 侧边栏容器 - 固定宽度 */}
          <div className="hidden lg:block w-[280px] flex-shrink-0">
            <SidebarNav fixedPosition={false} />
          </div>
          
          {/* 主要内容区 - 占据剩余所有空间 */}
          <div className="w-full flex-grow">
            <main className="min-h-[calc(100vh-5rem-4rem)]"> {/* 减去navbar和footer的高度 */}
              {children}
            </main>
          </div>
        </div>
      ) : (
        <main className="flex-grow">
          {children}
        </main>
      )}
      
      <Footer />
    </div>
  );
}