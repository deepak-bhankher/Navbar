import { motion } from "framer-motion";

const IMAGES = ["/about1.png", "/about2.png", "/about3.png"];

function About1() {
  // Duplicate the image list so the marquee track is twice as long as one
  // full pass. Animating x from 0 to -50% then looping (repeat: Infinity)
  // makes the second half line up exactly with the first half, so the
  // motion reads as one continuous, seamless right-to-left scroll with no
  // visible jump at the loop point.
  const track = [...IMAGES, ...IMAGES];

  return (
    <div className="flex flex-col min-h-screen bg-black items-center justify-center text-center px-6 pt-32 sm:pt-36 md:pt-40 pb-20 w-full mx-auto overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className=" font-semibold  text-white mb-4"
      >
        <div className="flex gap-4 text-2xl md:text-4xl lg:text-6xl">
          About
          <span
            className="font-light italic"
            style={{ fontFamily: "Instrument Serif , serif" }}
          >
            CirklX
          </span>
        </div>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="text-base sm:text-lg text-white/70"
      >
        At CirklX, we help creators and brands transform ordinary <br /> videos
        into scroll-stopping, high-converting short-form
        <br />
        content for Reels, Shorts, and TikTok.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-5xl mt-12 sm:mt-16 overflow-hidden"
      >
        <motion.div
          className="flex gap-4 sm:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {track.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[60vw] sm:w-[280px] md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <img
                src={src}
                alt={`Clipzy work sample ${(i % IMAGES.length) + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About1;
