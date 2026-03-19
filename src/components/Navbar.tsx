import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo-ipb-mengajar.png";

const navLinks = [
  { label: "Beranda", to: "/" },
  { label: "Tentang", to: "/#tentang" },
  { label: "Program", to: "/program" },
  { label: "Galeri", to: "/galeri" },
  { label: "Kontak", to: "/kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to.startsWith("/#")) return location.pathname === "/" && location.hash === to.slice(1);
    return location.pathname === to;
  };

  const handleNavClick = (to: string) => {
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">

      {/* Floating pill navbar */}
      <div
        className={`glass-navbar h-[60px] flex items-center justify-between rounded-2xl px-6 w-full max-w-4xl mx-4 ${scrolled ? "scrolled" : ""}`}
      >
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="IPB Mengajar"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading font-bold text-lg text-secondary">
            IPB{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #78064c, #9a0a5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mengajar
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`nav-link font-body ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-secondary rounded-lg transition-colors hover:bg-black/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
              transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </div>

      {/* Mobile menu dropdown — ikut floating */}
      <div
        className={`glass-mobile-menu md:hidden fixed left-4 right-4 top-[80px] rounded-2xl overflow-hidden ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        style={{
          transition: "opacity 0.32s cubic-bezier(0.22,1,0.36,1), transform 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <nav className="py-4 px-3 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`font-body text-base font-medium py-3 px-4 rounded-xl border-l-[3px] transition-all duration-200 ${
                isActive(link.to)
                  ? "text-primary border-primary bg-primary/5"
                  : "text-secondary/70 border-transparent hover:text-primary hover:bg-primary/5 hover:border-primary/30"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                opacity: mobileOpen ? 1 : 0,
                transition: `color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms, opacity 0.32s ease ${i * 40}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

    </header>
  );
}