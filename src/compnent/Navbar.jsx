import { useState, useEffect } from "react";
import { BiLogoMailchimp } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const NAV_LINKS = ["Home", "About", "Service", "Work", "Contact"];

function NavItem({ label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 cursor-pointer"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0  rounded-lg bg-black   "
          />
        )}
      </AnimatePresence>

      <motion.span
        animate={{ color: hovered ? "#D6ff01" : "#000000" }}
        transition={{ duration: 0.2 }}
        className="relative text-sm font-sans tracking-wide"
      >
        {label}
      </motion.span>
    </div>
  );
}

function CtaButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="px-6 py-[9px] flex gap-2 justify-center items-center rounded-lg text-sm font-semibold text-black cursor-pointer
        bg-[#D6ff01] border border-black/10
        hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01]
        hover:shadow-[0_0_26px_rgba(214,255,1,0.4)]
        transition-all duration-300"
    >
      Book A Free Meeting
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50  transition-all  duration-500 bg-black
          ${
            scrolled
              ? "shadow-[0_2px_0_rgba(214,255,1,0.6),0_8px_40px_rgba(0,0,0,0.1)]"
              : "backdrop-blur-2xl"
          }`}
      >
        {/* top gradient border */}
        <div />

        <div className="md:px-10">
          <div className="md:max-w-5xl md:mx-auto bg-white mt-2 md:rounded-2xl px-6">
            <div className="flex items-center justify-between h-[70px]">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span>
                  <img src="logo.png" alt="png" className="w-8" />
                </span>
                <span className="hidden sm:block font-bold text-lg ">
                  CirklX
                </span>
              </motion.div>

              {/* Desktop nav links */}
              <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                    className="list-none"
                  >
                    <NavItem label={link} />
                  </motion.li>
                ))}
              </ul>

              {/* Desktop CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <CtaButton />
              </motion.div>

              {/* Hamburger — mobile only */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setOpen(!open)}
                className="md:hidden cursor-pointer bg-[#D6ff01] border border-black/10
                p-2 rounded-xl text-black
                shadow-[0_0_12px_rgba(214,255,1,0.4)]
                hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01] transition-all duration-300"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "cross" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {open ? <RxCross1 size={20} /> : <CiMenuFries size={22} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[70px] left-0 right-0 z-40 md:hidden bg-[#d7d4d4] md:px-10"
          >
            <div className="max-w-5xl mx-auto bg-white  border-t border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.1),0_8px_24px_rgba(214,255,1,0.15)]">
              <ul className="flex flex-col list-none mt-3 px-4 py-3 gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.28 }}
                    className="list-none"
                  >
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        text-sm font-medium text-black hover:text-[#D6ff01]
                        bg-transparent border border-transparent cursor-pointer
                        hover:bg-black hover:border-black
                        transition-all duration-200 text-left"
                    >
                      <span className="w-[6px] h-[6px] rounded-full shrink-0 bg-[#D6ff01] border border-black/20" />
                      {link}
                    </button>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.28 }}
                  className="list-none mt-2 pt-3 border-t border-black/10"
                >
                  <button
                    className="w-full flex justify-center gap-2 items-center py-[11px] rounded-full cursor-pointer
                    text-sm font-semibold text-black
                    bg-[#D6ff01] border border-black/10
                    shadow-[0_0_16px_rgba(214,255,1,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]
                    transition-all duration-300"
                  >
                    Book A Free Meeting
                    <div className="flex mt-1 justify-center">
                      <span>
                        <MdArrowOutward size={18} />
                      </span>
                    </div>
                  </button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
