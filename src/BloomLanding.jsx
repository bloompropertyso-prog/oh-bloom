import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Video, Code2, ShoppingBag, ArrowRight,
  Calculator, Check, Mail, Flower2, ExternalLink, ChevronDown
} from "lucide-react";

// Inline SVG icons for social & brand (lucide-react version compatibility)
function IconSlack({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
      <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
      <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
      <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
    </svg>
  );
}

function IconInstagram({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconLinkedin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

function RevealSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className = "" }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: <ShoppingBag size={28} strokeWidth={1.5} />,
    number: "01",
    title: "Shopify Growth",
    subtitle: "Strategic E-Commerce Builds",
    desc: "From brand-new stores to complete overhauls — we build Shopify experiences that convert browsers into loyal buyers. Every pixel intentional, every flow optimized.",
    tech: ["Shopify", "Liquid", "Klaviyo", "Claude Code"],
    from: "From $1,500"
  },
  {
    icon: <Code2 size={28} strokeWidth={1.5} />,
    number: "02",
    title: "Custom Web Apps",
    subtitle: "Solving Complex Problems with Clean Code",
    desc: "Your business has problems off-the-shelf tools can't solve. We build custom web applications — client portals, booking systems, dashboards — that do exactly what you need.",
    tech: ["React", "Claude Code", "Node.js", "Custom APIs"],
    from: "From $3,500"
  }
];

const portfolio = [
  {
    title: "The Luxe Candle Co.",
    type: "Shopify Store",
    tag: "eCommerce",
    tech: ["Shopify", "Klaviyo", "Claude Code"],
    color: "#1a1208"
  },
  {
    title: "Founder OS",
    type: "Web Application",
    tag: "Web App",
    tech: ["React", "Claude Code", "Supabase"],
    color: "#080f12"
  },
  {
    title: "Botanica Studio",
    type: "Shopify + Brand",
    tag: "eCommerce",
    tech: ["Shopify", "Liquid", "Custom CSS"],
    color: "#0d1208"
  },
  {
    title: "The Client Portal",
    type: "Custom Dashboard",
    tag: "Web App",
    tech: ["React", "Claude Code", "Stripe"],
    color: "#120810"
  }
];

const pricingItems = [
  { label: "Shopify Store Setup", base: 1500, desc: "Theme customization, product setup, payment integration" },
  { label: "Shopify Store — Custom", base: 2500, desc: "Fully custom design, advanced features, Klaviyo flows" },
  { label: "Landing Page", base: 800, desc: "High-conversion single page, mobile optimized" },
  { label: "Custom Web App — Starter", base: 3500, desc: "Core functionality, clean UI, up to 5 features" },
  { label: "Custom Web App — Full", base: 6000, desc: "Complex builds, integrations, ongoing support" },
  { label: "Monthly Retainer", base: 200, desc: "Updates, edits, priority support, one campaign/mo" },
];

