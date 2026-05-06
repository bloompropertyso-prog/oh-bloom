import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf, Mail, MessageSquare, Video, Check,
  ArrowRight, ChevronDown, ShoppingBag, Code2,
  FileText, Flower2, Clock, Users, Globe
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  linen:      "#FAF9F6",
  linenDark:  "#F2EFE9",
  sage:       "#6B705C",
  sageLt:     "#8A9178",
  sageXlt:    "#EEF0EB",
  sagePale:   "#F4F5F1",
  terra:      "#CB997E",
  terraLt:    "#F2DDD1",
  terraDark:  "#B8845A",
  sand:       "#DDBEA9",
  sandPale:   "#FAF2EE",
  brown:      "#3D3228",
  brownMid:   "#5C4A3A",
  body:       "#5A574F",
  border:     "rgba(107,112,92,0.14)",
  borderHov:  "rgba(203,153,126,0.35)",
  white:      "#FFFFFF",
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Lato', system-ui, -apple-system, sans-serif";

const sh = {
  xs:  "0 1px 8px rgba(61,50,40,0.06)",
  sm:  "0 4px 20px rgba(61,50,40,0.08)",
  md:  "0 8px 40px rgba(61,50,40,0.12)",
  lg:  "0 20px 70px rgba(61,50,40,0.16)",
  xl:  "0 32px 100px rgba(61,50,40,0.20)",
};

