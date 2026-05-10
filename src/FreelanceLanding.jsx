// npm install framer-motion lucide-react

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Monitor, Layers, Mail,
  Menu, X, Check, Zap, Target, Code2,
  ArrowRight, Users, MessageCircle, Globe,
  TrendingUp, UserCheck
} from 'lucide-react';

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

// ─── CSS Injection ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);

    document.title = 'Bryttani Patterson — ohbloom.com';

    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <style>{`
      :root {
        --bg: #FAFAF8;
        --bg2: #F0EEE8;
        --teal: #1A6B72;
        --teal-hover: #155c63;
        --teal-light: #E8F4F5;
        --amber: #E8913A;
        --amber-light: rgba(232,145,58,0.10);
        --text-h: #1C1C1E;
        --text-b: #4A4A4A;
        --text-m: #8A8A8A;
        --white: #FFFFFF;
        --border: #EEEDE8;
        --shadow: 0 2px 16px rgba(0,0,0,0.06);
        --font-h: 'Plus Jakarta Sans', sans-serif;
        --font-b: 'Inter', sans-serif;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; font-size: 16px; }
      body {
        background: var(--bg);
        color: var(--text-b);
        font-family: var(--font-b);
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        line-height: 1.7;
      }
      ::selection { background: var(--teal); color: #fff; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-h);
        color: var(--text-h);
        line-height: 1.2;
      }

      .wrap { max-width: 1140px; margin: 0 auto; padding: 0 28px; }
      .sec  { padding: 100px 0; }

      /* Eyebrow */
      .eyebrow {
        display: inline-block;
        font-family: var(--font-b);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--teal);
        margin-bottom: 14px;
      }

      /* Buttons */
      .btn-p {
        display: inline-flex; align-items: center; gap: 8px;
        background: var(--teal); color: #fff;
        padding: 13px 26px; border-radius: 8px;
        font-family: var(--font-b); font-size: 15px; font-weight: 500;
        border: none; cursor: pointer; text-decoration: none;
        transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        white-space: nowrap;
      }
      .btn-p:hover {
        background: var(--teal-hover);
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(26,107,114,0.28);
      }
      .btn-o {
        display: inline-flex; align-items: center; gap: 8px;
        background: transparent; color: var(--teal);
        padding: 12px 26px; border-radius: 8px;
        font-family: var(--font-b); font-size: 15px; font-weight: 500;
        border: 1.5px solid var(--teal); cursor: pointer; text-decoration: none;
        transition: background 0.2s, transform 0.2s;
        white-space: nowrap;
      }
      .btn-o:hover { background: var(--teal-light); transform: translateY(-1px); }

      /* Form */
      .flabel {
        display: block; font-size: 10px; font-weight: 600;
        letter-spacing: 0.09em; text-transform: uppercase;
        color: var(--text-h); margin-bottom: 7px;
      }
      .finput, .fselect, .ftarea {
        width: 100%; padding: 12px 16px;
        border: 1px solid #DDDBD6; border-radius: 8px;
        font-family: var(--font-b); font-size: 15px; color: var(--text-b);
        background: var(--white); transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
      }
      .fselect { appearance: none; -webkit-appearance: none; }
      .finput:focus, .fselect:focus, .ftarea:focus {
        border-color: var(--teal);
        box-shadow: 0 0 0 3px rgba(26,107,114,0.10);
      }
      .ftarea { resize: vertical; min-height: 120px; line-height: 1.6; }
      .fgroup { margin-bottom: 22px; }
      .fsel-wrap { position: relative; }
      .fsel-arrow {
        position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
        pointer-events: none; color: var(--text-m); font-size: 12px;
      }

      /* Nav */
      .nav-link {
        font-family: var(--font-b); font-size: 14px; color: var(--text-b);
        text-decoration: none; cursor: pointer; transition: color 0.2s;
        background: none; border: none; padding: 0;
      }
      .nav-link:hover { color: var(--teal); }

      /* Portfolio card */
      .port-card {
        background: var(--white); border-radius: 12px;
        box-shadow: var(--shadow); overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: default;
      }
      .port-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 48px rgba(26,107,114,0.14);
      }

      /* Browser chrome */
      .b-chrome {
        background: #F2F2F2; padding: 7px 10px;
        display: flex; align-items: center; gap: 5px;
        border-bottom: 1px solid #E0E0E0;
      }
      .b-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .b-url {
        background: white; border-radius: 4px;
        padding: 2px 10px; font-size: 10px; color: #666;
        flex: 1; font-family: var(--font-b);
        border: 1px solid #E8E8E8; overflow: hidden;
        white-space: nowrap; text-overflow: ellipsis;
      }
      .b-frame {
        border: 1px solid #E0E0E0; border-radius: 8px;
        overflow: hidden; margin-bottom: 18px;
      }
      .b-body {
        height: 196px; overflow: hidden;
        position: relative; background: white;
      }

      /* Tech tag */
      .ttag {
        display: inline-block; font-size: 11px; color: var(--teal);
        background: var(--teal-light); padding: 3px 10px;
        border-radius: 100px; font-weight: 500; font-family: var(--font-b);
        margin: 2px 2px 0 0;
      }

      /* Service card bullet */
      .svc-bullet {
        display: flex; align-items: flex-start; gap: 9px;
        margin-bottom: 8px; font-size: 14px; color: var(--text-b);
        font-family: var(--font-b);
      }
      .svc-bullet-dot {
        width: 16px; height: 16px; border-radius: 50%;
        background: var(--teal-light); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        margin-top: 3px;
      }

      /* Mobile */
      @media (max-width: 768px) {
        .sec { padding: 64px 0; }
        .wrap { padding: 0 18px; }
        .hide-mob { display: none !important; }
        .show-mob { display: flex !important; }
        .grid-3 { grid-template-columns: 1fr !important; }
        .grid-2 { grid-template-columns: 1fr !important; }
        .hero-btns { flex-direction: column; align-items: center; }
        .hero-trust { flex-direction: column; gap: 8px; align-items: center; }
        .float-row { flex-wrap: wrap; justify-content: center; }
        .about-row { flex-direction: column !important; }
        .sm-row { flex-direction: column !important; }
        .footer-row { flex-direction: column !important; gap: 18px; text-align: center; }
        .footer-icons { justify-content: center !important; }
        .cta-btns { flex-direction: column; align-items: center; }
      }
      @media (max-width: 480px) {
        .hero-h1 { font-size: 2rem !important; }
        .sec-h { font-size: 1.7rem !important; }
      }
    `}</style>
  );
}

