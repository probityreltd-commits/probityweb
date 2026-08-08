"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiPhone,
  FiSettings,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import { TbCompass } from "react-icons/tb";

/* ---------------------------------------------------------------------- */
/*  Configuration — edit these to fit the real project                    */
/* ---------------------------------------------------------------------- */

const LAUNCH_DATE = new Date("2026-12-21T00:00:00+06:00"); // winter solstice, Dhaka time

const SPECS = [
  { label: "Location", value: "Dhaka, Bangladesh" },
  { label: "Residences", value: "48 Sky Villas" },
  { label: "Elevation", value: "32 Floors" },
  { label: "Handover", value: "Q4 2027" },
];

/* ---------------------------------------------------------------------- */
/*  Countdown hook                                                        */
/* ---------------------------------------------------------------------- */

function useCountdown(target) {
  // start at 0 so the very first client render matches the server-rendered
  // HTML exactly — Date.now() is never evaluated during SSR/hydration
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    function tick() {
      setRemaining(Math.max(0, target.getTime() - Date.now()));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return { days, hours, minutes, seconds };
}

/* ---------------------------------------------------------------------- */
/*  Signature element — an architectural elevation that draws itself in   */
/* ---------------------------------------------------------------------- */

function BlueprintTower({ reduceMotion }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: reduceMotion ? 0 : i * 0.045,
          duration: reduceMotion ? 0 : 1.4,
          ease: "easeInOut",
        },
        opacity: { delay: reduceMotion ? 0 : i * 0.045, duration: 0.3 },
      },
    }),
  };

  // window grid: 5 columns x 8 rows within the tower body
  const windows = [];
  let wi = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 5; col++) {
      windows.push({
        x: 115 + col * 32,
        y: 110 + row * 42,
        i: wi++,
      });
    }
  }

  return (
    <motion.svg
      viewBox="0 0 400 620"
      initial="hidden"
      animate="visible"
      className="w-full h-auto max-w-md mx-auto"
    >
      {/* ground / site line */}
      <motion.line
        x1={40}
        y1={560}
        x2={360}
        y2={560}
        stroke="#6C5490"
        strokeWidth={1}
        custom={0}
        variants={draw}
      />

      {/* roof apex lines */}
      <motion.line
        x1={100}
        y1={80}
        x2={200}
        y2={20}
        stroke="#8E6FD1"
        strokeWidth={1.5}
        custom={1}
        variants={draw}
      />
      <motion.line
        x1={300}
        y1={80}
        x2={200}
        y2={20}
        stroke="#8E6FD1"
        strokeWidth={1.5}
        custom={2}
        variants={draw}
      />
      <motion.line
        x1={200}
        y1={20}
        x2={200}
        y2={4}
        stroke="#8E6FD1"
        strokeWidth={1}
        custom={3}
        variants={draw}
      />

      {/* main tower outline */}
      <motion.rect
        x={100}
        y={80}
        width={200}
        height={480}
        fill="none"
        stroke="#8E6FD1"
        strokeWidth={1.5}
        custom={4}
        variants={draw}
      />

      {/* floor divider lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.line
          key={`floor-${i}`}
          x1={100}
          y1={140 + i * 42}
          x2={300}
          y2={140 + i * 42}
          stroke="#2E2447"
          strokeWidth={1}
          custom={5 + i}
          variants={draw}
        />
      ))}

      {/* window grid */}
      {windows.map((w) => (
        <motion.rect
          key={`w-${w.i}`}
          x={w.x}
          y={w.y}
          width={16}
          height={24}
          fill="none"
          stroke="#9089A8"
          strokeWidth={0.75}
          custom={16 + w.i * 0.4}
          variants={draw}
        />
      ))}

      {/* dimension marker + label */}
      <motion.line
        x1={330}
        y1={80}
        x2={330}
        y2={560}
        stroke="#6C5490"
        strokeWidth={0.75}
        custom={40}
        variants={draw}
      />
      <motion.line
        x1={324}
        y1={80}
        x2={336}
        y2={80}
        stroke="#6C5490"
        strokeWidth={0.75}
        custom={41}
        variants={draw}
      />
      <motion.line
        x1={324}
        y1={560}
        x2={336}
        y2={560}
        stroke="#6C5490"
        strokeWidth={0.75}
        custom={41}
        variants={draw}
      />
      <motion.text
        x={344}
        y={324}
        fill="#6C5490"
        fontSize={11}
        fontFamily="var(--font-mono)"
        transform="rotate(90 344 324)"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduceMotion ? 1 : [0, 1] }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        EL. 482 FT
      </motion.text>
    </motion.svg>
  );
}

/* ---------------------------------------------------------------------- */
/*  Ambient floating gold motes                                           */
/* ---------------------------------------------------------------------- */

