// Design v1: "Carta del Templo" — vintage esotérico clásico, simétrico, cartas de tarot
// Hero centrado con rueda natal, marco ornamental, formulario en pergamino dorado

function DesignV1({ width = 1280 }) {
  const gold = '#c9a55a';
  const goldBright = '#e7c97a';
  const dark = '#0b0a08';
  const cream = '#f5ecd6';
  const ink = '#1a160d';

  const [petType, setPetType] = React.useState('amor');
  const [lang, setLang] = React.useState('es');

  const t = lang === 'es' ? {
    eyebrow: 'CARTA ASTRAL',
    title1: 'El cosmos',
    title2: 'guarda secretos',
    title3: 'sobre quien eres',
    body: 'Descubre tu alma estelar. Una carta astral trazada a mano por astrólogas iniciadas en el linaje del galgo de la luna. Después, podrás consultar también el lazo con tu mascota.',
    cta: 'CONSULTAR MI CARTA',
    sub: 'Trazada a mano. Entrega en 24 horas. Siete generaciones de tradición.',
    formTitle: 'Convoca tu carta',
    formSub: 'Los astros responden a quien pregunta con precisión',
    name: 'Tu nombre completo',
    date: 'Fecha de nacimiento',
    place: 'Lugar de nacimiento',
    time: 'Hora de nacimiento',
    timeHint: '(si la conoces — la luna ascendente lo agradece)',
    purpose: '¿Sobre qué deseas saber?',
    love: 'Amor & vínculos',
    life: 'Vida & destino',
    submit: 'Trazar mi carta astral',
    sealed: 'Sellado con cera de luna',
  } : {
    eyebrow: 'ASTRAL CHART',
    title1: 'The cosmos',
    title2: 'keeps secrets',
    title3: 'about who you are',
    body: 'Uncover your starlit soul. An astral chart drawn by hand by astrologers initiated in the lineage of the moon greyhound. After, you may also consult your bond with your pet.',
    cta: 'CONSULT MY CHART',
    sub: 'Hand drawn. 24h delivery. Seven generations of tradition.',
    formTitle: 'Summon your chart',
    formSub: 'The stars answer those who ask with precision',
    name: 'Your full name',
    date: 'Date of birth',
    place: 'Place of birth',
    time: 'Time of birth',
    timeHint: '(if known — the rising moon will thank you)',
    purpose: 'What do you wish to know?',
    love: 'Love & bonds',
    life: 'Life & destiny',
    submit: 'Trace my astral chart',
    sealed: 'Sealed with moon wax.',
  };

  return (
    <div style={{ width, fontFamily: '"Cormorant Garamond", serif', background: dark, color: cream, position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .v1 * { box-sizing: border-box; }
        .v1-cinzel { font-family: 'Cinzel', serif; letter-spacing: 0.18em; font-weight: 500; }
        .v1-cormorant { font-family: 'Cormorant Garamond', serif; }
        .v1-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .v1-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(201, 165, 90, 0.35);
          color: ${cream};
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          padding: 8px 0 10px;
          outline: none;
          font-style: italic;
        }
        .v1-input::placeholder { color: rgba(245, 236, 214, 0.35); font-style: italic; }
        .v1-input:focus { border-bottom-color: ${goldBright}; }
        .v1-label {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: ${gold};
          text-transform: uppercase;
        }
        @keyframes v1-twinkle {
          0%,100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes v1-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .v1-star { animation: v1-twinkle 4s ease-in-out infinite; }
      `}</style>

      {/* Backdrop: deep night with starfield */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(201, 165, 90, 0.08), transparent 60%),
          radial-gradient(ellipse at 50% 100%, rgba(201, 165, 90, 0.05), transparent 60%),
          ${dark}
        `,
      }}>
        {/* Starfield */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 80 }).map((_, i) => {
            const x = (i * 137.5) % 100;
            const y = (i * 79.3) % 100;
            const s = (i % 4) * 0.4 + 0.6;
            return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={s} fill={goldBright} className="v1-star" style={{ animationDelay: `${(i % 7) * 0.5}s`, opacity: 0.4 }} />;
          })}
        </svg>
      </div>

      <div className="v1" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top nav bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 64px', borderBottom: `1px solid rgba(201,165,90,0.15)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src="assets/lazo-astral-logo.png" style={{ height: 88, filter: 'drop-shadow(0 0 24px rgba(231,201,122,0.35))' }} alt="Galgo Astral" />
            <div className="v1-cinzel" style={{ fontSize: 18, color: goldBright, lineHeight: 1 }}>
              GALGO ASTRAL
              <div className="v1-cormorant" style={{ fontSize: 11, fontStyle: 'italic', color: gold, letterSpacing: '0.1em', marginTop: 4 }}>est. en la luna nueva</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: 36 }} className="v1-cinzel">
            {['CARTA ASTRAL', 'TAROT DIARIO', 'EL LINAJE', 'DIARIO'].map(item => (
              <a key={item} href="#" style={{ color: cream, textDecoration: 'none', fontSize: 11, opacity: 0.85 }}>{item}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 8, fontSize: 11 }} className="v1-cinzel">
            <button onClick={() => setLang('es')} style={{ background: 'none', border: 'none', color: lang === 'es' ? goldBright : 'rgba(245,236,214,0.4)', cursor: 'pointer', letterSpacing: '0.2em' }}>ES</button>
            <span style={{ color: 'rgba(201,165,90,0.4)' }}>·</span>
            <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', color: lang === 'en' ? goldBright : 'rgba(245,236,214,0.4)', cursor: 'pointer', letterSpacing: '0.2em' }}>EN</button>
          </div>
        </header>

        {/* Hero */}
        <section style={{ padding: '80px 64px 60px', textAlign: 'center', position: 'relative' }}>
          {/* Hero galgo silhouette */}
          <img src="assets/lazo-astral-logo.png" alt="" style={{
            position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)',
            width: 360, opacity: 0.18, pointerEvents: 'none', zIndex: 0,
            filter: 'drop-shadow(0 0 40px rgba(231,201,122,0.25))',
          }} />
          <div className="v1-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.4em', marginBottom: 28, position: 'relative', zIndex: 1 }}>
            {t.eyebrow}
          </div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontSize: 96,
            lineHeight: 0.98,
            margin: 0,
            color: cream,
            letterSpacing: '-0.01em',
          }}>
            <div>{t.title1}</div>
            <div style={{ fontStyle: 'italic', color: goldBright, fontWeight: 300 }}>{t.title2}</div>
            <div>{t.title3}</div>
          </h1>

          <p style={{
            maxWidth: 580, margin: '36px auto 48px', fontSize: 21, lineHeight: 1.55,
            color: 'rgba(245,236,214,0.78)', fontStyle: 'italic', textWrap: 'pretty',
          }}>{t.body}</p>

          {/* Natal wheel */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 32px', animation: 'v1-float 8s ease-in-out infinite' }}>
            <NatalWheel size={520} gold={gold} goldBright={goldBright} dark={dark} cream={cream} />
          </div>

          <a href="#form" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${gold}`,
            outline: `1px solid rgba(201,165,90,0.35)`,
            outlineOffset: '-6px',
            color: goldBright,
            minHeight: 64,
            padding: '0 72px',
            textDecoration: 'none',
            letterSpacing: '0.32em',
            fontSize: 13,
            lineHeight: 1.2,
            background: 'rgba(201,165,90,0.04)',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }} className="v1-cinzel"
             onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(231,201,122,0.12)'; e.currentTarget.style.color = cream; }}
             onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,165,90,0.04)'; e.currentTarget.style.color = goldBright; }}>
            <span style={{ display: 'inline-block', paddingTop: 2 }}>{t.cta}</span>
          </a>
          <div className="v1-cormorant" style={{ marginTop: 24, fontSize: 14, fontStyle: 'italic', color: 'rgba(201,165,90,0.7)', letterSpacing: '0.05em' }}>
            {t.sub}
          </div>
        </section>

        {/* Three pillars / what's inside */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(201,165,90,0.15)', margin: '40px 64px', border: `1px solid rgba(201,165,90,0.15)` }}>
          {[
            { roman: 'I', t: lang === 'es' ? 'El Sol revela' : 'The Sun reveals', d: lang === 'es' ? 'La esencia de tu carácter, lo que ilumina tu existencia.' : 'The essence of your character, what illuminates you.' },
            { roman: 'II', t: lang === 'es' ? 'La Luna susurra' : 'The Moon whispers', d: lang === 'es' ? 'Tus emociones más íntimas, miedos y deseos ocultos.' : 'Your innermost emotions, hidden fears and desires.' },
            { roman: 'III', t: lang === 'es' ? 'El lazo aparece' : 'The bond appears', d: lang === 'es' ? 'Después podrás consultar tu lazo con tu mascota.' : 'After, you may consult your bond with your pet.' },
          ].map((p, i) => (
            <div key={i} style={{ background: dark, padding: '56px 40px', textAlign: 'center' }}>
              <div className="v1-cinzel" style={{ fontSize: 26, color: goldBright, marginBottom: 18, lineHeight: 1, letterSpacing: '0.25em' }}>{p.roman}</div>
              <div className="v1-cinzel" style={{ fontSize: 13, color: gold, marginBottom: 16, letterSpacing: '0.25em' }}>{p.t.toUpperCase()}</div>
              <div style={{ fontSize: 18, lineHeight: 1.5, color: 'rgba(245,236,214,0.75)', fontStyle: 'italic' }}>{p.d}</div>
            </div>
          ))}
        </section>

        {/* Form section */}
        <section id="form" style={{ padding: '100px 64px 80px', position: 'relative' }}>
          <div style={{
            maxWidth: 720, margin: '0 auto',
            background: `linear-gradient(180deg, rgba(26,22,13,0.95), rgba(11,10,8,0.98))`,
            border: `1px solid ${gold}`,
            padding: '72px 80px',
            position: 'relative',
          }}>
            {/* Inner decorative border */}
            <div style={{ position: 'absolute', inset: 12, border: `1px solid rgba(201,165,90,0.3)`, pointerEvents: 'none' }}></div>
            {/* Galgo medallion */}
            <img src="assets/lazo-astral-logo.png" alt="" style={{
              position: 'absolute', top: -56, left: '50%', transform: 'translateX(-50%)',
              width: 110, height: 110, objectFit: 'contain',
              background: dark, padding: 12, borderRadius: '50%',
              border: `1px solid ${gold}`,
            }} />

            <div style={{ textAlign: 'center', marginBottom: 56, marginTop: 32 }}>
              <div className="v1-cinzel" style={{ fontSize: 11, color: gold, letterSpacing: '0.4em', marginBottom: 16 }}>
                {lang === 'es' ? 'RITUAL DE CONSULTA' : 'RITUAL OF CONSULTATION'}
              </div>
              <h2 style={{ fontSize: 56, fontWeight: 400, margin: 0, color: cream, fontFamily: '"Cormorant Garamond", serif' }}>
                <span style={{ fontStyle: 'italic', color: goldBright }}>{t.formTitle}</span>
              </h2>
              <p style={{ fontSize: 18, color: 'rgba(245,236,214,0.65)', fontStyle: 'italic', marginTop: 12, marginBottom: 0 }}>{t.formSub}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              <div>
                <div className="v1-label">I &nbsp;·&nbsp; {t.name}</div>
                <input className="v1-input" placeholder={lang === 'es' ? 'Orión, Luna, Selene…' : 'Orion, Luna, Selene…'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
                <div>
                  <div className="v1-label">II &nbsp;·&nbsp; {t.date}</div>
                  <input className="v1-input" placeholder="14 · 03 · 2019" />
                </div>
                <div>
                  <div className="v1-label">III &nbsp;·&nbsp; {t.time}</div>
                  <input className="v1-input" placeholder="03:47" />
                  <div style={{ fontSize: 12, color: 'rgba(245,236,214,0.4)', fontStyle: 'italic', marginTop: 6 }}>{t.timeHint}</div>
                </div>
              </div>

              <div>
                <div className="v1-label">IV &nbsp;·&nbsp; {t.place}</div>
                <input className="v1-input" placeholder={lang === 'es' ? 'Isla Negra, Chile' : 'Isla Negra, Chile'} />
              </div>

              <div>
                <div className="v1-label" style={{ marginBottom: 16 }}>V &nbsp;·&nbsp; {t.purpose}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { id: 'amor', roman: 'I', label: t.love, sub: lang === 'es' ? 'Venus & la Luna' : 'Venus & the Moon' },
                    { id: 'vida', roman: 'II', label: t.life, sub: lang === 'es' ? 'el Sol & los nodos' : 'the Sun & the nodes' },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setPetType(opt.id)} style={{
                      background: petType === opt.id ? 'rgba(201,165,90,0.1)' : 'transparent',
                      border: `1px solid ${petType === opt.id ? goldBright : 'rgba(201,165,90,0.3)'}`,
                      padding: '24px 20px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: cream,
                      fontFamily: '"Cormorant Garamond", serif',
                      transition: 'all 0.3s',
                    }}>
                      <div className="v1-cinzel" style={{ fontSize: 22, color: goldBright, marginBottom: 8, letterSpacing: '0.25em' }}>{opt.roman}</div>
                      <div style={{ fontSize: 18, fontStyle: 'italic' }}>{opt.label}</div>
                      <div className="v1-cinzel" style={{ fontSize: 9, color: gold, letterSpacing: '0.2em', marginTop: 6 }}>{opt.sub.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button style={{
                marginTop: 24,
                background: goldBright,
                color: dark,
                border: 'none',
                padding: '22px 0',
                cursor: 'pointer',
                letterSpacing: '0.35em',
                fontSize: 12,
              }} className="v1-cinzel">
                {t.submit.toUpperCase()}
              </button>

              <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(201,165,90,0.6)', fontStyle: 'italic', marginTop: -8 }}>
                {t.sealed}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '60px 64px 60px', textAlign: 'center', borderTop: `1px solid rgba(201,165,90,0.15)`, marginTop: 40 }}>
          <img src="assets/lazo-astral-logo.png" alt="" style={{ width: 120, marginBottom: 16, opacity: 0.9 }} />
          <div className="v1-cormorant" style={{ fontStyle: 'italic', fontSize: 16, color: 'rgba(245,236,214,0.5)' }}>
            «&nbsp;Quien observa el cielo de su mascota, observa el suyo propio.&nbsp;»
          </div>
          <div className="v1-cinzel" style={{ fontSize: 10, color: gold, letterSpacing: '0.4em', marginTop: 24 }}>
            GALGO ASTRAL &nbsp;·&nbsp; MMXXVI &nbsp;·&nbsp; SUB LUNA NOVA
          </div>
        </footer>
      </div>
    </div>
  );
}

window.DesignV1 = DesignV1;
