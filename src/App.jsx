import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Solutions from "./components/Solutions";
import SolutionDetail from "./components/SolutionDetail";
import Services from "./components/Services";
import ServiceDetail from "./components/ServiceDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/solutions" element={<AppLayout><Solutions /></AppLayout>} />
        <Route path="/solutions/:id" element={<AppLayout><SolutionDetail /></AppLayout>} />
        <Route path="/services" element={<AppLayout><Services /></AppLayout>} />
        
        {/* 使用动态路由参数 */}
        <Route path="/:serviceId" element={<AppLayout><ServiceDetail /></AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
