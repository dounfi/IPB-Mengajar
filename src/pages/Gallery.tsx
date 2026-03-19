import { useState, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import edelweisImg from "@/assets/program-edelweis.png";
import imblinksImg from "@/assets/program-imblinks.png";
import kreasiImg from "@/assets/program-kreasi.png";
import heroImg from "@/assets/hero_volunteer.png";
import aboutImg from "@/assets/about-team.jpg";

const categories = ["Semua", "Edelweis", "IM-BLINKS", "Kreasi Mengajar", "Kegiatan Umum"];

const photos = [
  { src: gallery1,    alt: "Tim relawan IPB Mengajar",           category: "Kegiatan Umum" },
  { src: edelweisImg, alt: "Kegiatan program Edelweis",          category: "Edelweis" },
  { src: gallery2,    alt: "Antusiasme siswa dalam pembelajaran", category: "IM-BLINKS" },
  { src: kreasiImg,   alt: "IM???",               category: "Kreasi Mengajar" },
  { src: gallery3,    alt: "Edel day...",            category: "Edelweis" },
  { src: imblinksImg, alt: "Im Blinks Day...",                 category: "IM-BLINKS" },
  { src: gallery4,    alt: "Farm on school",                   category: "Kreasi Mengajar" },
  { src: gallery5,    alt: "Kolaborasi Eksternal",             category: "Kegiatan Umum" },
  { src: gallery6,    alt: "IM???",                    category: "Edelweis" },
  { src: heroImg,     alt: "Edel day...",         category: "Edelweis" },
  { src: aboutImg,    alt: "Foto Kabinet",                        category: "Kegiatan Umum" },
  { src: gallery1,    alt: "Im Visit",                       category: "Kegiatan Umum" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = activeCategory === "Semua"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  }, [lightbox, filtered.length]);
  const nextPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  }, [lightbox, filtered.length]);

  // Keyboard navigation
  const handleLightboxKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  }, [prevPhoto, nextPhoto]);

  // Cursor glow tracker for each gallery item
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = e.currentTarget.querySelector(".gallery-glow") as HTMLElement;
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  };

  return (
    <main className="pt-[72px]">
      {/* Hero header */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1f3658 0%, #162035 100%)" }}
      >
        {/* Magenta top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #78064c, transparent)" }}
        />
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(120,6,76,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="container text-center relative">
          <span className="magenta-label mb-4 block" style={{ color: "rgba(255,235,167,0.65)", justifyContent: "center" }}>
            Dokumentasi
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">
            Galeri Kegiatan
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,235,167,0.60)" }}>
            Dokumentasi kegiatan IPB Mengajar di berbagai program dan wilayah.
          </p>
          <div className="magenta-divider mx-auto mt-8" />
        </div>
      </section>

      {/* Gallery section */}
      <section className="py-16 bg-background">
        <div className="container">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${
                  activeCategory === cat ? "filter-btn-active" : "filter-btn-inactive"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((photo, i) => (
              <div
                key={`${photo.alt}-${i}`}
                className="gallery-item"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${(i % 8) * 55}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${(i % 8) * 55}ms`,
                }}
                onClick={() => openLightbox(i)}
                onMouseMove={handleMouseMove}
              >
                {/* Cursor glow */}
                <div className="gallery-glow" />

                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                />

                {/* Hover caption */}
                <div className="gallery-item-caption">
                  <p className="font-body text-xs font-medium text-white/85 flex items-center gap-1.5">
                    <ZoomIn size={12} />
                    {photo.alt}
                  </p>
                  <span
                    className="inline-block mt-1 text-[10px] font-body px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(120,6,76,0.50)",
                      border: "1px solid rgba(120,6,76,0.60)",
                      color: "rgba(255,235,167,0.85)",
                    }}
                  >
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-muted-foreground">Tidak ada foto untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={handleLightboxKeyDown}
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div className="lightbox-backdrop" />

          {/* Content */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Tutup">
              <X size={16} />
            </button>

            {/* Prev */}
            <button className="lightbox-nav prev" onClick={prevPhoto} aria-label="Sebelumnya">
              <ChevronLeft size={18} />
            </button>

            {/* Image */}
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="lightbox-img"
            />

            {/* Next */}
            <button className="lightbox-nav next" onClick={nextPhoto} aria-label="Berikutnya">
              <ChevronRight size={18} />
            </button>

            {/* Caption bar */}
            <div
              className="mt-4 flex items-center justify-between"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem" }}
            >
              <span className="font-body">{filtered[lightbox].alt}</span>
              <span className="font-body" style={{ color: "rgba(255,235,167,0.50)" }}>
                {lightbox + 1} / {filtered.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
