import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const newsItems = [
  {
    type: "video" as const,
    title: "Aftermovie Edelweis 2024",
    category: "Program",
    embedId: "V9TAU0y4y-I",
  },
  {
    type: "video" as const,
    title: "After Movie IM-BLINKS × IM-TRAINING Batch 1",
    category: "Liputan",
    embedId: "oDBI7McUpts",
  },
  {
    type: "video" as const,
    title: "IMPod — Bincang Asik Bersama Mapres IPB University",
    category: "Media",
    embedId: "ROVjhXCur1k",
  },
];

const categoryColors: Record<string, string> = {
  Media: "rgba(120,6,76,0.80)",
  Program: "rgba(31,54,88,0.80)",
  Liputan: "rgba(154,10,94,0.80)",
};

export default function NewsMedia() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, rgba(255,235,167,0.12) 0%, rgba(255,255,255,0) 100%)" }}
    >
      <div className="container" ref={ref}>
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="magenta-label mb-3" style={{ justifyContent: "center", display: "inline-flex" }}>
            Berita & Media
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary mt-2">
            Kabar Terbaru IPB Mengajar
          </h2>
          <div className="magenta-divider mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {newsItems.map((item, i) => (
            <div
              key={item.title}
              className="glass-card overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110 + 200}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110 + 200}ms`,
              }}
            >
              {/* Magenta top bar */}
              <div
                className="h-[3px]"
                style={{ background: "linear-gradient(90deg, #78064c, #9a0a5e)" }}
              />

              {/* Video embed */}
              <div className="aspect-video bg-secondary relative">
                <iframe
                  src={`https://www.youtube.com/embed/${item.embedId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* Card body */}
              <div className="p-5">
                <span
                  className="inline-block text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                  style={{
                    background: categoryColors[item.category] ?? "rgba(120,6,76,0.80)",
                    color: "white",
                  }}
                >
                  {item.category}
                </span>
                <h3 className="font-heading font-semibold text-sm text-secondary leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}