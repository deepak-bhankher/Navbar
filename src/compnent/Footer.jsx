import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ICONS = [
  {
    name: "Facebook",
    tone: "facebook",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M14 8.5h-1.3c-.7 0-1.2.5-1.2 1.3v1.4H14l-.3 2H11.5V18h-2v-4.8H8v-2h1.5V9.5C9.5 7.7 10.7 6.5 12.4 6.5H14v2Z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    tone: "tiktok",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <path
          d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.7c-1.4.1-2.7-.3-3.7-1v6.6c0 3-2.4 5.3-5.4 5.3S5.7 18.2 5.7 15.2c0-2.9 2.2-5.2 5.1-5.3v2.8c-1.3.1-2.3 1.2-2.3 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.5V3h2.9Z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    tone: "instagram",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="6"
          fill="url(#igGrad)"
        />
        <defs>
          <linearGradient id="igGrad" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="40%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#4f5bd5" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    tone: "youtube",
    node: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
        <path d="M10 9l5 3-5 3V9Z" fill="white" />
      </svg>
    ),
  },
];

const R = 480;
const VISIBLE_HEIGHT = 110;
const ROTATION_DURATION = 30;
const ICON_SPACING_DEG = 92; // slightly more than the ~79° visible span -> small gap, with overlap on entry/exit

// Glass icon card matching the Home page's GlassIconCard treatment:
// dark frosted-glass background, top rim glow tinted to the icon's brand
// color, diagonal glass sheen, and a soft bottom shadow for depth.
function GlassIconCard({ icon, tone = "default", size = 56 }) {
  const toneStyles =
    tone === "instagram"
      ? { accent2: "rgba(214,41,118,0.45)" }
      : tone === "facebook"
        ? { accent2: "rgba(24,119,242,0.45)" }
        : tone === "tiktok"
          ? { accent2: "rgba(255,255,255,0.30)" }
          : tone === "youtube"
            ? { accent2: "rgba(255,0,0,0.45)" }
            : { accent2: "rgba(214,255,1,0.35)" };

  return (
    <div
      className="relative flex items-center justify-center rounded-2xl"
      style={{ width: size, height: size }}
    >
      {/* base glass fill */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: `0 14px 32px rgba(0,0,0,0.5), 0 0 22px ${toneStyles.accent2}`,
        }}
      />

      {/* top rim glow, tinted to brand color */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
        style={{
          background: `radial-gradient(60% 90% at 50% -10%, ${toneStyles.accent2} 0%, rgba(255,255,255,0.08) 40%, transparent 70%)`,
        }}
      />

      {/* diagonal glass sheen */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* icon */}
      <div className="relative z-10">{icon}</div>

      {/* bottom dark fade for depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
        }}
      />
    </div>
  );
}

function ArcTrack() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${VISIBLE_HEIGHT}px` }}
    >
      {/* Guide line at the very top of the visible window */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div
        className="absolute left-1/2"
        style={{
          width: `${R * 2}px`,
          height: `${R * 2}px`,
          top: `${VISIBLE_HEIGHT - R * 2}px`,
          marginLeft: `-${R}px`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: ROTATION_DURATION,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {ICONS.map((icon, i) => {
            const angle = 90 + ICON_SPACING_DEG * i;
            return (
              <div
                key={icon.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 0,
                  height: 0,
                  transform: `rotate(${angle}deg) translate(${R}px)`,
                }}
              >
                <div
                  className="w-16 h-16 sm:w-[60px] sm:h-[60px] md:w-14 md:h-14"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                  }}
                >
                  <GlassIconCard
                    icon={icon.node}
                    tone={icon.tone}
                    size="100%"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function PrimaryCta({ children = "Book A Free Meeting" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 rounded-lg hover:text-[#D6ff01] hover:border hover:border-[#D6ff01] hover:bg-black bg-[#D6FF01] px-6 py-3 text-sm font-bold text-[#15140F] cursor-pointer
        shadow-[0_8px_28px_rgba(214,255,1,0.25)]
        hover:shadow-[0_12px_36px_rgba(214,255,1,0.4)]
        transition-shadow duration-300"
    >
      <Link to="/contact">{children}</Link>

      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#15140F]">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="#D6FF01"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  );
}

function Footer() {
  return (
    <section
      data-theme="dark"
      className="relative w-full bg-[#15140F] overflow-hidden"
    >
      {/* ---- Top: heading + subtitle + CTA ---- */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-extrabold text-white leading-[1.1] text-4xl sm:text-5xl md:text-6xl"
        >
          Ready to make
          <br />
          <span
            className="italic font-light text-[#D6ff01]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            your videos go viral?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-sm sm:text-base text-white/50 max-w-md mx-auto"
        >
          We maintain a bench of pre-vetted video editors ready to be trained
          and placed within 2-weeks on average.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex justify-center"
        >
          <PrimaryCta />
        </motion.div>
      </div>

      {/* ---- Large semicircle, only the bottom arc visible ---- */}
      <ArcTrack />

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-white/10 py-5 px-6">
        <p className="text-center text-xs text-white/30">
          © {new Date().getFullYear()} CirklX. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
