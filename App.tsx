import { useState, useEffect } from "react";
import logoImg from "../assets/logo.png";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MetricsBar } from "./components/MetricsBar";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionFlowSection } from "./components/SolutionFlowSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { ProcessSection } from "./components/ProcessSection";
import { ServicesSection } from "./components/ServicesSection";
import { AdvancedSEOSection } from "./components/AdvancedSEOSection";
import { AISolutionsSection } from "./components/AISolutionsSection";
import { AuditLeadMagnetSection } from "./components/AuditLeadMagnetSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";
import { AuditModal } from "./components/AuditModal";

export default function App() {
  const [auditOpen, setAuditOpen] = useState(false);
  const open = () => setAuditOpen(true);

  useEffect(() => {
    document.title = "Tythas Digital — Website Growth & Lead Generation";

    // Remove existing favicons and set the real logo
    document.querySelectorAll("link[rel*='icon']").forEach(l => l.remove());

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = logoImg;
    document.head.appendChild(favicon);

    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = logoImg;
    document.head.appendChild(apple);
  }, []);

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <Navbar onAuditClick={open}/>
      <main>
        <HeroSection onAuditClick={open}/>
        <MetricsBar/>
        <ProblemSection onAuditClick={open}/>
        <SolutionFlowSection/>
        <IndustriesSection/>
        <CaseStudiesSection/>
        <ProcessSection/>
        <ServicesSection onAuditClick={open}/>
        <AdvancedSEOSection onAuditClick={open}/>
        <AISolutionsSection/>
        <AuditLeadMagnetSection onAuditClick={open}/>
        <FinalCTASection onAuditClick={open}/>
      </main>
      <Footer onAuditClick={open}/>
      <AuditModal isOpen={auditOpen} onClose={()=>setAuditOpen(false)}/>

      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:3px; }
        
        /* Enhanced mobile responsiveness */
        @media (max-width: 768px) {
          body { font-size: 16px; }
          h1 { font-size: clamp(32px, 8vw, 48px) !important; }
          h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          section { padding: 60px 0 !important; }
        }
        
        @media (max-width: 480px) {
          section { padding: 48px 0 !important; }
        }
        
        /* Smooth touch interactions */
        button, a { -webkit-tap-highlight-color: rgba(37, 99, 235, 0.1); }
      `}</style>
    </div>
  );
}