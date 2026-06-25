import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPinterest, FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiPinterestFill, RiSparkling2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CURVE_POINTS = [
  { left: "1.8%", top: "3.1%" },
  { left: "2.3%", top: "20.4%" },
  { left: "3.7%", top: "35.6%" },
  { left: "5.9%", top: "48.7%" },
  { left: "8.9%", top: "59.8%" },
  { left: "12.5%", top: "69.2%" },
  { left: "16.7%", top: "76.9%" },
  { left: "21.4%", top: "83.1%" },
  { left: "26.6%", top: "87.9%" },
  { left: "32.1%", top: "91.3%" },
  { left: "37.9%", top: "93.7%" },
  { left: "43.9%", top: "95.0%" },
  { left: "50.0%", top: "95.4%" },
  { left: "56.1%", top: "95.0%" },
  { left: "62.1%", top: "93.7%" },
  { left: "67.9%", top: "91.3%" },
  { left: "73.4%", top: "87.9%" },
  { left: "78.6%", top: "83.1%" },
  { left: "83.3%", top: "76.9%" },
  { left: "87.5%", top: "69.2%" },
  { left: "91.1%", top: "59.8%" },
  { left: "94.1%", top: "48.7%" },
  { left: "96.3%", top: "35.6%" },
  { left: "97.7%", top: "20.4%" },
  { left: "98.2%", top: "3.1%" },
  { left: "1.8%", top: "3.1%" }, // loop back to the exact start point
];

function FloatingBadge({
  points,
  icon,
  delay = 0,
  faded = false,
  duration = 7,
}) {
  const baseOpacity = faded ? 0.35 : 1;
  const n = points.length;

  const fadeZone = 3; // how many points at each end participate in the fade
  const opacityKeyframes = points.map((_, i) => {
    const distFromStart = i;
    const distFromEnd = n - 1 - i;
    if (distFromStart < fadeZone) {
      return baseOpacity * (distFromStart / fadeZone);
    }
    if (distFromEnd < fadeZone) {
      return baseOpacity * (distFromEnd / fadeZone);
    }
    return baseOpacity;
  });

  return (
    <motion.div
      className="absolute hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl
        bg-white border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: opacityKeyframes,
        left: points.map((p) => p.left),
        top: points.map((p) => p.top),
      }}
      transition={{
        opacity: { duration, repeat: Infinity, ease: "linear", delay },
        left: { duration, repeat: Infinity, ease: "linear", delay },
        top: { duration, repeat: Infinity, ease: "linear", delay },
      }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {icon}
    </motion.div>
  );
}

// ---- Animated arrow (same behavior as the navbar's CtaButton arrow) ----
// Two overlapping MdArrowOutward icons inside a clipped box: on hover,
// the current arrow slides up-right while fading out, and a second copy
// slides in from down-left to replace it — giving the icon a "launching
// off" motion instead of a static swap. `hovered` is passed down from
// the parent button so this stays in sync with the button's own
// whileHover state.
function AnimatedArrow({ hovered, size = 16 }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size + 1, height: size + 1 }}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={
          hovered
            ? { x: size + 1, y: -(size + 1), opacity: 0 }
            : { x: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <MdArrowOutward size={size} />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        animate={
          hovered
            ? { x: 0, y: 0, opacity: 1 }
            : { x: -(size + 1), y: size + 1, opacity: 0 }
        }
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <MdArrowOutward size={size} />
      </motion.span>
    </div>
  );
}

