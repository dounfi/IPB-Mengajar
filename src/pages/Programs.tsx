import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useRef } from "react";
import edelweisImg from "@/assets/program-edelweis.png";
import imblinksImg from "@/assets/program-imblinks.png";
import kreasiImg from "@/assets/program-kreasi.png";
import galleryImg from "@/assets/gallery-3.png";
import gallery4Img from "@/assets/gallery-4.png";
import gallery5Img from "@/assets/gallery-5.png";

const megaPrograms = [
  {
    title: "Edelweis",
    image: edelweisImg,
    description: "Edelweis (Education Weeks in School) merupakan salah satu mega proker dari IPB Mengajar yang menghadirkan pengajar inspiratif untuk berkontribusi di desa binaan selama 21 hari. Program ini bertujuan untuk memberikan dampak positif sebagai wujud pengabdian masyarakat dalam bidang pendidikan.",
    highlights: [
      "Penugasan 3 minggu di satu daerah",
      "Lebih dari 150 anak terdampak per angkatan",
      "Program berkelanjutan",
      "Kurikulum yang disesuaikan dengan kebutuhan lokal",
    ],
  },
  {
    title: "IM-BLINKS",
    image: imblinksImg,
    description: "IM-Bimbingan Lingkar Kampus (IM-BLINKS) merupakan kegiatan bimbingan belajar yang berfokus untuk mengajar anak-anak yang putus sekolah di desa binaan yang ada di lingkar kampus dengan melibatkan seluruh manajemen IM, orang tua peserta bimbingan, serta pemerintah setempat.",
    highlights: [
      "Bimbingan belajar mingguan",
      "Lebih dari 100 peserta aktif",
      "Materi pembelajaran terstruktur",
      "Pendampingan akademik dan karakter",
    ],
  },
];

const otherPrograms = [
  {
    title: "IM-TAGS",
    image: kreasiImg,
    description: "IM Traveling to Giving and Sharing (IM-TAGS) merupakan program pengabdian kepada anak-anak di wilayah Bogor selama 1 hari yang berfokus pada 3 tema utama yaitu pendidikan karakter, kelas inspirasi, serta optimalisasi literasi.",
  },
  {
    title: "IM-Visit",
    image: galleryImg,
    description: "IM Visit merupakan kegiatan kunjungan Manajemen IPB Mengajar ke sekolah dasar formal unggul yang berfokus pada kegiatan edukatif dan interaktif bagi siswa, mengenalkan dunia pertanian sejak dini.",
  },
  {
    title: "Sahabat Diraya",
    image: gallery4Img,
    description: "Bentuk kerja sama dengan pihak umum yang akan menjadi donatur tetap bagi IPB Mengajar, menyalurkan dana secara rutin untuk keberlanjutan kegiatan.",
  },
  {
    title: "Kolaborasi Eksternal",
    image: gallery5Img,
    description: "Melakukan program berupa kegiatan amal, pengabdian, atau pelatihan bersama organisasi lain untuk meningkatkan kesadaran dan dampak terhadap lingkungan sekitar.",
  },
];

