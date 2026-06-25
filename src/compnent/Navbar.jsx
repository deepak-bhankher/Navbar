import { useState, useEffect } from "react";

import { RxCross1 } from "react-icons/rx";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Service", path: "/service" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

function useDarkSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const NAVBAR_HEIGHT = 80;

    function checkSection() {
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let foundDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= NAVBAR_HEIGHT && rect.bottom >= NAVBAR_HEIGHT) {
          foundDark = true;
        }
      });
      setIsDark(foundDark);
    }

    window.addEventListener("scroll", checkSection, { passive: true });
    checkSection();
    return () => window.removeEventListener("scroll", checkSection);
  }, []);

  return isDark;
}

function NavItem({ label, path, isDark }) {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  const [hovered, setHovered] = useState(false);
  const active = hovered || isActive;
  const defaultColor = isDark ? "#ffffff" : "#15140F";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-2 lg:px-4 py-2 cursor-pointer"
    >
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 rounded-lg bg-black/90"
          />
        )}
      </AnimatePresence>
      <motion.span
        animate={{ color: active ? "#D6ff01" : defaultColor }}
        transition={{ duration: 0.2 }}
        className="relative text-[13px] lg:text-sm font-medium tracking-wide whitespace-nowrap"
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
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="px-5 py-2 flex gap-1.5 items-center rounded-lg text-sm font-semibold text-black cursor-pointer
        bg-[#D6ff01] border border-black/10
        hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01]
        hover:shadow-[0_0_22px_rgba(214,255,1,0.5)]
        transition-all duration-300"
    >
      <Link to="/contact">Book A Free Meeting</Link>

      <div className="relative w-[17px] h-[17px] overflow-hidden">
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 17, y: -17, opacity: 0 } : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={17} />
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          animate={
            hovered ? { x: 0, y: 0, opacity: 1 } : { x: -17, y: 17, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <MdArrowOutward size={17} />
        </motion.span>
      </div>
    </motion.button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = useDarkSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4"
      >
        <div
          className={`max-w-5xl mx-auto rounded-2xl px-5 transition-all duration-500 ${
            scrolled
              ? "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
              : "bg-white/5 backdrop-blur-sm border border-white/10"
          }`}
        >
          <div className="flex items-center justify-between h-[62px]">
            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src="/logo.png"
                  alt="CirklX"
                  className="w-8 h-8 object-contain"
                />
                <motion.span
                  animate={{ color: isDark ? "#ffffff" : "#15140F" }}
                  transition={{ duration: 0.3 }}
                  className="font-bold text-[17px] tracking-tight"
                >
                  CirklX
                </motion.span>
              </motion.div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                  className="list-none"
                >
                  <Link to={link.path}>
                    <NavItem
                      label={link.name}
                      path={link.path}
                      isDark={isDark}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="hidden md:block"
            >
              <CtaButton />
            </motion.div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.87 }}
              onClick={() => setOpen(!open)}
              className="md:hidden cursor-pointer bg-[#D6ff01] border border-black/10
                p-2 rounded-xl text-black
                hover:bg-black hover:text-[#D6ff01] hover:border-[#D6ff01]
                shadow-[0_0_14px_rgba(214,255,1,0.35)]
                transition-all duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {open ? <RxCross1 size={19} /> : <CiMenuFries size={21} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[82px] left-4 right-4 z-40 md:hidden"
          >
            <div
              className="bg-black/20 backdrop-blur-2xl rounded-2xl
              border border-white/20
              shadow-[0_20px_60px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15),0_0_0_1px_rgba(214,255,1,0.1)]
              overflow-hidden"
            >
              <ul className="flex flex-col list-none px-3 py-3 gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22 }}
                    className="list-none"
                  >
                    <Link to={link.path} onClick={() => setOpen(false)}>
                      <div
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        text-sm font-medium
                        hover:bg-black/80 hover:text-[#D6ff01]
                        transition-all duration-200 ${isDark ? "text-white" : "text-[#15140F]"}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6ff01] shrink-0" />
                        {link.name}
                      </div>
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.22 }}
                  className="list-none mt-1 pt-3 border-t border-white/15"
                >
                  <button
                    className="w-full flex justify-center items-center gap-2
  py-3 px-6 rounded-xl cursor-pointer
  text-base font-semibold text-black
  bg-[#D6ff01] border border-black/10
  shadow-[0_0_20px_rgba(214,255,1,0.45)]
  hover:bg-black hover:text-[#D6ff01]
  transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <Link to="/contact">Book A Free Meeting</Link>
                    <MdArrowOutward size={17} />
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
