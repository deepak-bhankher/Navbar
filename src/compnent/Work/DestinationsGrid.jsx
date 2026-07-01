import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const ACCENT = "#D6ff01";

const SECTIONS = [
  {
    id: "product",
    label: "Product",
    desc: "Stunning product visuals that convert",
    items: [
      {
        name: "Minimal Watch",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=70&w=500&auto=format&fit=crop",
        tag: "3D Render",
      },
      {
        name: "Sneaker Drop",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=70&w=500&auto=format&fit=crop",
        tag: "Photography",
      },
      {
        name: "Perfume Bottle",
        img: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=70&w=500&auto=format&fit=crop",
        tag: "Lifestyle",
      },
      {
        name: "Tech Gadget",
        img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=70&w=500&auto=format&fit=crop",
        tag: "Studio",
      },
    ],
  },
  {
    id: "logo",
    label: "Logo",
    desc: "Brand marks that leave a lasting impression",
    items: [
      {
        name: "Apex Studio",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=70&w=500&auto=format&fit=crop",
        tag: "Wordmark",
      },
      {
        name: "Nova Brand",
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=70&w=500&auto=format&fit=crop",
        tag: "Monogram",
      },
      {
        name: "Orbit Co.",
        img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=70&w=500&auto=format&fit=crop",
        tag: "Emblem",
      },
      {
        name: "Pulse Media",
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=70&w=500&auto=format&fit=crop",
        tag: "Abstract",
      },
    ],
  },
  {
    id: "graphics",
    label: "Graphics",
    desc: "Visual content that stops the scroll",
    items: [
      {
        name: "Social Banner",
        img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=70&w=500&auto=format&fit=crop",
        tag: "Social Media",
      },
      {
        name: "Event Poster",
        img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=70&w=500&auto=format&fit=crop",
        tag: "Print",
      },
      {
        name: "UI Kit",
        img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=70&w=500&auto=format&fit=crop",
        tag: "Digital",
      },
      {
        name: "Motion Reel",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=70&w=500&auto=format&fit=crop",
        tag: "Animation",
      },
    ],
  },
  {
    id: "branding",
    label: "Branding",
    desc: "Complete identity systems built to scale",
    items: [
      {
        name: "Luxe Packaging",
        img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9a?q=70&w=500&auto=format&fit=crop",
        tag: "Packaging",
      },
      {
        name: "Brand Guide",
        img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=70&w=500&auto=format&fit=crop",
        tag: "Guidelines",
      },
      {
        name: "Stationery Set",
        img: "https://images.unsplash.com/photo-1568667256549-094345857637?q=70&w=500&auto=format&fit=crop",
        tag: "Print",
      },
      {
        name: "Brand Identity",
        img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=70&w=500&auto=format&fit=crop",
        tag: "Full Identity",
      },
    ],
  },
];

function ItemCard({ item, isBranding, isGraphics }) {
  if (isGraphics) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative overflow-hidden rounded-[28px] cursor-pointer"
        style={{
          height: "380px",
          boxShadow: "0 20px 48px -14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <img
          src={item.img}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full text-white/75 bg-[#1a1a1a] border border-white/10">
          {item.tag}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-4">
            {item.name}
          </h3>
          <div className="flex items-center justify-between rounded-2xl pl-4 pr-1.5 py-1.5 border border-white/10 bg-[#161616] transition-colors duration-300 group-hover:border-white/20 group-hover:bg-[#1d1d1d]">
            <span className="text-xs font-semibold text-white">Explore Now</span>
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rounded-2xl"
              style={{ background: ACCENT, color: "#000" }}
            >
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isBranding) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#111] cursor-pointer"
        style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.6)" }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
          <span
            className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full text-black"
            style={{ background: ACCENT }}
          >
            {item.tag}
          </span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">{item.name}</span>
          <span
            className="w-7 h-7 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[20px] overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.6)" }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <span
          className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-white/10 text-white/70"
        >
          {item.tag}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <span className="text-sm font-semibold text-white">{item.name}</span>
          <span
            className="w-7 h-7 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
            style={{ background: ACCENT, color: "#000" }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationsGrid({ onClose }) {
  return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -60, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        data-theme="dark"
        className="relative w-full bg-[#070707] py-20 sm:py-28 overflow-hidden"
      >
        {/* subtle top border */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}40, transparent)`,
          }}
        />

        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "rgba(214,255,1,0.04)" }}
          />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-5 sm:px-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
                />
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase"
                  style={{ color: ACCENT }}
                >
                  All Destinations
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.06]">
                Explore every
                <br />
                <span
                  style={{
                    backgroundImage: `linear-gradient(130deg, #fff 20%, ${ACCENT} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  category
                </span>
              </h2>
            </motion.div>

            </div>

          {/* 4 Sections */}
          <div className="flex flex-col gap-20 sm:gap-28">
            {SECTIONS.map((section, si) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: si * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Section header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full text-black"
                        style={{ background: ACCENT }}
                      >
                        0{si + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {section.label}
                      </h3>
                    </div>
                    <p className="text-sm text-white/35 ml-10">{section.desc}</p>
                  </div>
                </div>

                {/* 4 Cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: ii * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ItemCard
                        item={item}
                        isBranding={section.id === "branding"}
                        isGraphics={section.id === "graphics"}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Close button — bottom right after 4th section */}
          <div className="flex justify-end mt-14 sm:mt-16">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-2xl border border-white/10 bg-[#111] text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-colors duration-200"
            >
              <X size={14} />
              Close
            </motion.button>
          </div>
        </div>
      </motion.section>
  );
}
