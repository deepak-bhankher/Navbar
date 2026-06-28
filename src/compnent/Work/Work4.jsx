import { motion } from "framer-motion";
import { BsFillAirplaneEnginesFill } from "react-icons/bs";

const ACCENT = "#D6ff01";

// Stat card data — left side feeds in, right side shows outcomes.
const LEFT_STATS = [
  { label: "PROFILE CLICKS", value: "67", icon: "user" },
  { label: "FOLLOWERS", value: "0", icon: "users" },
  { label: "LIKES", value: "5K", icon: "heart" },
];

const RIGHT_STATS = [
  { label: "PROFILE CLICKS", value: "1.9K", icon: "user", tone: "green" },
  { label: "VIEWS", value: "40K+", icon: "eye", tone: "orange" },
  { label: "LIKES", value: "30K", icon: "heart", tone: "red" },
];

function StatIcon({ type, tone = "default" }) {
  const toneColor =
    tone === "green"
      ? "#22c55e"
      : tone === "orange"
        ? "#f97316"
        : tone === "red"
          ? "#ef4444"
          : "#9ca3af";

  const common = {
    width: 11,
    height: 11,
    stroke: toneColor,
    fill: "none",
    strokeWidth: 1.8,
  };

  switch (type) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" {...common} fill={toneColor} stroke="none">
          <path d="M12 20.5s-7.5-4.6-9.8-9C.6 8 2 4.8 5.2 4.1c2-.4 3.9.4 5 2.1l1.8 2.7 1.8-2.7c1.1-1.7 3-2.5 5-2.1 3.2.7 4.6 3.9 3 7.4-2.3 4.4-9.8 9-9.8 9Z" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M2 12c2.7-4.7 6.3-7 10-7s7.3 2.3 10 7c-2.7 4.7-6.3 7-10 7s-7.3-2.3-10-7Z" />
          <circle cx="12" cy="12" r="2.8" fill={toneColor} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function StatPill({ label, value, icon, tone, align = "left" }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#0f0f0f] border border-white/10
        px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-[0_4px_18px_rgba(0,0,0,0.5)]
        ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      <StatIcon type={icon} tone={tone} />
      <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wide text-white/80 whitespace-nowrap">
        {value !== undefined && (
          <span className="text-white mr-1">{value}</span>
        )}
        {label}
      </span>
    </div>
  );
}

function DotCloud({ count = 150 }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.5; // golden-angle-ish spread
    const angle = (seed % 360) * (Math.PI / 180);
    const radiusBase = ((i * 53) % 100) / 100; // 0..1
    const radius = 16 + radiusBase * 84; // px from center
    const jitter = ((i * 19) % 10) - 5;
    const x = 50 + (Math.cos(angle) * radius) / 3 + jitter * 0.2;
    const y = 50 + (Math.sin(angle) * radius) / 3 + jitter * 0.2;
    const size = 1.4 + ((i * 7) % 3) * 0.55;
    const opacity = 0.22 + ((i * 31) % 60) / 100;
    return { x, y, size, opacity };
  });

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ rotate: 360, scale: 1.15 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50% 50%" }}
    >
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: ACCENT,
            opacity: d.opacity,
          }}
        />
      ))}
    </motion.div>
  );
}

function ConnectorPath({
  d,
  animate = false,
  duration = 3.5,
  delay = 0,
  noBase = false,
}) {
  return (
    <>
      {/* base static path */}
      {!noBase && (
        <path
          d={d}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
      )}
      {animate && (
        <motion.path
          d={d}
          stroke={ACCENT}
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.12 1"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
          style={{ filter: `drop-shadow(0 0 5px ${ACCENT})` }}
        />
      )}
    </>
  );
}

