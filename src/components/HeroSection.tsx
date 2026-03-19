import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "@/assets/hero_volunteer.png";
import heroImg2 from "@/assets/hero_volunteer2.png";
import heroImg3 from "@/assets/hero_volunteer3.png";
import heroImg4 from "@/assets/hero_volunteer4.png";

const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];

export default function HeroSection() {
  const [offset, setOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.08);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFading(false);
      }, 700);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const glowX = mousePos.x * 100;
  const glowY = mousePos.y * 100;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background slideshow ── */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}
      >
        {heroImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Hero ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: i === current ? (fading ? 0 : 1) : 0,
              transitionProperty: "opacity, transform",
              transitionDuration: "0.9s, 6s",
              transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
              transform: i === current ? "scale(1.04)" : "scale(1)",
            }}
          />
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(31,54,88,0.85) 0%, rgba(31,54,88,0.72) 50%, rgba(120,6,76,0.30) 100%)",
          }}
        />

        {/* Cursor glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(120,6,76,0.22) 0%, transparent 55%)`,
            transition: "background 0.1s ease",
          }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* ── Dots ── */}
      <div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.4s" }}
      >
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => { setCurrent(i); setFading(false); }, 700);
            }}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#78064c" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10 pt-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center min-h-[calc(100vh-72px)] py-16">

          {/* Left */}
          <div className="lg:col-span-3 space-y-6">

            {/* Headline */}
            <h1 className="reveal-text font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08]">
              <span>Langkah kecil,</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #ffc603, #ffeba7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                untuk Negeri.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="font-heading font-medium text-xl md:text-2xl leading-snug"
              style={{
                color: "rgba(255,255,255,0.55)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.42s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.42s",
              }}
            >
              Penuh inovasi dan kolaborasi.
            </p>

            {/* Divider */}
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "linear-gradient(90deg, #78064c, #9a0a5e)",
                borderRadius: "2px",
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.9s ease 0.52s",
              }}
            />

            {/* Body text */}
            <p
              className="font-body text-base max-w-md leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.55)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.58s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.58s",
              }}
            >
              Ketika setiap langkah terasa berarti, setiap proses meninggalkan jejak bermakna bagi generasi penerus bangsa.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 pt-2"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.72s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.72s",
              }}
            >
              <Link to="/program" className="hero-cta-primary font-heading">
                Jelajahi Program
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="#tentang" className="hero-cta-secondary font-heading">
                Tentang Kami
              </a>
            </div>
          </div>

          {/* ── Right: 3D tilt card ── */}
          <div
            className="lg:col-span-2 hidden lg:block"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          >
            <div
              className="relative"
              style={{
                transform: `perspective(800px) rotateY(${(mousePos.x - 0.5) * -8}deg) rotateX(${(mousePos.y - 0.5) * 6}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Decorative frames */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-3px",
                  border: "2px solid rgba(120,6,76,0.30)",
                  transform: "translate(14px, 14px)",
                  borderRadius: "1.25rem",
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-3px",
                  border: "1px solid rgba(255,198,3,0.20)",
                  transform: "translate(28px, 28px)",
                  borderRadius: "1.25rem",
                }}
              />

              {/* Image slideshow */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  position: "relative",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
                  zIndex: 1,
                }}
              >
                {heroImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Relawan ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      opacity: i === current ? (fading ? 0 : 1) : 0,
                      transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1)",
                      transform: "scale(1.05)",
                    }}
                  />
                ))}

                {/* Glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(120,6,76,0.25) 0%, transparent 60%)`,
                    transition: "background 0.1s ease",
                    zIndex: 2,
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        style={{
          opacity: loaded ? 0.6 : 0,
          transition: "opacity 1s ease 1.2s",
          animation: loaded ? "float-updown 2.5s ease-in-out infinite 1.5s" : "none",
        }}
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <rect x="9" y="6" width="2" height="6" rx="1" fill="rgba(255,255,255,0.6)">
            <animate attributeName="y" values="6;12;6" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </rect>
        </svg>
      </div>

      <style>{`
        @keyframes float-updown {
          0%,100% { transform: translate(-50%, 0); }
          50%      { transform: translate(-50%, 6px); }
        }
      `}</style>
    </section>
  );
}