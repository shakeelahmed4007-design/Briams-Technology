import { Link } from "react-router-dom";
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { NAV_LINKS, SITE } from "../../constants/nav";
import logoImg from "../../assets/Logo 23.png";

const socialIcons = {
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  github: FaGithub,
  instagram: FaInstagram,
};

export default function Footer() {
  return (
    <footer className="relative bg-briams-navy text-white overflow-hidden pt-20 pb-8">
      {/* Brand Guideline: Deep Navy for footer */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-briams-blue/10 blur-[150px] pointer-events-none" />
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex items-center justify-center bg-briams-navy p-1 rounded-xl">
                <img
                  src={logoImg}
                  alt="Briams Technologies Logo"
                  className="h-10 max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-gradient-cta transition-colors">
                Briams <span className="text-gradient-cta">Technologies</span>
              </span>
            </Link>
            <p className="text-white/80 text-[15px] font-medium max-w-sm leading-relaxed">
              {SITE.tagline}
            </p>
            <div className="flex items-center gap-4 mt-8">
              {Object.entries(SITE.social).map(([key, href]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={href}
                    aria-label={key}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-briams-orange hover:to-briams-gold hover:text-white border border-white/15 flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-briams-cyan mb-6">
              Navigate
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[15px] text-white/80 hover:text-briams-orange transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-briams-orange mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-[15px] font-medium text-white/80">
              <li className="hover:text-briams-cyan transition-colors cursor-default">{SITE.email}</li>
              <li className="hover:text-briams-gold transition-colors cursor-default">{SITE.phone}</li>
              <li className="hover:text-white transition-colors cursor-default">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-mono tracking-wide">
            © {new Date().getFullYear()} Briams Technologies. All rights reserved.
          </p>
          <p className="text-xs text-white/50 font-mono tracking-wide">
            Built with care in <span className="text-briams-orange font-bold">Karachi</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