// ---- Glass button pair ----
// `background` and `glowOpacity` are props so Primary/Secondary can each
// use a different base + glow strength while sharing this exact
// construction (top-down vertical glow, side glows, top rim, bottom dark
// fade).
//
// CHANGED (this pass): GlassButtonBase now tracks its own hover state
// (onMouseEnter/Leave) and passes it to AnimatedArrow instead of
// rendering a static MdArrowOutward — this is what gives the arrow the
// same "slide up-right and swap" motion the navbar's CtaButton already
// has.
function GlassButtonBase({
  children,
  withArrow,
  background,
  glowOpacity = 0.55,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 flex gap-2 sm:gap-2.5 justify-center items-center rounded-full
        text-sm sm:text-base font-semibold text-white cursor-pointer whitespace-nowrap
        overflow-hidden border border-white/10
        shadow-[0_10px_26px_rgba(0,0,0,0.6)]
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.65)]
        transition-shadow duration-300"
      style={{ background }}
    >
      {/* Strong top-down vertical glow, centered, falling off sharply */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at 50% -10%, rgba(255,255,255,${glowOpacity}) 0%, rgba(255,255,255,${glowOpacity * 0.33}) 45%, transparent 75%)`,
        }}
      />
      {/* Faint dimmer glows at the left and right edges */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(25% 80% at 6% 50%, rgba(255,255,255,0.12), transparent 70%), radial-gradient(25% 80% at 94% 50%, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />
      {/* Bright rim tracing the rounded top arc specifically */}
      <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.5)]" />
      {/* Very dark base toward the bottom for contrast against the glow */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-full"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
        }}
      />

      <span className="relative z-10 flex items-center gap-2 sm:gap-2.5">
        {children}
        {withArrow && <AnimatedArrow hovered={hovered} size={16} />}
      </span>
    </motion.button>
  );
}

// ---- Primary: lighter glass, brighter top glow ----
function PrimaryGlassCta({ children, withArrow = false }) {
  return (
    <GlassButtonBase
      withArrow={withArrow}
      background="rgb(55,55,55)"
      glowOpacity={0.75}
    >
      {children}
    </GlassButtonBase>
  );
}

// ---- Secondary: darker glass, dimmer top glow ----
function SecondaryGlassCta({ children, withArrow = false }) {
  return (
    <GlassButtonBase
      withArrow={withArrow}
      background="rgb(16,16,16)"
      glowOpacity={0.4}
    >
      {children}
    </GlassButtonBase>
  );
}

export default function Home1() {
  return (
    <section
      data-theme="dark"
      className="relative w-full min-h-screen pt-24 sm:pt-32 md:pt-[140px] pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute left-1/2 -translate-x-1/2 top-[200px] sm:top-[240px] md:top-[260px] w-full max-w-[95vw] sm:max-w-[110vw] md:w-[1100px] md:max-w-[150vw] h-[200px] sm:h-[230px] md:h-[260px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-80px] sm:top-[-120px] md:top-[-150px] left-0 w-full h-[650px]">
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            viewBox="0 0 1100 650"
            fill="none"
          >
            <path
              d="M20 20 C 20 500, 280 620, 550 620 C 820 620, 1080 500, 1080 20"
              stroke="#ffffff22"
              strokeWidth="1"
            />
          </svg>

          <FloatingBadge
            points={CURVE_POINTS}
            icon={<FaPinterest size={18} />}
            delay={0}
            duration={7}
            faded
          />
          <FloatingBadge
            points={CURVE_POINTS}
            icon={<RiSparkling2Fill size={17} className="text-black" />}
            delay={1.75}
            duration={7}
          />
          <FloatingBadge
            points={CURVE_POINTS}
            icon={<FaInstagram size={18} className="text-[#FF5A1F]" />}
            delay={3.5}
            duration={7}
          />
          <FloatingBadge
            points={CURVE_POINTS}
            icon={<FaFacebook size={18} className="text-[#1877F2]" />}
            delay={5.25}
            duration={7}
            faded
          />
        </div>
      </div>

      <div className="relative z-10 md:px-10">
        <div className="md:max-w-5xl md:mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10
              shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-sm font-medium text-black/80"
          >
            <FaStar className="text-[#2ecc40]" size={13} />
            4.9/5 Reviews on TrustPilot
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 sm:mt-7 font-semibold text-white
              text-[30px] leading-[1.1] xs:text-[36px] sm:text-[52px] md:text-[62px] lg:text-[68px]"
          >
            Agency that makes your
            <br />
            <span className="inline-flex items-center gap-3 align-middle">
              <span
                className="italic font-light text-[#D6ff01]"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                videos & reels
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="relative inline-flex items-center justify-center w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px]
                  rounded-xl sm:rounded-2xl overflow-hidden
                  border border-white/15
                  shadow-[0_0_22px_rgba(255,90,31,0.5),0_8px_20px_rgba(0,0,0,0.45)]"
                style={{
                  background: "rgba(110,110,110,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Warm glow bleeding through from behind the glass */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, rgba(255,90,31,0.55), transparent 70%)",
                  }}
                />
                {/* Diagonal glass sheen — same direction as PrimaryGlassCta */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)",
                  }}
                />
                {/* Bright top rim */}
                <span className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]" />
                {/* Soft dark fade at the bottom for depth */}
                <span
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                  }}
                />

                <BsInstagram
                  size={16}
                  className="relative z-10 text-[#D6ff01] sm:hidden"
                />
                <BsInstagram
                  size={22}
                  className="relative z-10 text-[#D6ff01] hidden sm:block md:hidden"
                />
                <BsInstagram
                  size={26}
                  className="relative z-10 text-[#D6ff01] hidden md:block"
                />
              </motion.span>

              <span
                className="font-light italic text-[#D6ff01]"
                style={{ fontFamily: "Instrument Serif , serif" }}
              >
                viral
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 sm:mt-7 px-3 py-1 text-[13px] sm:text-[15px] md:text-base text-white/80 font-medium"
          >
            Short-form video editing for Influencers, Creators and Brands
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-3 w-full"
          >
            <PrimaryGlassCta withArrow>
              <Link to="/contact">Book A Free Meeting</Link>
            </PrimaryGlassCta>
            <SecondaryGlassCta>
              <Link to="/contact">View Our Works</Link>
            </SecondaryGlassCta>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