// ─── Global Styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700;900&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; font-size: 16px; }
      body { background: ${T.linen}; color: ${T.body}; font-family: ${SANS}; -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.7; }
      ::selection { background: ${T.terra}; color: #fff; }
      a { transition: all 0.25s ease; }
      @keyframes marquee   { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
      @keyframes floatA    { 0%,100% { transform: translateY(0) rotate(-2deg); }  50% { transform: translateY(-14px) rotate(2deg); } }
      @keyframes floatB    { 0%,100% { transform: translateY(0) rotate(3deg); }   50% { transform: translateY(-10px) rotate(-1deg); } }
      @keyframes floatC    { 0%,100% { transform: translateY(0) rotate(0deg); }   50% { transform: translateY(-18px) rotate(4deg); } }
      @keyframes pulse     { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      .float-a { animation: floatA 7s ease-in-out infinite; }
      .float-b { animation: floatB 9s ease-in-out infinite 1s; }
      .float-c { animation: floatC 6s ease-in-out infinite 2s; }
      .marquee-track { display: flex; width: max-content; animation: marquee 50s linear infinite; }
      .card-hover { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
      .card-hover:hover { transform: translateY(-8px); box-shadow: ${sh.lg}; }
      input, textarea, select { font-family: ${SANS}; }
      .portfolio-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
      @media (min-width: 640px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(3, 1fr); } }
      .testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
      @media (min-width: 640px) { .testimonials-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1024px) { .testimonials-grid { grid-template-columns: repeat(3, 1fr); } }
    `}</style>
  );
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Eyebrow Label ────────────────────────────────────────────────────────────
function Label({ children, light = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem",
      background: light ? "rgba(255,255,255,0.15)" : T.sageXlt,
      color: light ? "rgba(255,255,255,0.9)" : T.sage,
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em",
      textTransform: "uppercase", padding: "0.4rem 0.9rem",
      borderRadius: "999px", fontFamily: SANS,
    }}>
      <Leaf size={9} strokeWidth={2.5} />
      {children}
    </span>
  );
}

// ─── Botanical SVG Decorations ────────────────────────────────────────────────
function BotLeaf({ color = T.sage, opacity = 0.25, style = {} }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M40 110 C40 110 5 80 8 45 C11 15 38 5 40 10 C42 5 69 15 72 45 C75 80 40 110 40 110Z"
        fill={color} fillOpacity={opacity} />
      <path d="M40 110 L40 15" stroke={color} strokeOpacity={opacity * 1.4}
        strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 75 C28 65 15 55 12 42" stroke={color} strokeOpacity={opacity}
        strokeWidth="1" strokeLinecap="round" />
      <path d="M40 60 C52 50 65 40 68 27" stroke={color} strokeOpacity={opacity}
        strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function BotBranch({ color = T.sage, opacity = 0.2, style = {} }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M60 150 C60 150 60 80 60 30" stroke={color} strokeOpacity={opacity * 1.5}
        strokeWidth="2" strokeLinecap="round" />
      <path d="M60 110 C40 95 20 75 15 55" stroke={color} strokeOpacity={opacity * 1.2}
        strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="12" cy="52" rx="14" ry="22" transform="rotate(-30 12 52)"
        fill={color} fillOpacity={opacity} />
      <path d="M60 85 C80 70 100 50 105 30" stroke={color} strokeOpacity={opacity * 1.2}
        strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="107" cy="27" rx="14" ry="22" transform="rotate(25 107 27)"
        fill={color} fillOpacity={opacity} />
      <path d="M60 55 C42 45 28 30 22 15" stroke={color} strokeOpacity={opacity}
        strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="19" cy="12" rx="10" ry="16" transform="rotate(-20 19 12)"
        fill={color} fillOpacity={opacity * 0.8} />
      <path d="M60 40 C76 30 90 18 95 5" stroke={color} strokeOpacity={opacity}
        strokeWidth="1" strokeLinecap="round" />
      <ellipse cx="97" cy="3" rx="10" ry="16" transform="rotate(15 97 3)"
        fill={color} fillOpacity={opacity * 0.8} />
    </svg>
  );
}

// ─── MacBook Mockup ───────────────────────────────────────────────────────────
function MacbookMockup() {
  return (
    <div style={{ position: "relative", maxWidth: 580, margin: "0 auto" }}>
      {/* Screen body */}
      <div style={{
        background: "#2A2A2A", borderRadius: "16px 16px 0 0",
        padding: "10px 12px 0", boxShadow: sh.xl,
        border: "1.5px solid #1A1A1A",
      }}>
        {/* Camera dot */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3A3A3A", display: "inline-block" }} />
        </div>
        {/* Screen — full-bleed dental practice site (no browser chrome) */}
        <div style={{ borderRadius: "8px 8px 0 0", overflow: "hidden", aspectRatio: "16/10" }}>
          <svg viewBox="0 0 560 350" style={{ width: "100%", height: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dentBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FAFCFB"/>
                <stop offset="1" stopColor="#EFF6F4"/>
              </linearGradient>
              <radialGradient id="dentGlowR" cx="82%" cy="14%" r="55%">
                <stop offset="0" stopColor="#D5EAE4" stopOpacity="0.75"/>
                <stop offset="1" stopColor="#FAFCFB" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="dentGlowL" cx="8%" cy="92%" r="42%">
                <stop offset="0" stopColor="#FAEBE0" stopOpacity="0.55"/>
                <stop offset="1" stopColor="#FAFCFB" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="dentBtn" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7FB3A8"/>
                <stop offset="1" stopColor="#9BC5C1"/>
              </linearGradient>
              <linearGradient id="dentDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2C4541"/>
                <stop offset="1" stopColor="#1F332F"/>
              </linearGradient>
              <linearGradient id="dentFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F2D9C2"/>
                <stop offset="1" stopColor="#E0BC9F"/>
              </linearGradient>
            </defs>

            {/* === SITE BACKGROUND === */}
            <rect width="560" height="350" fill="url(#dentBg)"/>
            <rect width="560" height="350" fill="url(#dentGlowR)"/>
            <rect width="560" height="350" fill="url(#dentGlowL)"/>

            {/* === STICKY NAV === */}
            <rect width="560" height="40" fill="rgba(255,255,255,0.92)"/>
            <line x1="0" y1="40" x2="560" y2="40" stroke="#D5E5E2" strokeOpacity="0.55"/>
            {/* Logo mark */}
            <circle cx="30" cy="20" r="10" fill="url(#dentBtn)"/>
            {/* Tooth glyph */}
            <path d="M25 16 Q25 13 28 12.6 Q29.5 12.6 30 13.4 Q30.5 12.6 32 12.6 Q35 13 35 16 Q35 20 33.4 23 Q32.6 24 32 23.2 Q31.4 22 31.2 20.4 Q31 22 30.4 23 Q29.4 24 28.6 23 Q25 20 25 16 Z" fill="#FFFFFF" opacity="0.96"/>
            <text x="46" y="24" fontSize="10" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Cedar </text>
            <text x="83" y="24" fontSize="10" fontFamily="Georgia, serif" fill="#7FB3A8" fontStyle="italic">Dental Co.</text>
            {/* Nav links */}
            <text x="296" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Services</text>
            <text x="338" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">About</text>
            <text x="368" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Patients</text>
            <text x="408" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Contact</text>
            <rect x="448" y="10" width="96" height="20" rx="10" fill="url(#dentBtn)"/>
            <text x="496" y="23.5" fontSize="7" fontFamily="Arial" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">Book a Visit  →</text>

            {/* === HERO LEFT — Copy === */}
            {/* Eyebrow pill */}
            <rect x="38" y="62" width="172" height="18" rx="9" fill="#FFFFFF" stroke="#C9DFD9" strokeWidth="0.6"/>
            <text x="48" y="74.5" fontSize="7" fontFamily="Arial" fill="#F4B942" fontWeight="bold">★★★★★</text>
            <text x="120" y="74.5" fontSize="6" fontFamily="Arial" fill="#5A6B68" fontWeight="bold" letterSpacing="0.12em">TRUSTED SINCE 2008</text>

            {/* Big headline */}
            <text x="38" y="108" fontSize="24" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Modern Dentistry,</text>
            <text x="38" y="138" fontSize="24" fontFamily="Georgia, serif" fill="#7FB3A8" fontStyle="italic">Gentle Care.</text>

            {/* Subtext */}
            <text x="38" y="162" fontSize="8.5" fontFamily="Arial" fill="#5A6B68" fillOpacity="0.85">Comprehensive family dentistry in a calm, spa-inspired</text>
            <text x="38" y="175" fontSize="8.5" fontFamily="Arial" fill="#5A6B68" fillOpacity="0.85">setting. Same-day appointments available.</text>

            {/* CTA buttons */}
            <rect x="38" y="192" width="128" height="26" rx="13" fill="url(#dentBtn)"/>
            <text x="102" y="208.5" fontSize="8" fontFamily="Arial" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="0.04em">Book Appointment  →</text>
            <rect x="174" y="192" width="100" height="26" rx="13" fill="none" stroke="#7FB3A8" strokeWidth="1.3" strokeOpacity="0.5"/>
            <text x="224" y="208.5" fontSize="8" fontFamily="Arial" fill="#2C4541" textAnchor="middle">Our Services</text>

            {/* === HERO RIGHT — Doctor card === */}
            <rect x="316" y="58" width="208" height="180" rx="16" fill="#FFFFFF" stroke="#D5E5E2" strokeWidth="0.8"/>
            {/* Photo background */}
            <rect x="324" y="66" width="192" height="110" rx="11" fill="#EBF4F2"/>
            {/* Sparkle accents */}
            <text x="334" y="80" fontSize="10" fontFamily="Arial" fill="#7FB3A8" opacity="0.55">✦</text>
            <text x="500" y="170" fontSize="9" fontFamily="Arial" fill="#CB997E" opacity="0.55">✦</text>

            {/* Real dentist photo */}
            <defs>
              <clipPath id="dentDrClip">
                <rect x="324" y="66" width="192" height="110" rx="11"/>
              </clipPath>
            </defs>
            <image
              href="https://images.pexels.com/photos/8376309/pexels-photo-8376309.jpeg?auto=compress&cs=tinysrgb&w=400&h=230&fit=crop"
              x="324" y="66" width="192" height="110"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#dentDrClip)"
            />

            {/* Caption */}
            <text x="324" y="194" fontSize="9" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Dr. Maya Chen, DDS</text>
            <text x="324" y="206" fontSize="6.5" fontFamily="Arial" fill="#7A8A86">Founder · 15+ years caring for families</text>

            {/* Service tags */}
            <rect x="324" y="214" width="50" height="14" rx="7" fill="#EBF4F2"/>
            <text x="349" y="223.5" fontSize="6" fontFamily="Arial" fill="#7FB3A8" textAnchor="middle" fontWeight="bold">Cleanings</text>
            <rect x="378" y="214" width="50" height="14" rx="7" fill="#FAF2EE"/>
            <text x="403" y="223.5" fontSize="6" fontFamily="Arial" fill="#CB997E" textAnchor="middle" fontWeight="bold">Whitening</text>
            <rect x="432" y="214" width="62" height="14" rx="7" fill="#EBF4F2"/>
            <text x="463" y="223.5" fontSize="6" fontFamily="Arial" fill="#7FB3A8" textAnchor="middle" fontWeight="bold">Family Care</text>

            {/* === BOTTOM STATS STRIP === */}
            <rect x="0" y="270" width="560" height="80" fill="url(#dentDark)"/>
            <text x="96" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">4.9 ★</text>
            <text x="96" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Google Rating · 1,200+ Reviews</text>
            <line x1="192" y1="282" x2="192" y2="328" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
            <text x="280" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">Same-Day</text>
            <text x="280" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Emergency Appointments</text>
            <line x1="368" y1="282" x2="368" y2="328" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
            <text x="462" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">15+</text>
            <text x="462" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Years Caring for Families</text>
          </svg>
        </div>
      </div>
      {/* Hinge */}
      <div style={{
        height: 8, background: "linear-gradient(180deg, #2A2A2A, #1E1E1E)",
        borderRadius: "0 0 3px 3px", boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }} />
      {/* Base */}
      <div style={{
        height: 14, background: "linear-gradient(180deg, #D0CECE, #C0BEBE)",
        borderRadius: "0 0 12px 12px", boxShadow: sh.md,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 60, height: 4, borderRadius: 999, background: "#B0AEAE", opacity: 0.5 }} />
      </div>
      {/* Table reflection */}
      <div style={{
        height: 20, background: "linear-gradient(180deg, rgba(200,198,195,0.4) 0%, transparent 100%)",
        borderRadius: "0 0 60% 60%", marginTop: -2,
      }} />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const links = ["Services", "Work", "Method", "Contact"];
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "rgba(250,249,246,0.90)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${T.border}`,
        padding: "1.1rem 5%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.terra} 0%, ${T.sand} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: sh.xs,
        }}>
          <Flower2 size={17} color="#fff" strokeWidth={1.5} />
        </div>
        <span style={{ fontFamily: SERIF, fontSize: "1.2rem", color: T.brown, fontWeight: 500, letterSpacing: "0.02em" }}>
          Bloom <span style={{ color: T.sage }}>Digital</span>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ textDecoration: "none", color: T.body, fontSize: "13px", letterSpacing: "0.05em", fontWeight: 400 }}
            onMouseEnter={e => e.target.style.color = T.sage}
            onMouseLeave={e => e.target.style.color = T.body}
          >
            {l}
          </a>
        ))}
        <a href="#contact" style={{
          textDecoration: "none", background: T.terra, color: "#fff",
          padding: "0.6rem 1.4rem", borderRadius: "999px",
          fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em",
          boxShadow: sh.sm,
        }}
          onMouseEnter={e => e.currentTarget.style.background = T.terraDark}
          onMouseLeave={e => e.currentTarget.style.background = T.terra}
        >
          Start a Project
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{
      padding: "6rem 5% 5rem", background: T.linen,
      position: "relative", overflow: "hidden",
      borderBottom: `1px solid ${T.border}`,
    }}>
      {/* Background gradient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.terraLt} 0%, transparent 65%)`,
          top: "-200px", right: "-100px", opacity: 0.6,
        }} />
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${T.sageXlt} 0%, transparent 65%)`,
          bottom: "-100px", left: "-80px", opacity: 0.8,
        }} />
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Headline block */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Label>Bloom Digital Studio · Lexington, SC</Label>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{
              fontFamily: SERIF, fontWeight: 500, color: T.brown,
              fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
              lineHeight: 1.08, letterSpacing: "-0.01em",
              margin: "1.25rem auto",
              maxWidth: 820,
            }}
          >
            Helping Visionary Female Founders{" "}
            <em style={{ color: T.sage, fontStyle: "italic" }}>Bloom Online.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            style={{
              fontFamily: SANS, fontSize: "1.05rem", fontWeight: 300,
              color: T.body, maxWidth: 540, margin: "0 auto 2.25rem", lineHeight: 1.85,
            }}
          >
            Custom Shopify stores and web systems built for growth, lifestyle, and longevity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}
          >
            <a href="#services" style={{
              textDecoration: "none", background: T.sage, color: "#fff",
              padding: "0.95rem 2rem", borderRadius: "999px",
              fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em",
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              boxShadow: sh.md,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = T.sageLt; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.sage; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explore Services <ArrowRight size={15} />
            </a>
            <a href="#contact" style={{
              textDecoration: "none", background: "transparent", color: T.brown,
              padding: "0.95rem 2rem", borderRadius: "999px",
              fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em",
              border: `2px solid rgba(61,50,40,0.2)`,
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.terra; e.currentTarget.style.color = T.terra; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(61,50,40,0.2)"; e.currentTarget.style.color = T.brown; }}
            >
              Start a Project
            </a>
          </motion.div>
        </div>

        {/* Botanical accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ position: "relative", height: 100, maxWidth: 480, margin: "0 auto" }}
        >
          <div className="float-a" style={{
            position: "absolute", left: 0, bottom: 0, width: 100,
            filter: "drop-shadow(0 6px 12px rgba(107,112,92,0.12))",
          }}>
            <BotBranch color={T.sage} opacity={0.3} style={{ width: "100%" }} />
          </div>
          <div className="float-b" style={{
            position: "absolute", right: 0, top: 0, width: 80,
            filter: "drop-shadow(0 6px 12px rgba(203,153,126,0.12))",
          }}>
            <BotLeaf color={T.terra} opacity={0.35} style={{ width: "100%" }} />
          </div>
          <div className="float-c" style={{
            position: "absolute", left: "50%", top: 8,
            transform: "translateX(-50%)", width: 55,
          }}>
            <BotLeaf color={T.sage} opacity={0.22} style={{ width: "100%" }} />
          </div>
          <div className="float-a" style={{
            position: "absolute", right: 80, bottom: 0, width: 50,
            transform: "scaleX(-1)",
          }}>
            <BotLeaf color={T.sand} opacity={0.38} style={{ width: "100%" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "Female-Founded", "✦", "Custom Shopify Stores", "✦", "Web Design", "✦",
    "Landing Pages", "✦", "React Web Apps", "✦", "Klaviyo Flows", "✦",
    "WordPress & Wix", "✦", "Email Marketing", "✦", "Tailored Solutions", "✦",
    "Lexington, SC", "✦", "Small Business Friendly", "✦", "Fast Turnaround",
    "✦", "Female-Founded", "✦", "Custom Shopify Stores", "✦", "Web Design", "✦",
    "Landing Pages", "✦", "React Web Apps", "✦", "Klaviyo Flows", "✦",
    "WordPress & Wix", "✦", "Email Marketing", "✦", "Tailored Solutions", "✦",
    "Lexington, SC", "✦", "Small Business Friendly", "✦", "Fast Turnaround", "✦",
  ];
  return (
    <div style={{ background: T.sage, padding: "0.85rem 0", overflow: "hidden" }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{
            padding: "0 1.6rem",
            fontSize: "10px", letterSpacing: "0.18em", fontWeight: item === "✦" ? 400 : 700,
            color: item === "✦" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.82)",
            textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: SANS,
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Async Method ─────────────────────────────────────────────────────────────
function AsyncMethod() {
  const pillars = [
    {
      icon: <Video size={20} color={T.terra} strokeWidth={1.5} />,
      title: `You'll Never Wonder "Where Are We?"`,
      body: "Every milestone comes with a recorded Loom walkthrough so you can see exactly what was built, why decisions were made, and what's coming next — on your schedule, not a call.",
    },
    {
      icon: <MessageSquare size={20} color={T.terra} strokeWidth={1.5} />,
      title: "One Place. Zero Chaos.",
      body: "Your project lives in a dedicated Slack channel — every file, decision, and update in one searchable thread. No lost emails, no \"can you resend that?\" ever again.",
    },
    {
      icon: <Clock size={20} color={T.terra} strokeWidth={1.5} />,
      title: "Your Time Is Protected.",
      body: "No discovery calls, no check-in meetings, no back-and-forth scheduling. You get your hours back while we stay heads-down building — that's the whole point.",
    },
    {
      icon: <Check size={20} color={T.terra} strokeWidth={1.5} />,
      title: "You Always Know What Happens Next.",
      body: "Every project is mapped into clear phases before we start. You get a timeline, deliverables, and checkpoints — so launch day is never a surprise, it's just the next step.",
    },
  ];

  return (
    <section id="method" style={{ padding: "7rem 5%", background: T.sagePale }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ maxWidth: 680, marginBottom: "4rem" }}>
            <Label>THE STRATEGY</Label>
            <h2 style={{
              fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500, color: T.brown, marginTop: "1rem", lineHeight: 1.15, marginBottom: "0.5rem",
            }}>
              The Bloom Method.
            </h2>
            <p style={{
              fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
              color: T.sage, fontWeight: 400, marginBottom: "1.25rem", lineHeight: 1.3,
            }}>
              Efficiency by Design.
            </p>
            <p style={{ fontFamily: SANS, fontWeight: 300, color: T.body, fontSize: "15px", lineHeight: 1.9, maxWidth: 580 }}>
              We prioritize deep work and technical precision. By operating asynchronously via Slack and Loom updates, we eliminate meeting fatigue and dedicate 100% of our focus to building your visionary platform. No scheduled calls—just uninterrupted progress.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-hover" style={{
                background: T.white, borderRadius: 24, padding: "2.25rem 2rem",
                border: `1px solid ${T.border}`, boxShadow: sh.sm,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: T.terraLt,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.1rem",
                }}>
                  {p.icon}
                </div>
                <h3 style={{
                  fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 500,
                  color: T.brown, marginBottom: "0.6rem", lineHeight: 1.3,
                }}>{p.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: "13.5px", fontWeight: 300, color: T.body, lineHeight: 1.8 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 3-Step Process Strip */}
        <Reveal delay={0.25}>
          <div style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: `1px solid ${T.border}`,
            borderRadius: 20,
            overflow: "hidden",
            background: T.white,
            boxShadow: sh.sm,
          }}>
            {[
              { num: "01", title: "Inquire", desc: "Fill out the form below. No calls, no pressure." },
              { num: "02", title: "We Scope", desc: "You'll receive a detailed proposal and project timeline within 48 hours." },
              { num: "03", title: "We Build", desc: "Work begins. You get Loom updates and Slack access until launch day." },
            ].map((step, i) => (
              <div key={step.num} style={{
                padding: "2rem 1.75rem",
                borderRight: i < 2 ? `1px solid ${T.border}` : "none",
              }}>
                <p style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 700, color: T.terra, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {step.num}
                </p>
                <p style={{ fontFamily: SERIF, fontSize: "1.05rem", fontWeight: 500, color: T.brown, marginBottom: "0.5rem" }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 300, color: T.body, lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Portfolio CSS Mockups ────────────────────────────────────────────────────
function LuminousMockup() {
  return (
    <div style={{ background: "#18181B", padding: "8px 8px 0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: "#242427", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px 12px", gap: 8, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}/>
          </div>
        </div>
        <div style={{ background: "#FAF7F2" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#fff", borderBottom: "1px solid #EDE5DC" }}>
            <span style={{ fontSize: 11, color: "#3D3228", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>✿ Luminous</span>
            <div style={{ display: "flex", gap: 12, fontSize: 8, color: "#6A6460", fontFamily: "'Lato', sans-serif" }}>
              <span>Shop</span><span>Rituals</span><span>About</span>
            </div>
            <div style={{ background: "#CB997E", color: "#fff", fontSize: 8, padding: "3px 10px", borderRadius: 99, fontFamily: "'Lato', sans-serif" }}>Shop All</div>
          </div>
          <div style={{ display: "flex", height: 110 }}>
            <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg,#F6EEE2,#EDE0CF)" }}>
              <p style={{ fontSize: 9, color: "#CB997E", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: 4 }}>Organic Luxury</p>
              <p style={{ fontSize: 18, color: "#3D3228", lineHeight: 1.1, marginBottom: 8, fontFamily: "'Georgia', serif" }}>Glow From<br/><em style={{ color: "#CB997E" }}>Within.</em></p>
              <div style={{ background: "#3D3228", color: "#fff", fontSize: 8, padding: "4px 12px", borderRadius: 99, fontFamily: "'Lato', sans-serif", display: "inline-block", width: "fit-content" }}>Shop Collection →</div>
            </div>
            <div style={{ width: "45%", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80&fit=crop" alt="skincare" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            </div>
          </div>
          <div style={{ background: "#fff", padding: "10px 12px" }}>
            <p style={{ fontSize: 8, fontFamily: "'Lato', sans-serif", color: "#3D3228", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Best Sellers</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ name: "Glow Serum", price: "$68" }, { name: "Velvet Cream", price: "$94" }, { name: "Dew Mist", price: "$112" }].map(p => (
                <div key={p.name} style={{ flex: 1, borderRadius: 7, overflow: "hidden", background: "#FAF5EE", border: "1px solid #EDE5DC" }}>
                  <div style={{ height: 52, overflow: "hidden" }}>
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80&fit=crop" alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  </div>
                  <div style={{ padding: "5px 7px" }}>
                    <p style={{ fontSize: 7.5, fontFamily: "'Lato', sans-serif", color: "#3D3228", marginBottom: 1 }}>{p.name}</p>
                    <p style={{ fontSize: 9, color: "#CB997E", fontWeight: 700, fontFamily: "'Lato', sans-serif" }}>{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TerraGoldMockup() {
  const GOLD = "#C8961E";
  return (
    <div style={{ background: "#18181B", padding: "8px 8px 0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: "#242427", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px 12px", gap: 8, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}/>
          </div>
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 16px", background: "#FEFCF8", borderBottom: "1px solid #E0D4BE" }}>
            <div style={{ display: "flex", gap: 10, fontSize: 8, color: "#7A6448" }}><span>Collections</span><span>Bespoke</span><span>About</span></div>
            <span style={{ fontSize: 10, color: "#B8942E", letterSpacing: "0.2em", fontWeight: 700 }}>TERRA GOLD</span>
            <div style={{ fontSize: 8, color: "#7A6448" }}>Cart (0)</div>
          </div>
          <div style={{ position: "relative", height: 115 }}>
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&fit=crop" alt="jewelry" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 60%)" }}/>
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center" }}>
              <p style={{ fontSize: 8, color: GOLD, letterSpacing: "0.3em", fontWeight: 700, marginBottom: 3 }}>CRAFTED IN GOLD</p>
              <p style={{ fontSize: 15, color: "#fff", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>Artisan Jewelry</p>
            </div>
          </div>
          <div style={{ background: "#FEFCF8", padding: "10px 12px" }}>
            <p style={{ fontSize: 8, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8, textAlign: "center" }}>New Arrivals</p>
            <div style={{ display: "flex", gap: 7 }}>
              {[{ name: "Gold Hoop", price: "$185" }, { name: "Signet Ring", price: "$340" }, { name: "Teardrop", price: "$285" }, { name: "Gold Cuff", price: "$420" }].map(p => (
                <div key={p.name} style={{ flex: 1, borderRadius: 6, overflow: "hidden", background: "#FAF4EC", border: "1px solid #EDE0C8" }}>
                  <div style={{ height: 38, overflow: "hidden" }}>
                    <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80&fit=crop" alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  </div>
                  <div style={{ padding: "4px 5px" }}>
                    <p style={{ fontSize: 6.5, color: "#5A4A38", marginBottom: 1 }}>{p.name}</p>
                    <p style={{ fontSize: 8, color: GOLD, fontWeight: 700 }}>{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SageAndStoneMockup() {
  const RG = "#C4956A";
  return (
    <div style={{ background: "#18181B", padding: "8px 8px 0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: "#242427", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px 12px", gap: 8, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}/>
          </div>
        </div>
        <div style={{ background: "#FAF5EF" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#fff", borderBottom: "1px solid rgba(196,149,106,0.2)" }}>
            <span style={{ fontSize: 11, color: "#5C4A3A", letterSpacing: "0.1em", fontFamily: "'Georgia', serif" }}>SAGE & STONE</span>
            <div style={{ display: "flex", gap: 12, fontSize: 8, color: "#7A6A58", fontFamily: "'Lato', sans-serif" }}><span>Services</span><span>About</span><span>Book</span></div>
            <div style={{ background: RG, color: "#fff", fontSize: 8, padding: "3px 10px", borderRadius: 99, fontFamily: "'Lato', sans-serif" }}>Book Now</div>
          </div>
          <div style={{ display: "flex", height: 110 }}>
            <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: 8, color: RG, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: 4 }}>Lexington, SC</p>
              <p style={{ fontSize: 17, color: "#3D3228", lineHeight: 1.15, marginBottom: 8, fontFamily: "'Georgia', serif" }}>Rest. Restore.<br/><em style={{ color: RG }}>Renew.</em></p>
              <div style={{ background: RG, color: "#fff", fontSize: 8, padding: "4px 12px", borderRadius: 99, fontFamily: "'Lato', sans-serif", display: "inline-block", width: "fit-content" }}>View Services →</div>
            </div>
            <div style={{ width: "48%", overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80&fit=crop" alt="spa" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            </div>
          </div>
          <div style={{ background: "#fff", padding: "10px 12px" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ name: "Swedish Massage", price: "$95" }, { name: "Hot Stone", price: "$135" }, { name: "Botanical Facial", price: "$115" }].map(s => (
                <div key={s.name} style={{ flex: 1, background: "#FAF5EF", borderRadius: 7, border: `1px solid rgba(196,149,106,0.2)`, padding: "8px 7px" }}>
                  <div style={{ fontSize: 13, marginBottom: 5 }}>✦</div>
                  <p style={{ fontSize: 7.5, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#3D3228", marginBottom: 2 }}>{s.name}</p>
                  <p style={{ fontSize: 9, color: RG, fontWeight: 700, fontFamily: "'Lato', sans-serif" }}>{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeakFormMockup() {
  const AMB = "#E8890C";
  const DARK = "#1C2118";
  return (
    <div style={{ background: "#18181B", padding: "8px 8px 0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: "#242427", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px 12px", gap: 8, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}/>
          </div>
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: DARK, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 700, letterSpacing: "0.12em" }}>PEAK FORM</span>
            <div style={{ display: "flex", gap: 12, fontSize: 8, color: "rgba(255,255,255,0.55)" }}><span>Programs</span><span>Trainers</span><span>Schedule</span></div>
            <div style={{ background: AMB, color: "#fff", fontSize: 8, padding: "3px 10px", borderRadius: 4, fontWeight: 700 }}>Join Now</div>
          </div>
          <div style={{ position: "relative", height: 118 }}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop" alt="gym" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,33,24,0.92) 42%, rgba(28,33,24,0.25) 100%)" }}/>
            <div style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)" }}>
              <p style={{ fontSize: 16, color: "#fff", fontWeight: 900, lineHeight: 1.1, marginBottom: 8, fontFamily: "'Georgia', serif" }}>Train Smarter.<br/>Live Stronger.</p>
              <div style={{ background: AMB, color: "#fff", fontSize: 8, padding: "4px 12px", borderRadius: 4, fontWeight: 700, display: "inline-block" }}>Start Today →</div>
            </div>
          </div>
          <div style={{ display: "flex", background: DARK }}>
            {[{ val: "500+", label: "Members" }, { val: "12", label: "Trainers" }, { val: "5★", label: "Rated" }].map((s, i) => (
              <div key={s.label} style={{ flex: 1, padding: "10px 0", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <p style={{ fontSize: 15, color: AMB, fontWeight: 900, lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloraWellnessMockup() {
  const SG = "#6B705C";
  return (
    <div style={{ background: "#18181B", padding: "8px 8px 0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: "#242427", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "7px 12px", gap: 8, borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }}/>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}/>
          </div>
        </div>
        <div style={{ background: "#E8E8E8" }}>
          <div style={{ background: SG, padding: "12px 16px", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#fff", letterSpacing: "0.25em", fontWeight: 700, fontFamily: "'Lato', sans-serif" }}>FLORA WELLNESS</p>
            <p style={{ fontSize: 7, color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", fontFamily: "'Lato', sans-serif", marginTop: 2 }}>ROOTED IN NATURE</p>
          </div>
          <div style={{ position: "relative", height: 92, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&fit=crop" alt="wellness" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
            <div style={{ position: "absolute", inset: 0, background: "rgba(107,112,92,0.55)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <p style={{ fontSize: 14, color: "#fff", fontFamily: "'Georgia', serif", fontStyle: "italic", textAlign: "center", lineHeight: 1.2 }}>Your Ritual<br/>Starts Here.</p>
              <div style={{ marginTop: 6, background: "#fff", color: SG, fontSize: 8, padding: "4px 14px", borderRadius: 99, fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>Shop the Collection</div>
            </div>
          </div>
          <div style={{ display: "flex", background: "#fff" }}>
            {[{ name: "Calm Ritual Kit", price: "$68" }, { name: "Daily Glow Drops", price: "$52" }].map((p, i) => (
              <div key={p.name} style={{ flex: 1, padding: "10px 12px", borderRight: i === 0 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ height: 55, overflow: "hidden", borderRadius: 6, marginBottom: 6 }}>
                  <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=80&fit=crop" alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                </div>
                <p style={{ fontSize: 8, fontFamily: "'Lato', sans-serif", color: "#3D3228", fontWeight: 700 }}>{p.name}</p>
                <p style={{ fontSize: 7, color: SG, fontFamily: "'Lato', sans-serif" }}>{p.price} · Shop Now →</p>
              </div>
            ))}
          </div>
          <div style={{ background: SG, padding: "7px 16px", textAlign: "center" }}>
            <p style={{ fontSize: 7, color: "rgba(255,255,255,0.55)", fontFamily: "'Lato', sans-serif" }}>© 2024 Flora Wellness · Unsubscribe · Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZenFlowMockup() {
  const RG  = "#C4956A";   // rose gold accent
  const SD  = "#3A4D39";   // sidebar sage dark
  const CR  = "#F5F0E8";   // cream dashboard bg
  const BR  = "#3D3228";   // brown heading text
  const BD  = "#9A8A7A";   // muted body text
  const WH  = "#FFFFFF";   // card white
  const SG  = "#6B705C";   // sage green (booked)
  const SH  = "0 1px 6px rgba(61,50,40,0.09)"; // card shadow

  const navItems = [
    { label: "Dashboard", active: true },
    { label: "Schedule" },
    { label: "Members" },
    { label: "Classes" },
    { label: "Revenue" },
    { label: "Settings" },
  ];

  const stats = [
    { label: "Active Members", val: "284",     badge: "↑ 12 new",   c: "#3DBE72" },
    { label: "Today's Classes", val: "6",      badge: "3 complete",  c: RG        },
    { label: "Monthly Revenue", val: "$12,840", badge: "+18% mtd",  c: "#3DBE72" },
    { label: "Open Bookings",  val: "47",      badge: "⚠ urgent",   c: "#F59E0B" },
  ];

  const classes = [
    { time: "8:00 AM",  name: "Morning Flow Yoga",  dur: "45 min · Studio A", who: "Emma Chen",    n: 12, t: 15, booked: true  },
    { time: "11:00 AM", name: "Pilates Core",        dur: "50 min · Studio B", who: "Jada Williams", n: 8,  t: 10, booked: true  },
    { time: "6:00 PM",  name: "Evening Meditation",  dur: "30 min · Studio A", who: "Maya Patel",   n: 4,  t: 20, booked: false },
  ];

  const members = [
    { name: "Aria Chen",   joined: "May 1",  tier: "Gold",   c: "#C9971A" },
    { name: "Priya Nair",  joined: "Apr 28", tier: "Silver", c: "#8A9890" },
    { name: "Jordan Lee",  joined: "Apr 22", tier: "Bronze", c: "#C4956A" },
  ];

  return (
    <div style={{
      background: "#18181B",
      padding: "8px 8px 0",
      fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
      lineHeight: 1,
    }}>
      {/* ── Browser chrome ── */}
      <div style={{
        background: "#242427",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
      }}>
        {/* URL bar row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 10px",
          background: "#1C1C1F",
          flexShrink: 0,
        }}>
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {["#FF5F57","#FEBC2E","#28C840"].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
            ))}
          </div>
          {/* Avatar chip */}
          <div style={{
            width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg, ${RG}, #D9AA80)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, color: "#fff", fontWeight: 800 }}>S</span>
          </div>
        </div>

        {/* ── App shell ── */}
        <div style={{ display: "flex" }}>

          {/* ── Sidebar ── */}
          <div style={{
            width: 108, background: SD, display: "flex",
            flexDirection: "column", flexShrink: 0, minHeight: 220,
          }}>
            {/* Logo */}
            <div style={{
              padding: "10px 11px 9px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                  background: `linear-gradient(135deg, ${RG} 0%, #D9AA80 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 11 }}>✿</span>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: "rgba(255,255,255,0.92)", letterSpacing: "0.04em" }}>
                  ZenFlow
                </span>
              </div>
            </div>

            {/* Nav */}
            <div style={{ padding: "8px 6px", flex: 1 }}>
              {navItems.map(item => (
                <div key={item.label} style={{
                  padding: "5px 8px", borderRadius: 7, marginBottom: 1,
                  background: item.active ? "rgba(196,149,106,0.18)" : "transparent",
                  borderLeft: `2.5px solid ${item.active ? RG : "transparent"}`,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{
                    fontSize: 9, fontWeight: item.active ? 700 : 400,
                    color: item.active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.36)",
                    letterSpacing: "0.02em",
                  }}>
                    {item.label}
                  </span>
                  {item.active && (
                    <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: RG, opacity: 0.7 }} />
                  )}
                </div>
              ))}
            </div>

            {/* Admin footer */}
            <div style={{
              padding: "7px 11px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #8A9178, #6B705C)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 7, color: "#fff", fontWeight: 800 }}>S</span>
              </div>
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.72)" }}>Studio Admin</div>
                <div style={{ fontSize: 6, color: "rgba(255,255,255,0.28)", marginTop: 1 }}>sarah@zenflow.co</div>
              </div>
            </div>
          </div>

          {/* ── Main content ── */}
          <div style={{ flex: 1, background: CR, padding: "10px 12px 12px", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: BR, letterSpacing: "-0.015em" }}>
                Good morning, Sarah ✦
              </div>
              <div style={{ fontSize: 8, color: BD, marginTop: 2 }}>
                You have 3 classes scheduled today · Mon, May 4
              </div>
            </div>

            {/* Stat cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5,
              marginBottom: 9,
            }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  background: WH, borderRadius: 10, padding: "7px 7px",
                  boxShadow: SH,
                }}>
                  <div style={{
                    fontSize: 5.5, color: BD, fontWeight: 700,
                    letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 3,
                  }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: BR, lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 6, fontWeight: 700, color: s.c, marginTop: 4 }}>
                    {s.badge}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule + Members two-column */}
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 9 }}>

              {/* Today's Schedule */}
              <div>
                <div style={{
                  fontSize: 7, fontWeight: 800, color: BR,
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
                }}>
                  Today's Schedule
                </div>
                {classes.map(cls => (
                  <div key={cls.time} style={{
                    background: WH, borderRadius: 9, padding: "6px 8px",
                    marginBottom: 5, display: "flex", alignItems: "center", gap: 7,
                    borderLeft: `2.5px solid ${cls.booked ? SG : RG}`,
                    boxShadow: SH,
                  }}>
                    <div style={{ flexShrink: 0, width: 44 }}>
                      <div style={{ fontSize: 7, fontWeight: 700, color: cls.booked ? SG : RG }}>
                        {cls.time}
                      </div>
                      <div style={{ fontSize: 5.5, color: BD, marginTop: 1 }}>{cls.dur}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 8, fontWeight: 700, color: BR,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {cls.name}
                      </div>
                      <div style={{ fontSize: 6, color: BD, marginTop: 1 }}>with {cls.who}</div>
                      {/* Progress bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                        <div style={{ height: 3, flex: 1, background: "#E8E2D8", borderRadius: 99 }}>
                          <div style={{
                            height: "100%",
                            width: `${Math.round(cls.n / cls.t * 100)}%`,
                            background: cls.booked ? SG : RG,
                            borderRadius: 99,
                          }} />
                        </div>
                        <span style={{ fontSize: 5.5, color: BD, flexShrink: 0 }}>{cls.n}/{cls.t}</span>
                      </div>
                    </div>
                    {cls.booked ? (
                      <div style={{
                        fontSize: 6, fontWeight: 700, color: SG,
                        background: "#EEF0EB", padding: "2px 6px", borderRadius: 99,
                        flexShrink: 0, whiteSpace: "nowrap",
                      }}>
                        ✓ Booked
                      </div>
                    ) : (
                      <div style={{
                        fontSize: 6, fontWeight: 700, color: WH,
                        background: RG, padding: "2px 6px", borderRadius: 99,
                        flexShrink: 0, whiteSpace: "nowrap",
                      }}>
                        Book →
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recent Members */}
              <div>
                <div style={{
                  fontSize: 7, fontWeight: 800, color: BR,
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
                }}>
                  Recent Members
                </div>
                {members.map(m => (
                  <div key={m.name} style={{
                    background: WH, borderRadius: 9, padding: "6px 8px",
                    marginBottom: 5, display: "flex", alignItems: "center", gap: 6,
                    boxShadow: SH,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: `${m.c}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${m.c}55`,
                    }}>
                      <span style={{ fontSize: 8, fontWeight: 800, color: m.c }}>{m.name[0]}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 7.5, fontWeight: 600, color: BR,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize: 5.5, color: BD, marginTop: 1 }}>Joined {m.joined}</div>
                    </div>
                    <div style={{
                      fontSize: 5.5, fontWeight: 800, color: m.c,
                      background: `${m.c}18`, padding: "2px 5px", borderRadius: 99,
                      border: `1px solid ${m.c}44`, flexShrink: 0,
                    }}>
                      {m.tier}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cedar Dental Mockup ──────────────────────────────────────────────────────
function CedarDentalMockup() {
  return (
    <div style={{ height: 160, overflow: "hidden", position: "relative", background: "#FAFCFB" }}>
      <svg viewBox="0 0 560 265" width="100%" height="160" preserveAspectRatio="xMinYMin meet"
        style={{ display: "block", width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cd_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FAFCFB"/><stop offset="1" stopColor="#EFF6F4"/>
          </linearGradient>
          <radialGradient id="cd_glowR" cx="82%" cy="14%" r="55%">
            <stop offset="0" stopColor="#D5EAE4" stopOpacity="0.75"/>
            <stop offset="1" stopColor="#FAFCFB" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="cd_btn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7FB3A8"/><stop offset="1" stopColor="#9BC5C1"/>
          </linearGradient>
          <linearGradient id="cd_dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2C4541"/><stop offset="1" stopColor="#1F332F"/>
          </linearGradient>
          <clipPath id="cd_drClip">
            <rect x="324" y="66" width="192" height="110" rx="11"/>
          </clipPath>
        </defs>
        {/* Background */}
        <rect width="560" height="350" fill="url(#cd_bg)"/>
        <rect width="560" height="350" fill="url(#cd_glowR)"/>
        {/* Nav */}
        <rect width="560" height="40" fill="rgba(255,255,255,0.92)"/>
        <line x1="0" y1="40" x2="560" y2="40" stroke="#D5E5E2" strokeOpacity="0.55"/>
        <circle cx="30" cy="20" r="10" fill="url(#cd_btn)"/>
        <path d="M25 16 Q25 13 28 12.6 Q29.5 12.6 30 13.4 Q30.5 12.6 32 12.6 Q35 13 35 16 Q35 20 33.4 23 Q32.6 24 32 23.2 Q31.4 22 31.2 20.4 Q31 22 30.4 23 Q29.4 24 28.6 23 Q25 20 25 16 Z" fill="#FFFFFF" opacity="0.96"/>
        <text x="46" y="24" fontSize="10" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Cedar </text>
        <text x="83" y="24" fontSize="10" fontFamily="Georgia, serif" fill="#7FB3A8" fontStyle="italic">Dental Co.</text>
        <text x="296" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Services</text>
        <text x="338" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">About</text>
        <text x="368" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Patients</text>
        <text x="408" y="23.5" fontSize="7.5" fontFamily="Arial" fill="#5A6B68">Contact</text>
        <rect x="448" y="10" width="96" height="20" rx="10" fill="url(#cd_btn)"/>
        <text x="496" y="23.5" fontSize="7" fontFamily="Arial" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">Book a Visit  →</text>
        {/* Hero left copy */}
        <rect x="38" y="62" width="172" height="18" rx="9" fill="#FFFFFF" stroke="#C9DFD9" strokeWidth="0.6"/>
        <text x="48" y="74.5" fontSize="7" fontFamily="Arial" fill="#F4B942" fontWeight="bold">★★★★★</text>
        <text x="120" y="74.5" fontSize="6" fontFamily="Arial" fill="#5A6B68" fontWeight="bold" letterSpacing="0.12em">TRUSTED SINCE 2008</text>
        <text x="38" y="108" fontSize="24" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Modern Dentistry,</text>
        <text x="38" y="138" fontSize="24" fontFamily="Georgia, serif" fill="#7FB3A8" fontStyle="italic">Gentle Care.</text>
        <text x="38" y="162" fontSize="8.5" fontFamily="Arial" fill="#5A6B68" fillOpacity="0.85">Comprehensive family dentistry in a calm, spa-inspired</text>
        <text x="38" y="175" fontSize="8.5" fontFamily="Arial" fill="#5A6B68" fillOpacity="0.85">setting. Same-day appointments available.</text>
        <rect x="38" y="192" width="128" height="26" rx="13" fill="url(#cd_btn)"/>
        <text x="102" y="208.5" fontSize="8" fontFamily="Arial" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="0.04em">Book Appointment  →</text>
        <rect x="174" y="192" width="100" height="26" rx="13" fill="none" stroke="#7FB3A8" strokeWidth="1.3" strokeOpacity="0.5"/>
        <text x="224" y="208.5" fontSize="8" fontFamily="Arial" fill="#2C4541" textAnchor="middle">Our Services</text>
        {/* Doctor card */}
        <rect x="316" y="58" width="208" height="180" rx="16" fill="#FFFFFF" stroke="#D5E5E2" strokeWidth="0.8"/>
        <rect x="324" y="66" width="192" height="110" rx="11" fill="#EBF4F2"/>
        <text x="334" y="80" fontSize="10" fontFamily="Arial" fill="#7FB3A8" opacity="0.55">✦</text>
        <text x="500" y="170" fontSize="9" fontFamily="Arial" fill="#CB997E" opacity="0.55">✦</text>
        <image
          href="https://images.pexels.com/photos/8376309/pexels-photo-8376309.jpeg?auto=compress&cs=tinysrgb&w=400&h=230&fit=crop"
          x="324" y="66" width="192" height="110"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#cd_drClip)"
        />
        <text x="324" y="194" fontSize="9" fontFamily="Georgia, serif" fill="#2C4541" fontWeight="500">Dr. Maya Chen, DDS</text>
        <text x="324" y="206" fontSize="6.5" fontFamily="Arial" fill="#7A8A86">Founder · 15+ years caring for families</text>
        <rect x="324" y="214" width="50" height="14" rx="7" fill="#EBF4F2"/>
        <text x="349" y="223.5" fontSize="6" fontFamily="Arial" fill="#7FB3A8" textAnchor="middle" fontWeight="bold">Cleanings</text>
        <rect x="378" y="214" width="50" height="14" rx="7" fill="#FAF2EE"/>
        <text x="403" y="223.5" fontSize="6" fontFamily="Arial" fill="#CB997E" textAnchor="middle" fontWeight="bold">Whitening</text>
        <rect x="432" y="214" width="62" height="14" rx="7" fill="#EBF4F2"/>
        <text x="463" y="223.5" fontSize="6" fontFamily="Arial" fill="#7FB3A8" textAnchor="middle" fontWeight="bold">Family Care</text>
        {/* Stats strip */}
        <rect x="0" y="270" width="560" height="80" fill="url(#cd_dark)"/>
        <text x="96" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">4.9 ★</text>
        <text x="96" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Google Rating · 1,200+ Reviews</text>
        <line x1="192" y1="282" x2="192" y2="328" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <text x="280" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">Same-Day</text>
        <text x="280" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Emergency Appointments</text>
        <line x1="368" y1="282" x2="368" y2="328" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        <text x="462" y="298" fontSize="20" fontFamily="Georgia, serif" fill="#9BC5C1" textAnchor="middle">15+</text>
        <text x="462" y="313" fontSize="7" fontFamily="Arial" fill="rgba(220,232,229,0.55)" textAnchor="middle">Years Caring for Families</text>
      </svg>
    </div>
  );
}

function Portfolio() {
  const works = [
    {
      mockup: <SageAndStoneMockup />,
      name: "Sage & Stone Spa",
      category: "Spa Landing Page",
      desc: "A serene, conversion-focused landing page for a boutique day spa. Warm ivory aesthetic, service cards, and a frictionless booking CTA that drives real appointments.",
      tech: ["React", "Framer Motion"],
      accent: T.terraLt,
    },
    {
      mockup: <LuminousMockup />,
      name: "Luminous Skin",
      category: "Skincare E-Commerce",
      desc: "A full Shopify store redesign for an organic skincare brand. Clean editorial layout, Klaviyo flows, and a checkout experience that lifted conversion by 34%.",
      tech: ["Shopify", "Klaviyo"],
      accent: T.sandPale,
    },
    {
      mockup: <PeakFormMockup />,
      name: "Peak Form Fitness",
      category: "WordPress Fitness Site",
      desc: "A bold, dark-mode fitness site for an SC-based gym. Built on WordPress with custom blocks, trainer profiles, class scheduling, and a member portal.",
      tech: ["WordPress", "Custom Theme"],
      accent: T.sageXlt,
    },
    {
      mockup: <TerraGoldMockup />,
      name: "Terra Gold",
      category: "Jewelry Store",
      desc: "A cinematic Shopify store for an artisan jewelry label. Dark-luxury aesthetic, custom product configurator, engraving selector, and editorial lookbook.",
      tech: ["Shopify Plus", "React"],
      accent: T.sandPale,
    },
    {
      mockup: <FloraWellnessMockup />,
      name: "Flora Wellness",
      category: "Email Marketing",
      desc: "A full Klaviyo welcome series and campaign system for a wellness brand. Designed 8 automated flows, A/B tested subject lines, and boosted open rates to 44%.",
      tech: ["Klaviyo", "Email Design"],
      accent: T.sageXlt,
    },
    {
      mockup: <ZenFlowMockup />,
      name: "Zen Flow",
      category: "Wellness App Dashboard",
      desc: "A premium web app for a boutique wellness studio. Class booking, a gated member portal, analytics dashboard, and a streaming content library.",
      tech: ["Next.js", "Node.js"],
      accent: T.terraLt,
    },
  ];

  return (
    <section id="work" style={{ padding: "7rem 5%", background: T.linen }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "4rem" }}>
            <div>
              <Label>Featured Works</Label>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: T.brown, marginTop: "1rem", lineHeight: 1.15 }}>
                Work We're{" "}
                <em style={{ color: T.sage, fontStyle: "italic" }}>Proud Of.</em>
              </h2>
            </div>
            <p style={{ fontFamily: SANS, fontWeight: 300, color: T.body, fontSize: "13.5px", maxWidth: 340, lineHeight: 1.8 }}>
              A curated selection of recent builds. Full case studies available upon inquiry.
            </p>
          </div>
        </Reveal>

        <div className="portfolio-grid">
          {works.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.1}>
              <div className="card-hover" style={{
                background: T.white, borderRadius: 20, overflow: "hidden",
                border: `1px solid ${T.border}`, boxShadow: sh.sm,
              }}>
                {w.mockup}
                <div style={{ padding: "1.25rem" }}>
                  <span style={{ fontFamily: SANS, fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: T.terra, fontWeight: 700 }}>
                    {w.category}
                  </span>
                  <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 500, color: T.brown, margin: "0.3rem 0 0.5rem", lineHeight: 1.2 }}>
                    {w.name}
                  </h3>
                  <p style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 300, color: T.body, lineHeight: 1.75, marginBottom: "1rem" }}>
                    {w.desc}
                  </p>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {w.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: SANS, fontSize: "9px", letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "0.25rem 0.65rem",
                        borderRadius: 999, background: w.accent, color: T.sage, fontWeight: 700,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&fit=crop&crop=face",
      name: "Danielle Rogers",
      business: "Velvet Rose Boutique",
      review: "Bryttani completely transformed how my boutique shows up online. My Shopify store went from something I was embarrassed to share to something I'm proud to put on every piece of packaging. The async process was honestly a relief — no calls, just results.",
    },
    {
      photo: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&q=80&fit=crop&crop=face",
      name: "Imani Clarke",
      business: "Clarke Wellness Co.",
      review: "I was nervous investing $2,000 in a website but within 6 weeks of launching my new Shopify store I had already made it back. The Loom walkthroughs kept me in the loop without taking over my schedule. 10/10 would recommend Bloom to every founder I know.",
    },
    {
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face",
      name: "Sofia Mendez",
      business: "Casa Botanica",
      review: "Working with Bloom felt like working with someone who genuinely cared about my brand. She didn't just build a website — she asked the right questions, pushed back when something wasn't serving my vision, and delivered something that felt completely like me.",
    },
    {
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fit=crop&crop=face",
      name: "Ashley Grant",
      business: "Grant & Co. Consulting",
      review: "I needed a custom client portal built fast and Bloom delivered in under 3 weeks. It works exactly how I described it, looks better than I imagined, and my clients have complimented it without me even asking. Worth every penny of the investment.",
    },
    {
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80&fit=crop&crop=face",
      name: "Michelle Tran",
      business: "Tran Skin Studio",
      review: "I came to Bloom with a vision and a tight timeline. Not only did she hit the deadline, she came back with ideas I hadn't even thought of that made the final product so much better. My booking requests doubled in the first month after launch.",
    },
    {
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&q=80&fit=crop&crop=face",
      name: "Kezia Thompson",
      business: "Bloom & Build Co.",
      review: "The investment guide on the website is what won me over before I even reached out. Everything about working with Bloom felt transparent, professional, and intentional. She built us a landing page that converts better than anything we've tried before.",
    },
  ];

  return (
    <section style={{ padding: "7rem 5%", background: T.linenDark }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Label>Client Love</Label>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: T.brown, marginTop: "1rem", lineHeight: 1.15 }}>
              Real Results.{" "}
              <em style={{ color: T.sage, fontStyle: "italic" }}>Real Founders.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontWeight: 300, color: T.body, fontSize: "14px", marginTop: "0.75rem", lineHeight: 1.8 }}>
              Every project is built with intention. Here's what our clients say.
            </p>
          </div>
        </Reveal>

        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="card-hover" style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "1.75rem",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${T.terra}`,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "100%",
              }}>
                {/* Header: photo + name + business */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                    overflow: "hidden", background: "#E8DDD4",
                    border: `2px solid ${T.terraLt}`,
                  }}>
                    <img
                      src={r.photo}
                      alt={r.name}
                      crossOrigin="anonymous"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div>
                    <p style={{ fontFamily: SERIF, fontSize: "16px", fontWeight: 500, color: T.brown, lineHeight: 1.2, marginBottom: "0.2rem" }}>
                      {r.name}
                    </p>
                    <p style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 700, color: T.terra, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {r.business}
                    </p>
                    <p style={{ color: T.terra, fontSize: "13px", marginTop: "0.2rem", letterSpacing: "0.05em" }}>★★★★★</p>
                  </div>
                </div>

                {/* Review text */}
                <p style={{
                  fontFamily: SANS, fontSize: "14px", fontWeight: 300,
                  color: T.body, lineHeight: 1.85,
                  borderTop: `1px solid ${T.border}`,
                  paddingTop: "1rem",
                }}>
                  "{r.review}"
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const svcs = [
    {
      icon: <FileText size={24} color={T.sage} strokeWidth={1.5} />,
      name: "The Landing",
      price: "$1,200",
      tag: "START HERE",
      desc: "A high-converting single page built to turn visitors into leads, clients, or customers. Perfect for product launches, service offers, and powerful first impressions.",
      features: ["Single page, fully responsive", "Conversion-focused structure", "Form & CRM integration", "SEO foundations", "7-day delivery", "1 round of revisions"],
      featured: false,
      bg: T.sageXlt,
      priceColor: T.sage,
    },
    {
      icon: <ShoppingBag size={24} color={T.terra} strokeWidth={1.5} />,
      name: "The Digital Shop",
      price: "$2,000",
      tag: "MOST POPULAR",
      desc: "Custom Shopify strategy, design, and technical build. A full e-commerce experience your customers will love — and that actually converts.",
      features: ["Custom Shopify theme build", "Product & collection setup", "Klaviyo email flows", "Checkout optimization", "10–14 day delivery", "2 rounds of revisions"],
      featured: true,
      bg: T.terraLt,
      priceColor: T.terra,
    },
    {
      icon: <Globe size={24} color={T.sage} strokeWidth={1.5} />,
      name: "The Signature",
      price: "$3,500",
      tag: "FULL PRESENCE",
      desc: "A complete, custom-designed website that positions your brand as the premium option in your space. Built to grow with you.",
      features: ["Up to 8 fully custom pages", "WordPress or Webflow build", "Brand-aligned design system", "Full SEO optimization", "14-day delivery", "3 rounds of revisions"],
      featured: false,
      bg: T.sageXlt,
      priceColor: T.sage,
    },
    {
      icon: <Code2 size={24} color={T.sage} strokeWidth={1.5} />,
      name: "The Custom System",
      price: "$6,000+",
      tag: "TAILORED",
      desc: "Tailor-made web applications and internal dashboards. Complex tools built to scale with your business and solve problems off-the-shelf software never could.",
      features: ["React / Next.js build", "Custom APIs & database", "Client or member portals", "Third-party integrations", "Timeline by project scope", "Dedicated support"],
      featured: false,
      bg: T.sageXlt,
      priceColor: T.sage,
    },
  ];

  return (
    <section id="services" style={{ padding: "7rem 5%", background: T.linenDark }}>
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Label>Services & Pricing</Label>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: T.brown, marginTop: "1rem", lineHeight: 1.15 }}>
              Built for Founders Who{" "}
              <em style={{ color: T.sage, fontStyle: "italic" }}>Mean Business.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontWeight: 300, color: T.body, fontSize: "14px", marginTop: "0.75rem", maxWidth: 460, margin: "0.75rem auto 0", lineHeight: 1.8 }}>
              Transparent pricing, zero surprises. Every project begins with a detailed proposal before work starts.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          alignItems: "start",
        }}>
          {svcs.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div className="card-hover" style={{
                background: T.white,
                borderRadius: 28,
                padding: s.featured ? "2.75rem 2.25rem 2.75rem" : "2.25rem 2rem",
                border: s.featured ? `2px solid ${T.terra}` : `1px solid ${T.border}`,
                boxShadow: s.featured ? sh.xl : sh.sm,
                position: "relative",
                overflow: "hidden",
                marginTop: s.featured ? "-0.75rem" : "0",
                marginBottom: s.featured ? "-0.75rem" : "0",
              }}>
                {s.featured && (
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    background: T.terra, color: "#fff",
                    padding: "0.4rem 1.2rem",
                    borderRadius: "0 28px 0 16px",
                    fontFamily: SANS, fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                  }}>
                    {s.tag}
                  </div>
                )}

                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: s.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  {s.icon}
                </div>

                {!s.featured && (
                  <span style={{
                    fontFamily: SANS, fontSize: "10px", letterSpacing: "0.14em",
                    textTransform: "uppercase", color: T.sage, fontWeight: 700,
                    display: "block", marginBottom: "0.35rem",
                  }}>
                    {s.tag}
                  </span>
                )}

                <h3 style={{ fontFamily: SERIF, fontSize: "1.3rem", fontWeight: 500, color: T.brown, marginBottom: "0.3rem", lineHeight: 1.2 }}>
                  {s.name}
                </h3>
                <div style={{ fontFamily: SERIF, fontSize: "2.1rem", fontWeight: 500, color: s.priceColor, margin: "0.5rem 0 0.15rem" }}>
                  {s.price}
                </div>
                <div style={{ fontFamily: SANS, fontSize: "11px", color: T.body, opacity: 0.6, letterSpacing: "0.06em", marginBottom: "1rem" }}>
                  one-time investment
                </div>

                <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 300, color: T.body, lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  {s.desc}
                </p>

                <ul style={{ listStyle: "none", marginBottom: "1.75rem" }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: SANS, fontSize: "12.5px", fontWeight: 300, color: T.body, marginBottom: "0.5rem" }}>
                      <Check size={12} color={T.terra} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
                  textDecoration: "none",
                  background: s.featured ? T.terra : "transparent",
                  color: s.featured ? "#fff" : T.sage,
                  border: `2px solid ${s.featured ? T.terra : T.sage}`,
                  padding: "0.8rem 1.25rem", borderRadius: 999,
                  fontFamily: SANS, fontSize: "12.5px", fontWeight: 700,
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.featured ? T.terraDark : T.sageXlt; e.currentTarget.style.borderColor = s.featured ? T.terraDark : T.sage; }}
                  onMouseLeave={e => { e.currentTarget.style.background = s.featured ? T.terra : "transparent"; e.currentTarget.style.borderColor = s.featured ? T.terra : T.sage; }}
                >
                  Start This Project <ArrowRight size={13} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
function InquiryForm() {
  const [form, setForm] = useState({
    name: "", email: "", industry: "", goal: "", budget: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const fieldStyle = {
    width: "100%", padding: "0.95rem 1.2rem",
    border: `1.5px solid ${T.border}`,
    borderRadius: 14, background: T.linen,
    fontFamily: SANS, fontSize: "14px", fontWeight: 300, color: T.brown,
    transition: "border-color 0.2s",
    appearance: "none",
  };
  const labelStyle = {
    display: "block", fontFamily: SANS, fontSize: "10px", fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase", color: T.sage,
    marginBottom: "0.45rem",
  };
  const focus = e => e.target.style.borderColor = T.terra;
  const blur  = e => e.target.style.borderColor = T.border;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xjglrwzr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "7rem 5%", background: T.sageXlt }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <Label>The Bloom Inquiry</Label>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: T.brown, marginTop: "1rem", lineHeight: 1.15 }}>
              Let's Make Something{" "}
              <em style={{ color: T.terra, fontStyle: "italic" }}>Beautiful.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontWeight: 300, color: T.body, fontSize: "14px", marginTop: "0.75rem", lineHeight: 1.8 }}>
              Tell me about your vision. I read every inquiry personally and respond within 24 hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div style={{ background: T.white, borderRadius: 32, padding: "4rem 3rem", textAlign: "center", boxShadow: sh.lg }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.terraLt, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Flower2 size={28} color={T.terra} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.8rem", fontWeight: 500, color: T.brown, marginBottom: "0.75rem" }}>
                Thank you, {form.name.split(" ")[0] || "Founder"}!
              </h3>
              <p style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 300, color: T.body, lineHeight: 1.8 }}>
                Your inquiry is in bloom. I'll reply within 24 hours with a personal Loom walkthrough of how we'll bring your vision to life.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              style={{ background: T.white, borderRadius: 32, padding: "3rem", boxShadow: sh.md, display: "flex", flexDirection: "column", gap: "1.4rem" }}
            >
              {/* Row 1 — Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input name="name" style={fieldStyle} placeholder="First name" value={form.name} onChange={e => set("name", e.target.value)} required onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input name="email" style={fieldStyle} type="email" placeholder="Where should I reach you?" value={form.email} onChange={e => set("email", e.target.value)} required onFocus={focus} onBlur={blur} />
                </div>
              </div>

              {/* Industry */}
              <div>
                <label style={labelStyle}>Industry</label>
                <select name="industry" style={fieldStyle} value={form.industry} onChange={e => set("industry", e.target.value)} required onFocus={focus} onBlur={blur}>
                  <option value="" disabled>What industry are you in?</option>
                  {[
                    "Beauty & Skincare",
                    "Fashion & Apparel",
                    "Health & Wellness",
                    "Food & Beverage",
                    "Home & Lifestyle",
                    "Coaching & Consulting",
                    "Fitness & Sports",
                    "Jewelry & Accessories",
                    "Event Planning",
                    "Real Estate",
                    "Other",
                  ].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* Project Goal */}
              <div>
                <label style={labelStyle}>Project Goal</label>
                <textarea name="goal" style={{ ...fieldStyle, minHeight: 120, resize: "vertical" }}
                  placeholder="What are you trying to accomplish? (e.g. launch a new product, grow email subscribers, replace an outdated site...)"
                  value={form.goal} onChange={e => set("goal", e.target.value)} required onFocus={focus} onBlur={blur}
                />
              </div>

              {/* Budget */}
              <div>
                <label style={labelStyle}>Budget</label>
                <select name="budget" style={fieldStyle} value={form.budget} onChange={e => set("budget", e.target.value)} required onFocus={focus} onBlur={blur}>
                  <option value="" disabled>What's your investment range?</option>
                  {[
                    "Under $1,000",
                    "$1,000 – $2,000",
                    "$2,000 – $4,000",
                    "$4,000 – $6,000",
                    "$6,000+",
                    "Not sure yet",
                  ].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>

              <button type="submit" disabled={sending} style={{
                background: sending ? T.sand : T.terra, color: "#fff", border: "none", cursor: sending ? "default" : "pointer",
                borderRadius: 999, padding: "1.1rem 2rem",
                fontFamily: SANS, fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                boxShadow: sh.md, marginTop: "0.25rem", transition: "background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { if (!sending) { e.currentTarget.style.background = T.terraDark; e.currentTarget.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={e => { e.currentTarget.style.background = sending ? T.sand : T.terra; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {sending ? "Sending…" : "Send My Inquiry"} {!sending && <Flower2 size={16} />}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: T.brown, padding: "2.5rem 5%",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Flower2 size={18} color={T.terra} strokeWidth={1.5} />
        <span style={{ fontFamily: SERIF, fontSize: "1.1rem", color: T.sandPale, letterSpacing: "0.03em" }}>
          Bloom Digital
        </span>
      </div>
      <p style={{ fontFamily: SANS, fontSize: "11.5px", color: "rgba(245,237,216,0.45)", letterSpacing: "0.05em", textAlign: "center" }}>
        © 2026 Bloom · A division of Bloom Property Solutions LLC · Based in Lexington, SC
      </p>
      <a href="mailto:hello@ohbloom.com" style={{
        display: "flex", alignItems: "center", gap: "0.45rem",
        textDecoration: "none", color: "rgba(245,237,216,0.55)",
        fontFamily: SANS, fontSize: "13px", fontWeight: 300,
      }}
        onMouseEnter={e => e.currentTarget.style.color = T.terra}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(245,237,216,0.55)"}
      >
        <Mail size={14} /> hello@ohbloom.com
      </a>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Marquee />
      <AsyncMethod />
      <Portfolio />
      <Testimonials />
      <Services />
      <InquiryForm />
      <Footer />
    </>
  );
}
