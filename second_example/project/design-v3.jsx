// Design v3: "El Templo del Galgo" — tarot-card-driven, ilustrativo, vertical
// Cartas verticales con marcos dorados como en tarot real, formulario en columna oscura
// Más cargado de ornamentos, más esotérico. Inspirado directamente en el sketch del tarot diario

function TarotCard({ roman, name, num, gold, goldBright, cream, dark, big = false }) {
  const w = big ? 220 : 180;
  const h = big ? 340 : 280;
  return (
    <div style={{
      width: w, height: h,
      background: `linear-gradient(180deg, #1a160d, #0b0a08)`,
      border: `1px solid ${gold}`,
      borderRadius: 8,
      position: 'relative',
      padding: 12,
      flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: 6, border: `1px solid rgba(201,165,90,0.4)`, borderRadius: 4, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', inset: 12, border: `1px solid rgba(201,165,90,0.2)`, borderRadius: 2, pointerEvents: 'none' }}></div>

      {/* Top roman */}
      <div style={{
        position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center',
        fontFamily: 'Cinzel, serif', fontSize: 11, color: goldBright, letterSpacing: '0.3em',
      }}>{num}</div>

      {/* Center roman */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 12,
      }}>
        <div className="v3-cinzel" style={{ fontSize: big ? 56 : 44, color: goldBright, lineHeight: 1, letterSpacing: '0.25em', textShadow: '0 0 12px rgba(231,201,122,0.4)' }}>
          {roman}
        </div>
        <div style={{ width: 40, height: 1, background: gold, opacity: 0.5 }}></div>
      </div>

      {/* Bottom name */}
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
        fontSize: big ? 22 : 18, color: cream,
      }}>{name}</div>
    </div>
  );
}

