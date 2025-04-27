import { useEffect } from "react";
import About from "../components/About";
import Hero from "../components/Hero";
import RecentWork from "../components/RecentWork";
import Services from "../components/Services";
import Work from "../components/Work";
import Contact from "../components/Contact";
import GetQuote from "../components/GetQuote";
import Video from "../components/Video";

const Home = () => {
    useEffect(() => {
        // 检查是否有滚动到特定部分的请求
        const sectionToScroll = sessionStorage.getItem('scrollToSection');
        if (sectionToScroll) {
            // 清除存储的标记
            sessionStorage.removeItem('scrollToSection');
            
            // 给页面一些时间加载，然后滚动
            setTimeout(() => {
                const element = document.getElementById(sectionToScroll);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500); // 延迟500ms确保所有组件都已加载
        }
    }, []);

    return (
        <>
            <Hero />
            <Services />
            <About />
            <Work />
            <RecentWork />
            <Video />
            <GetQuote />
            <Contact />
        </>
    );
};

export default Home;