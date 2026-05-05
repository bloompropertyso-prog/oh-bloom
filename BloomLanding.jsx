import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Video,
  ShoppingBag,
  Code2,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Instagram,
  ExternalLink,
  Flower2,
  Clock,
  Heart,
} from "lucide-react";

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const CREAM    = "#FAF9F6";
const SLATE    = "#2D3748";
const ROSE     = "#C9A0A0";   // dusty rose accent
const ROSE_LT  = "#F0E4E4";   // rose tint for backgrounds
const SAGE     = "#9BAF8E";   // secondary sage accent
const SAGE_LT  = "#EDF2EB";   // sage tint
const BORDER   = "#E8E2DA";

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Services", "Work", "Pricing", "Contact"];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md border-b"
      style={{
        background: "rgba(250,249,246,0.88)",
        borderColor: BORDER,
      }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2">
        <Flower2 size={22} style={{ color: ROSE }} />
        <span
          className="text-xl tracking-widest uppercase font-light"
          style={{ color: SLATE, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "0.18em" }}
        >
          Bloom
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-sm tracking-wider uppercase transition-colors"
            style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.75 }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.75)}
          >
            {l}
          </a>
        ))}
        <a
          href="#contact"
          className="text-sm px-5 py-2 rounded-full tracking-wider uppercase transition-all"
          style={{
            background: ROSE,
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.1em",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#B8898A")}
          onMouseLeave={(e) => (e.target.style.background = ROSE)}
        >
          Let's Work
        </a>
      </div>

      {/* Mobile Burger */}
      <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: SLATE }}>
        <div className="w-6 flex flex-col gap-1.5">
          <span className="block h-px w-full" style={{ background: SLATE }} />
          <span className="block h-px w-4" style={{ background: SLATE }} />
          <span className="block h-px w-full" style={{ background: SLATE }} />
        </div>
      </button>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 flex flex-col items-center gap-6 py-8 border-b"
          style={{ background: CREAM, borderColor: BORDER }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase"
              style={{ color: SLATE }}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="px-6 py-2 rounded-full text-sm tracking-wider uppercase"
            style={{ background: ROSE, color: "#fff" }}
          >
            Let's Work
          </a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 relative overflow-hidden"
      style={{ background: CREAM }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${ROSE} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-15"
        style={{ background: `radial-gradient(circle, ${SAGE} 0%, transparent 70%)`, transform: "translate(-40%, 40%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl relative z-10"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="h-px w-10" style={{ background: ROSE }} />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
          >
            Bloom Digital Studio
          </span>
          <span className="h-px w-10" style={{ background: ROSE }} />
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl font-light leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: SLATE,
            letterSpacing: "-0.01em",
          }}
        >
          Helping Visionary{" "}
          <em style={{ color: ROSE, fontStyle: "italic" }}>Female Founders</em>
          <br />
          Bloom Online.
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.7 }}
        >
          Bespoke Shopify stores and custom web applications built for growth
          and lifestyle. No chaos. No cold meetings. Just beautiful, strategic
          work.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all"
            style={{
              background: SLATE,
              color: CREAM,
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ROSE)}
            onMouseLeave={(e) => (e.currentTarget.style.background = SLATE)}
          >
            Start Your Project <ArrowRight size={15} />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase border transition-all"
            style={{
              borderColor: BORDER,
              color: SLATE,
              fontFamily: "Inter, sans-serif",
            }}
          >
            View Our Work
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={20} style={{ color: ROSE, opacity: 0.6 }} />
      </motion.div>
    </section>
  );
}