function DesignV3({ width = 1280 }) {
  const gold = '#c9a55a';
  const goldBright = '#e7c97a';
  const dark = '#0b0a08';
  const ink = '#15120c';
  const cream = '#f5ecd6';
  const dim = 'rgba(245,236,214,0.55)';

  const [petType, setPetType] = React.useState('amor');
  const [lang, setLang] = React.useState('es');

  return (
    <div style={{
      width, fontFamily: '"Cormorant Garamond", serif',
      background: dark, color: cream, position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        .v3 * { box-sizing: border-box; }
        .v3-cinzel { font-family: 'Cinzel', serif; letter-spacing: 0.2em; font-weight: 500; }
        .v3-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .v3-input {
          width: 100%;
          background: rgba(11,10,8,0.6);
          border: 1px solid rgba(201,165,90,0.35);
          color: ${cream};
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          padding: 16px 18px;
          outline: none;
          font-style: italic;
        }
        .v3-input:focus { border-color: ${goldBright}; }
        .v3-input::placeholder { color: rgba(245,236,214,0.3); }
        .v3-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: ${gold};
          text-transform: uppercase;
          margin-bottom: 10px;
          display: flex; gap: 8px; align-items: baseline;
        }
        @keyframes v3-float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.4deg); }
        }
        @keyframes v3-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        .v3-card-floating { animation: v3-float 6s ease-in-out infinite; }
      `}</style>

      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 800px 600px at 20% 20%, rgba(201,165,90,0.1), transparent 60%),
          radial-gradient(ellipse 800px 600px at 80% 80%, rgba(201,165,90,0.08), transparent 60%),
          ${dark}
        `,
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 137.5) % 100;
            const y = (i * 51.7) % 100;
            return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={0.7 + (i % 3) * 0.4} fill={goldBright} opacity={0.4 + (i % 4) * 0.15} style={{ animation: `v3-twinkle ${3 + (i%5)}s ease-in-out infinite`, animationDelay: `${(i % 9) * 0.4}s` }} />;
          })}
        </svg>
      </div>

      <div className="v3" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top bar */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 56px', borderBottom: `1px solid rgba(201,165,90,0.18)`,
        }}>
          <div className="v3-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.3em' }}>
            SUB LUNA NOVA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="assets/lazo-astral-logo.png" style={{ height: 84, filter: 'drop-shadow(0 0 16px rgba(231,201,122,0.3))' }} alt="" />
            <div className="v3-cinzel" style={{ fontSize: 22, color: goldBright }}>GALGO ASTRAL</div>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 11 }} className="v3-cinzel">
            <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', color: lang === 'es' ? goldBright : dim, cursor: 'pointer', letterSpacing: '0.2em', padding: 0 }}>ES</button>
            <span style={{ color: 'rgba(201,165,90,0.4)' }}>·</span>
            <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', color: lang === 'en' ? goldBright : dim, cursor: 'pointer', letterSpacing: '0.2em', padding: 0 }}>EN</button>
          </div>
        </header>

        {/* Hero — three tarot cards centered */}
        <section style={{ padding: '80px 56px 60px', textAlign: 'center', position: 'relative' }}>
          {/* Galgo as hero anchor */}
          <img src="assets/lazo-astral-logo.png" alt="" style={{
            width: 200, marginBottom: 24, filter: 'drop-shadow(0 0 30px rgba(231,201,122,0.35))',
          }} />
          <div className="v3-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.4em', marginBottom: 32 }}>
            CARTA ASTRAL DE TU MASCOTA
          </div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif', fontWeight: 300,
            fontSize: 84, lineHeight: 1.0, margin: 0, letterSpacing: '-0.01em',
            color: cream, maxWidth: 900, marginInline: 'auto', textWrap: 'balance',
          }}>
            {lang === 'es' ? (
              <>Las cartas saben <span style={{ fontStyle: 'italic', color: goldBright }}>quién es</span> tu compañero antes que tú</>
            ) : (
              <>The cards know <span style={{ fontStyle: 'italic', color: goldBright }}>who your</span> companion is before you do</>
            )}
          </h1>

          {/* Three tarot cards spread */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 32,
            margin: '64px 0 48px', perspective: 800,
          }}>
            <div className="v3-card-floating" style={{ transform: 'rotate(-7deg)', animationDelay: '0s' }}>
              <TarotCard roman="I" name={lang === 'es' ? 'El Sol' : 'The Sun'} num="XIX" gold={gold} goldBright={goldBright} cream={cream} dark={dark} />
            </div>
            <div className="v3-card-floating" style={{ animationDelay: '1s', zIndex: 2 }}>
              <TarotCard roman="II" name={lang === 'es' ? 'La Luna' : 'The Moon'} num="XVIII" gold={gold} goldBright={goldBright} cream={cream} dark={dark} big />
            </div>
            <div className="v3-card-floating" style={{ transform: 'rotate(7deg)', animationDelay: '2s' }}>
              <TarotCard roman="III" name={lang === 'es' ? 'La Estrella' : 'The Star'} num="XVII" gold={gold} goldBright={goldBright} cream={cream} dark={dark} />
            </div>
          </div>

          <p style={{
            maxWidth: 620, margin: '0 auto 40px',
            fontSize: 21, lineHeight: 1.55, color: 'rgba(245,236,214,0.78)', fontStyle: 'italic',
          }}>
            {lang === 'es'
              ? 'Cada compañero llega bajo un cielo único. Trazamos su carta astral a mano y la interpretamos a través de las cartas mayores — el ritual completo del galgo de la luna.'
              : 'Every companion arrives under a unique sky. We draw their astral chart by hand and interpret it through the major arcana — the complete ritual of the moon greyhound.'
            }
          </p>

          <a href="#form" className="v3-cinzel" style={{
            display: 'inline-block',
            background: goldBright, color: dark,
            padding: '20px 48px', textDecoration: 'none',
            letterSpacing: '0.35em', fontSize: 12,
          }}>
            {lang === 'es' ? 'CONSULTAR LA CARTA' : 'CONSULT THE CHART'}
          </a>
        </section>

        {/* What you receive — three cards in horizontal row */}
        <section style={{ padding: '80px 56px', borderTop: `1px solid rgba(201,165,90,0.18)`, borderBottom: `1px solid rgba(201,165,90,0.18)` }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="v3-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.4em', marginBottom: 16 }}>
              QUE RECIBIRÁS
            </div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 52, margin: 0, color: cream }}>
              <span style={{ fontStyle: 'italic', color: goldBright }}>{lang === 'es' ? 'Un grimorio' : 'A grimoire'}</span> {lang === 'es' ? 'sellado a tu nombre' : 'sealed in your name'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 1100, marginInline: 'auto' }}>
            {[
              { roman: 'I', t: lang === 'es' ? 'La Carta Astral' : 'The Astral Chart', d: lang === 'es' ? 'Una rueda completa con sol, luna, ascendente y los siete planetas mayores trazados a mano sobre papel de oro.' : 'A complete wheel with sun, moon, ascendant and the seven major planets, hand-drawn on gold paper.' },
              { roman: 'II', t: lang === 'es' ? 'La Lectura' : 'The Reading', d: lang === 'es' ? 'Un ensayo de doce páginas interpretando cada casa, aspecto y tránsito relevante para tu vida.' : 'A twelve-page essay interpreting every house, aspect and transit relevant to your life.' },
              { roman: 'III', t: lang === 'es' ? 'Tu Lazo' : 'Your Bond', d: lang === 'es' ? 'Después podrás consultar el lazo con tu mascota — perro o gato, trazado en tu mismo cielo.' : 'After, you may consult the bond with your pet — dog or cat, drawn under the same sky.' },
            ].map((p, i) => (
              <div key={i} style={{
                background: 'rgba(26,22,13,0.5)',
                border: `1px solid rgba(201,165,90,0.3)`,
                padding: '40px 32px', textAlign: 'center', position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 8, border: `1px solid rgba(201,165,90,0.15)`, pointerEvents: 'none' }}></div>
                <div className="v3-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.3em', marginBottom: 16 }}>
                  {['I','II','III'][i]}
                </div>
                <div className="v3-cinzel" style={{ fontSize: 36, color: goldBright, lineHeight: 1, marginBottom: 20, letterSpacing: '0.25em' }}>{p.roman}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400, fontSize: 26, margin: 0, color: cream, fontStyle: 'italic' }}>{p.t}</h3>
                <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(245,236,214,0.65)', marginTop: 16, fontStyle: 'italic' }}>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form section — full bleed dark with ornament */}
        <section id="form" style={{ padding: '100px 56px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, maxWidth: 1140, marginInline: 'auto', alignItems: 'start' }}>

            {/* Left ornament + intro */}
            <div style={{ position: 'sticky', top: 40 }}>
              <div className="v3-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.4em', marginBottom: 20 }}>
                {lang === 'es' ? 'EL RITUAL' : 'THE RITUAL'}
              </div>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: '-0.01em' }}>
                {lang === 'es' ? <>Convoca<br /><span style={{ fontStyle: 'italic', color: goldBright }}>la carta</span></> : <>Summon<br /><span style={{ fontStyle: 'italic', color: goldBright }}>the chart</span></>}
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'rgba(245,236,214,0.7)', fontStyle: 'italic', marginTop: 28 }}>
                {lang === 'es'
                  ? 'Cinco coordenadas — los astros responden mejor a quien pregunta con cuidado.'
                  : 'Five coordinates — the stars answer best to those who ask with care.'
                }
              </p>

              {/* Decorative galgo medallion */}
              <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 20, padding: '20px 24px', border: `1px solid rgba(201,165,90,0.25)`, background: 'rgba(26,22,13,0.4)' }}>
                <img src="assets/lazo-astral-logo.png" style={{ width: 64, opacity: 0.95 }} alt="" />
                <div>
                  <div className="v3-cinzel" style={{ fontSize: 10, color: goldBright, letterSpacing: '0.3em' }}>
                    {lang === 'es' ? 'GARANTÍA DEL LINAJE' : 'LINEAGE WARRANTY'}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(245,236,214,0.7)', fontStyle: 'italic', marginTop: 6, lineHeight: 1.4 }}>
                    {lang === 'es' ? 'Trazada por una astróloga humana, no por máquinas.' : 'Drawn by a human astrologer, not by machines.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div style={{
              background: `linear-gradient(180deg, rgba(26,22,13,0.85), rgba(11,10,8,0.95))`,
              border: `1px solid ${gold}`, padding: '56px 56px', position: 'relative',
            }}>
              <div style={{ position: 'absolute', inset: 8, border: `1px solid rgba(201,165,90,0.25)`, pointerEvents: 'none' }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                  <div className="v3-label">
                    <span style={{ color: goldBright }}>I</span>
                    <span>·</span>
                    {lang === 'es' ? 'Nombre completo' : 'Full name'}
                  </div>
                  <input className="v3-input" placeholder={lang === 'es' ? 'Orión Selene del Sur' : 'Orion Selene of the South'} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div className="v3-label">
                      <span style={{ color: goldBright }}>II</span>
                      <span>·</span>
                      {lang === 'es' ? 'Fecha' : 'Date'}
                    </div>
                    <input className="v3-input" placeholder="14 / 03 / 2019" />
                  </div>
                  <div>
                    <div className="v3-label">
                      <span style={{ color: goldBright }}>III</span>
                      <span>·</span>
                      {lang === 'es' ? 'Hora' : 'Time'}
                    </div>
                    <input className="v3-input" placeholder="03 : 47" />
                  </div>
                </div>

                <div>
                  <div className="v3-label">
                    <span style={{ color: goldBright }}>IV</span>
                    <span>·</span>
                    {lang === 'es' ? 'Lugar de nacimiento' : 'Place of birth'}
                  </div>
                  <input className="v3-input" placeholder="Isla Negra, Chile" />
                </div>

                <div>
                  <div className="v3-label" style={{ marginBottom: 14 }}>
                    <span style={{ color: goldBright }}>V</span>
                    <span>·</span>
                    {lang === 'es' ? '¿Sobre qué deseas saber?' : 'What do you wish to know?'}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[
                      { id: 'amor', roman: 'I', label: lang === 'es' ? 'Amor & vínculos' : 'Love & bonds', sub: 'VENUS' },
                      { id: 'vida', roman: 'II', label: lang === 'es' ? 'Vida & destino' : 'Life & destiny', sub: 'SOL' },
                    ].map(opt => (
                      <button key={opt.id} onClick={() => setPetType(opt.id)} style={{
                        background: petType === opt.id ? 'rgba(231,201,122,0.1)' : 'rgba(11,10,8,0.5)',
                        border: `1px solid ${petType === opt.id ? goldBright : 'rgba(201,165,90,0.25)'}`,
                        padding: '24px 16px', cursor: 'pointer', textAlign: 'center',
                        fontFamily: 'inherit', color: cream, position: 'relative',
                      }}>
                        <div className="v3-cinzel" style={{ fontSize: 28, color: goldBright, lineHeight: 1, marginBottom: 10, letterSpacing: '0.25em' }}>{opt.roman}</div>
                        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 18, color: cream }}>{opt.label}</div>
                        <div className="v3-cinzel" style={{ fontSize: 9, color: gold, letterSpacing: '0.25em', marginTop: 6 }}>{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button style={{
                  marginTop: 16,
                  background: goldBright, color: dark, border: 'none',
                  padding: '22px 0', cursor: 'pointer',
                  letterSpacing: '0.35em', fontSize: 12,
                }} className="v3-cinzel">
                  {lang === 'es' ? 'TRAZAR MI CARTA ASTRAL' : 'TRACE MY ASTRAL CHART'}
                </button>

                <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(201,165,90,0.65)', fontStyle: 'italic', marginTop: -8 }}>
                  {lang === 'es' ? 'Sellado con cera de luna. Entrega en 24 horas.' : 'Sealed with moon wax. 24h delivery.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '60px 56px', borderTop: `1px solid rgba(201,165,90,0.2)`, textAlign: 'center' }}>
          <img src="assets/lazo-astral-logo.png" alt="" style={{ width: 130, marginBottom: 16, opacity: 0.9 }} />
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(245,236,214,0.55)', maxWidth: 600, marginInline: 'auto' }}>
            {lang === 'es' ? '«Quien observa el cielo de su mascota, observa también el suyo propio.»' : '«To observe your pet\'s sky is to observe your own.»'}
          </div>
          <div className="v3-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.4em', marginTop: 28 }}>
            GALGO ASTRAL &nbsp;·&nbsp; MMXXVI &nbsp;·&nbsp; ISLA NEGRA · CHILE
          </div>
        </footer>
      </div>
    </div>
  );
}

window.DesignV3 = DesignV3;