export default function Work4() {
  // Viewbox is a fixed coordinate space; the SVG scales responsively
  // via width/height: 100%, so all paths stay proportional at any size.
  const VB_W = 1200;
  const VB_H = 360;
  const CX = VB_W / 2;
  const CY = VB_H / 2;

  // Left anchor points (where each left outer card's line starts)
  const leftAnchors = [
    { x: 40, y: 70 },
    { x: 20, y: 180 },
    { x: 40, y: 290 },
  ];
  // Intermediate merge pill on the left (all 3 outer lines converge here
  // before a single line continues into the center)
  const leftMerge = { x: CX - 230, y: CY };

  // Right anchor points (3 outer cards this time, matching the reference)
  const rightAnchors = [
    { x: VB_W - 40, y: 60 },
    { x: VB_W - 20, y: 230 },
    { x: VB_W - 40, y: 300 },
  ];
  // Intermediate merge pill on the right
  const rightMerge = { x: CX + 230, y: CY };

  return (
    <section
      data-theme="dark"
      className="relative w-full bg-black overflow-hidden py-20 sm:py-28"
    >
      <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ---- SVG connector layer ---- */}
        <div
          className="relative w-full"
          style={{ aspectRatio: `${VB_W}/${VB_H}` }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {/* Static base paths underneath (full visual network, neutral) */}
            {leftAnchors.map((a, i) => {
              const d = `M${a.x} ${a.y} C ${leftMerge.x - 100} ${a.y}, ${leftMerge.x - 50} ${CY}, ${leftMerge.x} ${CY}`;
              return <ConnectorPath key={`left-base-${i}`} d={d} />;
            })}
            <ConnectorPath
              d={`M${leftMerge.x + 70} ${CY} L ${CX - 60} ${CY}`}
            />
            <ConnectorPath
              d={`M${CX + 60} ${CY} L ${rightMerge.x - 70} ${CY}`}
            />
            {rightAnchors.map((a, i) => {
              const d = `M${rightMerge.x} ${CY} C ${rightMerge.x + 50} ${CY}, ${rightMerge.x + 100} ${a.y}, ${a.x} ${a.y}`;
              return <ConnectorPath key={`right-base-${i}`} d={d} />;
            })}

            {/* Animated flow trails: each one travels the FULL route from
                a left card all the way to a right card (left -> leftMerge
                -> center -> rightMerge -> right), then loops back to the
                start. This makes the glow visibly travel left-to-right
                across the whole network, past the rocket, instead of
                stopping at the center. */}
            {leftAnchors.map((a, i) => {
              const target = rightAnchors[i % rightAnchors.length];
              const d = `M${a.x} ${a.y}
                C ${leftMerge.x - 100} ${a.y}, ${leftMerge.x - 50} ${CY}, ${leftMerge.x} ${CY}
                L ${CX - 60} ${CY}
                L ${CX + 60} ${CY}
                L ${rightMerge.x} ${CY}
                C ${rightMerge.x + 50} ${CY}, ${rightMerge.x + 100} ${target.y}, ${target.x} ${target.y}`;
              return (
                <ConnectorPath
                  key={`flow-${i}`}
                  d={d}
                  animate
                  noBase
                  duration={4.5}
                  delay={0}
                />
              );
            })}
          </svg>

          {/* ---- Center node ---- */}
          <div
            className="absolute mt-4 flex flex-col items-center"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{ transform: "translateY(10px) scale(1.15)" }}
              >
                <DotCloud count={180} />
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: `0 0 26px rgba(214,255,1,0.35), 0 10px 24px rgba(0,0,0,0.5)`,
                }}
              >
                <BsFillAirplaneEnginesFill
                  className="absolute left-1/2  -translate-x-1/2  text-[#D6ff01]"
                  size={22}
                />
              </motion.div>
            </div>
            <span className="mt-3 text-base sm:text-lg font-bold text-white">
              CirklX
            </span>
          </div>

          {/* ---- Left intermediate merge pill ---- */}
          <div
            className="absolute"
            style={{
              left: `${(leftMerge.x / VB_W) * 100}%`,
              top: `${(leftMerge.y / VB_H) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <StatPill label="" value="1K+" icon="eye" align="left" />
          </div>

          {/* ---- Right intermediate merge pill ---- */}
          <div
            className="absolute"
            style={{
              left: `${(rightMerge.x / VB_W) * 100}%`,
              top: `${(rightMerge.y / VB_H) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <StatPill label="FOLLOWERS" value="2K+" icon="users" align="left" />
          </div>

          {/* ---- Right outer stat pills ---- */}
          {RIGHT_STATS.map((s, i) => {
            const a = rightAnchors[i];
            return (
              <div
                key={s.label}
                className="absolute"
                style={{
                  left: `${(a.x / VB_W) * 100}%`,
                  top: `${(a.y / VB_H) * 100}%`,
                  transform: "translate(-100%, -50%)",
                }}
              >
                <StatPill
                  label={s.label}
                  value={s.value}
                  icon={s.icon}
                  tone={s.tone}
                  align="right"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
