import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SidebarNav({ fixedPosition = true }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 使用对象来跟踪每个分类的展开状态
  const [expandedCategories, setExpandedCategories] = useState({});
  
  // 构建导航数据 - 修改顺序：Services在前，Solutions在后
  const navigationItems = [
    {
      id: "services",
      title: "Services",
      path: "/services",
      isActive: currentPath.includes("/services") ||
                currentPath.includes("/gates") ||
                currentPath.includes("/fences") ||
                currentPath.includes("/balustrades") ||
                currentPath.includes("/metal-works"),
      children: [
        { title: "Gates", path: "/gates" },
        { title: "Fences", path: "/fences" },
        { title: "Balustrades", path: "/balustrades" },
        { title: "Metal Works", path: "/metal-works" }
      ]
    },
    {
      id: "solutions",
      title: "Solutions",
      path: "/solutions",
      isActive: currentPath.includes("/solutions"),
      children: [
        { title: "Premium Matching Gate & Fence", path: "/solutions/1" },
        { title: "Coastal Panoramic balustrade", path: "/solutions/2" },
        { title: "Sloped Driveway Automated Gate", path: "/solutions/3" },
        { title: "7-Meter Automated Entrance", path: "/solutions/4" },
        { title: "Comprehensive Property Perimeter", path: "/solutions/5" }
      ]
    }
  ];

  // 为子项设置活动状态
  const processedNavItems = navigationItems.map(category => {
    if (category.children) {
      const processedChildren = category.children.map(child => ({
        ...child,
        isActive: currentPath === child.path || 
                 currentPath.includes(child.path) ||
                 (currentPath.includes('/solutions/') && child.path.includes(currentPath.split('/')[2]))
      }));
      
      return {
        ...category,
        children: processedChildren,
        // 如果任何子项是活动的，确保父类别也显示为活动的
        isActive: category.isActive || processedChildren.some(child => child.isActive)
      };
    }
    return category;
  });

  // 初始化展开状态 - 基于活动项目
  useEffect(() => {
    const newExpandedState = {};
    
    processedNavItems.forEach(item => {
      // 如果当前分类或其任何子项是活动的，则展开该分类
      if (item.isActive) {
        newExpandedState[item.id] = true;
      }
    });
    
    setExpandedCategories(newExpandedState);
  }, [currentPath]); // 仅在路径变化时运行

  // 切换特定分类的展开状态
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  // 全部展开/收起
  const expandAll = () => {
    const allIds = processedNavItems.map(item => item.id);
    const newState = {};
    allIds.forEach(id => {
      newState[id] = true;
    });
    setExpandedCategories(newState);
  };
  
  const collapseAll = () => {
    setExpandedCategories({});
  };
  
  // 检查是否所有分类都已展开
  const areAllExpanded = processedNavItems.every(item => 
    expandedCategories[item.id]
  );

  // 渲染导航项
  const renderNavItems = () => (
    <nav className="space-y-8 font-poppins">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">Search by</h3>
        <button 
          onClick={areAllExpanded ? collapseAll : expandAll}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          aria-label={areAllExpanded ? "Collapse all categories" : "Expand all categories"}
        >
          {areAllExpanded ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Collapse All
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Expand All
            </>
          )}
        </button>
      </div>
      
      <div className="border-b border-gray-200 mb-6"></div>
      
      {processedNavItems.map((category) => {
        const isExpanded = !!expandedCategories[category.id];
        
        return (
          <div key={category.id} className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <Link 
                to={category.path}
                className={`flex-grow text-lg font-medium ${
                  category.isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                } transition-colors group`}
              >
                {category.title}
              </Link>
              
              {category.children && (
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={isExpanded ? `Collapse ${category.title}` : `Expand ${category.title}`}
                >
                  <svg 
                    className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'} ${
                      category.isActive ? 'text-blue-600' : 'text-gray-700'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* 子项目列表 - 添加高度过渡动画 */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded 
                  ? 'max-h-[500px] opacity-100 translate-y-0' 
                  : 'max-h-0 opacity-0 -translate-y-2'
              }`}
            >
              {category.children && (
                <ul className="pl-5 pt-2 space-y-3 border-l-2 border-gray-200">
                  {category.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      <Link 
                        to={child.path}
                        className={`block py-1 text-base group flex items-center ${
                          child.isActive 
                            ? 'text-blue-600 font-medium' 
                            : 'text-gray-600 hover:text-blue-600'
                        } transition-colors`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                          child.isActive 
                            ? 'bg-blue-600 scale-125' 
                            : 'bg-gray-400 group-hover:bg-blue-400'
                        }`}></span>
                        <span className="flex-grow">{child.title}</span>
                        <span className="transform transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );

  // 如果不是固定定位模式，使用常规布局
  if (!fixedPosition) {
    return (
      <div className="h-full">
        <div className="py-6 px-6 h-full overflow-y-auto">
          {renderNavItems()}
        </div>
      </div>
    );
  }

  // 固定定位模式（独立渲染时使用）
  return (
    <div 
      className="fixed left-0 hidden lg:block transition-all duration-300"
      style={{ 
        top: `64px`, // 导航栏高度
        height: `calc(100vh - 64px - 4rem)`, // 减去footer的高度
        width: '25%',
        maxWidth: '320px'
      }}
    >
      <div className="py-6 px-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {renderNavItems()}
      </div>
    </div>
  );
}