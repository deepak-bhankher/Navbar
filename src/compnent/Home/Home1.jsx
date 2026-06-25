import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPinterest, FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
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

function GlassIconCard({
  icon,
  tone = "default",
  style,
  className = "",
  size = 44,
  depth = 0,
  opacity = 1,
  rotate = 0,
}) {
  const toneStyles =
    tone === "instagram"
      ? { accent: "#FF5A1F", accent2: "rgba(255,90,31,0.45)" }
      : tone === "facebook"
        ? { accent: "#1877F2", accent2: "rgba(24,119,242,0.45)" }
        : tone === "pinterest"
          ? { accent: "#D0002B", accent2: "rgba(208,0,43,0.45)" }
          : tone === "spark"
            ? { accent: "#ffffff", accent2: "rgba(255,255,255,0.35)" }
            : { accent: "#D6ff01", accent2: "rgba(214,255,1,0.35)" };

  return (
    <motion.div
      className={`absolute select-none pointer-events-none flex items-center justify-center rounded-2xl ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `translate(-50%, -50%) translateZ(0) rotate(${rotate}deg)`,
        filter: depth > 0 ? "saturate(1.05)" : "saturate(0.95)",
        ...style,
      }}
      initial={false}
      animate={false}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow:
            depth > 0
              ? `0 18px 40px rgba(0,0,0,0.55), 0 0 28px ${toneStyles.accent2}`
              : `0 12px 26px rgba(0,0,0,0.42), 0 0 18px ${toneStyles.accent2}`,
        }}
      />

      {/* top rim + glow */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
        style={{
          background: `radial-gradient(60% 90% at 50% -10%, ${toneStyles.accent2} 0%, rgba(255,255,255,0.15) 40%, transparent 70%)`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      {/* glass sheen */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.10) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />  

      {/* icon */}
      <div className="relative z-10">{icon}</div>

      {/* subtle bottom dark fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.42), transparent)",
        }}
      />
    </motion.div>
  );
}

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
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute left-1/2 -translate-x-1/2 top-[200px] sm:top-[240px] md:top-[260px] w-full max-w-[95vw] sm:max-w-[110vw] md:w-[1100px] md:max-w-[150vw] h-[260px] sm:h-[290px] md:h-[340px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-80px] sm:top-[-120px] md:top-[-150px] left-0 w-full h-[650px]">
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            viewBox="0 0 1100 650"
            fill="none"
          >
            <path
              d="M20 20 C 20 500, 280 620, 550 620 C 820 620, 1080 500, 1080 20"
              stroke="#ffffff55"
              strokeWidth="1"
            />
          </svg>

          {/* Flow-only animation: icons curve points par continuously move honge.
              Rotation ko ab fixed step me di hui style se lock rakha hai (as per feedback rotation nahi chahiye). */}
          {(() => {
            const icons = [
              {
                tone: "pinterest",
                icon: <FaPinterest size={18} />,
              },
              {
                tone: "spark",
                icon: <RiSparkling2Fill size={17} className="text-black" />,
              },
              {
                tone: "instagram",
                icon: <FaInstagram size={18} className="text-[#FF5A1F]" />,
              },
              {
                tone: "facebook",
                icon: <FaFacebook size={18} className="text-[#1877F2]" />,
              },
            ];

            return icons.map((it, iconIdx) => {
              const duration = 7;
              const delay = iconIdx * 1.2;

              return (
                <motion.div
                  key={it.tone}
                  className="absolute left-0 top-0"
                  initial={{ opacity: 0.98 }}
                  animate={{
                    left: CURVE_POINTS.map((p) => p.left),
                    top: CURVE_POINTS.map((p) => p.top),
                    opacity: CURVE_POINTS.map((_, i) => {
                      const n = CURVE_POINTS.length;
                      const fadeZone = 3;
                      const distFromStart = i;
                      const distFromEnd = n - 1 - i;
                      if (distFromStart < fadeZone)
                        return 0.15 + 0.85 * (distFromStart / fadeZone);
                      if (distFromEnd < fadeZone)
                        return 0.15 + 0.85 * (distFromEnd / fadeZone);
                      return 1;
                    }),
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay,
                  }}
                  style={{
                    transform: "translate(-50%, -50%) translateZ(0)",
                    willChange: "transform, left, top, opacity",
                    zIndex: 30,
                  }}
                >
                  <GlassIconCard
                    icon={it.icon}
                    tone={it.tone}
                    size={44}
                    depth={iconIdx % 2 === 0 ? 1 : 0}
                    opacity={1}
                    rotate={0}
                  />
                </motion.div>
              );
            });
          })()}
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