// ─── Async Edge ───────────────────────────────────────────────────────────────
function AsyncEdge() {
  const pillars = [
    {
      icon: <MessageSquare size={20} style={{ color: ROSE }} />,
      title: "Slack-First Communication",
      body: "Every question, update, and decision lives in a shared Slack channel — organized, searchable, and never lost in an email chain.",
    },
    {
      icon: <Video size={20} style={{ color: ROSE }} />,
      title: "Loom for Feedback",
      body: "Instead of a 60-minute call, we send a 5-minute Loom. You review it on your schedule, and we keep building — momentum never stops.",
    },
    {
      icon: <Clock size={20} style={{ color: ROSE }} />,
      title: "Respect for Deep Work",
      body: "Our studio is built around protected creative blocks. This focus is the reason our work is exceptional — and why our timelines hold.",
    },
    {
      icon: <Heart size={20} style={{ color: ROSE }} />,
      title: "Family-First Studio",
      body: "We design our process around life, not the other way around. You get a rested, creative team — not a burned-out one.",
    },
  ];

  return (
    <section
      id="async"
      className="py-24 px-6 md:px-12"
      style={{ background: ROSE_LT }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8" style={{ background: ROSE }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
            >
              The Bloom Edge
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: SLATE,
            }}
          >
            Work Without the <em style={{ fontStyle: "italic", color: ROSE }}>Meeting Marathon.</em>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mb-14 leading-relaxed"
            style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.7 }}
          >
            We value deep work and family time. Our studio operates
            asynchronously via Slack and Loom, allowing us to build your dream
            site without the friction of scheduled meetings. You'll always know
            what's happening — just never at an inconvenient time.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div
                className="rounded-2xl p-7 border"
                style={{ background: "#fff", borderColor: BORDER }}
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4"
                  style={{ background: ROSE_LT }}
                >
                  {p.icon}
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: SLATE,
                    fontSize: "1.2rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.7 }}
                >
                  {p.body}
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
  const services = [
    {
      icon: <ShoppingBag size={28} style={{ color: SAGE }} />,
      label: "01",
      title: "Shopify Growth",
      tagline: "Strategic e-commerce builds that convert.",
      features: [
        "Custom Shopify theme development",
        "Conversion rate optimization",
        "Product & collection architecture",
        "App integrations & automation",
        "Post-launch growth strategy",
      ],
      cta: "Explore Shopify Work",
      bg: SAGE_LT,
      accent: SAGE,
    },
    {
      icon: <Code2 size={28} style={{ color: ROSE }} />,
      label: "02",
      title: "Custom Web Apps",
      tagline: "Solving complex business problems with clean code.",
      features: [
        "React / Next.js application builds",
        "Custom client or member portals",
        "Database & API architecture",
        "Third-party integrations",
        "Ongoing retainer support",
      ],
      cta: "Explore App Work",
      bg: ROSE_LT,
      accent: ROSE,
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12"
      style={{ background: CREAM }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8" style={{ background: ROSE }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
            >
              Our Services
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-14"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: SLATE,
            }}
          >
            Built for Founders Who{" "}
            <em style={{ fontStyle: "italic", color: ROSE }}>Mean Business.</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15}>
              <div
                className="rounded-3xl p-8 md:p-10 border h-full flex flex-col"
                style={{ background: s.bg, borderColor: BORDER }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                    style={{ background: "#fff" }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className="text-4xl font-light opacity-20"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
                  >
                    {s.label}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
                >
                  {s.tagline}
                </p>
                <ul className="flex flex-col gap-2 mb-8 flex-1">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: SLATE, fontFamily: "Inter, sans-serif" }}
                    >
                      <Check size={14} style={{ color: s.accent, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm tracking-wider uppercase"
                  style={{ color: s.accent, fontFamily: "Inter, sans-serif" }}
                >
                  {s.cta} <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function Portfolio() {
  const projects = [
    {
      name: "Lumière Skincare",
      category: "Shopify Growth",
      description: "A luxury DTC skincare brand built for conversion and community.",
      tech: ["Shopify", "React", "Claude Code"],
      color: "#EDE0D4",
    },
    {
      name: "Maison Collective",
      category: "Custom Web App",
      description: "A members-only interior design resource portal with gated content and booking.",
      tech: ["Next.js", "React", "Supabase", "Claude Code"],
      color: "#DDE8DE",
    },
    {
      name: "The Curated Edit",
      category: "Shopify Growth",
      description: "A fashion resale platform with custom filtering, wishlists, and influencer gifting tools.",
      tech: ["Shopify", "Klaviyo", "Claude Code"],
      color: "#E4DCE8",
    },
    {
      name: "Founders Flow",
      category: "Custom Web App",
      description: "A business dashboard and client portal for female-led consulting agencies.",
      tech: ["React", "Node.js", "Stripe", "Claude Code"],
      color: "#E8E2D8",
    },
  ];

  return (
    <section
      id="work"
      className="py-24 px-6 md:px-12"
      style={{ background: "#F5F0EB" }}
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8" style={{ background: ROSE }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
            >
              Selected Work
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
          >
            Work We're{" "}
            <em style={{ fontStyle: "italic", color: ROSE }}>Proud Of.</em>
          </h2>
          <p
            className="text-base mb-14 max-w-xl"
            style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
          >
            A sample of recent builds. Full case studies available upon inquiry.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className="rounded-2xl overflow-hidden border group cursor-pointer"
                style={{ borderColor: BORDER }}
              >
                {/* Mockup Placeholder */}
                <div
                  className="h-52 flex items-center justify-center relative overflow-hidden"
                  style={{ background: p.color }}
                >
                  <div className="text-center">
                    <Flower2 size={36} style={{ color: "rgba(45,55,72,0.15)", margin: "0 auto 8px" }} />
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "rgba(45,55,72,0.35)", fontFamily: "Inter, sans-serif" }}
                    >
                      Style Mockup Coming Soon
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(45,55,72,0.55)" }}
                  >
                    <span
                      className="flex items-center gap-2 text-sm tracking-widest uppercase"
                      style={{ color: "#fff", fontFamily: "Inter, sans-serif" }}
                    >
                      View Case Study <ExternalLink size={13} />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6" style={{ background: "#fff" }}>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
                  >
                    {p.category}
                  </span>
                  <h3
                    className="text-xl mt-1 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          borderColor: BORDER,
                          color: SLATE,
                          fontFamily: "Inter, sans-serif",
                          opacity: 0.75,
                        }}
                      >
                        {t}
                      </span>
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

