import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';

// ─── Fonts ───────────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    if (document.getElementById('linkedin-slides-fonts')) return;
    const link = document.createElement('link');
    link.id = 'linkedin-slides-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

// ─── Shared tokens ───────────────────────────────────────────────────────────
const T = {
  bg:     '#FAFAF8',
  teal:   '#1A6B72',
  tealLt: '#E8F4F5',
  amber:  '#E8913A',
  dark:   '#1C1C1E',
  muted:  '#4A4A4A',
  border: '#E2E2DE',
  white:  '#ffffff',
};

const heading = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const body    = { fontFamily: "'Inter', sans-serif" };

// ─── Bloom mark (inline SVG) ─────────────────────────────────────────────────
function BloomMark({ size = 28, bg = T.teal, petals = '#fff', center = T.amber }) {
  const c = size / 2;
  const r = size * 0.22;
  const ry = size * 0.44;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0 }}>
      <rect width={size} height={size} rx={size * 0.18} fill={bg} />
      <g transform={`translate(${c},${c})`}>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={deg} cx="0" cy={-r * 2.6} rx={r} ry={ry}
            fill={petals} opacity={[0.95,0.75,0.58,0.68,0.85][i]}
            transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r={r * 1.1} fill={center} />
      </g>
    </svg>
  );
}

// ─── Chat bubble helpers ──────────────────────────────────────────────────────
function Bubble({ from, text, style }) {
  const isBot = from === 'bot';
  return (
    <div style={{
      display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: 10, ...style,
    }}>
      {isBot && (
        <div style={{ marginRight: 8, marginTop: 2 }}>
          <BloomMark size={22} />
        </div>
      )}
      <div style={{
        maxWidth: '78%',
        background: isBot ? T.teal : '#E8F4F5',
        color: isBot ? '#fff' : T.dark,
        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        padding: '10px 14px',
        ...body,
        fontSize: 13,
        lineHeight: 1.45,
        fontWeight: 400,
      }}>
        {text}
      </div>
    </div>
  );
}

