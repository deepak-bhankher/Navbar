import { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaPinterest, FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiPinterestFill, RiSparkling2Fill } from "react-icons/ri";

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

function PrimaryCta({ children = "Book A Free Meeting" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="px-7 py-[13px] flex gap-2 justify-center items-center rounded-lg text-[15px] font-semibold text-white cursor-pointer
        bg-black border border-white hover:text-black hover:bg-[#D6ff01]
        hover:shadow-[0_0_30px_rgba(0,0,0,0.25)]
        transition-shadow duration-300"
    >
      {children}
      <div className="relative w-[18px] h-[18px] overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 18, y: -18, opacity: 0 } : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          <MdArrowOutward size={18} />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 0, y: 0, opacity: 1 } : { x: -18, y: 18, opacity: 0 }
          }
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          <MdArrowOutward size={18} />
        </motion.span>
      </div>
    </motion.button>
  );
}

function SecondaryCta({ children = "View Our Works" }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -2,
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
      whileTap={{ scale: 0.96 }}
      className="px-7 py-[13px] rounded-lg text-[15px] font-semibold text-black cursor-pointer
        bg-white hover:border-white border border-black/10
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
}

export default function Home1() {
  return (
    <section className="relative w-full min-h-screen pt-24 sm:pt-32 md:pt-[140px] pb-16 sm:pb-24 overflow-hidden bg-black">
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
            <PrimaryCta>Book A Free Meeting</PrimaryCta>
            <SecondaryCta>View Our Works</SecondaryCta>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