// ─── Investment Guide ─────────────────────────────────────────────────────────
function Pricing() {
  const [selected, setSelected] = useState("shopify");
  const [addons, setAddons] = useState({
    seo: false,
    copywriting: false,
    maintenance: false,
    analytics: false,
  });

  const packages = {
    shopify: {
      label: "Shopify Growth",
      base: 1500,
      description: "A fully custom Shopify store built for conversion — theme, product setup, and launch.",
      icon: <ShoppingBag size={18} style={{ color: SAGE }} />,
    },
    shopifyPlus: {
      label: "Shopify Plus",
      base: 3000,
      description: "Enterprise-level Shopify with advanced B2B, flows, and custom checkout.",
      icon: <Sparkles size={18} style={{ color: SAGE }} />,
    },
    webApp: {
      label: "Custom Web App",
      base: 3500,
      description: "A bespoke React or Next.js application solving a core business challenge.",
      icon: <Code2 size={18} style={{ color: ROSE }} />,
    },
    retainer: {
      label: "Monthly Retainer",
      base: 1200,
      description: "Ongoing design, development, and strategy support on a monthly basis.",
      icon: <Clock size={18} style={{ color: ROSE }} />,
    },
  };

  const addonList = [
    { key: "seo", label: "SEO Foundation & Schema", price: 350 },
    { key: "copywriting", label: "Brand Copywriting (5 pages)", price: 500 },
    { key: "maintenance", label: "3-Month Post-Launch Maintenance", price: 450 },
    { key: "analytics", label: "Analytics & Conversion Setup", price: 275 },
  ];

  const base = packages[selected].base;
  const addonTotal = addonList.reduce(
    (sum, a) => sum + (addons[a.key] ? a.price : 0),
    0
  );
  const total = base + addonTotal;

  return (
    <section
      id="pricing"
      className="py-24 px-6 md:px-12"
      style={{ background: CREAM }}
    >
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8" style={{ background: ROSE }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
            >
              Investment Guide
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
          >
            Transparent{" "}
            <em style={{ fontStyle: "italic", color: ROSE }}>Pricing.</em>
          </h2>
          <p
            className="text-base mb-12 max-w-xl"
            style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
          >
            Every project is scoped individually — this guide gives you a clear
            starting point. All projects include a discovery session, strategy
            doc, and our full async workflow.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="rounded-3xl border p-8 md:p-10"
            style={{ borderColor: BORDER, background: "#fff" }}
          >
            {/* Package Selector */}
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
            >
              Select a Package
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {Object.entries(packages).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                  style={{
                    borderColor: selected === key ? ROSE : BORDER,
                    background: selected === key ? ROSE_LT : "transparent",
                  }}
                >
                  {pkg.icon}
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: SLATE, fontFamily: "Inter, sans-serif" }}
                    >
                      {pkg.label}
                    </p>
                    <p
                      className="text-xs opacity-60"
                      style={{ color: SLATE, fontFamily: "Inter, sans-serif" }}
                    >
                      Starting at ${pkg.base.toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected description */}
            <p
              className="text-sm mb-6 italic"
              style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
            >
              {packages[selected].description}
            </p>

            {/* Add-ons */}
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
            >
              Optional Add-ons
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {addonList.map((a) => (
                <button
                  key={a.key}
                  onClick={() =>
                    setAddons((prev) => ({ ...prev, [a.key]: !prev[a.key] }))
                  }
                  className="flex items-center justify-between p-4 rounded-xl border transition-all"
                  style={{
                    borderColor: addons[a.key] ? SAGE : BORDER,
                    background: addons[a.key] ? SAGE_LT : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: addons[a.key] ? SAGE : BORDER,
                        background: addons[a.key] ? SAGE : "transparent",
                      }}
                    >
                      {addons[a.key] && <Check size={12} color="#fff" />}
                    </div>
                    <span
                      className="text-sm text-left"
                      style={{ color: SLATE, fontFamily: "Inter, sans-serif" }}
                    >
                      {a.label}
                    </span>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.6 }}
                  >
                    +${a.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* Totals */}
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              style={{ background: SLATE }}
            >
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1 opacity-50"
                  style={{ color: CREAM, fontFamily: "Inter, sans-serif" }}
                >
                  Estimated Investment
                </p>
                <p
                  className="text-4xl font-light"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: CREAM }}
                >
                  ${total.toLocaleString()}
                  <span className="text-lg opacity-60"> USD</span>
                </p>
                <p
                  className="text-xs opacity-40 mt-1"
                  style={{ color: CREAM, fontFamily: "Inter, sans-serif" }}
                >
                  Starting price. Final scope confirmed in proposal.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider uppercase transition-all flex-shrink-0"
                style={{ background: ROSE, color: "#fff", fontFamily: "Inter, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B8898A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = ROSE)}
              >
                Get a Custom Quote <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual form handler (e.g., Formspree, Netlify Forms)
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${BORDER}`,
    borderRadius: "12px",
    background: "#fff",
    color: SLATE,
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12"
      style={{ background: ROSE_LT }}
    >
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8" style={{ background: ROSE }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
            >
              Begin Your Project
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
          >
            Let's Make{" "}
            <em style={{ fontStyle: "italic", color: ROSE }}>Something Beautiful.</em>
          </h2>
          <p
            className="text-base mb-10"
            style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
          >
            Fill in the form below and we'll come back to you within one
            business day — via Slack or email, your choice.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div
              className="rounded-3xl p-12 text-center border"
              style={{ background: "#fff", borderColor: BORDER }}
            >
              <Flower2 size={40} style={{ color: ROSE, margin: "0 auto 16px" }} />
              <h3
                className="text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: SLATE }}
              >
                We've Got Your Inquiry!
              </h3>
              <p
                className="text-sm"
                style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.65 }}
              >
                Expect to hear from us within one business day. We're excited to
                learn about your vision.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border p-8 md:p-10 flex flex-col gap-4"
              style={{ background: "#fff", borderColor: BORDER }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs tracking-wider uppercase"
                    style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                  >
                    Your Name
                  </label>
                  <input
                    style={inputStyle}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Founder"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs tracking-wider uppercase"
                    style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                  >
                    Email Address
                  </label>
                  <input
                    style={inputStyle}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@yourbrand.com"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-wider uppercase"
                  style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                >
                  Business Name
                </label>
                <input
                  style={inputStyle}
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder="Your Brand or Company"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-wider uppercase"
                  style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                >
                  I'm Interested In
                </label>
                <select
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a service…</option>
                  <option value="shopify">Shopify Store Build</option>
                  <option value="shopifyPlus">Shopify Plus</option>
                  <option value="webApp">Custom Web App</option>
                  <option value="retainer">Monthly Retainer</option>
                  <option value="other">Not Sure Yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs tracking-wider uppercase"
                  style={{ color: SLATE, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                >
                  Tell Us About Your Vision
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your business, what you need, and any timeline you have in mind…"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-sm tracking-widest uppercase transition-all mt-2 flex items-center justify-center gap-2"
                style={{
                  background: SLATE,
                  color: CREAM,
                  fontFamily: "Inter, sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ROSE)}
                onMouseLeave={(e) => (e.currentTarget.style.background = SLATE)}
              >
                Send Inquiry <ArrowRight size={14} />
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
    <footer
      className="py-12 px-6 md:px-12 border-t"
      style={{ background: SLATE, borderColor: "#3D4A5C" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flower2 size={18} style={{ color: ROSE }} />
              <span
                className="text-lg tracking-widest uppercase"
                style={{
                  color: CREAM,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: "0.2em",
                }}
              >
                Bloom
              </span>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.45 }}
            >
              A premium digital studio for female founders building brands worth
              remembering.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
              >
                Studio
              </p>
              {["Services", "Work", "Pricing", "Contact"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block text-sm mb-2 transition-opacity"
                  style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                  onMouseEnter={(e) => (e.target.style.opacity = 1)}
                  onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
                >
                  {l}
                </a>
              ))}
            </div>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ color: ROSE, fontFamily: "Inter, sans-serif" }}
              >
                Connect
              </p>
              <a
                href="mailto:hello@ohbloom.com"
                className="flex items-center gap-2 text-sm mb-2 transition-opacity"
                style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
              >
                <Mail size={13} /> hello@ohbloom.com
              </a>
              <a
                href="https://instagram.com/ohbloom"
                className="flex items-center gap-2 text-sm mb-2 transition-opacity"
                style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
              >
                <Instagram size={13} /> @ohbloom
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row justify-between gap-3"
          style={{ borderColor: "#3D4A5C" }}
        >
          <p
            className="text-xs"
            style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.35 }}
          >
            © 2026 Bloom. A division of Bloom Property Solutions LLC. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: CREAM, fontFamily: "Inter, sans-serif", opacity: 0.35 }}
          >
            ohbloom.com
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function BloomLanding() {
  return (
    <>
      {/* Google Fonts — add this link tag to your index.html <head> */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" /> */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #FAF9F6; }
        html { scroll-behavior: smooth; }
        ::selection { background: #C9A0A0; color: #fff; }
      `}</style>
      <div style={{ fontFamily: "Inter, sans-serif" }}>
        <Navbar />
        <Hero />
        <AsyncEdge />
        <Services />
        <Portfolio />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