// ─── Highlight Item ───────────────────────────────────────────────
function HighlightItem({ text, delay, isVisible }: { text: string; delay: number; isVisible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-3 font-body text-sm cursor-default rounded-lg px-3 py-2"
      style={{
        color: hovered ? "#78064c" : "#1f3658",
        background: hovered ? "rgba(120,6,76,0.06)" : "transparent",
        border: hovered ? "1px solid rgba(120,6,76,0.12)" : "1px solid transparent",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? (hovered ? "translateX(6px)" : "translateX(0)") : "translateX(-16px)",
        transition: `color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1), opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
        style={{
          background: hovered ? "linear-gradient(135deg,#78064c,#9a0a5e)" : "rgba(120,6,76,0.40)",
          transition: "background 0.2s ease",
        }}
      />
      {text}
    </li>
  );
}

// ─── Mega Program Card ────────────────────────────────────────────
function MegaProgramCard({ program, index }: { program: (typeof megaPrograms)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const imgRef = useRef<HTMLDivElement>(null);
  const [imgHover, setImgHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const isReversed = index % 2 === 1;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Image */}
      <div
        ref={imgRef}
        className={`relative cursor-crosshair ${isReversed ? "lg:order-2" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => { setImgHover(false); setMouse({ x: 0.5, y: 0.5 }); }}
        style={{
          transform: imgHover
            ? `perspective(900px) rotateY(${(mouse.x - 0.5) * (isReversed ? 10 : -10)}deg) rotateX(${(mouse.y - 0.5) * 7}deg) scale(1.02)`
            : "perspective(900px) rotateY(0) rotateX(0) scale(1)",
          transition: imgHover ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Decorative frame */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "-3px",
            border: "2px solid rgba(120,6,76,0.20)",
            borderRadius: "1.25rem",
            transform: isReversed ? "translate(-10px,10px)" : "translate(10px,10px)",
          }}
        />

        <div className="rounded-2xl overflow-hidden relative" style={{ boxShadow: "0 24px 64px rgba(31,54,88,0.16)" }}>
          <img
            src={program.image}
            alt={program.title}
            className="w-full object-cover"
            style={{
              aspectRatio: "4/3",
              display: "block",
              transform: imgHover ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {/* Cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: imgHover
                ? `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(120,6,76,0.28) 0%, transparent 55%)`
                : "transparent",
              transition: "background 0.1s ease",
            }}
          />
          {/* Shimmer */}
          <div
            style={{
              position: "absolute",
              width: 140, height: 140,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              filter: "blur(24px)",
              left: `calc(${mouse.x * 100}% - 70px)`,
              top: `calc(${mouse.y * 100}% - 70px)`,
              opacity: imgHover ? 1 : 0,
              transition: imgHover ? "left 0.08s ease, top 0.08s ease, opacity 0.3s ease" : "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <div
        className="space-y-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateX(0)"
            : isReversed ? "translateX(-24px)" : "translateX(24px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full font-body text-xs font-semibold uppercase tracking-wider"
          style={{ background: "rgba(120,6,76,0.08)", color: "#78064c", border: "1px solid rgba(120,6,76,0.15)" }}
        >
          Program Utama
        </span>
        <h2 className="font-heading font-bold text-3xl text-secondary">{program.title}</h2>
        <div className="magenta-divider" />
        <p className="font-body text-base text-muted-foreground leading-relaxed">{program.description}</p>
        <ul className="space-y-2">
          {program.highlights.map((h, i) => (
            <HighlightItem key={h} text={h} delay={i * 80} isVisible={isVisible} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Other Program Card ───────────────────────────────────────────
function OtherProgramCard({ program, index, isVisible }: {
  program: (typeof otherPrograms)[0];
  index: number;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
      className="glass-card overflow-hidden relative cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered
            ? `translateY(-8px) perspective(700px) rotateY(${(mouse.x - 0.5) * -8}deg) rotateX(${(mouse.y - 0.5) * 6}deg) scale(1.02)`
            : "translateY(0) scale(1)"
          : "translateY(32px) scale(0.97)",
        transition: hovered
          ? `opacity 0.6s ease ${index * 100}ms, transform 0.12s ease-out, box-shadow 0.25s ease`
          : `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease`,
        boxShadow: hovered ? "0 24px 60px rgba(31,54,88,0.18), 0 0 0 1px rgba(120,6,76,0.12)" : undefined,
      }}
    >
      {/* Magenta top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{
          background: "linear-gradient(90deg,#78064c,#9a0a5e)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Cursor glow */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(120,6,76,0.08) 0%, transparent 60%)`
            : "transparent",
          transition: "background 0.1s ease",
        }}
      />

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full object-cover"
          style={{
            aspectRatio: "4/3",
            display: "block",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-heading font-semibold text-base mb-2"
          style={{
            color: hovered ? "#78064c" : "#1f3658",
            transition: "color 0.25s ease",
          }}
        >
          {program.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{program.description}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function Programs() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <main className="pt-[72px]">

      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1f3658 0%, #162035 100%)" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #78064c, transparent)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(120,6,76,0.18) 0%, transparent 60%)" }}
        />
        <div className="container text-center relative">
          <span
            className="magenta-label mb-4"
            style={{ color: "rgba(255,235,167,0.65)", justifyContent: "center", display: "inline-flex" }}
          >
            Program Kami
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 mt-2">
            Program Kami
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,235,167,0.60)" }}>
            Berbagai program pendidikan dan pengabdian masyarakat yang dijalankan oleh IPB Mengajar untuk Indonesia yang lebih baik.
          </p>
          <div className="magenta-divider mx-auto mt-8" />
        </div>
      </section>

      {/* Mega Programs */}
      <section className="py-24 bg-background">
        <div className="container space-y-28">
          {megaPrograms.map((p, i) => (
            <MegaProgramCard key={p.title} program={p} index={i} />
          ))}
        </div>
      </section>

      {/* Other Programs */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(180deg, rgba(255,235,167,0.10) 0%, rgba(255,255,255,0) 100%)" }}
      >
        <div className="container">
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              className="magenta-label mb-3"
              style={{ justifyContent: "center", display: "inline-flex" }}
            >
              Program Lainnya
            </span>
            <h2 className="font-heading font-bold text-3xl text-secondary mt-2 mb-4">
              Program Lainnya
            </h2>
            <div className="magenta-divider mx-auto" />
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherPrograms.map((p, i) => (
              <OtherProgramCard key={p.title} program={p} index={i} isVisible={gridVisible} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}