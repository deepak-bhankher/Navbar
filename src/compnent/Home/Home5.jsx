import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Clipstart",
    tagline: "1 short video/week",
    monthlyPrice: 199,
    features: [
      "4 edited videos per month",
      "For creators just getting started",
      "Fast 48–72 hour turnaround",
      "Captions + basic hook optimization",
    ],
    cta: "Get Started Now",
    isCustom: false,
  },
  {
    name: "ReelFlow",
    tagline: "2-3 short videos/week",
    monthlyPrice: 499,
    features: [
      "10–12 edited videos per month",
      "Includes trending hooks and sound",
      "Advanced motion/text animations",
      "Custom brand styling + assets",
      "Priority delivery + 2 revisions/video",
    ],
    cta: "Get Started Now",
    isCustom: false,
  },
  {
    name: "ViralBoost",
    tagline: "Fully custom, high-volume editing",
    monthlyPrice: null,
    features: [
      "Unlimited short video edits",
      "Strategy calls + creative direction",
      "Thumbnail design for YouTube Shorts",
      "Priority Slack/Notion communication",
    ],
    cta: "Book A Meeting",
    isCustom: true,
  },
];

// Simple monthly/yearly switch. Yearly applies a ~17% discount (2 months
// free), shown by recalculating the displayed price per plan.
function BillingToggle({ yearly, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
          !yearly ? "text-[#15140F]" : "text-black/40"
        }`}
      >
        MONTHLY
      </span>

      <motion.button
        onClick={() => onChange(!yearly)}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-6 rounded-full bg-[#15140F] flex items-center px-0.5 cursor-pointer"
        aria-label="Toggle billing period"
      >
        <motion.span
          className="w-5 h-5 rounded-full bg-white shadow-md"
          animate={{ x: yearly ? 22 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      </motion.button>

      <span
        className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
          yearly ? "text-[#15140F]" : "text-black/40"
        }`}
      >
        YEARLY
      </span>
    </div>
  );
}

function PrimaryCta({ children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex-shrink-0 rounded-full bg-[#15140F] cursor-pointer  px-5 py-2.5 text-sm font-semibold text-white
        hover:bg-[#D6ff01] hover:text-black hover:shadow-lg transition-all duration-300"
    >
      <Link to="/contact">{children}</Link>
    </motion.button>
  );
}

function PlanCard({ plan, index, yearly }) {
  const displayPrice = plan.monthlyPrice
    ? yearly
      ? Math.round(plan.monthlyPrice * 0.83)
      : plan.monthlyPrice
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="flex flex-col"
    >
      {/* Top card: name, tagline, price, CTA */}
      <div className="pb-6 border-b border-black/[0.07]">
        <h3 className="text-xl font-bold text-[#15140F] mb-1.5">{plan.name}</h3>
        <p className="text-sm text-black/50 mb-6">{plan.tagline}</p>

        <div className="flex items-center justify-between gap-3">
          {plan.isCustom ? (
            <span className="text-3xl font-bold text-[#15140F]">Custom</span>
          ) : (
            <span className="flex items-baseline gap-1">
              <motion.span
                key={`${plan.name}-${displayPrice}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-3xl font-bold text-[#15140F]"
              >
                ₹{displayPrice}
              </motion.span>
              <span className="text-sm text-black/45">/mo</span>
            </span>
          )}

          <PrimaryCta>{plan.cta}</PrimaryCta>
        </div>
      </div>

      {/* Divider + feature list */}
      <div className="pt-6">
        <ul className="flex flex-col gap-3.5">
          {plan.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.12 + 0.15 + i * 0.06,
                ease: "easeOut",
              }}
              className="flex items-start gap-2.5 text-sm text-black/65"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/40 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function Home5() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ---- Header ---- */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#15140F] leading-tight"
          >
            Pay monthly or{" "}
            <span
              className="italic font-light text-[#FF5722]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              pay as you need
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-5 text-sm sm:text-base text-black/55 max-w-lg mx-auto"
          >
            We maintain a bench of pre-vetted video editors ready to be trained
            and placed within 2-weeks on average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-8"
          >
            <BillingToggle yearly={yearly} onChange={setYearly} />
          </motion.div>
        </div>

        {/* ---- Plan cards ---- */}
        <div className="mt-12 bg-white rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.07]">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className="p-6 sm:p-8">
                <PlanCard plan={plan} index={i} yearly={yearly} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home5;
