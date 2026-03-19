import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-glass text-white">
      {/* Top accent line via CSS ::before */}

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">
              IPB{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #9a0a5e, #c01878)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Mengajar
              </span>
            </h3>
            <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Organisasi kemahasiswaan di bawah naungan IPB University yang bergerak di bidang pendidikan dan pengabdian masyarakat.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="font-heading font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,235,167,0.55)" }}
            >
              Navigasi
            </h4>
            <nav className="flex flex-col gap-3">
              {["Beranda", "Program", "Galeri", "Kontak"].map((label, i) => {
                const to = i === 0 ? "/" : `/${label.toLowerCase()}`;
                return (
                  <Link
                    key={label}
                    to={to}
                    className="font-body text-sm transition-colors duration-200 w-fit"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#9a0a5e"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-heading font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,235,167,0.55)" }}
            >
              Hubungi Kami
            </h4>
            <div className="font-body text-sm space-y-2" style={{ color: "rgba(255,255,255,0.55)" }}>
              <p>IPB University, Dramaga, Bogor</p>
              <p>Jawa Barat 16680</p>
              <p className="mt-3">ipbmengajar@apps.ipb.ac.id</p>
              <div className="flex gap-5 mt-4">
                {[
                  { href: "https://instagram.com/ipbmengajar", label: "Instagram" },
                  { href: "https://youtube.com/@ipbmengajar", label: "YouTube" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#9a0a5e"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
            &copy; {new Date().getFullYear()} IPB Mengajar — IPB University. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
