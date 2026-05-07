// Design v2: "Observatorio" — editorial moderno asimétrico
// Layout split: rueda natal gigante a la izq, formulario / contenido a la der
// Más editorial / revista de astrología premium, menos cargada de ornamentos

function DesignV2({ width = 1280 }) {
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
        .v2 * { box-sizing: border-box; }
        .v2-cinzel { font-family: 'Cinzel', serif; letter-spacing: 0.18em; font-weight: 500; }
        .v2-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .v2-num { font-family: 'Cinzel', serif; font-weight: 400; font-variant-numeric: oldstyle-nums; }
        .v2-input {
          width: 100%;
          background: rgba(245,236,214,0.04);
          border: 1px solid rgba(201,165,90,0.25);
          color: ${cream};
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          padding: 14px 16px;
          outline: none;
        }
        .v2-input:focus { border-color: ${goldBright}; background: rgba(245,236,214,0.07); }
        .v2-input::placeholder { color: rgba(245,236,214,0.3); font-style: italic; }
        .v2-label {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          color: ${gold};
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }
        @keyframes v2-shimmer {
          0%,100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="v2">
        {/* Header */}
        <header style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '28px 56px',
          borderBottom: `1px solid rgba(201,165,90,0.18)`,
        }}>
          <div className="v2-cinzel" style={{ fontSize: 11, color: dim, letterSpacing: '0.25em' }}>
            VOLUMEN 26 &nbsp;·&nbsp; LUNA EN GÉMINIS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="assets/lazo-astral-logo.png" style={{ height: 80, filter: 'drop-shadow(0 0 16px rgba(231,201,122,0.3))' }} alt="" />
            <div className="v2-cinzel" style={{ fontSize: 22, color: goldBright }}>GALGO ASTRAL</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, fontSize: 11 }} className="v2-cinzel">
            <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', color: lang === 'es' ? goldBright : dim, cursor: 'pointer', letterSpacing: '0.2em', padding: 0 }}>ES</button>
            <span style={{ color: 'rgba(201,165,90,0.4)' }}>/</span>
            <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', color: lang === 'en' ? goldBright : dim, cursor: 'pointer', letterSpacing: '0.2em', padding: 0 }}>EN</button>
          </div>
        </header>

        {/* Sub-nav */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 48,
          padding: '14px 56px', borderBottom: `1px solid rgba(201,165,90,0.12)`,
        }} className="v2-cinzel">
          {(lang === 'es'
            ? ['Carta Astral', 'Tránsitos', 'Compatibilidad', 'Tarot', 'El Linaje']
            : ['Astral Chart', 'Transits', 'Compatibility', 'Tarot', 'The Lineage']
          ).map((item, i) => (
            <a key={i} href="#" style={{ color: i === 0 ? goldBright : dim, textDecoration: 'none', fontSize: 10, letterSpacing: '0.25em' }}>
              {item.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Hero — asymmetric split */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
          minHeight: 760,
          borderBottom: `1px solid rgba(201,165,90,0.18)`,
        }}>
          {/* Left — wheel + tagline */}
          <div style={{
            position: 'relative',
            background: `radial-gradient(ellipse at 30% 50%, rgba(201,165,90,0.12), transparent 60%), ${dark}`,
            padding: '64px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            borderRight: `1px solid rgba(201,165,90,0.18)`,
          }}>
            <div className="v2-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.4em' }}>
              N° 001 &nbsp;—&nbsp; {lang === 'es' ? 'EL OBSERVATORIO' : 'THE OBSERVATORY'}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-40px', border: `1px dashed rgba(201,165,90,0.15)`, borderRadius: '50%' }}></div>
              <NatalWheel size={500} gold={gold} goldBright={goldBright} dark={dark} cream={cream} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div className="v2-mono" style={{ fontSize: 10, color: dim, lineHeight: 1.6 }}>
                LAT  −33.4072°<br />
                LON  −71.6736°<br />
                {lang === 'es' ? 'TRAZO' : 'DRAWN'}  03:47:12 AM
              </div>
              <div className="v2-mono" style={{ fontSize: 10, color: dim, textAlign: 'right', lineHeight: 1.6 }}>
                {lang === 'es' ? 'SOL EN PISCIS 24°' : 'SUN IN PISCES 24°'}<br />
                {lang === 'es' ? 'LUNA EN ESCORPIO 11°' : 'MOON IN SCORPIO 11°'}<br />
                {lang === 'es' ? 'ASC. EN VIRGO 7°' : 'ASC. IN VIRGO 7°'}
              </div>
            </div>
          </div>

          {/* Right — heading */}
          <div style={{
            padding: '64px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: `linear-gradient(180deg, ${ink}, ${dark})`,
          }}>
            <div className="v2-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.35em', marginBottom: 28 }}>
              {lang === 'es' ? '— UN ENSAYO ASTRAL —' : '— AN ASTRAL ESSAY —'}
            </div>

            <h1 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: 78,
              lineHeight: 0.96,
              margin: 0,
              color: cream,
              letterSpacing: '-0.02em',
            }}>
              {lang === 'es' ? (
                <>El cielo en el<br /><span style={{ fontStyle: 'italic', color: goldBright }}>que nació</span><br />tu mascota</>
              ) : (
                <>The sky your<br /><span style={{ fontStyle: 'italic', color: goldBright }}>pet was</span><br />born under</>
              )}
            </h1>

            <p style={{
              maxWidth: 440, marginTop: 36, marginBottom: 0,
              fontSize: 19, lineHeight: 1.6, color: 'rgba(245,236,214,0.78)', fontStyle: 'italic',
            }}>
              {lang === 'es'
                ? 'Trazamos cartas astrales para perros, gatos y compañeros de cuatro patas — interpretadas a mano por astrólogas iniciadas en el linaje del galgo de la luna, desde 1957.'
                : 'We draw astral charts for dogs, cats and four-legged companions — hand-interpreted by astrologers initiated in the lineage of the moon greyhound, since 1957.'
              }
            </p>

            <div style={{ display: 'flex', gap: 20, marginTop: 36, alignItems: 'center' }}>
              <img src="assets/lazo-astral-logo.png" alt="" style={{ height: 70, opacity: 0.9 }} />
              <a href="#form" style={{
                background: goldBright, color: dark, padding: '20px 36px',
                textDecoration: 'none', letterSpacing: '0.3em', fontSize: 11,
              }} className="v2-cinzel">
                {lang === 'es' ? 'CONSULTAR LA CARTA' : 'CONSULT THE CHART'}
              </a>
              <a href="#" style={{ color: dim, textDecoration: 'underline', fontSize: 14, fontStyle: 'italic' }}>
                {lang === 'es' ? 'leer una muestra' : 'read a sample'}
              </a>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24, marginTop: 64, paddingTop: 40,
              borderTop: `1px solid rgba(201,165,90,0.2)`,
            }}>
              {[
                { n: 'VII', l: lang === 'es' ? 'generaciones' : 'generations' },
                { n: '12.408', l: lang === 'es' ? 'cartas trazadas' : 'charts drawn' },
                { n: '24h', l: lang === 'es' ? 'entrega ritual' : 'ritual delivery' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="v2-num" style={{ fontSize: 38, color: goldBright, lineHeight: 1 }}>{s.n}</div>
                  <div className="v2-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.25em', marginTop: 8 }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote / interlude band */}
        <section style={{ padding: '80px 56px', textAlign: 'center', borderBottom: `1px solid rgba(201,165,90,0.18)`, position: 'relative' }}>
          <img src="assets/lazo-astral-logo.png" alt="" style={{ height: 90, opacity: 0.85, marginBottom: 24 }} />
          <blockquote style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 44, fontStyle: 'italic', fontWeight: 300,
            margin: 0, maxWidth: 880, marginInline: 'auto',
            color: cream, lineHeight: 1.25, textWrap: 'balance',
          }}>
            {lang === 'es'
              ? '«No interpretamos a tu mascota — interpretamos el cielo bajo el cual decidió encontrarte.»'
              : '«We do not interpret your pet — we interpret the sky under which they chose to find you.»'
            }
          </blockquote>
          <div className="v2-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.35em', marginTop: 32 }}>
            — ELENA SOMNIA, {lang === 'es' ? 'ASTRÓLOGA MAYOR' : 'CHIEF ASTROLOGER'}
          </div>
        </section>

        {/* Form section — split: left description, right form */}
        <section id="form" style={{
          display: 'grid', gridTemplateColumns: '0.85fr 1.15fr',
          minHeight: 760,
        }}>
          {/* Left descriptor */}
          <div style={{
            padding: '88px 56px',
            background: ink,
            borderRight: `1px solid rgba(201,165,90,0.18)`,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <div className="v2-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.4em', marginBottom: 24 }}>
                {lang === 'es' ? 'CAPÍTULO II' : 'CHAPTER II'}
              </div>
              <h2 style={{
                fontSize: 64, fontWeight: 300, lineHeight: 1, margin: 0, letterSpacing: '-0.01em',
              }}>
                {lang === 'es'
                  ? <>El ritual<br /><span style={{ fontStyle: 'italic', color: goldBright }}>de consulta</span></>
                  : <>The ritual<br /><span style={{ fontStyle: 'italic', color: goldBright }}>of consultation</span></>
                }
              </h2>
              <p style={{
                fontSize: 18, lineHeight: 1.6, color: 'rgba(245,236,214,0.7)',
                fontStyle: 'italic', marginTop: 32, maxWidth: 380,
              }}>
                {lang === 'es'
                  ? 'Cada carta requiere cinco coordenadas precisas — los astros responden mejor a quien pregunta con cuidado. Tomamos lo que nos das y trazamos a mano sobre papel de oro.'
                  : 'Each chart requires five precise coordinates — the stars answer best to those who ask with care. We take what you give and draw by hand on gold paper.'
                }
              </p>
            </div>

            {/* Process steps */}
            <div style={{ marginTop: 48 }}>
              {[
                lang === 'es' ? 'Recibimos los datos' : 'We receive the data',
                lang === 'es' ? 'Calculamos las posiciones' : 'We calculate positions',
                lang === 'es' ? 'Una astróloga interpreta' : 'An astrologer interprets',
                lang === 'es' ? 'Sellamos y enviamos' : 'We seal and send',
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 20, padding: '14px 0',
                  borderBottom: i < 3 ? `1px solid rgba(201,165,90,0.15)` : 'none',
                }}>
                  <div className="v2-num" style={{ color: goldBright, fontSize: 16, width: 28 }}>
                    {['I','II','III','IV'][i]}
                  </div>
                  <div style={{ fontSize: 16, fontStyle: 'italic', color: 'rgba(245,236,214,0.85)' }}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div style={{
            padding: '88px 72px',
            background: dark,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div className="v2-mono" style={{ fontSize: 10, color: dim, marginBottom: 8, letterSpacing: '0.1em' }}>
              FORM 001 / ASTRAL CHART REQUEST
            </div>
            <div className="v2-cinzel" style={{ fontSize: 24, color: goldBright, marginBottom: 36 }}>
              {lang === 'es' ? 'CONVOCA LA CARTA' : 'SUMMON THE CHART'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label className="v2-label">
                  <span className="v2-num" style={{ color: goldBright, marginRight: 8 }}>I</span>
                  {lang === 'es' ? 'Nombre completo de tu mascota' : "Pet's full name"}
                </label>
                <input className="v2-input" placeholder={lang === 'es' ? 'Orión Selene del Sur' : 'Orion Selene of the South'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="v2-label">
                    <span className="v2-num" style={{ color: goldBright, marginRight: 8 }}>II</span>
                    {lang === 'es' ? 'Fecha de nacimiento' : 'Date of birth'}
                  </label>
                  <input className="v2-input" placeholder="14 / 03 / 2019" />
                </div>
                <div>
                  <label className="v2-label">
                    <span className="v2-num" style={{ color: goldBright, marginRight: 8 }}>III</span>
                    {lang === 'es' ? 'Hora exacta' : 'Exact time'}
                  </label>
                  <input className="v2-input" placeholder="03 : 47" />
                </div>
              </div>

              <div>
                <label className="v2-label">
                  <span className="v2-num" style={{ color: goldBright, marginRight: 8 }}>IV</span>
                  {lang === 'es' ? 'Lugar de nacimiento' : 'Place of birth'}
                </label>
                <input className="v2-input" placeholder={lang === 'es' ? 'Isla Negra, Chile' : 'Isla Negra, Chile'} />
              </div>

              <div>
                <label className="v2-label" style={{ marginBottom: 12 }}>
                  <span className="v2-num" style={{ color: goldBright, marginRight: 8 }}>V</span>
                  {lang === 'es' ? '¿Sobre qué deseas saber?' : 'What do you wish to know?'}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { id: 'amor', roman: 'I', label: lang === 'es' ? 'AMOR & VÍNCULOS' : 'LOVE & BONDS', sub: 'Venus' },
                    { id: 'vida', roman: 'II', label: lang === 'es' ? 'VIDA & DESTINO' : 'LIFE & DESTINY', sub: 'Sol' },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setPetType(opt.id)} style={{
                      background: petType === opt.id ? 'rgba(231,201,122,0.08)' : 'rgba(245,236,214,0.02)',
                      border: `1px solid ${petType === opt.id ? goldBright : 'rgba(201,165,90,0.25)'}`,
                      padding: '20px 16px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 16,
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}>
                      <div className="v2-cinzel" style={{ fontSize: 22, color: goldBright, lineHeight: 1, letterSpacing: '0.2em', minWidth: 28 }}>{opt.roman}</div>
                      <div>
                        <div className="v2-cinzel" style={{ fontSize: 11, color: cream, letterSpacing: '0.18em' }}>{opt.label}</div>
                        <div className="v2-mono" style={{ fontSize: 10, color: gold, marginTop: 4 }}>{opt.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button style={{
                marginTop: 16,
                background: goldBright, color: dark, border: 'none',
                padding: '20px 0', cursor: 'pointer',
                letterSpacing: '0.35em', fontSize: 11,
              }} className="v2-cinzel">
                {lang === 'es' ? 'TRAZAR MI CARTA ASTRAL' : 'TRACE MY ASTRAL CHART'}
              </button>

              <div className="v2-mono" style={{ fontSize: 10, color: dim, textAlign: 'center', marginTop: -8 }}>
                {lang === 'es' ? 'ENTREGA EN 24 HORAS · SELLADO EN CERA DE LUNA' : '24H DELIVERY · SEALED IN MOON WAX'}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '40px 56px',
          borderTop: `1px solid rgba(201,165,90,0.2)`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }} className="v2-cinzel">
          <div style={{ fontSize: 10, color: dim, letterSpacing: '0.3em' }}>
            GALGO ASTRAL &nbsp;·&nbsp; MMXXVI &nbsp;·&nbsp; ISLA NEGRA · CHILE
          </div>
          <img src="assets/lazo-astral-logo.png" alt="" style={{ height: 50, opacity: 0.85 }} />
          <div style={{ fontSize: 10, color: dim, letterSpacing: '0.3em' }}>
            SUB LUNA NOVA  &nbsp;·&nbsp; {lang === 'es' ? 'POLÍTICA · CONTACTO' : 'PRIVACY · CONTACT'}
          </div>
        </footer>
      </div>
    </div>
  );
}

window.DesignV2 = DesignV2;