export default function BloomLanding() {
  const [activePrice, setActivePrice] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", business: "", service: "", idea: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      fontFamily: "'Jost', sans-serif",
      background: "#0A0908",
      color: "#F5EDD8",
      minHeight: "100vh",
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');
        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: #A88840;
          --dark: #0A0908;
          --dark2: #111009;
          --dark3: #1A1814;
          --cream: #F5EDD8;
          --cream-dim: #E8E4DC;
          --border: rgba(201,168,76,0.18);
          --border-dim: rgba(201,168,76,0.08);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: var(--gold); color: var(--dark); }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, var(--gold-dim), var(--gold-light), var(--gold), var(--gold-light), var(--gold-dim));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
        .marquee-track { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .btn-gold {
          display: inline-flex; align-items: center; gap: 0.5rem;
          text-decoration: none; border: 1px solid var(--gold);
          color: var(--gold); padding: 0.85rem 2rem;
          font-family: 'Jost', sans-serif; font-size: 11px;
          font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase;
          transition: all 0.3s; background: transparent; cursor: pointer;
        }
        .btn-gold:hover { background: var(--gold); color: var(--dark); }
        .btn-gold-fill { background: var(--gold); color: var(--dark); }
        .btn-gold-fill:hover { background: var(--gold-light); }
        input, textarea, select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid var(--border); color: var(--cream);
          padding: 1rem 1.25rem; font-family: 'Jost', sans-serif;
          font-size: 14px; font-weight: 300; outline: none;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus, select:focus { border-color: var(--gold); }
        input::placeholder, textarea::placeholder { color: rgba(245,237,216,0.3); }
        select option { background: #1a1814; color: var(--cream); }
        .service-card {
          border: 1px solid var(--border); padding: 3rem 2.5rem;
          background: var(--dark2); position: relative; overflow: hidden;
          transition: background 0.4s;
        }
        .service-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform: scaleX(0); transition: transform 0.4s ease;
        }
        .service-card:hover { background: var(--dark3); }
        .service-card:hover::before { transform: scaleX(1); }
        .portfolio-card {
          border: 1px solid var(--border); overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
        }
        .portfolio-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(201,168,76,0.08); }
        .pricing-row {
          border-bottom: 1px solid var(--border-dim); padding: 1.5rem 0;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; transition: padding 0.2s;
        }
        .pricing-row:hover { padding-left: 0.5rem; }
        .tag {
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.3rem 0.8rem; border: 1px solid var(--border);
          color: var(--gold-dim);
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .portfolio-grid { grid-template-columns: 1fr 1fr !important; }
          .async-grid { grid-template-columns: 1fr !important; }
          nav .nav-links { display: none !important; }
          .section { padding: 5rem 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.5rem 5%", borderBottom: "1px solid var(--border)",
        position: "sticky", top: 0, background: "rgba(10,9,8,0.92)",
        backdropFilter: "blur(20px)", zIndex: 1000
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Flower2 size={18} color="var(--gold)" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", letterSpacing: "0.06em" }}>
            Bloom
          </span>
        </div>
        <ul className="nav-links" style={{ display: "flex", gap: "2.5rem", listStyle: "none", alignItems: "center" }}>
          {["Services", "Work", "Process", "Pricing", "Contact"].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  textDecoration: "none", color: "var(--cream-dim)",
                  fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase",
                  transition: "color 0.2s"
                }}
                onMouseEnter={e => e.target.style.color = "var(--gold)"}
                onMouseLeave={e => e.target.style.color = "var(--cream-dim)"}
              >
                {item}
              </a>
            </li>
          ))}
          <li><a href="#contact" className="btn-gold">Start a Project</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "95vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "8rem 5% 6rem",
        borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden"
      }}>
        {[600, 400, 200].map((size, i) => (
          <div key={i} style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.06)",
            right: -size / 3, top: "50%", transform: "translateY(-50%)",
            pointerEvents: "none"
          }} />
        ))}
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <div style={{ width: 36, height: 1, background: "var(--gold)", opacity: 0.5 }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>
                Bloom Digital Studio · Lexington, SC
              </span>
            </div>
          </FadeItem>
          <FadeItem>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 400, lineHeight: 1.05,
              letterSpacing: "-0.02em", marginBottom: "2rem",
              maxWidth: 800
            }}>
              Helping Visionary<br />
              <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>Female Founders</em><br />
              Bloom Online.
            </h1>
          </FadeItem>
          <FadeItem>
            <p style={{
              fontSize: "16px", color: "var(--cream-dim)", fontWeight: 300,
              maxWidth: 480, lineHeight: 1.85, marginBottom: "3rem"
            }}>
              Bespoke Shopify stores and custom web applications built for growth and lifestyle. No calls. No chaos. Just beautiful, strategic digital work.
            </p>
          </FadeItem>
          <FadeItem>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#services" className="btn-gold btn-gold-fill">
                Explore Services <ArrowRight size={14} />
              </a>
              <a href="#contact" className="btn-gold">
                Start a Project
              </a>
            </div>
          </FadeItem>
        </RevealSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            position: "absolute", bottom: "2.5rem", left: "5%",
            display: "flex", alignItems: "center", gap: "0.75rem"
          }}
        >
          <ChevronDown size={14} color="var(--gold-dim)" />
          <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-dim)" }}>
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "var(--dark3)", padding: "1rem 0", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
        <div className="marquee-track">
          {["Shopify Expert", "◆", "Custom Web Apps", "◆", "Female-Founded", "◆", "Async Studio", "◆", "Claude Code", "◆", "React", "◆", "Klaviyo", "◆", "No Calls Required", "◆", "Shopify Expert", "◆", "Custom Web Apps", "◆", "Female-Founded", "◆", "Async Studio", "◆", "Claude Code", "◆", "React", "◆", "Klaviyo", "◆", "No Calls Required", "◆"].map((item, i) => (
            <span key={i} style={{
              padding: "0 2rem", fontSize: "10px", letterSpacing: "0.2em",
              color: item === "◆" ? "rgba(201,168,76,0.3)" : "var(--gold)",
              textTransform: "uppercase", whiteSpace: "nowrap", fontWeight: 300
            }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ASYNC EDGE */}
      <section id="process" className="section" style={{ padding: "7rem 5%", borderBottom: "1px solid var(--border)" }}>
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 28, height: 1, background: "var(--gold)", opacity: 0.5 }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Our Difference</span>
            </div>
          </FadeItem>
          <FadeItem>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400, marginBottom: "1.5rem", lineHeight: 1.2
            }}>
              The <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>Async</em> Edge
            </h2>
          </FadeItem>
          <FadeItem>
            <p style={{
              fontSize: "15px", color: "var(--cream-dim)", fontWeight: 300,
              maxWidth: 580, lineHeight: 1.9, marginBottom: "4rem"
            }}>
              We value deep work and family time. Our studio operates asynchronously via Slack and Loom, allowing us to build your dream site without the friction of scheduled meetings.
            </p>
          </FadeItem>
          <div className="async-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {[
              {
                icon: <IconSlack size={24} />,
                title: "Slack Communication",
                desc: "All project communication happens in a dedicated Slack channel. Ask questions, share feedback, and get updates on your timeline — no scheduling required."
              },
              {
                icon: <Video size={24} strokeWidth={1.5} />,
                title: "Loom Walkthroughs",
                desc: "Instead of calls, we send you recorded Loom videos walking through designs and decisions. You watch when it works for you and respond at your pace."
              },
              {
                icon: <Check size={24} strokeWidth={1.5} />,
                title: "Structured Milestones",
                desc: "Every project is broken into clear milestones with deliverables and deadlines. You always know exactly where we are and what's coming next."
              }
            ].map((item, i) => (
              <div key={i} style={{ background: "var(--dark2)", padding: "3rem 2rem" }}>
                <div style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>{item.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "1.15rem",
                  fontWeight: 400, marginBottom: "1rem", color: "var(--cream)"
                }}>{item.title}</h3>
                <p style={{ fontSize: "13.5px", color: "#ffffff", fontWeight: 300, lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <FadeItem>
            <div style={{
              marginTop: "3rem", border: "1px solid var(--border)",
              borderLeft: "3px solid var(--gold)", padding: "2rem 2.5rem",
              background: "var(--dark2)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                <Video size={20} color="var(--gold)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 3 }} />
                <div>
                  <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                    The Loom Strategy
                  </p>
                  <p style={{ fontSize: "14px", color: "#ffffff", fontWeight: 300, lineHeight: 1.85 }}>
                    When someone DMs us on LinkedIn asking for a "quick call," our response is: <em style={{ color: "var(--gold-light)" }}>"I'd love to help! To keep my rates accessible and my focus on the code, I actually handle all discovery through a quick Loom video. Send me your site link or idea, and I'll send you a video teardown of exactly how Bloom can help."</em>
                  </p>
                </div>
              </div>
            </div>
          </FadeItem>
        </RevealSection>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" style={{ padding: "7rem 5%", borderBottom: "1px solid var(--border)" }}>
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
                Services
              </h2>
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)" }}>01 — What We Build</span>
            </div>
          </FadeItem>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {services.map((s, i) => (
              <FadeItem key={i}>
                <div className="service-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                    <div style={{ color: "var(--gold)" }}>{s.icon}</div>
                    <span style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--cream-dim)" }}>{s.number}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 400, marginBottom: "0.4rem", color: "var(--cream)" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.5rem" }}>
                    {s.subtitle}
                  </p>
                  <p style={{ fontSize: "14px", color: "#ffffff", fontWeight: 300, lineHeight: 1.85, marginBottom: "2rem" }}>
                    {s.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                    {s.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--gold-light)", letterSpacing: "0.08em" }}>{s.from}</div>
                </div>
              </FadeItem>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="section" style={{ padding: "7rem 5%", borderBottom: "1px solid var(--border)" }}>
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
                Selected Work
              </h2>
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)" }}>02 — Portfolio</span>
            </div>
          </FadeItem>
          <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {portfolio.map((p, i) => (
              <FadeItem key={i}>
                <div className="portfolio-card" style={{ background: "var(--dark2)" }}>
                  <div style={{
                    height: 220, background: p.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden"
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)"
                    }} />
                    <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                      <Flower2 size={32} color="rgba(201,168,76,0.3)" strokeWidth={1} />
                      <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.3)", marginTop: "0.75rem" }}>
                        Style Mockup
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--cream)" }}>
                        {p.title}
                      </h3>
                      <ExternalLink size={14} color="var(--gold-dim)" strokeWidth={1.5} />
                    </div>
                    <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1.25rem" }}>
                      {p.type}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section" style={{ padding: "7rem 5%", borderBottom: "1px solid var(--border)" }}>
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
                Investment Guide
              </h2>
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)" }}>03 — Pricing</span>
            </div>
          </FadeItem>
          <FadeItem>
            <p style={{ fontSize: "14px", color: "var(--cream-dim)", fontWeight: 300, maxWidth: 520, marginBottom: "3rem", lineHeight: 1.8 }}>
              We believe in transparent pricing. Click any service to see starting rates. Every project is scoped individually — these are starting points.
            </p>
          </FadeItem>
          <FadeItem>
            <div style={{ border: "1px solid var(--border)", background: "var(--dark2)" }}>
              <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Calculator size={16} color="var(--gold)" strokeWidth={1.5} />
                <span style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Interactive Investment Guide
                </span>
              </div>
              <div style={{ padding: "0 2rem" }}>
                {pricingItems.map((item, i) => (
                  <div
                    key={i}
                    className="pricing-row"
                    onClick={() => setActivePrice(activePrice === i ? null : i)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: activePrice === i ? "0.75rem" : 0 }}>
                        <span style={{ fontSize: "14px", color: "var(--cream)", fontWeight: 400 }}>{item.label}</span>
                        <ChevronDown
                          size={14}
                          color="var(--gold-dim)"
                          style={{ transform: activePrice === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}
                        />
                      </div>
                      {activePrice === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          style={{ fontSize: "13px", color: "#ffffff", fontWeight: 300, lineHeight: 1.7 }}
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif", fontSize: "1.4rem",
                      color: "var(--gold-light)", marginLeft: "2rem", flexShrink: 0
                    }}>
                      ${item.base.toLocaleString()}+
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                <p style={{ fontSize: "12px", color: "var(--cream-dim)", fontWeight: 300 }}>
                  All projects include a detailed scope and proposal before any work begins.
                </p>
                <a href="#contact" className="btn-gold btn-gold-fill" style={{ fontSize: "10px" }}>
                  Get a Custom Quote <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </FadeItem>
        </RevealSection>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{ padding: "7rem 5%", borderBottom: "1px solid var(--border)" }}>
        <RevealSection>
          <FadeItem>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
                Start a Project
              </h2>
              <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold-dim)" }}>04 — Inquire</span>
            </div>
          </FadeItem>
          <FadeItem>
            <p style={{ fontSize: "14px", color: "var(--cream-dim)", fontWeight: 300, maxWidth: 480, marginBottom: "3rem", lineHeight: 1.8 }}>
              No calls required. Fill out the form below and we'll respond with next steps via email within 24 hours.
            </p>
          </FadeItem>
          <FadeItem>
            {submitted ? (
              <div style={{
                border: "1px solid var(--gold)", padding: "4rem",
                textAlign: "center", background: "var(--dark2)"
              }}>
                <Flower2 size={36} color="var(--gold)" strokeWidth={1} style={{ marginBottom: "1.5rem" }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "1rem" }}>
                  Thank you, {formData.name.split(" ")[0]}.
                </h3>
                <p style={{ color: "var(--cream-dim)", fontWeight: 300, fontSize: "14px" }}>
                  We'll be in touch within 24 hours with your next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: 680 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "1px" }}>
                  <input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div style={{ marginBottom: "1px" }}>
                  <input
                    placeholder="Business Name"
                    value={formData.business}
                    onChange={e => setFormData({ ...formData, business: e.target.value })}
                  />
                </div>
                <div style={{ marginBottom: "1px" }}>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    required
                  >
                    <option value="" disabled>Service You're Interested In</option>
                    <option>Shopify Store — Setup</option>
                    <option>Shopify Store — Custom</option>
                    <option>Custom Web App</option>
                    <option>Landing Page</option>
                    <option>Monthly Retainer</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
                <div style={{ marginBottom: "2rem" }}>
                  <textarea
                    placeholder="Tell us about your project, your vision, and your timeline..."
                    rows={5}
                    value={formData.idea}
                    onChange={e => setFormData({ ...formData, idea: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>
                <button type="submit" className="btn-gold btn-gold-fill" style={{ width: "100%", justifyContent: "center", padding: "1.1rem" }}>
                  Submit Inquiry <ArrowRight size={14} />
                </button>
              </form>
            )}
          </FadeItem>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "3rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Flower2 size={16} color="var(--gold)" strokeWidth={1.5} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", letterSpacing: "0.05em" }}>Bloom</span>
        </div>
        <p style={{ fontSize: "11px", color: "var(--cream-dim)", letterSpacing: "0.08em", textAlign: "center" }}>
          © 2026 Bloom · A division of Bloom Property Solutions LLC · Lexington, SC
        </p>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <a
            href="https://linkedin.com"
            style={{ color: "var(--gold-dim)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--gold-dim)"}
          >
            <IconLinkedin size={16} />
          </a>
          <a
            href="https://instagram.com"
            style={{ color: "var(--gold-dim)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--gold-dim)"}
          >
            <IconInstagram size={16} />
          </a>
          <a
            href="mailto:hello@ohbloom.com"
            style={{ color: "var(--gold-dim)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--gold-dim)"}
          >
            <Mail size={16} strokeWidth={1.5} />
          </a>
        </div>
      </footer>
    </div>
  );
}
