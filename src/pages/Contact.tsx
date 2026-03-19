import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const socialLinks = [
  {
    href: "https://instagram.com/ipbmengajar",
    label: "Instagram",
    handle: "@ipbmengajar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://twitter.com/ipbmengajar",
    label: "Twitter / X",
    handle: "@ipbmengajar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@ipbmengajar",
    label: "YouTube",
    handle: "IPB Mengajar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    href: "https://open.spotify.com/show/12k3RcI6otOdtSKajilLfN?si=35fe825a8c0e4df1",
    label: "Spotify",
    handle: "IPB Mengajar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    href: "https://line.me/ti/p/@im_arkatara",
    label: "Line",
    handle: "@im_arkatara",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="pt-[72px]">
      {/* Hero Section */}
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
        <div className="container text-center relative mx-auto px-4">
          <span className="magenta-label mb-4" style={{ color: "rgba(255,235,167,0.65)", justifyContent: "center", display: "inline-flex" }}>
            Kontak
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 mt-2">
            Hubungi Kami
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,235,167,0.60)" }}>
            Tertarik untuk berkolaborasi atau ingin mengetahui lebih lanjut tentang IPB Mengajar? Jangan ragu untuk menghubungi kami.
          </p>
          <div className="magenta-divider mx-auto mt-8 h-1 w-24 bg-primary" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background" ref={ref}>
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Contact Info Column */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-2xl text-secondary mb-6">Informasi Kontak</h2>
                <div className="magenta-divider mb-8 h-1 w-16 bg-primary" />
              </div>

              {/* Address, Email, Phone List */}
              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-primary" />,
                    label: "Alamat",
                    content: "Gedung Student Center IPB Dramaga Lt.2,\nBogor, Jawa Barat 16680",
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-primary" />,
                    label: "Email",
                    content: "ipbmengajar@apps.ipb.ac.id",
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-primary" />,
                    label: "Telepon",
                    content: "+6285591615745 (Aidil)",
                  },
                ].map(({ icon, label, content }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(120,6,76,0.08)", border: "1px solid rgba(120,6,76,0.12)" }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-sm text-secondary">{label}</h3>
                      <p className="font-body text-sm text-muted-foreground mt-1 whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="pt-2">
                <h3 className="font-heading font-semibold text-sm text-secondary mb-4">Media Sosial</h3>
                <div className="flex flex-col gap-3">
                  {socialLinks.map(({ href, label, handle, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl group"
                      style={{
                        background: "rgba(120,6,76,0.05)",
                        border: "1px solid rgba(120,6,76,0.08)",
                        transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(120,6,76,0.10)";
                        e.currentTarget.style.borderColor = "rgba(120,6,76,0.22)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(120,6,76,0.05)";
                        e.currentTarget.style.borderColor = "rgba(120,6,76,0.08)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-primary"
                        style={{ background: "rgba(120,6,76,0.10)" }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-xs text-secondary">{label}</p>
                        <p className="font-body text-xs text-muted-foreground">{handle}</p>
                      </div>
                      <svg className="ml-auto opacity-25 group-hover:opacity-60 transition-opacity" width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="#78064c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="glass-card p-8 bg-white/50 backdrop-blur-sm border border-border rounded-2xl shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(120,6,76,0.08)", border: "1px solid rgba(120,6,76,0.15)" }}
                  >
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-secondary mb-2">Pesan Terkirim</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Terima kasih telah menghubungi IPB Mengajar. Kami akan segera merespons pesan Anda.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-heading font-bold text-xl text-secondary mb-6">Kirim Pesan</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-body text-sm font-medium text-secondary block mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-secondary block mb-2">Alamat Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        placeholder="Masukkan alamat email"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-secondary block mb-2">Pesan</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        placeholder="Tulis pesan Anda di sini"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg font-heading font-semibold text-sm transition-all"
                      style={{
                        background: "linear-gradient(135deg, #78064c, #9a0a5e)",
                        color: "white",
                        boxShadow: "0 8px 32px rgba(120,6,76,0.25)",
                        transition: "filter 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = "brightness(1.08)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "brightness(1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Kirim Pesan
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}