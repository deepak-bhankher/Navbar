import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Youtube Shorts",
    image: "/service1.png",
    imagePosition: "right",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
        <path d="M9.5 8.5v7l6-3.5-6-3.5Z" />
      </svg>
    ),
    desc: "We craft high-retention YouTube Shorts with cinematic hooks, smooth cuts, and trending audio that keep viewers watching till the very last second.",
  },
  {
    title: "Instagram Reels",
    image: "/service2.png",
    imagePosition: "left",
    iconBg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="white" />
      </svg>
    ),
    desc: "Scroll-stopping Reels with psychology-backed hooks, viral transitions, and platform-native editing that turns views into real followers and customers.",
  },
  {
    title: "TikTok Videos",
    image: "/service3.png",
    imagePosition: "right",
    iconBg: "bg-black",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
        <path d="M16.5 3c.3 2 1.7 3.6 3.7 3.9v2.7c-1.4.1-2.7-.3-3.7-1v6.6c0 3-2.4 5.3-5.4 5.3S5.7 18.2 5.7 15.2c0-2.9 2.2-5.2 5.1-5.3v2.8c-1.3.1-2.3 1.2-2.3 2.5 0 1.4 1.1 2.5 2.5 2.5s2.6-1.1 2.6-2.5V3h2.9Z" />
      </svg>
    ),
    desc: "Fast-paced TikTok edits built for the algorithm — snappy pacing, trending sounds, and bold captions that push your content to the For You page.",
  },
];

function PrimaryCta() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-2 inline-flex items-center gap-2 self-start rounded-lg text-black bg-[#D6ff01] px-6 py-3 text-sm font-semibold
        hover:bg-black hover:text-[#D6ff01] cursor-pointer transition-all hover:shadow-lg duration-300"
    >
      <Link to="/contact">Book A Free Meeting</Link>

      <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

function ServiceCardContent({ service }) {
  const imageFirst = service.imagePosition === "left";

  const textBlock = (
    <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-6 ${service.iconBg} shadow-[0_8px_20px_rgba(0,0,0,0.15)]`}
      >
        {service.icon}
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-[#15140F] mb-4">
        {service.title}
      </h3>
      <p className="text-sm sm:text-base text-black/55 leading-relaxed mb-6 max-w-md">
        {service.desc}
      </p>
      <PrimaryCta />
    </div>
  );

  const imageBlock = (
    <div className="relative w-full h-56 sm:h-auto min-h-[260px] sm:min-h-[340px]">
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {imageFirst ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

function StackingCard({ service, index, total }) {
  const ref = useRef(null);
  const isLast = index === total - 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  return (
    // Each wrapper is exactly 100vh tall — one "page" per card
    <div
      ref={ref}
      className="h-screen sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="h-full flex items-center justify-center px-4 sm:px-6">
        <motion.div
          style={isLast ? undefined : { scale }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden origin-top"
        >
          <ServiceCardContent service={service} />
        </motion.div>
      </div>
    </div>
  );
}

function Service2() {
  return (
    <section className="w-full">
      {SERVICES.map((service, i) => (
        <StackingCard
          key={service.title}
          service={service}
          index={i}
          total={SERVICES.length}
        />
      ))}
    </section>
  );
}

export default Service2;
