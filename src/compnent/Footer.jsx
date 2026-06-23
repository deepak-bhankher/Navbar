import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ICONS = [
  {
    name: "Facebook",
    node: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <path
          d="M14 8.5h-1.3c-.7 0-1.2.5-1.2 1.3v1.4H14l-.3 2H11.5V18h-2v-4.8H8v-2h1.5V9.5C9.5 7.7 10.7 6.5 12.4 6.5H14v2Z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    node: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <path
          d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.7c-1.4.1-2.7-.3-3.7-1v6.6c0 3-2.4 5.3-5.4 5.3S5.7 18.2 5.7 15.2c0-2.9 2.2-5.2 5.1-5.3v2.8c-1.3.1-2.3 1.2-2.3 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.5V3h2.9Z"
          fill="#111111"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    // CHANGED: previous version only had a thin black outline circle +
    // tiny dot on the gradient square — easy to lose against a busy
    // background. Now the camera lens (center circle) and flash dot are
    // filled WHITE instead of just outlined, so they read clearly as the
    // Instagram glyph against the gradient square at any size.
    node: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
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
    node: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
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
                {/* CHANGED: card box size UNCHANGED (w-16 h-16 / sm:w-14
                    sm:h-14, same as before) — only the icon SVGs above
                    were made bigger (22px -> 32px) so they fill more of
                    the existing card instead of the card itself growing. */}
                <div
                  className="flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 rounded-2xl
                    bg-white border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                  }}
                >
                  {icon.node}
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
