import { useEffect, useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:        '#FAFAF8',
  teal:      '#1A6B72',
  tealLight: '#EBF4F5',
  amber:     '#E8913A',
  amberLight:'#FEF3E8',
  black:     '#1C1C1E',
  muted:     '#6B6B6B',
  soft:      '#8A8680',
  border:    '#E5E0D8',
  white:     '#FFFFFF',
  green:     '#22C55E',
};
const fH = "'Plus Jakarta Sans', sans-serif";
const fB = "'Inter', sans-serif";

// ─── Font Loader ──────────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    if (document.getElementById('li-fonts')) return;
    const link = document.createElement('link');
    link.id = 'li-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── Window Size Hook ─────────────────────────────────────────────────────────
function useWindowSize() {
  const [s, setS] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setS({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return s;
}

// ─── Shared SVG Icons ─────────────────────────────────────────────────────────
const BotIcon = ({ size = 18, color = C.teal }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M12 2v4M8 11V9a4 4 0 018 0v2"/>
    <circle cx="8.5" cy="15.5" r="1.5" fill={color} stroke="none"/>
    <circle cx="15.5" cy="15.5" r="1.5" fill={color} stroke="none"/>
  </svg>
);
const ZapIcon = ({ size = 18, color = C.amber }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const CheckIcon = ({ size = 18, color = C.teal }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SendIcon = ({ size = 13, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const CamIcon = ({ size = 16, color = C.amber }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

// ─── IconChip ─────────────────────────────────────────────────────────────────
function IconChip({ bg, icon }) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {icon}
    </div>
  );
}

// ─── PIECE 1: LinkedIn Banner 1584×396 ────────────────────────────────────────
function LinkedInBanner() {
  const Card = ({ style, iconBg, icon, title, sub, subEl }) => (
    <div style={{
      position: 'absolute', width: 296, background: C.white, borderRadius: 14,
      padding: '15px 18px', boxShadow: '0 4px 28px rgba(26,107,114,0.11), 0 1px 4px rgba(0,0,0,0.05)',
      display: 'flex', alignItems: 'center', gap: 12, ...style,
    }}>
      <IconChip bg={iconBg} icon={icon} />
      <div>
        <div style={{ fontFamily: fH, fontSize: 13, fontWeight: 700, color: C.black }}>{title}</div>
        {sub && <div style={{ fontFamily: fB, fontSize: 12, color: C.soft, marginTop: 3 }}>{sub}</div>}
        {subEl}
      </div>
    </div>
  );

  return (
    <div style={{
      width: 1584, height: 396,
      background: 'linear-gradient(108deg, #FAFAF8 50%, #EDF5F6 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 72px 0 88px', position: 'relative', overflow: 'hidden', fontFamily: fB,
    }}>
      {/* Subtle tinted right wash */}
      <div style={{
        position: 'absolute', right: 0, top: 0, width: 720, height: '100%',
        background: 'linear-gradient(120deg, transparent 0%, rgba(26,107,114,0.035) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Faint circle decoration */}
      <div style={{
        position: 'absolute', right: 420, top: '50%', transform: 'translateY(-50%)',
        width: 320, height: 320, borderRadius: '50%',
        border: '1px solid rgba(26,107,114,0.07)', pointerEvents: 'none',
      }} />

      {/* ── Left: Text ── */}
      <div style={{ flex: '0 0 auto', maxWidth: 740 }}>
        <div style={{
          fontFamily: fH, fontSize: 13, fontWeight: 600, letterSpacing: '0.13em',
          color: C.teal, textTransform: 'uppercase', marginBottom: 18,
        }}>
          Web Developer · AI Automation · Lexington, SC
        </div>
        <div style={{
          fontFamily: fH, fontSize: 50, fontWeight: 800, color: C.black,
          lineHeight: 1.13, marginBottom: 20, letterSpacing: '-0.02em', maxWidth: 680,
        }}>
          Helping small businesses save time and capture more leads.
        </div>
        <div style={{ fontFamily: fB, fontSize: 18, color: C.soft, fontWeight: 400 }}>
          Websites · AI Chatbots · Business Automation · ohbloom.com
        </div>
      </div>

      {/* ── Right: Floating Cards ── */}
      <div style={{ flex: '0 0 auto', width: 370, position: 'relative', height: 286 }}>
        <Card
          style={{ top: 0, left: 44 }}
          iconBg={C.tealLight}
          icon={<BotIcon size={18} />}
          title="AI Chatbot"
          subEl={
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
              <span style={{ fontFamily: fB, fontSize: 12, color: C.soft }}>Active</span>
            </div>
          }
        />
        <Card
          style={{ top: 96, left: 0 }}
          iconBg={C.amberLight}
          icon={<ZapIcon size={18} />}
          title="Lead Captured"
          sub="2:47 am — while you slept"
        />
        <Card
          style={{ top: 192, left: 60 }}
          iconBg={C.tealLight}
          icon={<CheckIcon size={18} />}
          title="Client Onboarded"
          sub="Automatically"
        />
      </div>

      {/* ohbloom.com watermark */}
      <div style={{
        position: 'absolute', bottom: 16, right: 30,
        fontFamily: fH, fontSize: 12, fontWeight: 600, color: C.teal, letterSpacing: '0.05em',
      }}>
        ohbloom.com
      </div>
    </div>
  );
}

// ─── SLIDE 1: The Hook ────────────────────────────────────────────────────────
function Slide1() {
  return (
    <div style={{
      width: 1080, height: 1080, background: C.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '96px 92px', overflow: 'hidden', fontFamily: fB,
    }}>
      {/* Top teal border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: C.teal }} />
      {/* Faint radial glow bottom-right */}
      <div style={{
        position: 'absolute', bottom: -120, right: -120, width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,107,114,0.055) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: fH, fontSize: 88, fontWeight: 800, color: C.black,
          lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: 52,
        }}>
          Your website should be capturing leads while you sleep.
        </div>
        <div style={{
          fontFamily: fB, fontSize: 32, color: C.muted, lineHeight: 1.55, maxWidth: 780,
        }}>
          Most small business websites just sit there. Here's what yours could be doing instead. 👇
        </div>
      </div>

      <div style={{
        paddingTop: 36, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: fH, fontSize: 22, fontWeight: 700, color: C.black }}>Bloom Digital</div>
        <div style={{ fontFamily: fH, fontSize: 20, fontWeight: 700, color: C.teal }}>ohbloom.com</div>
      </div>
    </div>
  );
}

// ─── SLIDE 2: The Value Post ──────────────────────────────────────────────────
function Slide2() {
  const items = [
    { n: '01', bold: 'Answer your FAQs automatically', sub: '— even at 2am' },
    { n: '02', bold: 'Capture visitor names and emails', sub: '— before they leave' },
    { n: '03', bold: 'Guide people to book an appointment', sub: '— without lifting a finger' },
    { n: '04', bold: 'Share your hours, pricing, and services', sub: '— instantly, every time' },
    { n: '05', bold: 'Follow up with leads', sub: '— you would have missed' },
  ];

  return (
    <div style={{
      width: 1080, height: 1080, background: C.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', padding: '72px 80px',
      overflow: 'hidden', fontFamily: fB,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: C.teal }} />

      <div style={{
        fontFamily: fH, fontSize: 50, fontWeight: 800, color: C.black,
        lineHeight: 1.18, letterSpacing: '-0.015em', marginBottom: 44, maxWidth: 860,
      }}>
        5 things a $500 AI chatbot can do for your small business:
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((item) => (
          <div key={item.n} style={{
            display: 'flex', alignItems: 'center', gap: 24,
            background: C.white, borderRadius: 14, padding: '20px 26px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.055)',
          }}>
            <span style={{
              fontFamily: fH, fontSize: 26, fontWeight: 800, color: C.teal,
              flexShrink: 0, width: 38, lineHeight: 1,
            }}>
              {item.n}
            </span>
            <div style={{ lineHeight: 1.45 }}>
              <span style={{ fontFamily: fH, fontSize: 22, fontWeight: 700, color: C.black }}>{item.bold}</span>
              <span style={{ fontFamily: fB, fontSize: 20, color: C.soft }}>{' '}{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 32, paddingTop: 26, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: fB, fontSize: 20, color: C.muted }}>Want this for your business?</div>
        <div style={{ fontFamily: fH, fontSize: 22, fontWeight: 700, color: C.teal }}>→ ohbloom.com</div>
      </div>
    </div>
  );
}

// ─── SLIDE 3: Credibility ─────────────────────────────────────────────────────
function Slide3() {
  return (
    <div style={{
      width: 1080, height: 1080, background: C.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '88px 92px', overflow: 'hidden', fontFamily: fB,
    }}>
      {/* Left accent bar */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: C.teal }} />
      {/* Decorative circles top-right */}
      {[300, 200, 120].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: -(s / 3) + i * 20, right: -(s / 3) + i * 20,
          width: s, height: s, borderRadius: '50%',
          border: `1.5px solid rgba(26,107,114,${0.06 - i * 0.015})`, pointerEvents: 'none',
        }} />
      ))}

      {/* Big quote mark */}
      <div style={{
        fontFamily: fH, fontSize: 140, fontWeight: 800,
        color: 'rgba(26,107,114,0.09)', lineHeight: 1, marginBottom: -24, marginLeft: -6,
      }}>"</div>

      <div style={{
        fontFamily: fH, fontSize: 56, fontWeight: 800, color: C.black,
        lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 40,
      }}>
        I spent 10 years investigating why business processes fail.
      </div>

      <div style={{
        fontFamily: fB, fontSize: 26, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 60,
      }}>
        At Wells Fargo I analyzed thousands of complaints — tracking where systems broke,
        why customers fell through the cracks, and how to fix it. Now I build the automation
        systems that prevent those problems for small businesses.{' '}
        <span style={{ color: C.teal, fontWeight: 600 }}>
          I don't just build chatbots. I understand the process behind them.
        </span>
      </div>

      <div style={{
        paddingTop: 32, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: fH, fontSize: 22, fontWeight: 700, color: C.black }}>Bloom Digital</div>
          <div style={{ fontFamily: fB, fontSize: 17, color: C.soft, marginTop: 4 }}>
            Web Developer & AI Automation Specialist
          </div>
        </div>
        <div style={{ fontFamily: fH, fontSize: 18, fontWeight: 600, color: C.teal }}>ohbloom.com</div>
      </div>
    </div>
  );
}

// ─── SLIDE 4: Demo Hook ───────────────────────────────────────────────────────
function Slide4() {
  const Bubble = ({ from, text, time }) => (
    <div style={{
      display: 'flex', flexDirection: from === 'user' ? 'row-reverse' : 'row',
      gap: 7, marginBottom: 10, alignItems: 'flex-end',
    }}>
      {from === 'bot' && (
        <div style={{
          width: 24, height: 24, borderRadius: '50%', background: C.teal, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <BotIcon size={12} color="#fff" />
        </div>
      )}
      <div style={{
        maxWidth: '78%', padding: '8px 11px',
        background: from === 'user' ? C.teal : C.white,
        color: from === 'user' ? '#fff' : C.black,
        borderRadius: from === 'user' ? '13px 13px 3px 13px' : '13px 13px 13px 3px',
        fontSize: 11, fontFamily: fB, lineHeight: 1.45,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}>
        {text}
        {time && <div style={{ fontSize: 9, color: from === 'user' ? 'rgba(255,255,255,0.55)' : '#BBB', marginTop: 3 }}>{time}</div>}
      </div>
    </div>
  );

  return (
    <div style={{
      width: 1080, height: 1080, background: C.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: fB,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: C.teal }} />

      {/* Main content row */}
      <div style={{ flex: 1, display: 'flex', gap: 52, padding: '80px 80px 0', alignItems: 'flex-start' }}>
        {/* Left text */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: fH, fontSize: 52, fontWeight: 800, color: C.black,
            lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 32,
          }}>
            I built a fake salon website to show you what AI can do.
          </div>
          <div style={{ fontFamily: fB, fontSize: 22, color: '#4A4A4A', lineHeight: 1.65, marginBottom: 28 }}>
            Glow Studio's AI assistant:
          </div>
          {[
            'Answers booking questions 24/7',
            'Captures leads automatically',
            'Shares services and pricing instantly',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', background: C.tealLight, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckIcon size={13} />
              </div>
              <span style={{ fontFamily: fB, fontSize: 21, color: '#4A4A4A' }}>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 24, fontFamily: fB, fontSize: 18, color: C.soft, fontStyle: 'italic' }}>
            ...and it cost less than one missed appointment.
          </div>
        </div>

        {/* Right: Chat mockup */}
        <div style={{ flexShrink: 0, width: 292 }}>
          <div style={{
            width: 292, background: '#F0F4F5', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 8px 48px rgba(26,107,114,0.16)', border: `1px solid rgba(26,107,114,0.1)`,
          }}>
            {/* Chat header */}
            <div style={{ background: C.teal, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BotIcon size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: fH, fontSize: 13, fontWeight: 700, color: '#fff' }}>Glow Studio AI</div>
                <div style={{ fontFamily: fB, fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                  Always on
                </div>
              </div>
            </div>
            {/* Messages */}
            <div style={{ padding: '14px 11px', minHeight: 330 }}>
              <Bubble from="bot" text="Hi! Welcome to Glow Studio 💅 How can I help you today?" time="2:47 AM" />
              <Bubble from="user" text="Do you have any openings this week for a full set?" />
              <Bubble from="bot" text="Yes! Tuesday & Thursday have availability. Can I grab your name and email to hold a spot?" />
              <Bubble from="user" text="Sure! It's Sarah." />
              <Bubble from="bot" text="Got it, Sarah! 🌸 What's your email so we can confirm?" />
            </div>
            {/* Input */}
            <div style={{
              padding: '9px 11px', borderTop: '1px solid rgba(0,0,0,0.06)',
              background: C.white, display: 'flex', gap: 7, alignItems: 'center',
            }}>
              <div style={{
                flex: 1, background: '#F5F5F5', borderRadius: 18,
                padding: '7px 12px', fontSize: 11, color: '#BBB', fontFamily: fB,
              }}>
                Type a message...
              </div>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', background: C.teal,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom teal strip */}
      <div style={{
        background: C.teal, padding: '24px 80px', marginTop: 36,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: fH, fontSize: 24, fontWeight: 700, color: '#fff' }}>
          See the full demo
        </div>
        <div style={{ fontFamily: fH, fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
          → ohbloom.com
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE 5: Direct Offer ────────────────────────────────────────────────────
function Slide5() {
  const offers = [
    { pain: 'Tired of answering the same questions over and over?', service: 'AI Chatbot Setup', price: 'from $300' },
    { pain: 'Losing leads because follow-up is manual?', service: 'Lead Capture Automation', price: 'from $500' },
    { pain: 'Need a website that actually works?', service: 'Website + AI Chatbot', price: 'from $1,000' },
  ];

  return (
    <div style={{
      width: 1080, height: 1080, background: C.bg, position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '88px 88px', overflow: 'hidden', fontFamily: fB,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: C.teal }} />
      {/* Faint grid dots */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: 300, height: 300, opacity: 0.25,
        backgroundImage: `radial-gradient(circle, ${C.teal} 1px, transparent 1px)`,
        backgroundSize: '20px 20px', pointerEvents: 'none',
      }} />

      {/* Eyebrow */}
      <div style={{
        fontFamily: fH, fontSize: 13, fontWeight: 600, color: C.teal,
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20,
      }}>
        For Small Business Owners
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: fH, fontSize: 62, fontWeight: 800, color: C.black,
        lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 56,
      }}>
        If you're a small business owner — this is for you.
      </div>

      {/* Offer rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 56 }}>
        {offers.map((o, i) => (
          <div key={i} style={{
            background: C.white, borderRadius: 14, padding: '26px 28px',
            borderLeft: `5px solid ${C.teal}`,
            boxShadow: '0 2px 14px rgba(0,0,0,0.055)',
          }}>
            <div style={{ fontFamily: fB, fontSize: 18, color: C.muted, marginBottom: 10 }}>{o.pain}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: fH, fontSize: 26, fontWeight: 700, color: C.black }}>{o.service}</span>
              <span style={{
                fontFamily: fH, fontSize: 19, fontWeight: 700, color: C.teal,
                background: C.tealLight, padding: '4px 14px', borderRadius: 20,
              }}>
                {o.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        paddingTop: 30, borderTop: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: fB, fontSize: 19, color: C.muted }}>
          Message me or visit{' '}
          <span style={{ color: C.teal, fontWeight: 600 }}>ohbloom.com</span>
          {' '}— I respond within 24 hours
        </div>
        <div style={{ fontFamily: fH, fontSize: 18, fontWeight: 700, color: C.teal, flexShrink: 0, marginLeft: 20 }}>
          → Let's Talk
        </div>
      </div>
    </div>
  );
}

// ─── Logo Variations ──────────────────────────────────────────────────────────
function BloomLogo({ bg, petalFill, petalOpacities = [0.95, 0.75, 0.58, 0.68, 0.85], stemStroke, leafFill, leafOpacities = [0.55, 0.4], showGlow = false }) {
  const px = 200, py = 182;
  return (
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <rect width="400" height="400" fill={bg}/>
      <g transform={`translate(${px},${py})`}>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={deg} cx="0" cy="-70" rx="22" ry="44"
            fill={petalFill} opacity={petalOpacities[i]}
            transform={`rotate(${deg})`}/>
        ))}
        {showGlow && <circle cx="0" cy="0" r="38" fill="#E8913A" opacity="0.2"/>}
        <circle cx="0" cy="0" r="28" fill="#E8913A"/>
        <circle cx="-8" cy="-8" r="8" fill="white" opacity="0.3"/>
      </g>
      <line x1={px} y1={py + 28} x2={px} y2={py + 78} stroke={stemStroke} strokeWidth="7" strokeLinecap="round"/>
      <path d={`M${px},${py+63} C${px-25},${py+51} ${px-30},${py+38} ${px-15},${py+35} C${px-5},${py+33} ${px},${py+45} ${px},${py+63} Z`} fill={leafFill} opacity={leafOpacities[0]}/>
      <path d={`M${px},${py+52} C${px+25},${py+40} ${px+30},${py+27} ${px+15},${py+24} C${px+5},${py+22} ${px},${py+34} ${px},${py+52} Z`} fill={leafFill} opacity={leafOpacities[1]}/>
    </svg>
  );
}

function LogoPrimary()  { return <BloomLogo bg="#FAFAF8" petalFill="#1A6B72" petalOpacities={[1,0.82,0.64,0.74,0.9]} stemStroke="#1A6B72" leafFill="#1A6B72" showGlow/>; }
function LogoLight()    { return <BloomLogo bg="#F5F0E8" petalFill="#1A6B72" petalOpacities={[1,0.82,0.64,0.74,0.9]} stemStroke="#1A6B72" leafFill="#1A6B72"/>; }
function LogoTeal()     { return <BloomLogo bg="#1A6B72" petalFill="#ffffff" stemStroke="#ffffff" leafFill="#ffffff"/>; }
function LogoDark()     { return <BloomLogo bg="#1C1C1E" petalFill="#1A6B72" petalOpacities={[1,0.8,0.62,0.72,0.88]} stemStroke="#1A6B72" leafFill="#1A6B72"/>; }
function LogoWarm()     { return <BloomLogo bg="#F5F0E8" petalFill="#1A6B72" petalOpacities={[1,0.8,0.62,0.72,0.88]} stemStroke="#1A6B72" leafFill="#1A6B72" leafOpacities={[0.6,0.45]}/>; }
function LogoLinkedIn() { return <BloomLogo bg="#1A6B72" petalFill="#ffffff" petalOpacities={[0.95,0.72,0.55,0.65,0.85]} stemStroke="#ffffff" leafFill="#ffffff"/>; }

// ─── Pieces Registry ──────────────────────────────────────────────────────────
const PIECES = [
  { id: 'banner',        name: 'Profile Banner',         dim: '1584 × 396',  w: 1584, h: 396,  Comp: LinkedInBanner, jpeg: true },
  { id: 's1',            name: 'Slide 1 — The Hook',     dim: '1080 × 1080', w: 1080, h: 1080, Comp: Slide1 },
  { id: 's2',            name: 'Slide 2 — The Value',    dim: '1080 × 1080', w: 1080, h: 1080, Comp: Slide2 },
  { id: 's3',            name: 'Slide 3 — Credibility',  dim: '1080 × 1080', w: 1080, h: 1080, Comp: Slide3 },
  { id: 's4',            name: 'Slide 4 — Demo Hook',    dim: '1080 × 1080', w: 1080, h: 1080, Comp: Slide4 },
  { id: 's5',            name: 'Slide 5 — Direct Offer', dim: '1080 × 1080', w: 1080, h: 1080, Comp: Slide5 },
  { id: 'logo-primary',  name: 'Logo — Primary',         dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoPrimary,  jpeg: true },
  { id: 'logo-light',    name: 'Logo — Light Bg',        dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoLight,    jpeg: true },
  { id: 'logo-teal',     name: 'Logo — Teal Bg',         dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoTeal,     jpeg: true },
  { id: 'logo-dark',     name: 'Logo — Dark Bg',         dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoDark,     jpeg: true },
  { id: 'logo-warm',     name: 'Logo — Warm Bg',         dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoWarm,     jpeg: true },
  { id: 'logo-linkedin', name: 'Logo — LinkedIn Square', dim: '400 × 400',   w: 400,  h: 400,  Comp: LogoLinkedIn, jpeg: true },
];

// ─── Download Hook ────────────────────────────────────────────────────────────
function useDownload(piece) {
  const hiddenRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | rendering | done

  const isJpeg = !!piece.jpeg;

  const downloadPDF = useCallback(async () => {
    if (!hiddenRef.current) return;
    setStatus('rendering');
    try {
      await new Promise(r => setTimeout(r, 300));
      const canvas = await html2canvas(hiddenRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FAFAF8',
        width: piece.w,
        height: piece.h,
        logging: false,
      });

      if (isJpeg) {
        // Banner → JPEG download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ohbloom-${piece.id}.jpg`;
          a.click();
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      } else {
        // Slides → PDF download
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [piece.w, piece.h],
          hotfixes: ['px_scaling'],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, piece.w, piece.h);
        pdf.save(`ohbloom-${piece.id}.pdf`);
      }

      setStatus('done');
      setTimeout(() => setStatus('idle'), 2500);
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  }, [piece]);

  return { hiddenRef, status, downloadPDF, isJpeg };
}

// ─── Viewer ───────────────────────────────────────────────────────────────────
export default function LinkedInAssets() {
  const [active, setActive] = useState('banner');
  const { w: winW, h: winH } = useWindowSize();

  const piece = PIECES.find(p => p.id === active);
  const { Comp, w, h, name, dim } = piece;
  const { hiddenRef, status, downloadPDF, isJpeg } = useDownload(piece);

  const availW = Math.max(winW - 260 - 80, 200);
  const availH = Math.max(winH - 190, 200);
  const scale  = Math.min(availW / w, availH / h, 1);

  const fileType = isJpeg ? 'JPEG' : 'PDF';
  const btnLabel = status === 'rendering' ? 'Generating…' : status === 'done' ? '✓ Downloaded!' : `↓ Download ${fileType}`;
  const btnColor = status === 'done' ? '#22C55E' : C.teal;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#EDECEA', fontFamily: fB, overflow: 'hidden' }}>
      <FontLoader />

      {/* ── Hidden full-res render for html2canvas ── */}
      <div style={{ position: 'fixed', left: '-99999px', top: 0, pointerEvents: 'none', zIndex: -1 }}>
        <div ref={hiddenRef} style={{ width: piece.w, height: piece.h }}>
          <Comp />
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div style={{
        width: 260, background: C.white, borderRight: `1px solid ${C.border}`,
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ padding: '22px 20px 16px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: fH, fontSize: 15, fontWeight: 800, color: C.black }}>LinkedIn Assets</div>
          <div style={{ fontFamily: fB, fontSize: 12, color: C.soft, marginTop: 3 }}>
            Bloom Digital · ohbloom.com
          </div>
        </div>

        {/* Piece list */}
        <nav style={{ padding: '10px 0', flex: 1 }}>
          {PIECES.map((p) => {
            const sel = active === p.id;
            return (
              <button key={p.id} onClick={() => setActive(p.id)} style={{
                width: '100%', textAlign: 'left', padding: '11px 20px', background: 'transparent',
                border: 'none', borderLeft: `3px solid ${sel ? C.teal : 'transparent'}`,
                cursor: 'pointer', transition: 'background 0.12s',
                backgroundColor: sel ? C.tealLight : 'transparent',
              }}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.backgroundColor = '#F5F3F0'; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div style={{
                  fontFamily: fH, fontSize: 13, fontWeight: sel ? 700 : 500,
                  color: sel ? C.teal : C.black, lineHeight: 1.3,
                }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: fB, fontSize: 11, color: C.soft, marginTop: 2 }}>{p.dim} px</div>
              </button>
            );
          })}
        </nav>

        {/* Download all hint */}
        <div style={{ padding: '14px 18px', borderTop: `1px solid ${C.border}`, background: '#FDFCFB' }}>
          <div style={{ fontFamily: fB, fontSize: 11, color: C.muted, lineHeight: 1.55 }}>
            Click a piece, then hit <strong style={{ color: C.teal }}>Download PDF</strong> to save it at exact pixel dimensions.
          </div>
        </div>
      </div>

      {/* ── Main Preview ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '32px', overflow: 'hidden',
      }}>
        {/* Top label bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: fH, fontSize: 17, fontWeight: 700, color: C.black }}>{name}</span>
          <span style={{
            fontFamily: fB, fontSize: 12, color: C.teal, fontWeight: 600,
            background: C.tealLight, padding: '3px 10px', borderRadius: 20,
          }}>
            {dim} px
          </span>
          <span style={{
            fontFamily: fB, fontSize: 12, color: C.soft,
            background: C.white, padding: '3px 10px', borderRadius: 20,
            border: `1px solid ${C.border}`,
          }}>
            Preview at {Math.round(scale * 100)}%
          </span>
          {/* Download button */}
          <button
            onClick={downloadPDF}
            disabled={status === 'rendering'}
            style={{
              fontFamily: fH, fontSize: 13, fontWeight: 700,
              color: '#fff', background: btnColor,
              border: 'none', borderRadius: 20, padding: '6px 18px',
              cursor: status === 'rendering' ? 'default' : 'pointer',
              transition: 'background 0.2s',
              opacity: status === 'rendering' ? 0.7 : 1,
            }}
          >
            {btnLabel}
          </button>
        </div>

        {/* Scaled frame */}
        <div style={{
          position: 'relative', width: w * scale, height: h * scale,
          flexShrink: 0, boxShadow: '0 10px 60px rgba(0,0,0,0.14)', borderRadius: 3,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            transform: `scale(${scale})`, transformOrigin: 'top left',
            width: w, height: h,
          }}>
            <Comp />
          </div>
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 18, display: 'flex', alignItems: 'center', gap: 8,
          background: '#FFF8F0', border: `1px solid ${C.amber}`, borderRadius: 8, padding: '9px 16px',
        }}>
          <CamIcon size={15} />
          <span style={{ fontFamily: fB, fontSize: 12, color: '#7A5A2A', fontWeight: 500 }}>
            Exports at 2× resolution ({dim}px). {isJpeg ? 'Banner saves as JPEG — ready to upload directly to LinkedIn.' : 'Slides save as PDF — use Chrome DevTools → Capture node screenshot for PNG.'}
          </span>
        </div>
      </div>
    </div>
  );
}
