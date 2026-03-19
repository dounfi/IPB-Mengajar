import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import edelweisImg from "@/assets/program-edelweis.png";
import imblinksImg from "@/assets/program-imblinks.png";
import kreasiImg from "@/assets/program-kreasi.png";
import galleryImg from "@/assets/gallery-3.png";

const programs = [
  {
    title: "Edelweis",
    image: edelweisImg,
    tagline: "Pengabdian Terpencil",
    desc: "Edelweis (Education Weeks in School) merupakan salah satu mega proker dari IPB Mengajar yang menghadirkan pengajar inspiratif untuk berkontribusi di desa binaan selama 21 hari. Program ini bertujuan untuk memberikan dampak positif sebagai wujud pengabdian masyarakat dalam bidang pendidikan.",
    kpis: ["150+ anak terdampak", "5 desa binaan", "Program berkelanjutan"],
  },
  {
    title: "IM-BLINKS",
    image: imblinksImg,
    tagline: "Literasi & Bimbingan",
    desc: "IM-Bimbingan Lingkar Kampus (IM-BLINKS) merupakan kegiatan bimbingan belajar yang berfokus untuk mengajar anak-anak yang putus sekolah di desa binaan yang ada di lingkar kampus dengan melibatkan seluruh manajemen IM, orang tua peserta bimbingan, serta pemerintah setempat.",
    kpis: ["Bimbingan mingguan", "100+ peserta", "Materi terstruktur"],
  },
  {
    title: "IM Internship",
    image: kreasiImg,
    tagline: "Workshop Kreatif",
    desc: "IM Internship merupakan serangkaian kegiatan untuk mengembangkan kemampuan dan pengetahuan bagi mahasiswa yang memiliki minat di bidang pemberdayaan pendidikan di luar Manajemen IPB Mengajar, sekaligus mempromosikan UKM IPB Mengajar selama 2 bulan.",
    kpis: ["Workshop bulanan", "Pengembangan skill", "Pengembangan bakat"],
  },
  {
    title: "GOTA",
    image: galleryImg,
    tagline: "Gerakan Orangtua Asuh",
    desc: "GOTA (Gerakan Orangtua Asuh) merupakan program BPH IPB Mengajar yang bekerjasama dengan Agrianita IPB untuk memberikan pengajaran intensif dalam persiapan ujian sekolah tingkat SD, SMP, dan SMA selama 20 pertemuan dalam 2 kali seminggu.",
    kpis: ["20 pertemuan", "SD, SMP, SMA", "Kolaborasi Agrianita"],
  },
];

export default function ProgramHighlights() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(120,6,76,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container relative" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="magenta-label mb-4 block">Program Unggulan</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-secondary mt-2">
            Kontribusi Nyata untuk Pendidikan
          </h2>
          <div className="magenta-divider mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <div
              key={p.title}
              className="flip-card h-[420px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110 + 200}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 110 + 200}ms`,
              }}
            >
              <div className="flip-card-inner relative w-full h-full">

                {/* Front */}
                <div className="flip-card-front absolute inset-0">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(31,54,88,0.92) 0%, rgba(31,54,88,0.35) 55%, transparent 100%)",
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-body font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.14)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        color: "rgba(255,235,167,0.9)",
                      }}
                    >
                      {p.tagline}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="w-8 h-0.5 mb-3 rounded-full"
                      style={{ background: "linear-gradient(90deg,#78064c,#9a0a5e)" }}
                    />
                    <h3 className="font-heading font-bold text-xl text-white">{p.title}</h3>
                    <p className="font-body text-xs text-white/55 mt-1"> detail →</p>
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0">
                  <h3 className="font-heading font-bold text-lg text-white mb-1">{p.title}</h3>
                  <p
                    className="font-body text-xs mb-4 font-medium tracking-wide uppercase"
                    style={{ color: "rgba(255,235,167,0.65)" }}
                  >
                    {p.tagline}
                  </p>
                  <p
                    className="font-body text-sm leading-relaxed mb-6"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {p.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {p.kpis.map((kpi) => (
                      <li
                        key={kpi}
                        className="font-body text-xs flex items-center gap-2.5"
                        style={{ color: "rgba(255,235,167,0.80)" }}
                      >
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: "rgba(120,6,76,0.40)", border: "1px solid rgba(120,6,76,0.60)" }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2 3-3" stroke="#9a0a5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        {kpi}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <p
          className="text-center font-body text-xs mt-8"
          style={{
            color: "rgba(31,54,88,0.40)",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.75s ease 0.8s",
          }}
        >
          
        </p>
      </div>
    </section>
  );
}