import { motion } from "framer-motion";

// Trusted-by brand logos. Replace the label/icon markup with real SVG
// logos whenever you have them — kept as styled text + small marks here so
// the row works immediately without extra image assets.
const BRANDS = [
  { name: "sparkle", style: "font-bold" },
  { name: "Lum◻Labs", style: "font-bold" },
  { name: "✤ Craftgram", style: "font-bold" },
  { name: "♫ Pulse", style: "font-bold" },
  { name: "swift➤", style: "font-bold italic" },
  { name: "sparkle", style: "font-bold" },
];

function BrandMarquee() {
  // Duplicate the brand list so the track is 2x one full pass. Animating x
  // from 0% to -50% on an infinite linear loop makes the second half line
  // up exactly with the first, so it reads as one continuous, seamless
  // right-to-left scroll with no visible jump at the loop point.
  const track = [...BRANDS, ...BRANDS];

  return (
    <div className="relative w-full overflow-hidden py-10 sm:py-12">
      <p className="text-center text-xs sm:text-sm text-black/50 font-medium mb-6 sm:mb-8">
        Trusted by 10,000+ founders &amp; business owners
      </p>

      <motion.div
        className="flex w-max items-center gap-10 sm:gap-14 md:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {track.map((brand, i) => (
          <span
            key={i}
            className={`flex-shrink-0 text-lg sm:text-xl md:text-2xl text-black/80 whitespace-nowrap ${brand.style}`}
          >
            {brand.name}
          </span>
        ))}
      </motion.div>

      {/* Soft fade at both edges so logos appear to emerge/dissolve rather
          than hard-cut at the container boundary. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F4F2ED] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F4F2ED] to-transparent" />
    </div>
  );
}

function About2() {
  return (
    <section className="w-full bg-[#F4F2ED]">
      <BrandMarquee />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ---- Left: story text ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <span className="inline-flex items-center rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-black/70 mb-6">
              OUR STORY
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#15140F] leading-[1.05] mb-6">
              How it's started
            </h2>

            <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-5">
              CirklX was born out of frustration. We saw talented creators
              pouring hours into recording videos—but struggling to edit
              them quickly or creatively enough to compete in today's
              fast-paced content world.
            </p>

            <p className="text-sm sm:text-base text-black/60 leading-relaxed">
              So, we built a solution: fast, trendy, psychology-backed
              editing made for mobile-first platforms like Instagram,
              TikTok, and YouTube Shorts.
            </p>
          </motion.div>

          {/* ---- Right: image ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="w-full"
          >
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-black/5">
              <img
                src="/about4.png"
                alt="Clipzy editing workspace"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About2;