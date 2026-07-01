import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import DestinationsGrid from "./DestinationsGrid";

const ACCENT = "#D6ff01";

const DESTINATIONS = [
  {
    id: 1,
    country: "Turkey",
    city: "Istanbul",
    flag: "🇹🇷",
    hotels: "991",
    packages: "42",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=70&w=600&auto=format&fit=crop",
    tag: "Historical",
    featured: false,
  },
  {
    id: 2,
    country: "Indonesia",
    city: "Bali",
    flag: "🇮🇩",
    hotels: "1,345",
    packages: "24",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1531592937781-344ad608fabf?q=70&w=600&auto=format&fit=crop",
    tag: "Tropical",
    featured: false,
  },
  {
    id: 3,
    country: "Dubai",
    city: "UAE",
    flag: "🇦🇪",
    hotels: "2,345",
    packages: "54",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=70&w=600&auto=format&fit=crop",
    tag: "Luxury",
    featured: true,
  },
  {
    id: 4,
    country: "Vietnam",
    city: "Ha Long",
    flag: "🇻🇳",
    hotels: "2,178",
    packages: "32",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?q=70&w=600&auto=format&fit=crop",
    tag: "Adventure",
    featured: false,
  },
  {
    id: 5,
    country: "Morocco",
    city: "Marrakech",
    flag: "🇲🇦",
    hotels: "768",
    packages: "19",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=70&w=600&auto=format&fit=crop",
    tag: "Cultural",
    featured: false,
  },
  {
    id: 6,
    country: "Japan",
    city: "Kyoto",
    flag: "🇯🇵",
    hotels: "1,120",
    packages: "38",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=70&w=600&auto=format&fit=crop",
    tag: "Serene",
    featured: false,
  },
  {
    id: 7,
    country: "Greece",
    city: "Santorini",
    flag: "🇬🇷",
    hotels: "890",
    packages: "28",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=70&w=600&auto=format&fit=crop",
    tag: "Scenic",
    featured: false,
  },
];