// ─── Animation Utilities ───────────────────────────────────────────────────────
const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemV = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function RevealSection({ children, delay = 0, style, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, style, className }) {
  return (
    <motion.div variants={itemV} style={style} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Floating Card (Hero) ──────────────────────────────────────────────────────
function FloatingCard({ icon: Icon, label, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        background: '#FFFFFF',
        borderRadius: 12,
        padding: '11px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        border: '1px solid #EEEDE8',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <Icon size={15} color="#1A6B72" strokeWidth={2} />
      <span style={{ fontSize: 13, fontWeight: 500, color: '#1C1C1E', fontFamily: 'var(--font-b)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </motion.div>
  );
}

// ─── Browser Mockup Helper ─────────────────────────────────────────────────────
function BChrome({ url }) {
  return (
    <div className="b-chrome">
      <div className="b-dot" style={{ background: '#FF5F57' }} />
      <div className="b-dot" style={{ background: '#FFBD2E' }} />
      <div className="b-dot" style={{ background: '#28C940' }} />
      <div className="b-url">{url}</div>
    </div>
  );
}

// ─── Portfolio Mockups ─────────────────────────────────────────────────────────
function SalonMockup() {
  return (
    <div className="b-frame">
      <BChrome url="glowstudio.com" />
      <div className="b-body" style={{ background: '#FDF9F7' }}>
        <div style={{ background: '#FDF0EE', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F5E2DC' }}>
          <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 11, color: '#7A3848' }}>Glow Studio</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Services', 'Gallery', 'Book Now'].map(t => (
              <span key={t} style={{ fontSize: 8, color: '#9A5060' }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: '10px 12px', position: 'relative', height: '100%' }}>
          <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 13, color: '#4A2535', marginBottom: 3 }}>
            Your Hair,<br />Your Style
          </div>
          <div style={{ fontSize: 9, color: '#B08090' }}>Lexington's premier salon</div>
          {/* Chat widget */}
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 138, background: 'white', borderRadius: 9, boxShadow: '0 4px 18px rgba(0,0,0,0.13)', overflow: 'hidden', border: '1px solid #F0E6E8' }}>
            <div style={{ background: '#1A6B72', padding: '5px 9px', color: 'white', fontSize: 8.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 9 }}>✦</span> Glow Assistant
            </div>
            <div style={{ padding: '7px 8px' }}>
              <div style={{ background: '#F6F6F6', borderRadius: '0 8px 8px 8px', padding: '4px 7px', fontSize: 8, color: '#333', lineHeight: 1.5, marginBottom: 5 }}>
                Hi! I'm Glow's assistant. Want to see our services or book an appointment?
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{ background: '#E8F4F5', color: '#1A6B72', borderRadius: 4, padding: '3px 6px', fontSize: 7.5, fontWeight: 600 }}>Services</div>
                <div style={{ background: '#E8F4F5', color: '#1A6B72', borderRadius: 4, padding: '3px 6px', fontSize: 7.5, fontWeight: 600 }}>Book Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachMockup() {
  const steps = ['Client Signs Up', 'Welcome Email Sent', 'Intake Form Triggered', 'Calendar Link Sent', 'Contract Delivered'];
  return (
    <div className="b-frame">
      <BChrome url="app.elevatecoaching.com/intake" />
      <div className="b-body" style={{ background: '#F8FAFB', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1A6B72', padding: '5px 12px', color: 'white', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ADEAE', display: 'inline-block' }} />
          Automated Intake Flow — Active
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Workflow timeline */}
          <div style={{ flex: 1, padding: '10px 12px', borderRight: '1px solid #E8EFF0', overflowY: 'auto' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 9 }}>
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <span style={{ color: '#2E7D32', fontSize: 8, fontWeight: 700 }}>✓</span>
                </div>
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 600, color: '#1C1C1E', lineHeight: 1.3 }}>{step}</div>
                  <div style={{ fontSize: 7.5, color: '#999' }}>9:42 AM · Auto</div>
                </div>
              </div>
            ))}
          </div>
          {/* Email preview */}
          <div style={{ width: 104, padding: '8px 8px', flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: 5, border: '1px solid #E0EAEC', overflow: 'hidden', height: '100%' }}>
              <div style={{ background: '#1A6B72', padding: '4px 7px', color: 'white', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.02em' }}>
                Elevate Coaching
              </div>
              <div style={{ padding: '7px 7px' }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: '#1C1C1E', marginBottom: 4 }}>Welcome, Sarah! 🎉</div>
                <div style={{ fontSize: 7, color: '#555', lineHeight: 1.5, marginBottom: 6 }}>
                  So excited to start this journey together. Here's everything you need to get started...
                </div>
                <div style={{ background: '#1A6B72', borderRadius: 3, padding: '3px 7px', fontSize: 7, color: 'white', textAlign: 'center', fontWeight: 600 }}>
                  Complete Intake →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantMockup() {
  return (
    <div className="b-frame">
      <BChrome url="mesakitchen.com" />
      <div className="b-body" style={{ background: '#FDFAF7' }}>
        <div style={{ background: '#B5673A', padding: '7px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 11, color: 'white' }}>Mesa Kitchen</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Menu', 'Reservations', 'About'].map(t => (
              <span key={t} style={{ fontSize: 8, color: 'rgba(255,255,255,0.85)' }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: '10px 12px', position: 'relative', height: '100%' }}>
          <div style={{ fontFamily: 'var(--font-h)', fontWeight: 700, fontSize: 13, color: '#4A2810', lineHeight: 1.3, marginBottom: 3 }}>
            Authentic Flavors,<br />Every Gathering
          </div>
          <div style={{ fontSize: 9, color: '#9A6A50' }}>Open Tue–Sun 11am–10pm</div>
          {/* Chat widget */}
          <div style={{ position: 'absolute', bottom: 10, right: 10, width: 146, background: 'white', borderRadius: 9, boxShadow: '0 4px 18px rgba(0,0,0,0.13)', overflow: 'hidden', border: '1px solid #F0E8DC' }}>
            <div style={{ background: '#B5673A', padding: '5px 9px', color: 'white', fontSize: 8.5, fontWeight: 600 }}>
              Mesa Assistant
            </div>
            <div style={{ padding: '6px 8px' }}>
              <div style={{ textAlign: 'right', marginBottom: 4 }}>
                <span style={{ background: '#1A6B72', color: 'white', borderRadius: '8px 8px 0 8px', padding: '3px 7px', fontSize: 7.5, display: 'inline-block', lineHeight: 1.4 }}>
                  Do you have gluten-free options?
                </span>
              </div>
              <div style={{ background: '#F5F5F5', borderRadius: '0 8px 8px 8px', padding: '4px 6px', fontSize: 8, color: '#333', marginBottom: 5, lineHeight: 1.5 }}>
                Yes! Several dishes are gluten-free. Want to see the menu or make a reservation?
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{ background: '#E8F4F5', color: '#1A6B72', borderRadius: 4, padding: '2px 6px', fontSize: 7.5, fontWeight: 600 }}>Menu</div>
                <div style={{ background: '#E8F4F5', color: '#1A6B72', borderRadius: 4, padding: '2px 6px', fontSize: 7.5, fontWeight: 600 }}>Reserve</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsultantMockup() {
  const opts = ['Revenue Growth', 'Team & Process', 'Lead Generation', 'Client Retention'];
  return (
    <div className="b-frame">
      <BChrome url="meridian-consulting.com/qualify" />
      <div className="b-body" style={{ background: 'white', padding: '10px 12px' }}>
        {/* Progress */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 8, color: '#888' }}>Step 1 of 3</span>
            <span style={{ fontSize: 8, color: '#1A6B72', fontWeight: 600 }}>33% Complete</span>
          </div>
          <div style={{ height: 4, background: '#F0F0F0', borderRadius: 2 }}>
            <div style={{ width: '33%', height: '100%', background: '#1A6B72', borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: '#1C1C1E', marginBottom: 9 }}>
          What's your biggest challenge right now?
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {/* Options grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {opts.map((opt, i) => (
              <div key={i} style={{
                border: i === 0 ? '1.5px solid #1A6B72' : '1px solid #E8E8E8',
                borderRadius: 6, padding: '5px 7px',
                fontSize: 8, textAlign: 'center',
                color: i === 0 ? '#1A6B72' : '#555',
                background: i === 0 ? '#E8F4F5' : 'white',
                fontWeight: i === 0 ? 600 : 400,
                lineHeight: 1.3,
              }}>
                {opt}
              </div>
            ))}
          </div>
          {/* Score panel */}
          <div style={{ width: 62, background: '#F8FAFA', borderRadius: 7, padding: '8px 6px', border: '1px solid #D8EDEE', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 7, color: '#888', marginBottom: 2, fontWeight: 500 }}>Lead Score</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1A6B72', lineHeight: 1.1 }}>87</div>
            <div style={{ fontSize: 7, color: '#aaa', marginBottom: 5 }}>/100</div>
            <div style={{ background: '#1A6B72', borderRadius: 4, padding: '2px 4px', fontSize: 7, color: 'white', fontWeight: 700, lineHeight: 1.4 }}>
              Strong Fit ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Services', 'Offers', 'Portfolio', 'About', 'Contact'];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
      boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
    }}>
      <nav style={{ maxWidth: 1140, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <a href="#" style={{ fontFamily: 'var(--font-h)', fontWeight: 500, fontSize: 17, color: '#1C1C1E', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          Bryttani Patterson
        </a>
        {/* Desktop nav */}
        <div className="hide-mob" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <a href="#contact" className="btn-p" style={{ padding: '9px 20px', fontSize: 14, borderRadius: 8 }}>
            Book a Consultation
          </a>
        </div>
        {/* Hamburger */}
        <button
          className="show-mob"
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1C1C1E', padding: 4, display: 'none' }}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.98)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}
          >
            <div style={{ padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {links.map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                  style={{ padding: '13px 0', borderBottom: '1px solid var(--border)', fontSize: 16 }}
                >
                  {l}
                </a>
              ))}
              <a href="#contact" className="btn-p" onClick={() => setOpen(false)} style={{ marginTop: 20, textAlign: 'center', justifyContent: 'center' }}>
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ paddingTop: 148, paddingBottom: 100, background: 'var(--bg)' }}>
      <div className="wrap" style={{ maxWidth: 780, textAlign: 'center' }}>
        <RevealSection>
          {/* Eyebrow pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
            <span style={{ display: 'inline-block', padding: '7px 18px', borderRadius: 100, border: '1px solid var(--border)', background: 'var(--white)', fontFamily: 'var(--font-b)', fontSize: 13, fontWeight: 500, color: 'var(--teal)', letterSpacing: '0.01em' }}>
              Web Design · AI Agents · Business Automation
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{ fontSize: '3.4rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24, color: '#1C1C1E' }}>
            Modern Websites,{' '}
            <span style={{ color: 'var(--teal)' }}>AI Agents</span>
            {' '}& Business Automation for Growing Businesses.
          </h1>

          {/* Subheadline */}
          <p style={{ fontFamily: 'var(--font-b)', fontSize: 18, lineHeight: 1.75, color: '#6A6A6A', marginBottom: 40, maxWidth: 640, margin: '0 auto 40px' }}>
            Helping entrepreneurs streamline operations, automate tasks, and create better online experiences — without needing a tech team.
          </p>

          {/* CTA buttons */}
          <div className="hero-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 36 }}>
            <a href="#services" className="btn-p">View Services</a>
            <a href="#contact" className="btn-o">Book a Consultation</a>
          </div>

          {/* Trust indicators */}
          <div className="hero-trust" style={{ display: 'flex', gap: 28, justifyContent: 'center', marginBottom: 64 }}>
            {[
              'Based in Lexington, SC',
              'No tech jargon — plain English',
              'Built for small businesses',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-b)', fontSize: 13, color: '#888' }}>
                <Check size={13} color="#1A6B72" strokeWidth={2.5} />
                {t}
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Floating service cards */}
        <RevealSection delay={0.3}>
          <div className="float-row" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <FloatingCard icon={MessageCircle} label="AI Chatbot" delay={0} />
            <FloatingCard icon={Target}        label="Lead Capture" delay={0.5} />
            <FloatingCard icon={Globe}         label="Web Design" delay={1.0} />
            <FloatingCard icon={Zap}           label="Automation" delay={1.5} />
            <FloatingCard icon={Code2}         label="Web Apps" delay={2.0} />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    Icon: Bot,
    title: 'AI Agents & Automation',
    desc: 'I build AI-powered systems that handle the repetitive, time-consuming parts of running your business — so you can focus on the work that actually needs you.',
    bullets: [
      'AI chat assistants for your website',
      'Lead qualification and follow-up systems',
      'Customer support bots',
      'Automated intake and onboarding flows',
      'Workflow automation between your tools',
    ],
  },
  {
    Icon: Monitor,
    title: 'Websites & Landing Pages',
    desc: 'Clean, fast, conversion-focused websites that represent your business professionally and make it easy for the right people to reach you.',
    bullets: [
      'Business websites',
      'High-converting landing pages',
      'Website redesigns and refreshes',
      'Mobile-first, SEO-ready builds',
      'WordPress, Wix, Squarespace, or custom',
    ],
  },
  {
    Icon: Layers,
    title: 'Web Apps & Custom Tools',
    desc: "When off-the-shelf software doesn't quite fit, I build custom tools that work exactly the way your business does.",
    bullets: [
      'Custom dashboards and portals',
      'Internal business tools',
      'AI-powered applications',
      'Client-facing systems',
      'Booking and membership platforms',
    ],
  },
];

function Services() {
  return (
    <section id="services" className="sec" style={{ background: 'var(--bg)' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="eyebrow">What I Do</span>
            <h2 className="sec-h" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Three Ways I Help Your Business Work Smarter.
            </h2>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 17, color: '#6A6A6A', maxWidth: 620, margin: '0 auto', lineHeight: 1.75 }}>
              Whether you need a website that converts, an AI assistant that handles inquiries, or automation that saves you hours every week — I build it in plain English, without the overwhelm.
            </p>
          </div>
        </RevealSection>

        <motion.div
          className="grid-3"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {SERVICES.map(({ Icon, title, desc, bullets }) => (
            <FadeItem key={title}>
              <div style={{ background: '#FFFFFF', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '32px 28px', borderTop: '3px solid var(--teal)', height: '100%' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={22} color="#1A6B72" strokeWidth={1.75} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-b)', fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-b)', marginBottom: 20 }}>{desc}</p>
                <div>
                  {bullets.map(b => (
                    <div key={b} className="svc-bullet">
                      <div className="svc-bullet-dot">
                        <Check size={9} color="#1A6B72" strokeWidth={3} />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Offers ───────────────────────────────────────────────────────────────────
const OFFERS = [
  {
    num: '01',
    title: 'AI Chatbot Setup',
    price: '$300 – $1,000',
    value: 'Your website answers questions and captures leads — even at 2am.',
    solves: [
      'Visitors leave without making contact',
      'You spend time answering the same questions repeatedly',
      'No system to capture leads after hours',
    ],
  },
  {
    num: '02',
    title: 'Website + AI Chatbot',
    price: '$1,000 – $3,000',
    value: 'A professional website and an AI assistant that works together from day one.',
    solves: [
      'No online presence or an outdated one',
      'No system to turn website visitors into leads',
      'Starting from scratch and need it done right',
    ],
  },
  {
    num: '03',
    title: 'Lead Capture Automation',
    price: '$500 – $1,500',
    value: 'Stop losing leads. Every inquiry gets captured, responded to, and followed up automatically.',
    solves: [
      'Leads falling through the cracks',
      'No consistent follow-up process',
      'Manual work that should be running on its own',
    ],
  },
  {
    num: '04',
    title: 'Client Onboarding Automation',
    price: '$500 – $2,000',
    value: 'New clients get a seamless, professional experience from the moment they say yes.',
    solves: [
      'Onboarding feels inconsistent or manual',
      'Too much back-and-forth before work starts',
      'No scalable system for bringing on new clients',
    ],
  },
];

function Offers() {
  return (
    <section id="offers" className="sec" style={{ background: '#F5F3EE' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span className="eyebrow">Where to Start</span>
            <h2 className="sec-h" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Your Best First Step Doesn't Have to Cost $10,000.
            </h2>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 17, color: '#6A6A6A', maxWidth: 600, margin: '0 auto 14px', lineHeight: 1.75 }}>
              These are the offers small businesses actually buy first — high value, fast to deliver, and easy to say yes to. Each one solves a specific problem your clients already have.
            </p>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 14, color: '#9A9690', fontStyle: 'italic', marginBottom: 0 }}>
              Businesses love 'save time' offers. These are designed exactly for that.
            </p>
          </div>
        </RevealSection>

        <motion.div
          className="grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, marginTop: 48 }}
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {OFFERS.map(({ num, title, price, value, solves }) => (
            <FadeItem key={num}>
              <div style={{ background: '#FFFFFF', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '30px 28px', borderLeft: '4px solid var(--amber)', height: '100%' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', fontWeight: 400, color: '#E8E4DC', lineHeight: 1, marginBottom: 12, letterSpacing: '-0.02em' }}>{num}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</h3>
                <div style={{ fontFamily: 'var(--font-b)', fontSize: 16, fontWeight: 600, color: 'var(--teal)', marginBottom: 10 }}>{price}</div>
                <p style={{ fontFamily: 'var(--font-b)', fontSize: 14.5, color: 'var(--text-b)', lineHeight: 1.65, marginBottom: 20 }}>{value}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
                  <div style={{ fontFamily: 'var(--font-b)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 10 }}>What this solves</div>
                  {solves.map(s => (
                    <div key={s} className="svc-bullet">
                      <div className="svc-bullet-dot">
                        <Check size={9} color="#1A6B72" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 14 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
const DEMOS = [
  {
    type: 'BEAUTY & WELLNESS',
    title: 'Glow Studio — AI Booking Assistant',
    problem: 'Salon owners spend hours every week answering the same questions about services, pricing, and availability — time that should be spent with clients.',
    solution: 'An AI chat assistant built into the salon website that answers FAQs, shares pricing, and guides visitors to book an appointment — automatically, 24/7.',
    designed: 'Reduce repetitive inquiries, capture after-hours leads, and free up the owner\'s time.',
    tags: ['AI Chatbot', 'Lead Capture', 'Appointment Booking'],
    Mockup: SalonMockup,
  },
  {
    type: 'COACHING & CONSULTING',
    title: 'Elevate Coaching — Automated Intake System',
    problem: 'Coaches lose hours every week on back-and-forth emails just to onboard a new client — intake forms, scheduling, contracts, and welcome emails all done manually.',
    solution: 'A fully automated intake flow that triggers the moment someone says yes — sending a welcome email, intake form, contract, and calendar link without the coach lifting a finger.',
    designed: 'Eliminate manual onboarding steps, create a professional client experience, and give coaches their time back.',
    tags: ['Workflow Automation', 'Client Onboarding', 'Email Automation'],
    Mockup: CoachMockup,
  },
  {
    type: 'FOOD & BEVERAGE',
    title: 'Mesa Kitchen — AI FAQ Assistant',
    problem: 'Restaurants receive dozens of calls and messages every day asking about hours, reservations, menu items, and dietary options — pulling staff away from guests.',
    solution: 'An AI assistant embedded on the restaurant website that instantly answers common questions, shares the menu, and directs visitors to make a reservation.',
    designed: 'Reduce incoming call volume, improve the customer experience, and let staff focus on in-person service.',
    tags: ['AI Chatbot', 'FAQ Automation', 'Restaurant Tech'],
    Mockup: RestaurantMockup,
  },
  {
    type: 'PROFESSIONAL SERVICES',
    title: 'Meridian Consulting — Lead Qualification System',
    problem: "Consultants spend valuable discovery call time talking to prospects who aren't a good fit — wasting hours that should go toward paying clients.",
    solution: 'An automated lead qualification system that asks the right questions before a call is ever scheduled — scoring leads, filtering out poor fits, and only booking calls with qualified prospects.',
    designed: "Protect the consultant's calendar, improve close rates on discovery calls, and create a more professional first impression.",
    tags: ['Lead Qualification', 'Automation', 'CRM Integration'],
    Mockup: ConsultantMockup,
  },
];

function Portfolio() {
  return (
    <section id="portfolio" className="sec" style={{ background: 'var(--bg)' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span className="eyebrow">Real Demos. Real Use Cases.</span>
            <h2 className="sec-h" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
              Not 'I'm Open for Work.' —<br />'Here's What I Built.'
            </h2>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 17, color: '#6A6A6A', maxWidth: 600, margin: '0 auto', lineHeight: 1.75 }}>
              Every project below was built to demonstrate exactly what's possible for real small businesses. This is how automation and AI actually work in practice — not in theory.
            </p>
          </div>
          {/* Callout */}
          <div style={{ background: 'rgba(232,145,58,0.08)', borderLeft: '4px solid var(--amber)', borderRadius: '0 8px 8px 0', padding: '14px 20px', margin: '32px auto 0', maxWidth: 680, fontFamily: 'var(--font-b)', fontSize: 14, color: 'var(--text-b)', lineHeight: 1.65 }}>
            These are demonstration projects built to show real-world use cases. They reflect the quality and type of work available for your business.
          </div>
        </RevealSection>

        <motion.div
          className="grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 52 }}
          variants={containerV}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {DEMOS.map(({ type, title, problem, solution, designed, tags, Mockup }) => (
            <FadeItem key={title}>
              <div className="port-card">
                <div style={{ padding: '20px 20px 0' }}>
                  <Mockup />
                </div>
                <div style={{ padding: '0 24px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-b)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: 7 }}>{type}</div>
                  <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.01em' }}>{title}</h3>

                  <div style={{ marginBottom: 11 }}>
                    <div style={{ fontFamily: 'var(--font-b)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#888', marginBottom: 5 }}>The Problem</div>
                    <p style={{ fontFamily: 'var(--font-b)', fontSize: 13.5, color: 'var(--text-b)', lineHeight: 1.65 }}>{problem}</p>
                  </div>
                  <div style={{ marginBottom: 11 }}>
                    <div style={{ fontFamily: 'var(--font-b)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#888', marginBottom: 5 }}>The Solution</div>
                    <p style={{ fontFamily: 'var(--font-b)', fontSize: 13.5, color: 'var(--text-b)', lineHeight: 1.65 }}>{solution}</p>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontFamily: 'var(--font-b)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#888', marginBottom: 5 }}>Designed to</div>
                    <p style={{ fontFamily: 'var(--font-b)', fontSize: 13.5, color: 'var(--text-b)', lineHeight: 1.65 }}>{designed}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                    {tags.map(t => <span key={t} className="ttag">{t}</span>)}
                  </div>
                </div>
              </div>
            </FadeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
const STATS = [
  { Icon: UserCheck, label: 'Every project handled personally', desc: 'No agencies, no outsourcing, no disappearing acts.' },
  { Icon: Users,     label: 'Plain English — no tech jargon',   desc: 'Built for business owners, not engineers.' },
  { Icon: TrendingUp, label: 'Built for small business budgets', desc: 'High value at prices that actually make sense.' },
];

function About() {
  return (
    <section id="about" className="sec" style={{ background: '#F5F3EE' }}>
      <div className="wrap">
        <RevealSection>
          <div className="about-row" style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
            {/* Left — text */}
            <div style={{ flex: '0 0 58%', maxWidth: '58%' }}>
              <span className="eyebrow">Who's Behind This</span>
              <h2 className="sec-h" style={{ fontSize: '2.1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 22, lineHeight: 1.2 }}>
                Hi, I'm Bryttani — I Make Technology Work for Real Businesses.
              </h2>
              <p style={{ fontFamily: 'var(--font-b)', fontSize: 16.5, lineHeight: 1.8, color: 'var(--text-b)' }}>
                I'm a web developer and AI automation specialist based in Lexington, SC. I work with small business owners, entrepreneurs, and service providers who know they need better systems but don't have time to figure out the tech on their own.
              </p>
              <p style={{ fontFamily: 'var(--font-b)', fontSize: 16.5, lineHeight: 1.8, color: 'var(--text-b)', marginTop: 16 }}>
                My job is to take the complexity off your plate and hand you something that actually works — built in plain English, without the jargon, without the overwhelm. I handle every project personally. No agencies, no outsourcing, no disappearing acts.
              </p>
            </div>
            {/* Right — stats */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}>
              {STATS.map(({ Icon, label, desc }) => (
                <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color="#1A6B72" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-h)', fontSize: 15, fontWeight: 700, color: 'var(--text-h)', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-b)', fontSize: 13.5, color: '#7A7A7A', lineHeight: 1.55 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Smart Move ───────────────────────────────────────────────────────────────
const POINTS = [
  {
    num: '1',
    title: 'Build Demos First',
    body: "Instead of waiting for clients to take a chance on you, build 3–5 demonstration projects for real business types. A chatbot for a salon. An intake system for a coach. A FAQ assistant for a restaurant. Show people what's possible.",
  },
  {
    num: '2',
    title: 'Record Short Walkthroughs',
    body: 'A 60-second screen recording of a demo doing something useful is worth more than any pitch deck. Post it on LinkedIn. Share it with local businesses. Let the work speak.',
  },
  {
    num: '3',
    title: 'Lead With the Problem, Not the Tech',
    body: "Don't say 'I build AI chatbots.' Say 'I help salons stop losing leads after hours.' Speak to the business problem, not the technical solution.",
  },
];

function SmartMove() {
  return (
    <section className="sec" style={{ background: 'var(--bg)' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="eyebrow">The Strategy</span>
            <h2 className="sec-h" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
              The Smartest Thing a New AI Business Can Do.
            </h2>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 17, color: '#6A6A6A', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
              Not 'I'm open for work.' But: 'Here's how I automated this business process.'
            </p>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="sm-row" style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>
            {/* Left — pull quote */}
            <div style={{ flex: '0 0 38%', maxWidth: '38%' }}>
              <div style={{ borderLeft: '3px solid var(--teal)', paddingLeft: 28 }}>
                <div style={{ fontFamily: 'var(--font-h)', fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-h)', letterSpacing: '-0.03em', marginBottom: 16 }}>
                  "Stop announcing.<br />Start demonstrating."
                </div>
                <p style={{ fontFamily: 'var(--font-b)', fontSize: 15, color: '#888', lineHeight: 1.65 }}>
                  The demo-first approach is the fastest path from zero to paying clients in the AI automation space.
                </p>
              </div>
            </div>
            {/* Right — 3 points */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
              {POINTS.map(({ num, title, body }) => (
                <div key={num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-h)', fontSize: 15, fontWeight: 700, color: 'var(--teal)' }}>{num}</span>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-h)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</h4>
                    <p style={{ fontFamily: 'var(--font-b)', fontSize: 15, color: 'var(--text-b)', lineHeight: 1.75 }}>{body}</p>
                  </div>
                </div>
              ))}
              {/* Callout box */}
              <div style={{ border: '1.5px solid var(--teal)', borderRadius: 10, padding: '20px 24px', background: 'rgba(26,107,114,0.03)', marginTop: 8 }}>
                <p style={{ fontFamily: 'var(--font-b)', fontSize: 15, color: 'var(--text-b)', lineHeight: 1.75, fontStyle: 'italic' }}>
                  "Your real edge isn't being the best engineer in the world. It's becoming the person who makes AI feel useful and understandable for small businesses. That is a massive, underserved market."
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="sec" style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #F0EEE8 100%)' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
            <h2 className="sec-h" style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 18 }}>
              Ready to See What's Possible for Your Business?
            </h2>
            <p style={{ fontFamily: 'var(--font-b)', fontSize: 17, color: '#6A6A6A', lineHeight: 1.75, marginBottom: 40 }}>
              Let's talk about where you're losing time, where leads are slipping through, and what one smart system could change. No tech jargon. Just a real conversation.
            </p>
            <div className="cta-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
              <a href="#contact" className="btn-p">Book a Consultation <ArrowRight size={16} /></a>
              <a href="#services" className="btn-o">View Services</a>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'xjglrwzr';

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setSubmitted(true); form.reset(); }
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="sec" style={{ background: '#F5F3EE' }}>
      <div className="wrap">
        <RevealSection>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="eyebrow">Get in Touch</span>
              <h2 className="sec-h" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
                Let's Figure Out What Your Business Needs.
              </h2>
              <p style={{ fontFamily: 'var(--font-b)', fontSize: 16.5, color: '#6A6A6A', lineHeight: 1.75 }}>
                Fill out the form below and I'll respond within 24 hours with honest thoughts on what would actually help your business — no pressure, no sales pitch.
              </p>
            </div>

            {submitted ? (
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '48px 40px', textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={26} color="#1A6B72" strokeWidth={2.5} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontFamily: 'var(--font-b)', fontSize: 15.5, color: '#6A6A6A', lineHeight: 1.7 }}>
                  Thanks for reaching out. I'll be in touch within 24 hours with honest thoughts on what would actually help your business.
                </p>
              </div>
            ) : (
              <div style={{ background: 'var(--white)', borderRadius: 12, padding: '40px 40px 36px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="New Inquiry — ohbloom.com" />

                  {/* Name + Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 22px' }}>
                    <div className="fgroup">
                      <label className="flabel">Your Name *</label>
                      <input className="finput" type="text" name="name" required placeholder="Your name" />
                    </div>
                    <div className="fgroup">
                      <label className="flabel">Email Address *</label>
                      <input className="finput" type="email" name="email" required placeholder="Your email address" />
                    </div>
                  </div>

                  <div className="fgroup">
                    <label className="flabel">Business Name</label>
                    <input className="finput" type="text" name="business" placeholder="Your business or brand name" />
                  </div>

                  {/* ── The three key fields ── */}

                  {/* 1. Industry */}
                  <div className="fgroup">
                    <label className="flabel">Industry *</label>
                    <div className="fsel-wrap">
                      <select className="fselect" name="industry" required>
                        <option value="">Select your industry</option>
                        {[
                          'Beauty & Wellness',
                          'Coaching & Consulting',
                          'Food & Beverage',
                          'Health & Fitness',
                          'Real Estate',
                          'Professional Services',
                          'E-Commerce',
                          'Other',
                        ].map(o => <option key={o}>{o}</option>)}
                      </select>
                      <span className="fsel-arrow">▾</span>
                    </div>
                  </div>

                  {/* 2. Project Goal */}
                  <div className="fgroup">
                    <label className="flabel">Project Goal *</label>
                    <div className="fsel-wrap">
                      <select className="fselect" name="project_goal" required>
                        <option value="">What do you need help with?</option>
                        {[
                          'AI Chatbot Setup',
                          'Website + AI Chatbot',
                          'Lead Capture Automation',
                          'Client Onboarding Automation',
                          'Custom Web App',
                          'Full Website or Redesign',
                          "Not sure — let's talk",
                        ].map(o => <option key={o}>{o}</option>)}
                      </select>
                      <span className="fsel-arrow">▾</span>
                    </div>
                  </div>

                  {/* 3. Budget */}
                  <div className="fgroup">
                    <label className="flabel">Budget *</label>
                    <div className="fsel-wrap">
                      <select className="fselect" name="budget" required>
                        <option value="">Select a budget range</option>
                        {[
                          'Under $500',
                          '$500–$1,500',
                          '$1,500–$3,000',
                          '$3,000–$6,000',
                          '$6,000+',
                          'Not sure yet',
                        ].map(o => <option key={o}>{o}</option>)}
                      </select>
                      <span className="fsel-arrow">▾</span>
                    </div>
                  </div>

                  {/* Open-ended challenge */}
                  <div className="fgroup">
                    <label className="flabel">Anything else I should know?</label>
                    <textarea className="ftarea" name="message" placeholder="Tell me what's taking up too much of your time, where leads are falling through, or what you wish your website was doing for you..." />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    style={{ width: '100%', height: 48, background: sending ? '#599EA3' : 'var(--teal)', color: 'white', border: 'none', borderRadius: 8, fontFamily: 'var(--font-b)', fontSize: 16, fontWeight: 600, cursor: sending ? 'wait' : 'pointer', transition: 'background 0.2s', marginBottom: 12 }}
                  >
                    {sending ? 'Sending...' : 'Send My Inquiry'}
                  </button>
                  <p style={{ textAlign: 'center', fontFamily: 'var(--font-b)', fontSize: 13, color: '#9A9690' }}>
                    I respond to every message within 24 hours. No obligation, no pressure.
                  </p>
                </form>
              </div>
            )}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)', padding: '28px 0' }}>
      <div className="wrap">
        <div className="footer-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-h)', fontSize: 15, fontWeight: 500, color: '#1C1C1E' }}>
            Bryttani Patterson
          </span>
          <span style={{ fontFamily: 'var(--font-b)', fontSize: 13, color: '#9A9690', textAlign: 'center' }}>
            © 2026 · ohbloom.com · Lexington, SC · A division of Bloom Property Solutions LLC
          </span>
          <div className="footer-icons" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9ABBBE', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1A6B72'} onMouseLeave={e => e.currentTarget.style.color = '#9ABBBE'} aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:hello@ohbloom.com" style={{ color: '#9ABBBE', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1A6B72'} onMouseLeave={e => e.currentTarget.style.color = '#9ABBBE'} aria-label="Email">
              <Mail size={18} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function FreelanceLanding() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Offers />
        <Portfolio />
        <About />
        <SmartMove />
        <CTASection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
