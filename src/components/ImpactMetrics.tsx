import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useState } from "react";

const metrics = [
  { value: 70,  suffix: "+",      label: "Relawan Aktif" },
  { value: 30,  suffix: "+",      label: "Sekolah Dampingan" },
  { value: 12,  suffix: "",       label: "Program Unggulan" },
  { value: 12,  suffix: " Tahun", label: "Berkontribusi" },
];

function MetricCard({
  value, suffix, label, isVisible, delay,
}: {
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) {
  const count = useCountUp(value, isVisible);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
      className="glass-metric p-8 text-center relative overflow-hidden cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered
            ? `translateY(-6px) perspective(600px) rotateY(${(mouse.x - 0.5) * -10}deg) rotateX(${(mouse.y - 0.5) * 8}deg) scale(1.03)`
            : "translateY(0) scale(1)"
          : "translateY(24px)",
        transition: hovered
          ? `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.12s ease-out, box-shadow 0.25s ease`
          : `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease`,
        boxShadow: hovered
          ? "0 24px 60px rgba(31,54,88,0.18), 0 0 0 1px rgba(120,6,76,0.15)"
          : undefined,
      }}
    >
      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(120,6,76,0.12) 0%, transparent 65%)`
            : "transparent",
          transition: "background 0.1s ease",
        }}
      />

      {/* Shimmer top bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
        style={{
          background: "linear-gradient(90deg, #78064c, #9a0a5e)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Number */}
      <p
        className="font-heading font-bold text-4xl md:text-5xl mb-2 relative z-10"
        style={{
          background: "linear-gradient(135deg, #78064c, #9a0a5e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {count}{suffix}
      </p>

      {/* Label */}
      <p
        className="font-body text-sm relative z-10"
        style={{
          color: hovered ? "#78064c" : undefined,
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function ImpactMetrics() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background impact-section" ref={ref}>
      <div className="container">
        <div
          className="text-center mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="magenta-label" style={{ justifyContent: "center", display: "inline-flex" }}>
            Dampak Nyata
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} {...m} isVisible={isVisible} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}