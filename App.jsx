/**
 * B. Patterson — Freelance Web Dev Landing Page
 * ─────────────────────────────────────────────
 * Stack: React + Tailwind CSS + Framer Motion + Lucide React
 *
 * SETUP CHECKLIST (run once in your project):
 *   npm install framer-motion lucide-react
 *
 * Add to your index.html <head>:
 *   <link
 *     href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700&display=swap"
 *     rel="stylesheet"
 *   />
 *
 * Wire up the contact form in the handleSubmit() function:
 *   → Formspree, Netlify Forms, or your own API endpoint.
 *
 * To update portfolio images: replace the `image` URLs in
 *   the `portfolioItems` array below with your own mockup URLs.
 */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  Video,
  Clock,
  CheckCircle,
  ShoppingBag,
  Code2,
  Zap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────
// DESIGN TOKENS  (edit here to re-theme the whole site)
// ─────────────────────────────────────────────
const C = {
  bg: "#FAF9F6",          // linen / cream
  bgAlt: "#F2EDE8",       // warm off-white (used for alternating sections)
  dark: "#1E2733",        // deep charcoal (footer / dark section bg)
  text: "#2D3748",        // slate grey (primary body text)
  rose: "#E2A9BE",        // dusty rose (primary accent)
  roseMuted: "#F7E4ED",   // light rose (chip / icon bg)
  sage: "#A3B18A",        // sage green (secondary accent)
  sageMuted: "#DDE8D4",   // light sage (chip / icon bg)
  border: "#E4DED6",      // warm border
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";

// ─────────────────────────────────────────────
// ANIMATION PRIMITIVES
// ─────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

/** Wraps children in a stagger container that fires once the section enters view. */
function FadeSection({ children, className = "" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Single animated child — must be a direct child of FadeSection. */
function FI({ children, className = "" }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Work",     href: "#work"     },
    { label: "Services", href: "#services" },
    { label: "Process",  href: "#process"  },
    { label: "Pricing",  href: "#pricing"  },
  ];

  return (
    <header
      style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}`, fontFamily: SANS }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#" style={{ fontFamily: SERIF, color: C.text }} className="text-xl font-bold tracking-tight select-none">
          B. Patterson<span style={{ color: C.rose }}>.</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{ color: C.text }}
              className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            style={{ backgroundColor: C.rose, color: "#fff", fontFamily: SANS }}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            Inquire
            <ArrowRight size={14} />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: C.text }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }} className="md:hidden px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: C.text, fontFamily: SANS }}
                className="text-base font-medium opacity-70"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{ backgroundColor: C.rose, color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-full mt-2"
            >
              Inquire About Your Project <ArrowRight size={15} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{ backgroundColor: C.bg, fontFamily: SANS }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20"
    >
      <FadeSection className="max-w-4xl mx-auto w-full">
        {/* Availability badge */}
        <FI>
          <div className="flex justify-center mb-8">
            <span
              style={{ backgroundColor: C.roseMuted, color: C.rose }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Available for Q3 Projects
            </span>
          </div>
        </FI>

        {/* Main headline */}
        <FI>
          <h1
            style={{ fontFamily: SERIF, color: C.text }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            Bespoke Web Development
            <br />
            <em style={{ color: C.rose }} className="italic">for Visionary</em>
            <br />
            Female Founders.
          </h1>
        </FI>

        {/* Subtitle */}
        <FI>
          <p
            style={{ color: C.text }}
            className="text-lg md:text-xl opacity-65 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            High-converting Shopify stores and custom web apps built for your lifestyle —
            your vision, brought to life with intention and craft.
          </p>
        </FI>

        {/* CTAs */}
        <FI>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              style={{ backgroundColor: C.rose, color: "#fff" }}
              className="flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Inquire About Your Project
              <ArrowRight size={18} />
            </a>
            <a
              href="#work"
              style={{ color: C.text }}
              className="flex items-center gap-2 text-base font-medium opacity-55 hover:opacity-90 transition-opacity"
            >
              View Featured Work
              <ChevronDown size={16} />
            </a>
          </div>
        </FI>
      </FadeSection>

      {/* Stats strip */}
      <FadeSection className="mt-20 w-full max-w-2xl mx-auto">
        <FI>
          <div
            style={{ borderColor: C.border }}
            className="border rounded-2xl px-6 py-6 grid grid-cols-3 gap-4"
          >
            {[
              { val: "30+",  label: "Projects Delivered" },
              { val: "42%",  label: "Avg. Revenue Lift"  },
              { val: "8+",   label: "Years in Craft"     },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p style={{ fontFamily: SERIF, color: C.text }} className="text-3xl md:text-4xl font-bold">
                  {val}
                </p>
                <p style={{ color: C.text }} className="text-xs md:text-sm opacity-45 mt-1 leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </FI>
      </FadeSection>
    </section>
  );
}

// ─────────────────────────────────────────────
// ASYNC-FIRST COLLABORATION (Work-Life Advantage)
// ─────────────────────────────────────────────
const asyncPillars = [
  {
    icon: MessageSquare,
    title: "Slack-First Communication",
    desc: "All project updates, decisions, and feedback happen asynchronously via Slack — no surprise calls, ever. Your questions get a thoughtful reply, not a rushed answer during a meeting.",
    color: C.rose,
    muted: C.roseMuted,
  },
  {
    icon: Video,
    title: "Loom Video Walkthroughs",
    desc: "I record Loom videos to walk you through every milestone — so you can review new features on your own schedule, pause, rewind, and share with your team without arranging a call.",
    color: C.sage,
    muted: C.sageMuted,
  },
  {
    icon: Clock,
    title: "Deep-Work Delivery",
    desc: "My best code is written in focused, uninterrupted blocks — not between back-to-back Zooms. Protected deep-work time means faster turnaround and fewer revisions for you.",
    color: C.rose,
    muted: C.roseMuted,
  },
  {
    icon: CheckCircle,
    title: "Transparent Milestone Tracking",
    desc: "Every project runs on a shared Notion board. You'll always know exactly what's in progress, what's shipped, and what's coming — without needing to ask for an update.",
    color: C.sage,
    muted: C.sageMuted,
  },
];

function AsyncFirst() {
  return (
    <section
      id="process"
      style={{ backgroundColor: C.bgAlt, fontFamily: SANS }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          {/* Section label + heading */}
          <FI className="mb-14 max-w-2xl">
            <p style={{ color: C.rose }} className="text-xs font-bold tracking-widest uppercase mb-3">
              The Collaboration Model
            </p>
            <h2 style={{ fontFamily: SERIF, color: C.text }} className="text-4xl md:text-5xl font-bold mb-5">
              Async-First Collaboration.
            </h2>
            <p style={{ color: C.text }} className="text-lg opacity-60 leading-relaxed">
              I've designed my entire workflow around respecting your time. No phone tag,
              no schedule tetris — just clear, documented progress that fits into
              your founder lifestyle.
            </p>
          </FI>

          {/* 2×2 pillar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {asyncPillars.map(({ icon: Icon, title, desc, color, muted }) => (
              <FI key={title}>
                <div
                  style={{ backgroundColor: C.bg, borderColor: C.border }}
                  className="border rounded-2xl p-6 h-full"
                >
                  <div
                    style={{ backgroundColor: muted, color }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  >
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontFamily: SERIF, color: C.text }} className="text-lg font-bold mb-2">
                    {title}
                  </h3>
                  <p style={{ color: C.text }} className="text-sm opacity-60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FI>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────
/**
 * PORTFOLIO DATA — swap `image` URLs with your actual mockup screenshots.
 * Recommended size: 1200×800px, hosted on Cloudinary or your CDN.
 */
const portfolioItems = [
  {
    title:    "The Botanist Collective",
    category: "Shopify · Brand Identity",
    goals:    "Redesigned the full store experience to increase AOV and reduce cart abandonment for a botanical skincare brand targeting wellness-conscious women.",
    tech:     ["Shopify", "Liquid", "Klaviyo"],
    image:    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=540&fit=crop",
    result:   "+68% CVR",
  },
  {
    title:    "Bloom & Build Academy",
    category: "Next.js · LMS Platform",
    goals:    "Custom learning management system for a business coach with 3,000+ students — course gating, progress tracking, and a private community hub.",
    tech:     ["Next.js", "Supabase", "Stripe"],
    image:    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=540&fit=crop",
    result:   "3k+ users",
  },
  {
    title:    "Maison Doux",
    category: "Shopify Plus · Subscription",
    goals:    "Subscription box platform for a luxury candle brand, with gifting flows, pause/cancel UX, and a custom unboxing reveal page that delights on every delivery.",
    tech:     ["Shopify Plus", "ReCharge", "Claude AI"],
    image:    "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&h=540&fit=crop",
    result:   "$200k MRR",
  },
];

/**
 * PortfolioCard — update `image` prop here to swap mock-ups.
 * Everything else (title, goals, tech, result) comes from portfolioItems[].
 */
function PortfolioCard({ title, category, goals, tech, image, result }) {
  return (
    <div
      style={{ borderColor: C.border }}
      className="border rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
    >
      {/* Mockup image — REPLACE src with your own screenshot */}
      <div className="relative aspect-[3/2] overflow-hidden" style={{ backgroundColor: C.bgAlt }}>
        <img
          src={image}
          alt={`${title} project mockup`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span
          style={{ backgroundColor: C.rose, color: "#fff" }}
          className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
        >
          {result}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1" style={{ fontFamily: SANS }}>
        <p style={{ color: C.sage }} className="text-xs font-bold tracking-widest uppercase mb-1">
          {category}
        </p>
        <h3 style={{ fontFamily: SERIF, color: C.text }} className="text-xl font-bold mb-3">
          {title}
        </h3>
        <p style={{ color: C.text }} className="text-sm opacity-60 leading-relaxed mb-5 flex-1">
          <strong className="font-semibold opacity-90">Project Goals: </strong>
          {goals}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              style={{ backgroundColor: C.sageMuted, color: "#4a7040" }}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <section
      id="work"
      style={{ backgroundColor: C.bg, fontFamily: SANS }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          <FI className="mb-14">
            <p style={{ color: C.sage }} className="text-xs font-bold tracking-widest uppercase mb-3">
              Featured Work
            </p>
            <h2 style={{ fontFamily: SERIF, color: C.text }} className="text-4xl md:text-5xl font-bold">
              Built with intention.
            </h2>
          </FI>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <FI key={item.title}>
                <PortfolioCard {...item} />
              </FI>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
const services = [
  {
    number: "01",
    icon:   ShoppingBag,
    title:  "Shopify Strategy & Design",
    desc:   "End-to-end Shopify store builds engineered for conversions. From custom theme development to app integrations and CRO audits — your store will be fast, beautiful, and built to sell.",
    includes: [
      "Custom Shopify Theme Development",
      "Conversion Rate Optimization (CRO)",
      "Email & SMS Flow Integration",
      "Product Page & Checkout UX",
      "App Integration & Automation",
    ],
    accent: C.rose,
    muted:  C.roseMuted,
  },
  {
    number: "02",
    icon:   Code2,
    title:  "Custom Web Applications",
    desc:   "When your business needs something no template can solve. I build bespoke Next.js applications that automate processes, delight users, and scale gracefully as you grow.",
    includes: [
      "Next.js & React Development",
      "Supabase / PostgreSQL Backends",
      "Third-Party API Integrations",
      "AI-Powered Features (Claude API)",
      "Membership & Subscription Platforms",
    ],
    accent: C.sage,
    muted:  C.sageMuted,
  },
];

function Services() {
  return (
    <section
      id="services"
      style={{ backgroundColor: C.bgAlt, fontFamily: SANS }}
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <FadeSection>
          <FI className="mb-14">
            <p style={{ color: C.rose }} className="text-xs font-bold tracking-widest uppercase mb-3">
              Services
            </p>
            <h2 style={{ fontFamily: SERIF, color: C.text }} className="text-4xl md:text-5xl font-bold">
              What I build for you.
            </h2>
          </FI>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ number, icon: Icon, title, desc, includes, accent, muted }) => (
              <FI key={title}>
                <div
                  style={{ backgroundColor: C.bg, borderColor: C.border }}
                  className="border rounded-2xl p-8 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div style={{ backgroundColor: muted, color: accent }} className="w-12 h-12 rounded-xl flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <span style={{ color: accent, fontFamily: SERIF }} className="text-4xl font-bold opacity-20">
                      {number}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: SERIF, color: C.text }} className="text-2xl font-bold mb-3">
                    {title}
                  </h3>
                  <p style={{ color: C.text }} className="text-sm opacity-60 leading-relaxed mb-6 flex-1">
                    {desc}
                  </p>

                  <ul className="space-y-2.5">
                    {includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5" style={{ color: C.text }}>
                        <CheckCircle size={14} style={{ color: accent, flexShrink: 0 }} />
                        <span className="text-sm opacity-70">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    style={{ color: accent }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-7 hover:gap-3 transition-all"
                  >
                    Start a Project <ArrowRight size={15} />
                  </a>
                </div>
              </FI>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROJECT CALCULATOR
// ─────────────────────────────────────────────
const projectTypes = [
  {
    id:       "store",
    label:    "Store Setup",
    icon:     ShoppingBag,
    range:    "$1,500 – $3,500",
    timeline: "2 – 4 weeks",
    desc:     "A fully configured, conversion-optimized Shopify store — theme setup, product configuration, essential apps, and a launch-ready experience.",
    includes: ["Theme setup & customization", "Up to 50 products configured", "Payment & shipping setup", "2 rounds of revisions"],
  },
  {
    id:       "integration",
    label:    "Custom Integration",
    icon:     Zap,
    range:    "$2,500 – $5,000",
    timeline: "3 – 6 weeks",
    desc:     "Third-party API connections, advanced Shopify customizations, automation flows, or AI-powered features added to an existing site.",
    includes: ["API integration & testing", "Custom Liquid / React code", "QA across devices", "Handoff documentation"],
  },
  {
    id:       "webapp",
    label:    "Web App",
    icon:     Code2,
    range:    "$5,000+",
    timeline: "6 – 12 weeks",
    desc:     "A fully bespoke Next.js application — from MVP to production-ready — with database, auth, payments, and everything your vision requires.",
    includes: ["Discovery & architecture", "Full-stack development", "Supabase DB & auth", "Deployment & launch support"],
  },
];

function Calculator() {
  const [selected, setSelected] = useState("store");
  const current = projectTypes.find((p) => p.id === selected);

  return (
    <section
      id="pricing"
      style={{ backgroundColor: C.bg, fontFamily: SANS }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <FadeSection>
          {/* Heading */}
          <FI className="text-center mb-12">
            <p style={{ color: C.sage }} className="text-xs font-bold tracking-widest uppercase mb-3">
              Investment
            </p>
            <h2 style={{ fontFamily: SERIF, color: C.text }} className="text-4xl md:text-5xl font-bold mb-4">
              Project Calculator
            </h2>
            <p style={{ color: C.text }} className="text-base opacity-60 max-w-md mx-auto">
              Select your project type below to see a ballpark investment range.
              Every project is scoped individually — these are starting points.
            </p>
          </FI>

          <FI>
            {/* Type selector */}
            <div
              style={{ backgroundColor: C.bgAlt }}
              className="flex rounded-2xl p-1.5 mb-6 gap-1"
            >
              {projectTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  style={{
                    backgroundColor: selected === id ? C.rose : "transparent",
                    color: selected === id ? "#fff" : C.text,
                    fontFamily: SANS,
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  <Icon size={16} />
                  <span className="hidden xs:inline sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* Result card */}
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ borderColor: C.border }}
                className="border rounded-2xl p-8"
              >
                {/* Price + timeline row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-6">
                  <div>
                    <p style={{ color: C.text }} className="text-xs font-semibold opacity-50 uppercase tracking-widest mb-1">
                      Starting Investment
                    </p>
                    <p style={{ fontFamily: SERIF, color: C.text }} className="text-4xl md:text-5xl font-bold">
                      {current.range}
                    </p>
                  </div>
                  <div style={{ backgroundColor: C.roseMuted }} className="rounded-xl px-5 py-3 text-center self-start">
                    <p style={{ color: C.text }} className="text-xs opacity-50 uppercase tracking-wider mb-0.5">
                      Est. Timeline
                    </p>
                    <p style={{ color: C.rose, fontFamily: SERIF }} className="text-xl font-bold">
                      {current.timeline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: C.text }} className="text-base opacity-65 leading-relaxed mb-6">
                  {current.desc}
                </p>

                {/* Includes list */}
                <div style={{ borderColor: C.border }} className="border-t pt-5 mb-7">
                  <p style={{ color: C.text }} className="text-xs font-bold tracking-widest uppercase opacity-50 mb-3">
                    Typically Includes
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {current.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2" style={{ color: C.text }}>
                        <CheckCircle size={13} style={{ color: C.sage, flexShrink: 0 }} />
                        <span className="text-sm opacity-65">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  style={{ backgroundColor: C.rose, color: "#fff" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Inquire About This Project <ArrowRight size={15} />
                </a>
              </motion.div>
            )}
          </FI>
        </FadeSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────
const budgetOptions   = ["Under $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"];
const businessOptions = ["E-commerce / Retail", "Coaching / Education", "SaaS / Tech", "Wellness / Beauty", "Creative Studio", "Consulting", "Other"];

const inputBase = {
  backgroundColor: "rgba(255,255,255,0.07)",
  borderColor:     "rgba(255,255,255,0.15)",
  color:           "#fff",
  fontFamily:      SANS,
};

function Contact() {
  const [form, setForm]       = useState({ name: "", business: "", budget: "", vision: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ── Wire up to your backend here ──────────────────────────
    // Example Formspree:  await fetch("https://formspree.io/f/YOUR_ID", { method:"POST", body: JSON.stringify(form) })
    // Example Netlify:    form action="/" data-netlify="true"
    // ──────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: C.dark, fontFamily: SANS }}
      className="py-24 px-6"
    >
      <div className="max-w-xl mx-auto">
        <FadeSection>
          {/* Heading */}
          <FI className="text-center mb-12">
            <p style={{ color: C.rose }} className="text-xs font-bold tracking-widest uppercase mb-3">
              Let's Work Together
            </p>
            <h2
              style={{ fontFamily: SERIF }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Tell Me About
              <br />
              Your Vision.
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              I take on a limited number of projects each quarter. Apply below
              and I'll respond within 48 hours.
            </p>
          </FI>

          <FI>
            {submitted ? (
              /* Success state */
              <div
                style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
                className="border rounded-2xl p-12 text-center"
              >
                <div style={{ backgroundColor: C.roseMuted, color: C.rose }} className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={28} />
                </div>
                <h3 style={{ fontFamily: SERIF }} className="text-2xl font-bold text-white mb-2">
                  Message Received!
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  Thank you for sharing your vision. I'll review your project and
                  be in touch within 48 hours.
                </p>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}
                className="border rounded-2xl p-8 space-y-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    required
                    placeholder="Jane Smith"
                    style={inputBase}
                    className="w-full border rounded-xl px-4 py-3 text-sm placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#E2A9BE]"
                  />
                </div>

                {/* Business type */}
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-2">Business Type *</label>
                  <select
                    value={form.business}
                    onChange={update("business")}
                    required
                    style={{ ...inputBase, backgroundColor: "#2a3545" }}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E2A9BE]"
                  >
                    <option value="" disabled style={{ color: "#888" }}>Select your business type</option>
                    {businessOptions.map((b) => (
                      <option key={b} value={b} style={{ color: C.text, backgroundColor: "#fff" }}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Budget toggle grid */}
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-3">Budget Range *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setForm((prev) => ({ ...prev, budget: b }))}
                        style={{
                          backgroundColor: form.budget === b ? C.rose          : "rgba(255,255,255,0.07)",
                          borderColor:     form.budget === b ? C.rose          : "rgba(255,255,255,0.15)",
                          color:           "#fff",
                        }}
                        className="border rounded-xl py-2.5 px-3 text-xs font-semibold text-center transition-all"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vision textarea */}
                <div>
                  <label className="block text-white/65 text-sm font-medium mb-2">Your Vision *</label>
                  <textarea
                    value={form.vision}
                    onChange={update("vision")}
                    required
                    rows={5}
                    placeholder="Tell me about your project, your goals, and what success looks like for you..."
                    style={inputBase}
                    className="w-full border rounded-xl px-4 py-3 text-sm placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#E2A9BE] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !form.budget}
                  style={{ backgroundColor: C.rose }}
                  className="w-full py-4 rounded-full text-white font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Sending…</span>
                  ) : (
                    <>Send My Vision <ArrowRight size={18} /></>
                  )}
                </button>

                <p className="text-center text-white/30 text-xs">
                  No cold outreach. No spam. I'll only respond to your inquiry.
                </p>
              </form>
            )}
          </FI>
        </FadeSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: "#141c27", fontFamily: SANS }}
      className="py-10 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily: SERIF, color: "rgba(255,255,255,0.5)" }} className="text-base font-bold">
          B. Patterson<span style={{ color: C.rose }}>.</span>
        </span>

        <p style={{ color: "rgba(255,255,255,0.3)" }} className="text-xs text-center">
          Bespoke Web Development for Female Founders · © {year}
        </p>

        <a
          href="#contact"
          style={{ color: C.rose }}
          className="text-xs font-semibold hover:opacity-70 transition-opacity"
        >
          Inquire About Your Project →
        </a>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/*
        ── Google Fonts loader ─────────────────────────────────────────────
        Paste this into your index.html <head> (before </head>):

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        ────────────────────────────────────────────────────────────────────
      */}
      <div style={{ fontFamily: SANS, backgroundColor: C.bg }}>
        <Nav />
        <main>
          <Hero />
          <AsyncFirst />
          <Portfolio />
          <Services />
          <Calculator />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
