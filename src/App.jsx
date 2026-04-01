import { useState, useEffect } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  THE HOLLOW LIBRARY — For Solitary Witches                  ║
 ╠══════════════════════════════════════════════════════════════╣
 ║                                                              ║
 ║  1. Create a free account at https://payhip.com              ║
 ║  2. Connect Paystack (for ZAR payouts to your SA bank)       ║
 ║     → Account → Settings → Payment Details → Paystack        ║
 ║  3. Add each spell as a "Digital Download" product           ║
 ║  4. Copy each product's ID from its URL:                     ║
 ║     e.g. payhip.com/b/AbC1d → ID is "AbC1d"                ║
 ║  5. Replace the payhipId values in SPELLS below              ║
 ║  6. git add . && git commit && git push                      ║
 ║     → Vercel auto-deploys your changes                       ║
 ║                                                              ║
 ║  YOUR DOMAIN: wicca.siyenza.app                              ║
 ║  Cloudflare DNS: CNAME → wicca → cname.vercel-dns.com       ║
 ║                                                              ║
 ╚══════════════════════════════════════════════════════════════╝
*/

const SPELLS = [
  {
    id: 1,
    name: "The Solitary Flame",
    price: 7.99,
    icon: "🕯️",
    tier: "Candle & Ritual",
    desc: "3 complete spells with every word to speak, every step to follow — no guesswork. Includes the full Circle of Protection ritual (11 steps, start to finish), plus spells for Clarity and Courage. Colour correspondence chart, candle dressing guide, altar setup, and 2 printable grimoire pages. 27 pages of real, usable magic.",
    payhipId: "75Swb",
    pages: "27 pages",
  },
  {
    id: 2,
    name: "Phases & Passages",
    price: 7.99,
    icon: "🌙",
    tier: "Moon & Seasonal",
    desc: "5 moon phase rituals with full incantations — New Moon intentions, Waxing abundance spell, Full Moon charging ritual, Waning release ceremony, and Dark Moon rest practices. Plus all 8 sabbats explained with simple observances for each. Printable lunar tracker for your grimoire. Work with the rhythm of the sky.",
    payhipId: "Vyr6K",
    pages: "20 pages",
  },
  {
    id: 3,
    name: "Root & Remedy",
    price: 7.99,
    icon: "🌿",
    tier: "Herbal",
    desc: "16 herb correspondences with a quick-reference chart by intention. 4 ritual oil recipes, 4 protective sachet recipes, 4 intention teas with spoken words for each. Plus door washes, salt lines, and sleep sachets. Everything uses herbs from your kitchen — no rare ingredients. Printable herb log included.",
    payhipId: "ADWrm",
    pages: "23 pages",
  },
  {
    id: 4,
    name: "The Hollow Library: First Volume",
    price: 14.99,
    icon: "📖",
    tier: "Collection",
    desc: "Everything in one download. All 3 guides — The Solitary Flame, Phases & Passages, and Root & Remedy. That's 3 complete spells, 5 moon rituals, 8 sabbats, 16 herb correspondences, 12 recipes, printable grimoire pages, and a bonus set of journal templates you can't get separately. 70+ pages of practice.",
    payhipId: "jSO1y",
    pages: "All 3 PDFs + bonus templates",
    isFeatured: true,
  },
];

const TIER_COLORS = {
  "Candle & Ritual": { color: "#d4a84a", glow: "#d4a84a18" },
  "Moon & Seasonal": { color: "#8a9db8", glow: "#8a9db818" },
  "Herbal": { color: "#7a9f80", glow: "#7a9f8018" },
  "Collection": { color: "#c48a5a", glow: "#c48a5a18" },
};

const TIERS = ["All", "Candle & Ritual", "Moon & Seasonal", "Herbal", "Collection"];