function FloatingMotes() {
  // start empty so server HTML and the first client render match exactly;
  // Math.random() only runs after mount, which is safe (post-hydration update)
  const [motes, setMotes] = useState([]);

  useEffect(() => {
    setMotes(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        size: 2 + Math.random() * 3,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-[#8E6FD1]/40"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            bottom: -10,
          }}
          animate={{ y: [-0, -700], opacity: [0, 0.6, 0] }}
          transition={{
            delay: m.delay,
            duration: m.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Main page                                                              */
/* ---------------------------------------------------------------------- */

export default function ComingSoon() {
  const reduceMotion = useReducedMotion();
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const timeUnits = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    // simulate a network call — wire this up to your real waitlist endpoint
    setTimeout(() => setStatus("success"), 900);
  }

  return (
    <main className="relative min-h-screen bg-[#120B23] text-[#F3F0FA] overflow-hidden">
      {/* ambient gold glow + grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(142,111,209,0.16) 0%, rgba(142,111,209,0) 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#8E6FD1 1px, transparent 1px), linear-gradient(90deg, #8E6FD1 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <FloatingMotes />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* top bar */}
        <header className="flex items-center justify-between px-6 sm:px-10 py-7">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em] text-[#F3F0FA]">
              PROBITY
            </span>
            <span className="hidden sm:inline-block h-4 w-px bg-[#9089A8]/40" />
            <span className="hidden sm:inline text-[11px] tracking-[0.35em] uppercase text-[#9089A8] font-[family-name:var(--font-mono)]">
              Dhaka
            </span>
          </div>

          <motion.div
            className="flex items-center gap-2 rounded-full border border-[#8E6FD1]/30 px-3 py-1.5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="text-[#8E6FD1]"
            >
              <FiSettings size={13} />
            </motion.span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#9089A8] font-[family-name:var(--font-mono)]">
              Crafting in progress
            </span>
          </motion.div>
        </header>

        {/* hero */}
        <section className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center px-6 sm:px-10 py-8 max-w-7xl mx-auto w-full">
          {/* left: copy + form */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[#8E6FD1] text-[11px] sm:text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-mono)] mb-5"
            >
              Pre-Launch · প্রি-লঞ্চ নিবন্ধন উন্মুক্ত
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] leading-[1.05] text-5xl sm:text-6xl xl:text-7xl text-[#F3F0FA]"
            >
              A new skyline
              <br />
              <span className="text-[#8E6FD1]">is rising in Dhaka.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="mt-6 text-lg text-[#F3F0FA]/90 font-[family-name:var(--font-body)]"
            >
              ঢাকায় নির্মিত হচ্ছে ভবিষ্যতের ঠিকানা — প্রোবিটি।
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-3 max-w-md text-[#9089A8] leading-relaxed"
            >
              A private collection of sky residences, drawn by hand before a
              single wall is raised. Registration for pre-launch access opens
              now — final plans are shared only with those on the list.
            </motion.p>

            {/* countdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex gap-2 sm:gap-4"
            >
              {timeUnits.map((u) => (
                <div
                  key={u.label}
                  className="flex flex-col items-center justify-center w-14 sm:w-20 h-14 sm:h-20 rounded-md border border-[#8E6FD1]/25 bg-[#1E1338]/60 backdrop-blur-sm"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xl sm:text-2xl text-[#8E6FD1] tabular-nums">
                    {String(u.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#9089A8] mt-1">
                    {u.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* access form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 max-w-md"
            >
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.35em] text-[#9089A8] font-[family-name:var(--font-mono)] mb-3"
              >
                Request private access
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full sm:flex-1 min-w-0 bg-transparent border border-[#9089A8]/40 focus:border-[#8E6FD1] outline-none rounded-md px-4 py-3 text-[#F3F0FA] placeholder:text-[#9089A8]/70 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto sm:shrink-0 inline-flex items-center justify-center gap-2 rounded-md bg-[#48277E] text-white px-5 py-3 font-medium tracking-wide hover:bg-[#5C34A0] transition-colors disabled:opacity-60"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                      <motion.span
                        key="done"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FiCheck /> Listed
                      </motion.span>
                    ) : (
                      <motion.span
                        key="join"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Join <FiArrowRight />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="mt-3 text-xs text-[#9089A8]">
                লঞ্চের আগে বিশেষ মূল্য ও অগ্রাধিকার বুকিং সুবিধা পেতে নিবন্ধন
                করুন।
              </p>
            </motion.form>
          </div>

          {/* right: blueprint reveal */}
          <div className="hidden lg:block lg:order-2 relative max-w-sm mx-auto lg:max-w-none">
            <div className="absolute -inset-10 bg-[#8E6FD1]/5 blur-3xl rounded-full" />
            <BlueprintTower reduceMotion={reduceMotion} />
            <motion.div
              className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 text-[#8E6FD1]/70"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            >
              <TbCompass size={28} />
            </motion.div>
          </div>
        </section>

        {/* spec strip */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="border-t border-[#8E6FD1]/15"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#8E6FD1]/10">
            {SPECS.map((s) => (
              <div key={s.label} className="px-6 py-6 sm:py-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#9089A8] font-[family-name:var(--font-mono)] mb-2">
                  {s.label}
                </p>
                <p className="font-[family-name:var(--font-display)] text-base sm:text-lg text-[#F3F0FA]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* footer */}
        <footer className="border-t border-[#8E6FD1]/10 px-6 sm:px-10 py-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-[#9089A8] text-center sm:text-left">
              © {new Date().getFullYear()} Probity Real Estate Ltd. Dhaka,
              Bangladesh, 5800.
            </p>
            <div className="flex items-center gap-5 text-[#9089A8]">
              <a
                href="mailto:hello@probityrealestate.com"
                aria-label="Email"
                className="hover:text-[#8E6FD1] transition-colors"
              >
                <FiMail size={17} />
              </a>
              <a
                href="tel:+8800000000"
                aria-label="Phone"
                className="hover:text-[#8E6FD1] transition-colors"
              >
                <FiPhone size={17} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#8E6FD1] transition-colors"
              >
                <FiInstagram size={17} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100057347864072"
                aria-label="Facebook"
                className="hover:text-[#8E6FD1] transition-colors"
              >
                <FiFacebook size={17} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
