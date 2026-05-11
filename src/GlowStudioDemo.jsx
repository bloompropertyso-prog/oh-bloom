// GlowStudioDemo.jsx
// npm install framer-motion lucide-react   (already installed in this project)
// Add to App.jsx: import GlowStudioDemo and handle hash '#glow'
// Route: navigate to localhost:5173/#glow to view this page

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  blush:     '#F9ECE8',
  rose:      '#B5546A',
  roseDark:  '#9A3D55',
  roseLight: '#F5D6D6',
  white:     '#FEFEFC',
  text:      '#1C1C1E',
  muted:     '#6B6B68',
  border:    '#EDE8E4',
};
const fH = "'Playfair Display', Georgia, serif";
const fB = "'Jost', system-ui, sans-serif";

// ─── Voiceflow config ─────────────────────────────────────────────────────────
// Replace YOUR_PROJECT_ID_HERE with your Voiceflow project ID once you create the agent
// Your share URL was: https://creator.voiceflow.com/share/6a020ba28cfd71e9980ebd01/...
const VOICEFLOW_PROJECT_ID = '6a020ba28cfd71e9980ebd01';

// ─── Demo conversation script ─────────────────────────────────────────────────
const SCRIPT = [
  { at: 0,     from: 'bot',     text: 'Hi! Welcome to Glow Studio 💅 How can I help you today?' },
  { at: 2000,  from: 'user',    text: 'Do you have any openings this week for a full set?' },
  { at: 4000,  from: 'typing' },
  { at: 5500,  from: 'bot',     text: 'Yes! Tuesday & Thursday have availability. Can I grab your name and email to hold a spot?' },
  { at: 7500,  from: 'user',    text: "Sure! It's Sarah." },
  { at: 9000,  from: 'typing' },
  { at: 10000, from: 'bot',     text: 'Got it, Sarah! 🌸 What\'s your email so we can confirm?' },
  { at: 12000, from: 'user',    text: 'sarah@gmail.com' },
  { at: 13500, from: 'typing' },
  { at: 14500, from: 'bot',     text: "Perfect! You're all set for Thursday at 2pm. We'll send a confirmation to sarah@gmail.com. See you soon! ✨" },
  { at: 16000, from: 'cta' },
];

