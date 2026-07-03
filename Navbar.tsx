import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logoImg from "../../assets/logo.png";

interface NavbarProps {
  onAuditClick: () => void;
}

const NAV_LINKS = ["Services", "Solutions", "Industries", "Case Studies", "About", "Resources"];
const PHONES = ["8767977216", "7887675816"];

function ExpertPopup({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 10px)",
      right: 0,
      background: "#FFFFFF",
      border: "1px solid #E2E8F0",
      borderRadius: "16px",
      boxShadow: "0 16px 48px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
      padding: "6px",
      minWidth: "220px",
      zIndex: 200,
    }}>
      {/* Arrow pointer */}
      <div style={{
        position: "absolute", top: "-6px", right: "28px",
        width: "12px", height: "12px",
        background: "#FFFFFF", border: "1px solid #E2E8F0",
        borderBottom: "none", borderRight: "none",
        transform: "rotate(45deg)",
      }}/>

      {/* Header */}
      <div style={{
        padding: "10px 14px 8px",
        borderBottom: "1px solid #F1F5F9",
        marginBottom: "4px",
      }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontWeight: 700,
          fontSize: "13px", color: "#0F172A", margin: 0,
        }}>Talk to an Expert</p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "11px",
          color: "#64748B", margin: "2px 0 0",
        }}>Call us directly — we're available Mon–Sat</p>
      </div>

      {/* Phone numbers */}
      {PHONES.map((num) => (
        <a
          key={num}
          href={`tel:${num}`}
          onClick={onClose}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 14px", borderRadius: "10px",
            textDecoration: "none",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#F8FAFC")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{
            width: "34px", height: "34px", borderRadius: "9px",
            background: "#EFF6FF", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <Phone size={15} color="#2563EB" />
          </div>
          <div>
            <div style={{
              fontFamily: "'Manrope', sans-serif", fontWeight: 700,
              fontSize: "14px", color: "#0F172A", letterSpacing: "0.2px",
            }}>{num}</div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#64748B",
            }}>Tap to call</div>
          </div>
        </a>
      ))}

      {/* Footer note */}
      <div style={{
        margin: "4px 8px 6px",
        background: "#F8FAFC", borderRadius: "8px",
        padding: "8px 10px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <Phone size={11} color="#94A3B8" />
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#94A3B8",
        }}>work@tythas.com</span>
      </div>
    </div>
  );
}

export function Navbar({ onAuditClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [mobileExpertOpen, setMobileExpertOpen] = useState(false);
  const expertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    if (!expertOpen) return;
    const handler = (e: MouseEvent) => {
      if (expertRef.current && !expertRef.current.contains(e.target as Node)) {
        setExpertOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [expertOpen]);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#FFFFFF",
      borderBottom: `1px solid ${scrolled ? "#E2E8F0" : "transparent"}`,
      boxShadow: scrolled ? "0 1px 16px rgba(15,23,42,0.06)" : "none",
      transition: "box-shadow 0.3s, border-color 0.3s",
      height: "72px", display: "flex", alignItems: "center",
    }}>
      <div style={{
        maxWidth: "1240px", margin: "0 auto", padding: "0 28px",
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={logoImg}
            alt="Tythas Digital"
            style={{ height: "48px", width: "auto", display: "block" }}
          />
        </a>

        {/* Desktop Centre Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px",
              color: "#475569", textDecoration: "none",
              padding: "6px 12px", borderRadius: "8px",
              transition: "color 0.18s, background 0.18s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.background = "#F8FAFC"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; }}
            >{link}</a>
          ))}
        </nav>

        {/* Desktop Right CTAs */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Talk to an Expert — with popup */}
          <div ref={expertRef} style={{ position: "relative" }}>
            <button
              onClick={() => setExpertOpen(o => !o)}
              style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px",
                color: expertOpen ? "#0F172A" : "#475569",
                background: expertOpen ? "#F8FAFC" : "transparent",
                border: "none", cursor: "pointer",
                padding: "8px 12px", borderRadius: "8px",
                display: "flex", alignItems: "center", gap: "5px",
                transition: "color 0.18s, background 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.background = "#F8FAFC"; }}
              onMouseLeave={e => {
                if (!expertOpen) {
                  e.currentTarget.style.color = "#475569";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Phone size={14} />
              Talk to an Expert
              <ChevronDown
                size={13}
                style={{
                  transition: "transform 0.2s",
                  transform: expertOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {expertOpen && <ExpertPopup onClose={() => setExpertOpen(false)} />}
          </div>

          <button onClick={onAuditClick} style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px",
            color: "#FFFFFF", background: "#2563EB", border: "none",
            borderRadius: "10px", padding: "9px 18px", cursor: "pointer",
            transition: "background 0.18s, transform 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(0)"; }}
          >Get Free Website Audit</button>
        </div>

        {/* Mobile row */}
        <div className="mobile-controls" style={{ display: "none", alignItems: "center", gap: "10px" }}>
          <button onClick={onAuditClick} style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px",
            color: "#FFFFFF", background: "#2563EB", border: "none",
            borderRadius: "8px", padding: "8px 14px", cursor: "pointer",
          }}>Free Audit</button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: "none", border: "none", cursor: "pointer", color: "#0F172A", padding: "4px",
          }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu" style={{
          position: "absolute", top: "72px", left: 0, right: 0,
          background: "#FFFFFF", borderBottom: "1px solid #E2E8F0",
          padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: "2px",
        }}>
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" onClick={() => setMobileOpen(false)} style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "16px",
              color: "#0F172A", textDecoration: "none", padding: "12px 4px",
              borderBottom: "1px solid #F1F5F9",
            }}>{link}</a>
          ))}

          {/* Mobile Talk to an Expert — expandable */}
          <div>
            <button
              onClick={() => setMobileExpertOpen(o => !o)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "15px",
                color: "#475569", background: "none", border: "none", cursor: "pointer",
                padding: "12px 4px", textAlign: "left",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={15} color="#2563EB" /> Talk to an Expert
              </span>
              <ChevronDown size={14} style={{ transform: mobileExpertOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </button>

            {mobileExpertOpen && (
              <div style={{ padding: "4px 4px 8px 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {PHONES.map(num => (
                  <a key={num} href={`tel:${num}`} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "15px",
                    color: "#0F172A", textDecoration: "none",
                    padding: "8px 12px", background: "#F8FAFC", borderRadius: "10px",
                    border: "1px solid #E2E8F0",
                  }}>
                    <Phone size={14} color="#2563EB" /> {num}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) { .desktop-nav { display: none !important; } .mobile-controls { display: flex !important; } }
      `}</style>
    </header>
  );
}
