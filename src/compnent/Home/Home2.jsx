import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01", // first step has no visible number badge in the reference
    title: "Give us your raw footage, it can be DSLR or iPhone",
    desc: "We maintain a bench of pre-vetted video editors ready to be trained and placed within 2-weeks on average.",
    image: "Home1.png",
  },
  {
    number: "02",
    title: "Our team instantly starts editing your videos",
    desc: "No delays, no guesswork—our bench of video editors is vetted, trained, and ready to join your team in 2 weeks or less.",
    image: "Home2.png",
  },
  {
    number: "03",
    title: "Upload & start seeing results from day one",
    desc: "Streamline your hiring process with our pre-qualified video editors, available for training and placement within a 2-week timeframe. No extra steps, no waiting around.",
    image: "Home3.png",
  },
];

function StepCard({ step, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.15, ease: "easeOut" }}
      className={`relative flex flex-col px-6 sm:px-8 py-2 ${
        !isLast ? "sm:border-r sm:border-black/10" : ""
      } ${index > 0 ? "border-t sm:border-t-0 border-black/10 pt-10 sm:pt-2" : ""}`}
    >
      {step.number && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.15 + 0.1,
            ease: "easeOut",
          }}
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-black/15 text-sm font-semibold text-black/70 mb-5"
        >
          {step.number}
        </motion.span>
      )}

      <h3 className="text-2xl sm:text-[1.7rem] font-bold text-[#15140F] leading-tight mb-4 max-w-[280px]">
        {step.title}
      </h3>

      <p className="text-sm text-black/55 leading-relaxed mb-7 max-w-[300px]">
        {step.desc}
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: index * 0.15 + 0.2,
          ease: "easeOut",
        }}
        whileHover={{ y: -4 }}
        className="w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden bg-black/5
          shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

function Home2() {
  return (
    <section className="w-full bg-[#F4F2ED] py-20 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xs sm:text-sm font-semibold tracking-widest text-black/40 uppercase mb-10 sm:mb-14"
        >
          Trusted by 10,000+ founders &amp; business owners
        </motion.p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-y-0">
        {STEPS.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            isLast={i === STEPS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default Home2;