/* ── Single Card ─────────────────────────────────────────────── */
function DestinationCard({ d }) {
  return (
    <div
      className="group relative shrink-0 overflow-hidden rounded-[28px] cursor-pointer"
      style={{
        width: "280px",
        height: "380px",
        // Static shadow only — animating box-shadow every frame was a
        // big jank source, so "featured" now comes from a fixed,
        // slightly stronger shadow + border instead of a pulsing one.
        boxShadow: d.featured
          ? `0 32px 64px -16px rgba(0,0,0,0.75), 0 0 0 1px rgba(214,255,1,0.18)`
          : `0 20px 48px -14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`,
        transform: "translateZ(0)",
      }}
    >
      {/* Image */}
      <img
        src={d.image}
        alt={d.country}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {d.featured && (
            <span
              className="text-[9px] font-black tracking-[0.16em] uppercase px-2.5 py-1 rounded-full text-black"
              style={{ background: ACCENT }}
            >
              Hot
            </span>
          )}
          {/* solid bg instead of backdrop-blur — blurring whatever sits
              underneath a continuously-scrolling row is the single most
              expensive thing a marquee can do */}
          <span className="text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full text-white/75 bg-[#1a1a1a] border border-white/10">
            {d.tag}
          </span>
        </div>

        {/* Arrow chip — appears on hover, opacity/scale only (cheap, GPU-only) */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center
            bg-[#1a1a1a] border border-white/15
            opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
            transition-all duration-300"
          style={{ color: ACCENT }}
        >
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {/* Rating + City */}
        <div className="flex items-center gap-2 mb-2.5">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(214,255,1,0.12)", color: ACCENT }}
          >
            <Star size={8} fill="currentColor" />
            {d.rating}
          </div>
          <div className="flex items-center gap-1 text-white/35 text-[10px]">
            <MapPin size={8} />
            {d.city}
          </div>
        </div>

        {/* Country name */}
        <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-1">
          {d.country} <span className="text-lg">{d.flag}</span>
        </h3>
        <p className="text-[11px] text-white/40 font-medium mb-4">
          {d.hotels} Hotels &middot; {d.packages} Packages
        </p>

        {/* CTA — solid dark surface, no backdrop-filter, no shimmer overlay.
            Still reads as a glass pill via border + tint, costs nothing
            at runtime since it never has to sample what's behind it. */}
        <div
          className="flex items-center justify-between
            rounded-2xl pl-4 pr-1.5 py-1.5
            border border-white/10 bg-[#161616]
            transition-colors duration-300
            group-hover:border-white/20 group-hover:bg-[#1d1d1d]"
        >
          <span className="text-xs font-semibold text-white">Explore Now</span>
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rounded-2xl"
            style={{ background: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────── */
export default function Work5() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], ["0px", "-30px"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);

  // Duplicate for seamless loop
  const LOOP = [...DESTINATIONS, ...DESTINATIONS];
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .marquee-track {
          animation: marquee 38s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        data-theme="dark"
        className="relative w-full bg-[#070707] overflow-hidden py-24 sm:py-32"
      >
        {/* ── Background glows ──
            No longer tied to scroll progress. A parallax `y` transform on
            a 1000px blurred blob forces the browser to repaint a huge
            blurred region on every scroll tick — that combined with the
            marquee running underneath was the main source of lag. These
            are now fixed, paint once, and stay out of the hot path. */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(214,255,1,0.05) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full blur-[110px]"
            style={{ background: "rgba(80,40,180,0.035)" }}
          />
          <div
            className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[90px]"
            style={{ background: "rgba(0,120,80,0.03)" }}
          />
        </div>

        {/* ── Grid (static, cheap — single repeating gradient, no blur) ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* ── Header ── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative max-w-[1320px] mx-auto px-5 sm:px-10 mb-14 sm:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            {/* Left */}
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-5"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 0 12px ${ACCENT}`,
                  }}
                />
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase"
                  style={{ color: ACCENT }}
                >
                  Top Destinations
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-white leading-[1.04] tracking-tight"
              >
                Where the world
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(130deg, #fff 20%, ${ACCENT} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  is booking now
                </span>
              </motion.h2>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-3 sm:items-end"
            >
              <p className="text-sm sm:text-[15px] text-white/38 max-w-[270px] sm:text-right leading-relaxed">
                Live counts from this week's hottest packages across our top
                markets.
              </p>
              <div className="flex items-center sm:justify-end gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                <span className="text-[11px] text-white/28 font-medium tracking-wide">
                  Live · Updated now
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Infinite Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden"
        >
          {/* Left fade mask */}
          <div
            className="absolute left-0 top-0 h-full w-24 sm:w-40 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, #070707 0%, transparent 100%)",
            }}
          />
          {/* Right fade mask */}
          <div
            className="absolute right-0 top-0 h-full w-24 sm:w-40 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to left, #070707 0%, transparent 100%)",
            }}
          />

          {/* Track — plain CSS @keyframes animation, not a JS rAF loop,
              so it runs on the compositor thread and won't block scroll. */}
          <div
            className="marquee-track flex gap-5 sm:gap-6 py-4 px-3"
            style={{ width: "max-content" }}
          >
            {LOOP.map((d, i) => (
              <DestinationCard key={`${d.id}-${i}`} d={d} />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[1320px] mx-auto px-5 sm:px-10 mt-14 sm:mt-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] px-6 sm:px-10 py-5 sm:py-6 border border-white/[0.07] bg-[#0e0e0e]">
            {[
              { value: "7,000+", label: "Hotels worldwide" },
              { value: "199+", label: "Active packages" },
              { value: "4.8★", label: "Average rating" },
              { value: "2M+", label: "Happy travellers" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col gap-0.5"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: ACCENT }}
                >
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm text-white/35 font-medium">
                  {s.label}
                </span>
              </motion.div>
            ))}

            {/* CTA */}
            <AnimatePresence>
              {!showGrid && (
                <motion.button
                  key="cta-btn"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowGrid(true)}
                  className="flex items-center cursor-pointer gap-2.5 px-5 py-2.5 rounded-2xl text-black text-sm font-bold tracking-tight shrink-0 transition-shadow duration-300"
                  style={{
                    background: ACCENT,
                    boxShadow: `0 8px 30px -8px ${ACCENT}70`,
                  }}
                >
                  View all destinations
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showGrid && <DestinationsGrid onClose={() => setShowGrid(false)} />}
      </AnimatePresence>
    </>
  );
}
