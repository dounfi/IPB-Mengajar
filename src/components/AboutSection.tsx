import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState } from "react";
import aboutImg from "@/assets/about-team.jpg";

const values = [
  { label: "Dedikasi", desc: "Sepenuh hati dalam setiap pengabdian" },
  { label: "Inovasi", desc: "Metode pembelajaran yang kreatif & adaptif" },
  { label: "Kolaborasi", desc: "Bersama membangun Indonesia yang lebih baik" },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgMouse, setImgMouse] = useState({ x: 0.5, y: 0.5 });
  const [imgHover, setImgHover] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardMouse, setCardMouse] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleImgMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setImgMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardMouse((prev) => ({
      ...prev,
      [i]: {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      },
    }));
  };

  return (
    <section
      id="tentang"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,235,167,0.10) 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(120,6,76,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image ── */}
          <div
            ref={imgRef}
            className="about-image-wrapper cursor-crosshair"
            onMouseMove={handleImgMouseMove}
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => { setImgHover(false); setImgMouse({ x: 0.5, y: 0.5 }); }}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? imgHover
                  ? `translateX(0) perspective(900px) rotateY(${(imgMouse.x - 0.5) * -10}deg) rotateX(${(imgMouse.y - 0.5) * 8}deg) scale(1.02)`
                  : "translateX(0) perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)"
                : "translateX(-24px)",
              transition: imgHover
                ? "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.12s ease-out"
                : "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img
              src={aboutImg}
              alt="Tim IPB Mengajar"
              className="w-full object-cover"
              style={{
                aspectRatio: "4/3",
                borderRadius: "1.25rem",
                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                transform: imgHover ? "scale(1.06)" : "scale(1)",
              }}
            />

            {/* Cursor glow */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden" style={{ zIndex: 2 }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: imgHover
                    ? `radial-gradient(circle at ${imgMouse.x * 100}% ${imgMouse.y * 100}%, rgba(120,6,76,0.30) 0%, transparent 55%)`
                    : "transparent",
                  transition: "background 0.1s ease",
                  borderRadius: "1.25rem",
                }}
              />
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden" style={{ zIndex: 3 }}>
              <div
                style={{
                  position: "absolute",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  filter: "blur(20px)",
                  left: `calc(${imgMouse.x * 100}% - 60px)`,
                  top: `calc(${imgMouse.y * 100}% - 60px)`,
                  opacity: imgHover ? 1 : 0,
                  transition: imgHover
                    ? "left 0.08s ease, top 0.08s ease, opacity 0.3s ease"
                    : "opacity 0.4s ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* ── Text ── */}
          <div
            className="space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.85s cubic-bezier(0.22,1,0.36,1) 0.20s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.20s",
            }}
          >
            <span className="magenta-label">Tentang Kami</span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary leading-tight mt-2">
              Mewujudkan Pendidikan yang Merata dan Berkualitas
            </h2>
            <div className="magenta-divider" />
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              IPB Mengajar merupakan Unit Kegiatan Mahasiswa yang bergerak di bidang
              pendidikan dan menjadi wadah bagi mahasiswa untuk berkontribusi melalui
              kegiatan pengajaran, pendampingan, serta pengembangan peserta didik di berbagai daerah.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              IPB Mengajar selalu berupaya menghadirkan ruang belajar yang
              inklusif dan bermakna bagi generasi penerus bangsa. Upaya ini tidak akan
              terpenuhi tanpa teman-teman yang memiliki tekad kuat seperti kalian.
            </p>

            {/* ── Value cards ── */}
            <div className="flex flex-col gap-3 pt-2">
              {values.map((v, i) => {
                const mouse = cardMouse[i] ?? { x: 0.5, y: 0.5 };
                const isHovered = hoveredCard === i;

                return (
                  <div
                    key={v.label}
                    onMouseMove={(e) => handleCardMouseMove(e, i)}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="flex items-start gap-4 p-4 rounded-xl cursor-default relative overflow-hidden"
                    style={{
                      background: isHovered ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.70)",
                      backdropFilter: "blur(8px)",
                      border: isHovered
                        ? "1px solid rgba(120,6,76,0.20)"
                        : "1px solid rgba(255,255,255,0.18)",
                      boxShadow: isHovered
                        ? "0 12px 32px rgba(31,54,88,0.12), 0 0 0 1px rgba(120,6,76,0.08)"
                        : "0 4px 16px rgba(31,54,88,0.06)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? isHovered
                          ? `translateX(6px) perspective(600px) rotateY(${(mouse.x - 0.5) * -6}deg) rotateX(${(mouse.y - 0.5) * 4}deg)`
                          : "translateX(0)"
                        : "translateX(16px)",
                      transition: isHovered
                        ? `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.1}s, transform 0.12s ease-out, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease`
                        : `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease`,
                    }}
                  >
                    {/* Glow */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-xl"
                      style={{
                        background: isHovered
                          ? `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(120,6,76,0.10) 0%, transparent 65%)`
                          : "transparent",
                        transition: "background 0.1s ease",
                      }}
                    />

                    {/* Dot */}
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{
                        background: isHovered
                          ? "linear-gradient(135deg, #78064c, #9a0a5e)"
                          : "rgba(120,6,76,0.40)",
                        transition: "background 0.3s ease",
                      }}
                    />

                    <div className="relative z-10">
                      <p
                        className="font-heading font-semibold text-sm"
                        style={{
                          color: isHovered ? "#78064c" : "#1f3658",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {v.label}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}