// ─── Global styles injected once ──────────────────────────────────────────────
function GlowStyles() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Jost:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.id = 'glow-styles';
    style.textContent = `
      .glow-page *, .glow-page *::before, .glow-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
      .glow-page { font-family: ${fB}; color: ${C.text}; background: ${C.white}; min-height: 100vh; }
      .glow-wrap { max-width: 1120px; margin: 0 auto; padding: 0 32px; }
      .glow-nav { position: sticky; top: 0; z-index: 100; background: ${C.white}; transition: box-shadow 0.25s; }
      .glow-nav.scrolled { box-shadow: 0 2px 24px rgba(0,0,0,0.08); }
      .glow-sec { padding: 88px 0; }
      .glow-nav-links a { font-family: ${fB}; font-size: 14px; font-weight: 500; color: ${C.muted}; text-decoration: none; letter-spacing: 0.02em; transition: color 0.15s; }
      .glow-nav-links a:hover { color: ${C.rose}; }
      .glow-service-card { background: ${C.white}; border-radius: 16px; padding: 28px 24px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); border: 1px solid #F0EAE7; border-top: 3px solid transparent; transition: border-top-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: pointer; }
      .glow-service-card:hover { border-top-color: ${C.rose}; transform: translateY(-4px); box-shadow: 0 8px 32px rgba(181,84,106,0.14); }
      @keyframes glow-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
      .glow-typing-dot { width: 7px; height: 7px; border-radius: 50%; background: ${C.rose}; opacity: 0.7; animation: glow-bounce 1.2s infinite; }
      .glow-typing-dot:nth-child(2){animation-delay:0.15s} .glow-typing-dot:nth-child(3){animation-delay:0.3s}
      .glow-msg-scroll::-webkit-scrollbar{width:4px} .glow-msg-scroll::-webkit-scrollbar-thumb{background:${C.roseLight};border-radius:4px}
      @media(max-width:900px){
        .glow-hero-inner{flex-direction:column!important}
        .glow-hero-photo{width:100%!important;height:300px!important}
        .glow-hero-text h1{font-size:40px!important}
        .glow-services-grid{grid-template-columns:1fr 1fr!important}
        .glow-about-row{flex-direction:column!important;gap:28px!important;text-align:center}
        .glow-wrap{padding:0 20px}
        .glow-sec{padding:56px 0}
        .glow-nav-links{display:none}
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      const s = document.getElementById('glow-styles');
      if (s) document.head.removeChild(s);
    };
  }, []);
  return null;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`glow-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="glow-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <span style={{ fontFamily: fH, fontSize: 22, fontWeight: 700, color: C.rose, letterSpacing: '-0.01em' }}>
          Glow Studio
        </span>
        <div className="glow-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <a href="#">Services</a>
          <a href="#">Gallery</a>
          <a href="#">About</a>
          <a href="#" style={{
            fontFamily: fB, fontSize: 14, fontWeight: 600,
            background: C.rose, color: '#fff',
            padding: '9px 22px', borderRadius: 24, textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.roseDark}
          onMouseLeave={e => e.currentTarget.style.background = C.rose}>
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ background: `linear-gradient(140deg, ${C.blush} 0%, #FDF2EE 55%, ${C.white} 100%)`, padding: '72px 0 64px' }}>
      <div className="glow-wrap">
        <div className="glow-hero-inner" style={{ display: 'flex', alignItems: 'center', gap: 64 }}>
          <motion.div className="glow-hero-text" style={{ flex: 1 }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <span style={{ fontFamily: fB, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: C.rose, textTransform: 'uppercase', display: 'block', marginBottom: 18 }}>
              Lexington's Premier Salon
            </span>
            <h1 style={{ fontFamily: fH, fontSize: 54, fontWeight: 800, color: C.text, lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Your Hair,<br />Your Style.<br />
              <span style={{ color: C.rose }}>Your Confidence.</span>
            </h1>
            <p style={{ fontFamily: fB, fontSize: 17, color: C.muted, lineHeight: 1.72, marginBottom: 38, maxWidth: 420 }}>
              Lexington's premier salon — walk-ins welcome, appointments preferred.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#" style={{
                fontFamily: fB, fontSize: 15, fontWeight: 600,
                background: C.rose, color: '#fff',
                padding: '13px 28px', borderRadius: 28, textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s', display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.roseDark; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.rose; e.currentTarget.style.transform = 'none'; }}>
                Book an Appointment →
              </a>
              <a href="#" style={{
                fontFamily: fB, fontSize: 15, fontWeight: 600,
                border: `2px solid ${C.rose}`, color: C.rose,
                padding: '11px 26px', borderRadius: 28, textDecoration: 'none',
                transition: 'background 0.2s', display: 'inline-block',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.blush}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                View Services
              </a>
            </div>
          </motion.div>

          <motion.div className="glow-hero-photo" style={{ flexShrink: 0, width: 440, height: 460, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(181,84,106,0.18)' }}
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&fit=crop"
              alt="Glow Studio salon"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { name: 'Cut & Style',        price: '$65',   desc: 'Great for a fresh look or seasonal change' },
  { name: 'Color & Highlights', price: '$120+', desc: 'Full color, balayage, or highlights' },
  { name: 'Blowout',            price: '$45',   desc: 'Smooth, voluminous finish that lasts' },
  { name: 'Treatment',          price: '$55',   desc: 'Deep conditioning and repair for damaged hair' },
];

function Services() {
  return (
    <section className="glow-sec" style={{ background: '#FDFAF8' }}>
      <div className="glow-wrap">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: fH, fontSize: 40, fontWeight: 700, color: C.text }}>What We Offer</h2>
          <p style={{ fontFamily: fB, fontSize: 16, color: C.muted, marginTop: 12 }}>Professional services for every hair type and goal.</p>
        </div>
        <div className="glow-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {SERVICES.map(s => (
            <div key={s.name} className="glow-service-card">
              <div style={{ fontFamily: fH, fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 10 }}>{s.name}</div>
              <div style={{ fontFamily: fB, fontSize: 24, fontWeight: 700, color: C.rose, marginBottom: 12 }}>{s.price}</div>
              <div style={{ fontFamily: fB, fontSize: 14, color: C.muted, lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</div>
              <a href="#" style={{ fontFamily: fB, fontSize: 13, fontWeight: 600, color: C.rose, textDecoration: 'none' }}>Book now →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About strip ──────────────────────────────────────────────────────────────
function AboutStrip() {
  return (
    <section style={{ background: C.blush, padding: '44px 0' }}>
      <div className="glow-wrap">
        <div className="glow-about-row" style={{ display: 'flex', justifyContent: 'center', gap: 72, textAlign: 'center', alignItems: 'center' }}>
          {[
            { icon: '📍', label: 'Located in Lexington, SC' },
            { icon: '⭐', label: '4.9 stars · 200+ reviews' },
            { icon: '🕐', label: 'Open Tue–Sat · 9am–7pm' },
          ].map(({ icon, label }) => (
            <div key={label}>
              <span style={{ fontSize: 30, display: 'block', marginBottom: 8 }}>{icon}</span>
              <span style={{ fontFamily: fB, fontSize: 15, fontWeight: 500, color: C.rose }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Demo banner ──────────────────────────────────────────────────────────────
function DemoBanner() {
  return (
    <div style={{ background: C.rose, padding: '11px 0' }}>
      <div className="glow-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontFamily: fB, fontSize: 13, color: '#fff', opacity: 0.93, lineHeight: 1.5 }}>
          ✦ This is a demo site built by Bloom Digital to show what AI can do for your salon. Try the chat assistant in the bottom right corner.
        </span>
        <a href="https://ohbloom.com" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: fB, fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap', opacity: 0.9, borderBottom: '1px solid rgba(255,255,255,0.4)' }}>
          Visit ohbloom.com →
        </a>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.text, padding: '36px 0' }}>
      <div className="glow-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: fH, fontSize: 18, fontWeight: 700, color: C.roseLight }}>Glow Studio · Lexington, SC</span>
        <span style={{ fontFamily: fB, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
          Demo built by Bloom Digital ·{' '}
          <a href="https://ohbloom.com" target="_blank" rel="noopener noreferrer" style={{ color: C.roseLight, textDecoration: 'none' }}>ohbloom.com</a>
        </span>
      </div>
    </footer>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.rose, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bot size={14} color="#fff" />
      </div>
      <div style={{ display: 'flex', gap: 5, padding: '11px 14px', background: C.blush, borderRadius: '14px 14px 14px 4px' }}>
        <div className="glow-typing-dot" />
        <div className="glow-typing-dot" />
        <div className="glow-typing-dot" />
      </div>
    </div>
  );
}

// ─── Chat message bubble ──────────────────────────────────────────────────────
function ChatMsg({ from, text }) {
  const isBot = from === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      style={{ display: 'flex', flexDirection: isBot ? 'row' : 'row-reverse', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}>
      {isBot && (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.rose, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bot size={14} color="#fff" />
        </div>
      )}
      <div style={{
        maxWidth: '78%', padding: '10px 14px',
        fontFamily: fB, fontSize: 13, lineHeight: 1.55,
        background: isBot ? C.blush : C.rose,
        color: isBot ? C.text : '#fff',
        borderRadius: isBot ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
      }}>
        {text}
      </div>
    </motion.div>
  );
}

// ─── Chat widget ──────────────────────────────────────────────────────────────
function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [phase, setPhase]         = useState('demo'); // 'demo' | 'live'
  const [messages, setMessages]   = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showCTA, setShowCTA]     = useState(false);
  const [started, setStarted]     = useState(false);
  const scrollRef = useRef(null);
  const timers    = useRef([]);

  // Auto-open after 2s
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Run demo when widget first opens
  useEffect(() => {
    if (!open || started || phase !== 'demo') return;
    setStarted(true);

    SCRIPT.forEach(({ at, from, text }) => {
      const t = setTimeout(() => {
        if (from === 'typing') {
          setShowTyping(true);
        } else if (from === 'cta') {
          setShowTyping(false);
          setShowCTA(true);
        } else {
          setShowTyping(false);
          setMessages(prev => [...prev, { from, text }]);
        }
      }, at);
      timers.current.push(t);
    });

    return () => timers.current.forEach(clearTimeout);
  }, [open, started, phase]);

  // Keep scroll pinned to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, showTyping, showCTA]);

  function launchLive() {
    setPhase('live');

    // If no real project ID, keep widget open to show placeholder
    if (!VOICEFLOW_PROJECT_ID || VOICEFLOW_PROJECT_ID === 'YOUR_PROJECT_ID_HERE') return;

    // Close our widget — Voiceflow will render its own
    setOpen(false);

    if (window.voiceflow?.chat) {
      window.voiceflow.chat.open();
      return;
    }
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    s.onload = () => {
      window.voiceflow?.chat?.load({
        verify: { projectID: VOICEFLOW_PROJECT_ID },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
      setTimeout(() => window.voiceflow?.chat?.open?.(), 500);
    };
    document.body.appendChild(s);
  }

  const panelStyle = {
    position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
    width: 360, borderRadius: 16,
    background: C.white, boxShadow: '0 16px 64px rgba(0,0,0,0.18)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
  };

  const headerStyle = {
    background: C.rose, padding: '14px 16px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  };

  return (
    <>
      {/* Floating toggle button (shown when closed) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="toggle"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', bottom: 'calc(100% + 10px)', right: 0,
                background: C.text, color: '#fff', fontFamily: fB, fontSize: 12, fontWeight: 500,
                padding: '6px 13px', borderRadius: 20, whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              }}>Chat with us</div>
              <button onClick={() => setOpen(true)} style={{
                width: 56, height: 56, borderRadius: '50%',
                background: C.rose, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 22px rgba(181,84,106,0.45)',
              }}>
                <Bot size={24} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo chat panel */}
      <AnimatePresence>
        {open && phase === 'demo' && (
          <motion.div
            key="demo-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={panelStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={17} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: fH, fontSize: 14, fontWeight: 700, color: '#fff' }}>Glow Studio AI</div>
                  <div style={{ fontFamily: fB, fontSize: 11, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                    Always on
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} color="#fff" />
              </button>
            </div>

            {/* Message feed */}
            <div ref={scrollRef} className="glow-msg-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', minHeight: 360, maxHeight: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              {messages.map((m, i) => <ChatMsg key={i} from={m.from} text={m.text} />)}
              <AnimatePresence>{showTyping && <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TypingDots /></motion.div>}</AnimatePresence>

              {showCTA && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginTop: 16, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: fB, fontSize: 12, color: C.muted, marginBottom: 12 }}>
                    That's what AI can do for your business — 24/7, automatically.
                  </p>
                  <button onClick={launchLive} style={{
                    fontFamily: fB, fontSize: 13, fontWeight: 700,
                    background: C.rose, color: '#fff',
                    border: 'none', borderRadius: 22, padding: '10px 22px',
                    cursor: 'pointer', boxShadow: '0 3px 14px rgba(181,84,106,0.35)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.roseDark}
                  onMouseLeave={e => e.currentTarget.style.background = C.rose}>
                    Try it yourself →
                  </button>
                  <div style={{ fontFamily: fB, fontSize: 11, color: C.muted, marginTop: 10 }}>Powered by AI · Built by Bloom Digital</div>
                </motion.div>
              )}
            </div>

            {/* Decorative input bar */}
            <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <input readOnly placeholder="Type a message..." value="" onChange={() => {}} style={{
                flex: 1, border: `1px solid ${C.border}`, borderRadius: 22,
                padding: '8px 14px', fontSize: 13, fontFamily: fB,
                background: '#FAF7F5', outline: 'none', color: C.muted,
              }} />
              <button style={{ width: 34, height: 34, borderRadius: '50%', background: C.rose, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={14} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Live placeholder — shown only when Voiceflow ID is not configured */}
        {open && phase === 'live' && (
          <motion.div
            key="live-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ ...panelStyle, padding: 0 }}>
            <div style={headerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={17} color="#fff" />
                </div>
                <div style={{ fontFamily: fH, fontSize: 14, fontWeight: 700, color: '#fff' }}>Glow Studio AI</div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} color="#fff" />
              </button>
            </div>
            <div style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🌸</div>
              <div style={{ fontFamily: fH, fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10 }}>
                Live AI assistant coming soon
              </div>
              <div style={{ fontFamily: fB, fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>
                Visit{' '}
                <a href="https://ohbloom.com" target="_blank" rel="noopener noreferrer" style={{ color: C.rose, fontWeight: 600 }}>ohbloom.com</a>
                {' '}to learn more about adding a real AI assistant to your business.
              </div>
              <button onClick={() => setOpen(false)} style={{ fontFamily: fB, fontSize: 13, color: C.muted, background: 'none', border: `1px solid ${C.border}`, borderRadius: 22, padding: '8px 20px', cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Demo badge (bottom left) ─────────────────────────────────────────────────
function DemoBadge() {
  return (
    <a href="https://ohbloom.com" target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 1000,
      fontFamily: fB, fontSize: 12, fontWeight: 600,
      background: C.white, color: C.rose,
      border: `1px solid ${C.roseLight}`,
      borderRadius: 22, padding: '8px 16px',
      textDecoration: 'none',
      boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.2s, transform 0.15s',
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(181,84,106,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'none'; }}>
      🌸 Demo by Bloom Digital
    </a>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function GlowStudioDemo() {
  return (
    <div className="glow-page">
      <GlowStyles />
      <DemoBanner />
      <Nav />
      <Hero />
      <Services />
      <AboutStrip />
      <Footer />
      <ChatWidget />
      <DemoBadge />
    </div>
  );
}
