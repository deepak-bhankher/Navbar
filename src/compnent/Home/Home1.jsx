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

  // Build an opacity keyframe for every position keyframe: full opacity for
  // most of the journey, ramping down to 0 over the last few points before
  // the seam, and ramping back up over the first few points after it.
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

// ---- Light glass pill (matches the "Book Free Demo" reference) ----
function PrimaryCta({ children = "Book A Free Meeting" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative px-7 py-3 flex gap-3 justify-center items-center rounded-full text-base font-semibold text-white cursor-pointer
        bg-white/10 backdrop-blur-xl
        border border-white/30
        shadow-[0_8px_0_rgba(0,0,0,0.25),0_14px_28px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.1),0_0_20px_rgba(255,255,255,0.1)]
        hover:bg-white/18 hover:border-white/45
        hover:shadow-[0_10px_0_rgba(0,0,0,0.25),0_18px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.4),0_0_28px_rgba(255,255,255,0.15)]
        active:shadow-[0_2px_0_rgba(0,0,0,0.25),0_4px_10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
        active:translate-y-[4px]
        transition-all duration-150"
    >
      {children}
      <MdArrowOutward size={17} />
    </motion.button>
  );
}

// ---- Dark glass pill (matches the "Get Started Free" reference) ----
function SecondaryCta({ children = "Get Started Free" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative px-8 py-4 flex gap-3 justify-center items-center rounded-full text-base font-semibold text-white cursor-pointer
        bg-gradient-to-b from-[#3a3a3a] to-[#0a0a0a]
        backdrop-blur-xl
        border border-black/60
        shadow-[0_8px_0_rgba(0,0,0,0.45),0_14px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.4)]
        hover:shadow-[0_10px_0_rgba(0,0,0,0.45),0_18px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.4)]
        active:shadow-[0_2px_0_rgba(0,0,0,0.45),0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
        active:translate-y-[4px]
        transition-all duration-150"
    >
      {children}
    </motion.button>
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
      <div className="absolute inset-0" />
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

      {/* CHANGED: two nested divs now, matching Navbar's md:px-10 + md:max-w-5xl structure */}
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
                className="inline-flex items-center justify-center w-[32px] h-[32px] sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px]
                  rounded-xl sm:rounded-2xl text-[#D6ff01] shadow-[0_8px_20px_rgba(255,90,31,0.35)]"
              >
                <BsInstagram size={16} className="sm:hidden" />
                <BsInstagram size={22} className="hidden sm:block md:hidden" />
                <BsInstagram size={26} className="hidden md:block" />
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
            <PrimaryCta>
              <Link to="/contact">Book A Free Meeting</Link>
            </PrimaryCta>
            <SecondaryCta>
              <Link to="/contact">View Our Works</Link>
            </SecondaryCta>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