export default function App() {
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState({ msg: "", show: false });
  const [payhipReady, setPayhipReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.Payhip) setPayhipReady(true);
      else setTimeout(check, 300);
    };
    check();
  }, []);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(p => ({ ...p, show: false })), 2800);
  };

  const handleBuy = (spell) => {
    if (spell.payhipId === "XXXXX") {
      showToast("Replace payhipId in src/App.jsx with your Payhip product ID");
      return;
    }
  };

  const filtered = SPELLS.filter(s => filter === "All" || s.tier === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080e10",
      color: "#c8c2b4",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Fira+Code:wght@300;400&display=swap" rel="stylesheet" />

      {/* Atmospheric background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, #12282e44 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 20% 80%, #1a150e22 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 80% 60%, #12282e18 0%, transparent 50%),
          linear-gradient(180deg, #080e10 0%, #0a1518 30%, #0d1215 70%, #080e10 100%)
        `,
      }} />

      {/* Subtle cross texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8c2b4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%",
        transform: `translateX(-50%) translateY(${toast.show ? 0 : 16}px)`,
        background: "#c9a54e", color: "#080e10", padding: "10px 28px",
        borderRadius: 4, fontSize: 13, fontFamily: "'Fira Code', monospace",
        opacity: toast.show ? 1 : 0, transition: "all 0.3s ease",
        zIndex: 1000, pointerEvents: "none",
      }}>
        {toast.msg}
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 32px",
          borderBottom: "1px solid #1e2e3218",
          position: "sticky", top: 0, zIndex: 100,
          background: "#080e10dd",
          backdropFilter: "blur(12px)",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 500,
              color: "#c9a54e", letterSpacing: 3, textTransform: "uppercase",
            }}>
              The Hollow Library
            </div>
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              color: "#5a6a65", letterSpacing: 1.5, marginTop: 2,
              textTransform: "uppercase",
            }}>
              Rituals & resources for the solitary witch
            </div>
          </div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 10,
            color: "#ffffff", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: payhipReady ? "#5a7a5e" : "#6a5a3a",
              display: "inline-block",
              boxShadow: payhipReady ? "0 0 6px #5a7a5e44" : "none",
            }} />
            {payhipReady ? "Shop open" : "Loading..."}
          </div>
        </header>

        {/* Hero */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ textAlign: "center", padding: "72px 0 48px" }}>
            <div style={{
              fontSize: 11, color: "#ffffff", letterSpacing: 8,
              fontFamily: "'Cinzel', serif", marginBottom: 28,
            }}>
              ── ✦ ──
            </div>

            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(28px, 4.5vw, 44px)",
              fontWeight: 400, color: "#c9a54e",
              letterSpacing: 4, textTransform: "uppercase",
              margin: 0, lineHeight: 1.4,
              textShadow: "0 0 40px #c9a54e12",
            }}>
              Guides for the<br />Solitary Witch
            </h1>

            <div style={{
              width: 60, height: 1,
              background: "linear-gradient(90deg, transparent, #c9a54e44, transparent)",
              margin: "28px auto",
            }} />

            <p style={{
              color: "#6a7a72", maxWidth: 480, margin: "0 auto",
              fontSize: 18, lineHeight: 1.9,
              fontStyle: "italic", fontWeight: 300,
            }}>
              You walk a quiet path. These pages were gathered for those
              who practice alone — by candlelight, under open sky,
              in the stillness before dawn.
            </p>

            <p style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: 11, color: "#ffffff", marginTop: 24,
              letterSpacing: 0.5,
            }}>
              Downloadable PDF guides · Instant delivery to your inbox
            </p>
          </div>

          {/* Tier Filters */}
          <div style={{
            display: "flex", gap: 6, flexWrap: "wrap",
            justifyContent: "center", marginBottom: 36,
            paddingBottom: 28, borderBottom: "1px solid #1a2428",
          }}>
            {TIERS.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                fontFamily: "'Fira Code', monospace", fontSize: 10,
                padding: "6px 14px", borderRadius: 3, cursor: "pointer",
                letterSpacing: 1, textTransform: "uppercase",
                border: `1px solid ${filter === t ? "#c9a54e33" : "#1a2428"}`,
                background: filter === t ? "#c9a54e0a" : "transparent",
                color: filter === t ? "#c9a54e" : "#4a5a55",
                transition: "all 0.3s ease",
              }}>{t}</button>
            ))}
          </div>

          {/* Product Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 1, marginBottom: 48, border: "1px solid #1a2428",
          }}>
            {filtered.map((spell, idx) => {
              const isHovered = hoveredId === spell.id;
              const tier = TIER_COLORS[spell.tier];
              const isPlaceholder = spell.payhipId === "XXXXX";
              const isFeatured = spell.isFeatured;
              return (
                <div
                  key={spell.id}
                  onMouseEnter={() => setHoveredId(spell.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: isHovered ? "#0e191c" : isFeatured ? "#0c1618" : "#0a1316",
                    padding: "32px 28px",
                    transition: "all 0.4s ease",
                    borderBottom: "1px solid #1a2428",
                    borderLeft: isFeatured ? "2px solid #c9a54e22" : "none",
                    position: "relative", overflow: "hidden",
                    gridColumn: isFeatured ? "1 / -1" : "auto",
                    animationName: "fadeIn",
                    animationDuration: "0.6s",
                    animationDelay: `${idx * 0.08}s`,
                    animationFillMode: "both",
                  }}
                >
                  {isHovered && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `radial-gradient(ellipse at 30% 20%, ${tier.glow} 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }} />
                  )}
                  <div style={{ position: "relative" }}>
                    {/* Tier + icon row */}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: 16,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{
                          fontFamily: "'Fira Code', monospace", fontSize: 9,
                          color: tier.color, letterSpacing: 1.5,
                          textTransform: "uppercase", opacity: 0.8,
                        }}>{spell.tier}</span>
                        <span style={{
                          fontFamily: "'Fira Code', monospace", fontSize: 9,
                          color: "#ffffff", letterSpacing: 0.5,
                        }}>{spell.pages}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isFeatured && (
                          <span style={{
                            fontFamily: "'Fira Code', monospace", fontSize: 9,
                            color: "#c9a54e", letterSpacing: 1,
                            textTransform: "uppercase",
                            border: "1px solid #c9a54e22",
                            padding: "2px 8px", borderRadius: 2,
                          }}>Save 37%</span>
                        )}
                        <span style={{ fontSize: 24, opacity: 0.7 }}>{spell.icon}</span>
                      </div>
                    </div>
                    {/* Name */}
                    <h3 style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: isFeatured ? 22 : 18, fontWeight: 500,
                      margin: "0 0 12px",
                      color: isHovered ? "#d4cfc2" : isFeatured ? "#c9a54e" : "#a8a298",
                      letterSpacing: 1, transition: "color 0.3s ease",
                    }}>{spell.name}</h3>
                    {/* Description */}
                    <p style={{
                      fontSize: 15, color: "#5a6a62",
                      margin: "0 0 24px", lineHeight: 1.8,
                      fontStyle: "italic", fontWeight: 300,
                      maxWidth: isFeatured ? 600 : "none",
                    }}>{spell.desc}</p>
                    {/* Price + Buy */}
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", paddingTop: 16,
                      borderTop: "1px solid #1a24280a",
                    }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{
                          fontFamily: "'Fira Code', monospace", fontSize: 15,
                          fontWeight: 400, color: "#c9a54e", opacity: 0.9,
                        }}>${spell.price.toFixed(2)}</span>
                        {isFeatured && (
                          <span style={{
                            fontFamily: "'Fira Code', monospace", fontSize: 11,
                            color: "#ffffff", textDecoration: "line-through",
                          }}>$23.97</span>
                        )}
                      </div>
                      {isPlaceholder ? (
                        <button onClick={() => handleBuy(spell)} className="buy-btn" style={{
                          background: isFeatured ? "#c9a54e" : "transparent",
                          color: isFeatured ? "#080e10" : "#c9a54e",
                          border: isFeatured ? "1px solid #c9a54e" : "1px solid #c9a54e33",
                          padding: "8px 20px", borderRadius: 3, cursor: "pointer",
                          fontFamily: "'Cinzel', serif",
                          fontSize: 11, fontWeight: 500,
                          letterSpacing: 2, textTransform: "uppercase",
                          transition: "all 0.3s ease",
                        }}>{isFeatured ? "Get the Collection" : "Acquire"}</button>
                      ) : (
                        <a
                          href={`https://payhip.com/b/${spell.payhipId}`}
                          className="payhip-buy-button buy-btn"
                          data-theme="none" data-product={spell.payhipId}
                          onClick={e => {
                            if (!payhipReady) {
                              e.preventDefault();
                              showToast("Preparing checkout...");
                            }
                          }}
                          style={{
                            background: isFeatured ? "#c9a54e" : "transparent",
                            color: isFeatured ? "#080e10" : "#c9a54e",
                            border: isFeatured ? "1px solid #c9a54e" : "1px solid #c9a54e33",
                            padding: "8px 20px", borderRadius: 3, cursor: "pointer",
                            fontFamily: "'Cinzel', serif",
                            fontSize: 11, fontWeight: 500,
                            letterSpacing: 2, textTransform: "uppercase",
                            textDecoration: "none", transition: "all 0.3s ease",
                          }}
                        >{isFeatured ? "Get the Collection" : "Acquire"}</a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#ffffff" }}>
              <p style={{ fontSize: 18, fontWeight: 300, fontStyle: "italic" }}>
              No guides in this category yet. More pages are being transcribed...
              </p>
            </div>
          )}

          {/* Tools — The Bare Minimum */}
          <div style={{
            margin: "24px 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#ffffff", letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 12, textAlign: "center",
            }}>── Your Tools ──</div>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 500,
              color: "#8a8278", textAlign: "center", margin: "0 0 8px",
              letterSpacing: 1,
            }}>What You Actually Need to Begin</p>
            <p style={{
              fontSize: 15, color: "#5a6a62", textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 1.8,
              maxWidth: 520, margin: "0 auto 28px",
            }}>
              The truth experienced witches know: the magic is in you, not in the objects.
              Start with what you have. Let your energy fill in the gaps.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 1, border: "1px solid #1a2428",
            }}>
              {[
                { item: "A candle", note: "Any candle. A birthday candle works. White substitutes for any colour.", icon: "🕯️" },
                { item: "Salt", note: "Table salt, sea salt, rock salt — whatever is in your kitchen right now.", icon: "🧂" },
                { item: "A cup of water", note: "A mug, a glass, a jar. It holds the water element. That is enough.", icon: "🥛" },
                { item: "A herb from your kitchen", note: "Rosemary from your spice rack. A bay leaf. Basil. Sage if you have it.", icon: "🌿" },
                { item: "Your hands", note: "To direct energy. No athame, wand, or crystal required. You are the instrument.", icon: "✋" },
                { item: "Your intention", note: "This is the only tool that cannot be substituted. Mean what you say.", icon: "✦" },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: "20px 18px",
                  background: "#0a131608",
                  borderBottom: "1px solid #1a2428",
                }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                  }}>
                    <span style={{ fontSize: 18, opacity: 0.6 }}>{t.icon}</span>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 13,
                      fontWeight: 500, color: "#a8a298", letterSpacing: 0.5,
                    }}>{t.item}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Fira Code', monospace", fontSize: 10.5,
                    color: "#4a5a52", margin: 0, lineHeight: 1.7,
                  }}>{t.note}</p>
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              color: "#ffffff", textAlign: "center", marginTop: 16,
              lineHeight: 1.7,
            }}>
              As you deepen your practice, you may be drawn to collect specific tools —
              an athame, a wand, crystals, a goblet. Let that happen naturally. For now, begin.
            </p>
          </div>

          {/* For the Solitary Witch */}
          <div style={{
            margin: "0 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#ffffff", letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 12, textAlign: "center",
            }}>── For the Solitary Witch ──</div>
            <p style={{
              fontSize: 16, color: "#5a6a62", textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 2,
              maxWidth: 520, margin: "0 auto",
            }}>
              You do not need a coven to practise. You do not need permission, initiation,
              or years of study before you begin. The solitary path is not a lesser path —
              it is a deeply personal one. Every guide in this library was written for
              the witch who works alone, in her own space, on her own terms.
              Your kitchen table is your altar. Your garden is your sacred grove.
              Your quiet hours are your circle.
            </p>
          </div>

          {/* The Path */}
          <div style={{
            margin: "24px 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#ffffff", letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 28, textAlign: "center",
            }}>── The Path ──</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 32,
            }}>
              {[
                { n: "I", title: "Choose", desc: "Browse the library. Let your intuition guide you to what you need right now." },
                { n: "II", title: "Exchange", desc: "Secure payment through card or local methods. Your details are protected." },
                { n: "III", title: "Receive", desc: "Your guide arrives as a PDF — instantly, to the email you provide. Print or keep digital." },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: 28,
                    color: "#c9a54e22", fontWeight: 600,
                    display: "block", marginBottom: 12,
                  }}>{s.n}</span>
                  <h4 style={{
                    fontFamily: "'Cinzel', serif",
                    margin: "0 0 8px", fontSize: 16, fontWeight: 500,
                    color: "#8a8278", letterSpacing: 2, textTransform: "uppercase",
                  }}>{s.title}</h4>
                  <p style={{
                    fontSize: 14, color: "#4a5a52",
                    margin: 0, lineHeight: 1.8,
                    fontStyle: "italic", fontWeight: 300,
                  }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ margin: "0 0 64px", border: "1px solid #1a2428" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#ffffff", letterSpacing: 4, textTransform: "uppercase",
              padding: "20px 28px", borderBottom: "1px solid #1a2428",
              textAlign: "center",
            }}>Common Questions</div>
            {[
              { q: "What do I receive after purchase?", a: "A beautifully formatted PDF guide delivered instantly to your email. Print it, keep it on your device, or add it to your personal grimoire." },
              { q: "Is my payment secure?", a: "All payments are processed through Payhip's encrypted checkout. Your details never touch this site." },
              { q: "Can I get a refund?", a: "Due to the digital nature of these guides, all sales are final. Read the descriptions carefully and trust your intuition." },
              { q: "I didn't receive my download?", a: "Check your spam folder first. If it's not there, reach out and we'll resolve it promptly." },
              { q: "What's included in the First Volume bundle?", a: "All three individual guides — The Solitary Flame, Phases & Passages, and Root & Remedy — plus exclusive grimoire journal templates you can't get separately." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "20px 28px",
                borderBottom: i < 4 ? "1px solid #1a2428" : "none",
              }}>
                <h4 style={{
                  fontFamily: "'Cinzel', serif",
                  margin: "0 0 8px", fontSize: 14, fontWeight: 500,
                  color: "#8a8278", letterSpacing: 0.5,
                }}>{item.q}</h4>
                <p style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 12,
                  color: "#ffffff", margin: 0, lineHeight: 1.8,
                }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #1a2428",
          padding: "32px 28px", textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 14,
            color: "#c9a54e33", letterSpacing: 3, textTransform: "uppercase",
            marginBottom: 8,
          }}>The Hollow Library</div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 10,
            color: "#2a3a35",
          }}>© 2026 Clydie Cronje · Secure payments by Payhip</div>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #c9a54e33; color: #c8c2b4; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #1a2428; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: #080e10; }
        .buy-btn:hover {
          background: #c9a54e !important;
          color: #080e10 !important;
          border-color: #c9a54e !important;
        }
      `}</style>
    </div>
  );
}