// ─── Slide 1 — The Hook ───────────────────────────────────────────────────────
function Slide1() {
  return (
    <div style={{
      width: 1080, height: 1080, background: T.bg,
      borderTop: `6px solid ${T.teal}`,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '44px 64px 0' }}>
        <BloomMark size={32} />
        <span style={{ ...heading, fontSize: 15, fontWeight: 600, color: T.teal, letterSpacing: 0.5 }}>ohbloom.com</span>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', padding: '48px 64px 56px' }}>
        {/* Left 58% */}
        <div style={{ width: '58%', paddingRight: 52, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ ...body, fontSize: 13, fontWeight: 600, color: T.amber, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
            FOR SMALL BUSINESS OWNERS
          </p>
          <h1 style={{
            ...heading, fontSize: 68, fontWeight: 800, lineHeight: 1.08,
            color: T.dark, margin: '0 0 36px',
          }}>
            Your website should be{' '}
            <span style={{ color: T.teal }}>capturing leads</span>{' '}
            while you sleep.
          </h1>
          <p style={{ ...body, fontSize: 19, color: T.muted, lineHeight: 1.6, margin: 0 }}>
            Most small business sites sit there looking pretty — and doing nothing.
            Here's what a $500 AI chatbot changes.
          </p>
          {/* Tag */}
          <div style={{
            marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 10,
            background: T.tealLt, borderRadius: 40, padding: '10px 20px',
            alignSelf: 'flex-start',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.teal }} />
            <span style={{ ...body, fontSize: 14, color: T.teal, fontWeight: 600 }}>Swipe to see the 5 things it does →</span>
          </div>
        </div>

        {/* Right 42% — chat mockup */}
        <div style={{
          width: '42%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 340, background: T.white,
            borderRadius: 20, boxShadow: '0 8px 48px rgba(26,107,114,0.12)',
            overflow: 'hidden', border: `1px solid ${T.border}`,
          }}>
            {/* Chat header */}
            <div style={{
              background: T.teal, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <BloomMark size={32} bg="rgba(255,255,255,0.18)" />
              <div>
                <div style={{ ...heading, color: '#fff', fontWeight: 700, fontSize: 15 }}>Bloom AI</div>
                <div style={{ ...body, color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>● Online now</div>
              </div>
            </div>
            {/* Messages */}
            <div style={{ padding: '20px 16px 8px' }}>
              <Bubble from="bot" text="Hey! 👋 I'm Bloom — happy to help. What brings you by today?" />
              <Bubble from="user" text="Do you offer website packages under $1,000?" />
              <Bubble from="bot" text="Yes! Our starter package starts at $500 and includes a fully functional site + AI chatbot. Want me to send you the details?" />
              <Bubble from="user" text="Yes please!" />
            </div>
            {/* Input bar */}
            <div style={{
              borderTop: `1px solid ${T.border}`, padding: '12px 16px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <div style={{
                flex: 1, background: '#F5F5F3', borderRadius: 20,
                padding: '10px 14px', ...body, fontSize: 13, color: '#AAA',
              }}>
                Type a message…
              </div>
              <div style={{
                width: 36, height: 36, background: T.teal, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        height: 6, background: `linear-gradient(90deg, ${T.teal} 0%, ${T.amber} 100%)`,
      }} />
    </div>
  );
}

// ─── Slide 2 — The Value ──────────────────────────────────────────────────────
const VALUE_ITEMS = [
  { n: '01', text: 'Answers FAQs 24/7 so you stop repeating yourself on the phone' },
  { n: '02', text: 'Collects name, email, and service interest before you ever say hello' },
  { n: '03', text: 'Books discovery calls directly into your calendar — no back-and-forth' },
  { n: '04', text: 'Follows up with leads who ghost you (politely, automatically)' },
  { n: '05', text: 'Escalates urgent requests to your phone in real time' },
];

function Slide2() {
  return (
    <div style={{
      width: 1080, height: 1080, background: T.bg,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '44px 64px 0' }}>
        <BloomMark size={32} />
        <span style={{ ...heading, fontSize: 15, fontWeight: 600, color: T.teal, letterSpacing: 0.5 }}>ohbloom.com</span>
        <div style={{ marginLeft: 'auto', ...body, fontSize: 14, color: T.muted }}>2 / 5</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 80px' }}>
        <p style={{ ...body, fontSize: 13, fontWeight: 600, color: T.amber, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
          THE VALUE BREAKDOWN
        </p>
        <h2 style={{ ...heading, fontSize: 54, fontWeight: 800, color: T.dark, lineHeight: 1.1, margin: '0 0 52px' }}>
          5 things a $500 AI chatbot<br />does for your business
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {VALUE_ITEMS.map(({ n, text }) => (
            <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              <div style={{
                ...heading, fontSize: 28, fontWeight: 800, color: T.teal,
                minWidth: 44, lineHeight: 1, paddingTop: 2,
              }}>
                {n}
              </div>
              <div style={{
                flex: 1, borderLeft: `2px solid ${T.border}`, paddingLeft: 24,
                ...body, fontSize: 20, color: T.dark, lineHeight: 1.5, fontWeight: 400,
              }}>
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        background: T.teal, padding: '20px 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ ...body, color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          All five. One chatbot. One time.
        </span>
        <span style={{ ...heading, color: '#fff', fontWeight: 700, fontSize: 18 }}>→ Slide 3</span>
      </div>
    </div>
  );
}

// ─── Slide 3 — Credibility ────────────────────────────────────────────────────
function Slide3() {
  return (
    <div style={{
      width: 1080, height: 1080, background: T.dark,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Subtle texture circles */}
      <div style={{ position: 'absolute', top: -180, right: -180, width: 540, height: 540, borderRadius: '50%', background: 'rgba(26,107,114,0.12)' }} />
      <div style={{ position: 'absolute', bottom: -120, left: -120, width: 360, height: 360, borderRadius: '50%', background: 'rgba(232,145,58,0.07)' }} />

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '44px 64px 0', position: 'relative' }}>
        <BloomMark size={32} bg="rgba(255,255,255,0.12)" petals="#fff" center={T.amber} />
        <span style={{ ...heading, fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 }}>ohbloom.com</span>
        <div style={{ marginLeft: 'auto', ...body, fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>3 / 5</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 80px', position: 'relative' }}>
        <p style={{ ...body, fontSize: 13, fontWeight: 600, color: T.amber, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
          REAL RESULTS
        </p>

        <h2 style={{
          ...heading, fontSize: 58, fontWeight: 300, fontStyle: 'italic',
          color: '#fff', lineHeight: 1.2, margin: '0 0 52px',
        }}>
          "I used to spend 2 hours a day<br />
          answering the same 6 questions.<br />
          <span style={{ fontWeight: 700, fontStyle: 'normal', color: T.teal }}>Now I don't."</span>
        </h2>

        {/* Callout */}
        <div style={{
          borderLeft: `4px solid ${T.teal}`,
          paddingLeft: 28,
          marginBottom: 52,
        }}>
          <p style={{ ...body, fontSize: 20, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>
            A salon owner in Columbia, SC went from fielding 40+ DMs a week to
            receiving pre-qualified booking requests on autopilot — in 10 days.
          </p>
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { val: '40+', label: 'Hours saved / month' },
            { val: '3×', label: 'More qualified leads' },
            { val: '10', label: 'Days to go live' },
          ].map(({ val, label }) => (
            <div key={val} style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '28px 24px', textAlign: 'center',
            }}>
              <div style={{ ...heading, fontSize: 44, fontWeight: 800, color: T.teal, lineHeight: 1 }}>{val}</div>
              <div style={{ ...body, fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${T.teal}, ${T.amber})` }} />
    </div>
  );
}

// ─── Slide 4 — Demo Hook ──────────────────────────────────────────────────────
function Slide4() {
  const msgs = [
    { from: 'bot', text: 'Hi! Welcome to Glow Studio 💅 How can I help you today?' },
    { from: 'user', text: 'What\'s your availability for a full set this Friday?' },
    { from: 'bot', text: 'We have 11am and 2pm open on Friday! Which works better for you?' },
    { from: 'user', text: '2pm works!' },
    { from: 'bot', text: 'Booked! ✅ You\'ll get a confirmation text shortly. See you then!' },
  ];

  return (
    <div style={{
      width: 1080, height: 1080, background: T.bg,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '44px 64px 0' }}>
        <BloomMark size={32} />
        <span style={{ ...heading, fontSize: 15, fontWeight: 600, color: T.teal, letterSpacing: 0.5 }}>ohbloom.com</span>
        <div style={{ marginLeft: 'auto', ...body, fontSize: 14, color: T.muted }}>4 / 5</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', padding: '40px 64px 0' }}>
        {/* Left 52% */}
        <div style={{ width: '52%', paddingRight: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ ...body, fontSize: 13, fontWeight: 600, color: T.amber, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
            LIVE DEMO
          </p>
          <h2 style={{ ...heading, fontSize: 52, fontWeight: 800, color: T.dark, lineHeight: 1.1, margin: '0 0 28px' }}>
            Watch Bloom AI
            book an appointment{' '}
            <span style={{ color: T.teal }}>in 60 seconds.</span>
          </h2>
          <p style={{ ...body, fontSize: 18, color: T.muted, lineHeight: 1.6, margin: '0 0 36px' }}>
            This is a real chatbot built for Glow Studio, a fictional nail salon.
            No human involvement. No missed leads.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: T.teal, borderRadius: 40, padding: '14px 24px',
            alignSelf: 'flex-start',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span style={{ ...heading, fontSize: 15, fontWeight: 700, color: '#fff' }}>Try the demo at ohbloom.com/#glow</span>
          </div>
        </div>

        {/* Right 48% — chat */}
        <div style={{ width: '48%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: 360, background: T.white,
            borderRadius: 20, boxShadow: '0 8px 48px rgba(26,107,114,0.13)',
            overflow: 'hidden', border: `1px solid ${T.border}`,
          }}>
            {/* Chat header */}
            <div style={{
              background: T.teal, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                ...heading, color: '#fff', fontWeight: 700, fontSize: 14,
              }}>GS</div>
              <div>
                <div style={{ ...heading, color: '#fff', fontWeight: 700, fontSize: 15 }}>Glow Studio</div>
                <div style={{ ...body, color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>● Powered by Bloom AI</div>
              </div>
            </div>
            {/* Messages */}
            <div style={{ padding: '16px 14px 8px' }}>
              {msgs.map((m, i) => (
                <Bubble key={i} from={m.from} text={m.text} style={{ marginBottom: i === msgs.length - 1 ? 4 : 10 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ background: T.teal, padding: '18px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 }}>
        <span style={{ ...body, color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          Built in under 2 weeks. Yours for $500.
        </span>
        <span style={{ ...heading, color: '#fff', fontWeight: 700, fontSize: 18 }}>→ Final slide</span>
      </div>
    </div>
  );
}

// ─── Slide 5 — Direct Offer ───────────────────────────────────────────────────
const OFFERS = [
  {
    tier: 'Starter',
    price: '$500',
    desc: 'AI chatbot on your existing site. Answers FAQs, collects leads, books calls.',
    tags: ['FAQ bot', 'Lead capture', 'Calendar booking'],
  },
  {
    tier: 'Growth',
    price: '$900',
    desc: 'New website + AI chatbot. Clean, fast, optimized for conversions.',
    tags: ['Full website', 'AI chatbot', 'SEO setup'],
  },
  {
    tier: 'Full Stack',
    price: '$1,500',
    desc: 'Website + chatbot + automation flows. Your business, on autopilot.',
    tags: ['Everything', 'Email flows', 'Zapier automations'],
  },
];

function Slide5() {
  return (
    <div style={{
      width: 1080, height: 1080, background: T.bg,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '44px 64px 0' }}>
        <BloomMark size={32} />
        <span style={{ ...heading, fontSize: 15, fontWeight: 600, color: T.teal, letterSpacing: 0.5 }}>ohbloom.com</span>
        <div style={{ marginLeft: 'auto', ...body, fontSize: 14, color: T.muted }}>5 / 5</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px 80px' }}>
        <p style={{ ...body, fontSize: 13, fontWeight: 600, color: T.amber, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>
          READY TO START?
        </p>
        <h2 style={{ ...heading, fontSize: 52, fontWeight: 800, color: T.dark, lineHeight: 1.1, margin: '0 0 44px' }}>
          Simple pricing. No tech jargon.<br />
          <span style={{ color: T.teal }}>Just results.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {OFFERS.map(({ tier, price, desc, tags }) => (
            <div key={tier} style={{
              display: 'flex', alignItems: 'center', gap: 0,
              background: T.white, borderRadius: 16,
              border: `1px solid ${T.border}`,
              borderLeft: `5px solid ${T.amber}`,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '22px 28px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
                  <span style={{ ...heading, fontSize: 18, fontWeight: 700, color: T.dark }}>{tier}</span>
                  <span style={{ ...heading, fontSize: 32, fontWeight: 800, color: T.teal }}>{price}</span>
                </div>
                <p style={{ ...body, fontSize: 16, color: T.muted, margin: '0 0 12px', lineHeight: 1.5 }}>{desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tags.map(t => (
                    <span key={t} style={{
                      ...body, fontSize: 12, fontWeight: 600, color: T.teal,
                      background: T.tealLt, borderRadius: 20, padding: '4px 12px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div style={{
        background: T.teal, padding: '22px 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ ...heading, color: '#fff', fontWeight: 800, fontSize: 20 }}>
            DM me "BLOOM" to get started.
          </div>
          <div style={{ ...body, color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>
            Or book a free 20-min call at ohbloom.com
          </div>
        </div>
        <div style={{
          background: T.amber, borderRadius: 40, padding: '12px 28px',
          ...heading, color: '#fff', fontWeight: 700, fontSize: 16,
        }}>
          Let's Talk →
        </div>
      </div>
    </div>
  );
}

// ─── All slides ───────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 1, label: 'The Hook',        Comp: Slide1 },
  { id: 2, label: 'The Value',       Comp: Slide2 },
  { id: 3, label: 'Credibility',     Comp: Slide3 },
  { id: 4, label: 'Demo Hook',       Comp: Slide4 },
  { id: 5, label: 'Direct Offer',    Comp: Slide5 },
];

// ─── Download hook ────────────────────────────────────────────────────────────
function useSlideDownload(idx) {
  const hiddenRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const download = useCallback(async () => {
    if (!hiddenRef.current) return;
    setStatus('rendering');
    try {
      await new Promise(r => setTimeout(r, 200));
      const canvas = await html2canvas(hiddenRef.current, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: null, width: 1080, height: 1080, logging: false,
      });
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ohbloom-linkedin-slide-${idx + 1}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
      setStatus('done');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  }, [idx]);

  return { hiddenRef, status, download };
}

// ─── Thumbnail ────────────────────────────────────────────────────────────────
function Thumb({ slide, active, onClick }) {
  const { Comp } = slide;
  const scale = 96 / 1080;
  return (
    <button onClick={onClick} style={{
      border: 'none', padding: 0, cursor: 'pointer', background: 'none',
      outline: active ? `2px solid ${T.teal}` : '2px solid transparent',
      borderRadius: 8, overflow: 'hidden',
      width: 96, height: 96, flexShrink: 0,
      position: 'relative',
      boxShadow: active ? `0 0 0 2px ${T.teal}` : '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 1080, height: 1080,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
      }}>
        <Comp />
      </div>
    </button>
  );
}

// ─── Slide variants — use % so they work at any scaled width ─────────────────
const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

// ─── Main viewer ──────────────────────────────────────────────────────────────
export default function LinkedInSlides() {
  useFonts();

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };
  const prev = () => idx > 0 && go(idx - 1);
  const next = () => idx < SLIDES.length - 1 && go(idx + 1);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  });

  const { Comp } = SLIDES[idx];
  const { hiddenRef, status, download } = useSlideDownload(idx);
  const viewScale = Math.min(680 / 1080, 1);

  return (
    <div style={{
      minHeight: '100vh', background: '#F0EFED',
      fontFamily: "'Inter', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 24px 80px',
    }}>
      {/* Header */}
      <div style={{
        width: '100%', maxWidth: 860,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <BloomMark size={36} />
          <div>
            <div style={{ ...heading, fontSize: 18, fontWeight: 800, color: T.dark }}>LinkedIn Slides</div>
            <div style={{ ...body, fontSize: 13, color: T.muted }}>ohbloom.com — 5-part carousel</div>
          </div>
        </div>
        <button
          onClick={download}
          disabled={status !== 'idle'}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: status === 'done' ? '#22A060' : T.teal,
            color: '#fff', border: 'none', borderRadius: 40,
            padding: '12px 24px', cursor: status !== 'idle' ? 'wait' : 'pointer',
            ...heading, fontSize: 15, fontWeight: 700,
            transition: 'background 0.3s',
          }}
        >
          {status === 'rendering' ? 'Rendering…' : status === 'done' ? '✓ Saved!' : '↓ Download PNG'}
        </button>
      </div>

      {/* Slide viewer */}
      <div style={{
        width: '100%', maxWidth: 860,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 24,
      }}>
        {/* Outer clip — sized to visual dimensions so nothing bleeds out */}
        <div style={{
          position: 'relative',
          width: 1080 * viewScale,
          height: 1080 * viewScale,
          overflow: 'hidden',
          borderRadius: 8,
          boxShadow: '0 16px 64px rgba(0,0,0,0.18)',
        }}>
          <AnimatePresence custom={dir} initial={false} mode="popLayout">
            <motion.div
              key={idx}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 340, damping: 36 }}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: 1080 * viewScale,
                height: 1080 * viewScale,
              }}
            >
              {/* Scale wrapper — separate from motion so transforms don't conflict */}
              <div style={{
                width: 1080, height: 1080,
                transform: `scale(${viewScale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}>
                <Comp />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={prev} disabled={idx === 0} style={{
            width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${T.border}`,
            background: idx === 0 ? '#E8E8E5' : T.white, cursor: idx === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={idx === 0 ? '#CCC' : T.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span style={{ ...body, fontSize: 15, color: T.muted, fontWeight: 500 }}>
            {idx + 1} / {SLIDES.length} — {SLIDES[idx].label}
          </span>
          <button onClick={next} disabled={idx === SLIDES.length - 1} style={{
            width: 44, height: 44, borderRadius: '50%', border: `1.5px solid ${T.border}`,
            background: idx === SLIDES.length - 1 ? '#E8E8E5' : T.white,
            cursor: idx === SLIDES.length - 1 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={idx === SLIDES.length - 1 ? '#CCC' : T.dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Thumbnail strip */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {SLIDES.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Thumb slide={s} active={i === idx} onClick={() => go(i)} />
              <span style={{ ...body, fontSize: 11, color: i === idx ? T.teal : T.muted, fontWeight: i === idx ? 600 : 400 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden capture div */}
      <div style={{ position: 'fixed', left: -99999, top: 0, zIndex: -1, pointerEvents: 'none' }}>
        <div ref={hiddenRef} style={{ width: 1080, height: 1080 }}>
          <Comp />
        </div>
      </div>
    </div>
  );
}
