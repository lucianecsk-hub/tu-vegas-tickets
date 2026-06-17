import { useState } from "react";

// ─── BASE DE DATOS ────────────────────────────────────────────────────────
const DB = {
  shows: [
    { name:"Mystère — Cirque du Soleil",      emoji:"🎭", price:"Desde $49",  dur:"1.5 hrs", rating:4.6, desc:"El Cirque original en Vegas. Treasure Island. Más de 30 años de acrobacias que desafían la física.", url:"https://vegas.vdvm.net/LKVW3L" },
    { name:"Cirque du Soleil O",               emoji:"🌊", price:"Desde $64",  dur:"1.5 hrs", rating:4.8, desc:"Agua. Acróbatas. Un escenario que desafía la física. El espectáculo que define Las Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-o-by-cirque-du-soleil-at-bellagio-t398243/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Michael Jackson ONE — Cirque",     emoji:"🕺", price:"Desde $96",  dur:"1.5 hrs", rating:4.8, desc:"Cirque du Soleil con MJ. Mandalay Bay. El show más emotivo del Strip.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-michael-jackson-one-by-cirque-du-soleil-ticket-t400944/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"KÀ — Cirque du Soleil VIP",        emoji:"🎪", price:"Desde $370", dur:"3 hrs",   rating:5.0, desc:"El espectáculo más grandioso del Cirque — backstage, encuentro con artistas, lounge VIP. Una vez en la vida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-ka-by-cirque-du-soleil-at-mgm-grand-ticket-t405483/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Awakening — Wynn",                 emoji:"💫", price:"Desde $74",  dur:"1.5 hrs", rating:4.4, desc:"Un original del Wynn. Danza, ilusión, tecnología — así son los espectáculos de Vegas en 2026.", url:"https://vegas.vdvm.net/MmJP2n" },
  ],

  atracciones: [
    { name:"The Neon Museum",                       emoji:"🌟", price:"Desde $25",  dur:"1 hr",    rating:4.7, desc:"El cementerio de los carteles de neón que hicieron famosa a Las Vegas. Una visita nocturna imprescindible.", url:"https://vegas.vdvm.net/QyoarY" },
    { name:"Torre Eiffel — Mirador Las Vegas",      emoji:"🗼", price:"Desde $35",  dur:"1 hr",    rating:4.6, desc:"París recreada en el Strip. Vistas desde 46 pisos al atardecer — una de las mejores fotos de tu viaje.", url:"https://gyg.me/zvZksqFf" },
    { name:"Big Apple Coaster — New York-New York", emoji:"🎢", price:"Desde $20",  dur:"30 min",  rating:4.5, desc:"La montaña rusa más icónica del Strip. Rodea el hotel New York-New York a toda velocidad.", url:"https://vegas.vdvm.net/baxr9b" },
    { name:"Bodies… The Exhibition",               emoji:"🫀", price:"Desde $32",  dur:"1.5 hrs", rating:4.6, desc:"Cuerpos humanos reales preservados. Una experiencia científica y artística única. Solo en Las Vegas.", url:"https://vegas.vdvm.net/k0BoGM" },
    { name:"SkyJump — The STRAT",                  emoji:"🪂", price:"Desde $129", dur:"30 min",  rating:4.8, desc:"Salta desde 260 metros de altura desde la torre más alta de Vegas. La caída libre más espectacular de América.", url:"https://gyg.me/ycELhTAp" },
    { name:"Madame Tussauds Las Vegas",             emoji:"🗿", price:"Desde $30",  dur:"1.5 hrs", rating:4.3, desc:"Las figuras de cera más famosas del mundo en el corazón del Strip. Foto perfecta garantizada.", url:"https://vegas.vdvm.net/g1jmB5" },
    { name:"Wizard of Oz — The Sphere",            emoji:"🌐", price:"Desde $114", dur:"1.5 hrs", rating:4.5, desc:"La Sphere. 160,000 m² de LED. El Mago de Oz como nunca lo habías visto en tu vida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-the-sphere-experience-the-wizard-of-oz-t969545/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"High Roller — La Noria Gigante",       emoji:"🎡", price:"Desde $21",  dur:"30 min",  rating:4.6, desc:"La vista más icónica de Las Vegas desde 167 metros de altura. De día o de noche, solo o en pareja.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t270522/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Interstellar Arc — AREA15",            emoji:"🌌", price:"Desde $44",  dur:"1 hr",    rating:4.8, desc:"Una instalación de arte extraterrestre dentro de AREA15. El futuro ya está aquí.", url:"https://vegas.vdvm.net/9VM075" },
    { name:"Exposición Titanic — Luxor",           emoji:"🚢", price:"Desde $36",  dur:"1.5 hrs", rating:4.6, desc:"Artefactos reales del Titanic. El barco que cambió la historia, dentro de una pirámide. Solo en Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/luxor-hotel-titanic-the-artifact-exhibition-entry-ticket-t395730/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  tours: [
    { name:"Tour Valle de Fuego",                  emoji:"🔥", price:"Desde $99",  dur:"6 hrs",   rating:4.8, desc:"50 millas de roca roja ancestral. Traslado incluido. Petroglifos, silencio, Marte en la Tierra.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-small-group-valley-of-fire-tour-t356680/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Antelope Canyon + Horseshoe Bend",     emoji:"🏞️", price:"Desde $189", dur:"15 hrs",  rating:4.7, desc:"El cañón de ranura más fotografiado del planeta, más Horseshoe Bend. Traslado incluido.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-antelope-canyon-horseshoe-bend-tour-t404294/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Parques Bryce + Zion",                 emoji:"🌲", price:"Desde $169", dur:"13 hrs",  rating:4.7, desc:"Dos de los parques nacionales más espectaculares de América en un día. Hoodoos y arcos rojos.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-bryce-and-zion-national-parks-tour-with-lunch-t304518/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Tour Área 51 — Día Completo",          emoji:"👽", price:"Desde $242", dur:"10 hrs",  rating:4.8, desc:"La base clasificada. El buzón negro. Traslado incluido. Creas o no — esto da escalofríos.", url:"https://www.getyourguide.com/las-vegas-l58/area-51-tour-from-las-vegas-t47582/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Kayak — Cueva Esmeralda",              emoji:"🚣", price:"Desde $119", dur:"4 hrs",   rating:4.7, desc:"Kayak hacia una cueva esmeralda brillante en el Río Colorado. Traslado incluido. El mejor secreto al aire libre cerca de Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-emerald-cave-kayak-tour-with-hotel-pickup-t856688/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Tour ATV en el Desierto",              emoji:"🏜️", price:"Desde $109", dur:"3 hrs",   rating:4.7, desc:"ATVs reales en el Mojave auténtico. Nada entre tú y el desierto. Adrenalina pura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-guided-las-vegas-desert-atv-tour-t417683/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  experiencias: [
    { name:"Universal Horror Unleashed",            emoji:"👹", price:"Desde $45",  dur:"3 hrs",  rating:4.7, desc:"Terror real en Vegas. Los monstruos más icónicos del cine cobran vida. Solo apto para valientes.", url:"https://vegas.vdvm.net/aO76jj" },
    { name:"Machine Guns Vegas",                    emoji:"🔫", price:"Desde $50",  dur:"1 hr",   rating:4.8, desc:"Armas reales en un campo de tiro supervisado. El único lugar del mundo donde esto tiene tanto sentido.", url:"https://vegas.vdvm.net/Py36Z6" },
    { name:"Exotics Racing — Ferrari y Lamborghini",emoji:"🏎️", price:"Desde $109", dur:"1 hr",   rating:4.8, desc:"Maneja un Lamborghini, Ferrari o Porsche en un circuito real. Al sur del Strip. Vidas que cambian aquí.", url:"https://vegas.vdvm.net/eK4ZeZ" },
    { name:"Blackout — Dining in the Dark",         emoji:"🖤", price:"Desde $85",  dur:"2 hrs",  rating:4.6, desc:"Una cena gourmet completamente a oscuras. Sin vista, los demás sentidos explotan. Una experiencia que no olvidarás.", url:"https://vegas.vdvm.net/0ZWgjN" },
    { name:"FLY LINQ — Zipline sobre el Strip",     emoji:"🤸", price:"Desde $49",  dur:"30 min", rating:4.5, desc:"Deslízate en tirolesa sobre el Strip de Las Vegas. Vista aérea única desde el LINQ.", url:"https://vegas.vdvm.net/4eLyeG" },
    { name:"Helicóptero Nocturno sobre el Strip",   emoji:"🚁", price:"Desde $129", dur:"15 min", rating:4.6, desc:"El Strip desde un helicóptero de noche. La vista más icónica de América desde 300 metros de altura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-strip-helicopter-flight-without-transfers-t33967/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  nightlife: [
    { name:"FANTASY Burlesque — Luxor",         emoji:"💃", price:"Desde $37",  dur:"1.5 hrs", rating:4.7, desc:"El show para adultos más longevo del Strip. Artistas increíbles, glamour de Vegas. Solo mayores de 21.", url:"https://vegas.vdvm.net/4P13Po" },
    { name:"Magic Mike Live",                   emoji:"🔥", price:"Desde $54",  dur:"1.5 hrs", rating:4.7, desc:"El show del que todos hablan durante años. SAHARA Las Vegas. Ya sabes de qué va.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-magic-mike-live-at-the-sahara-t525549/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Chippendales — Planet Hollywood",   emoji:"💪", price:"Desde $67",  dur:"1.5 hrs", rating:4.6, desc:"Planet Hollywood. El original. La noche más salvaje del Strip.", url:"https://vegas.vdvm.net/DyOEj2" },
    { name:"Thunder From Down Under",           emoji:"⚡", price:"Desde $74",  dur:"1.5 hrs", rating:4.5, desc:"Australianos. Excalibur. El show de despedida de soltera que lo empezó todo.", url:"https://vegas.vdvm.net/VmROXR" },
    { name:"ROUGE — Cabaret Sensual",           emoji:"❤️", price:"Desde $54",  dur:"1.5 hrs", rating:4.4, desc:"El cabaret solo para adultos del STRAT. Sensual, atrevido, íntimo. La noche perfecta en el Strip.", url:"https://vegas.vdvm.net/m5znGa" },
    { name:"Club Crawl VIP + Barra Libre",      emoji:"🥂", price:"Desde $40",  dur:"5 hrs",   rating:4.9, desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs del Strip. La noche que nunca termina.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-cocktail-class-party-bus-and-vip-club-entry-t1230903/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Pool Party en Bus de Fiesta",       emoji:"🏊", price:"Desde $99",  dur:"5 hrs",   rating:4.5, desc:"Bus de fiesta a una pool party de Vegas con bebidas gratis y entrada VIP.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-pool-party-crawl-by-party-bus-t439815/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Strip Club Crawl + Barra Libre",    emoji:"🍾", price:"Desde $99",  dur:"4 hrs",   rating:4.7, desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs de Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/strip-club-crawl-open-bar-party-bus-t442598/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Limo + Champán + Club VIP",         emoji:"🚘", price:"Desde $499", dur:"4 hrs",   rating:4.8, desc:"Limusina stretch, champán en el camino, entrada VIP al club. La noche para la que Vegas fue construida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-limo-tour-with-champagne-and-nightclub-entry-t981477/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Bars Unknown — Bar Crawl",          emoji:"🍸", price:"Desde $54",  dur:"3 hrs",   rating:5.0, desc:"Los bares escondidos del Strip. La mayoría de turistas los pasa de largo cada noche sin saberlo.", url:"https://www.getyourguide.com/las-vegas-l58/bars-unknown-the-las-vegas-strip-bar-crawl-t708411/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"High Roller — Cabina Open Bar",     emoji:"🎡", price:"Desde $48",  dur:"30 min",  rating:4.6, desc:"El Strip desde 167 metros. Barra libre. Sin límites. Mejor al atardecer.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t436735/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  ninos: [
    { name:"Flyover Las Vegas",                  emoji:"🪂", price:"Desde $25",  dur:"30 min",     rating:4.7, desc:"Un vuelo simulado sobre Las Vegas. Viento, aromas, movimiento — olvidarás que estás dentro.", url:"https://vegas.vdvm.net/a1LxZQ" },
    { name:"Meow Wolf's Omega Mart",             emoji:"🛒", price:"Desde $44",  dur:"2 hrs",      rating:4.8, desc:"Un supermercado que esconde portales a mundos alternativos. Arte inmersivo que enloquece a niños y adultos.", url:"https://vegas.vdvm.net/NkZ5bq" },
    { name:"Cowabunga Canyon — Parque Acuático", emoji:"💦", price:"Desde $45",  dur:"Todo el día", rating:4.7, desc:"El mejor parque acuático de Vegas. Toboganes, río lento, piscina de olas.", url:"https://vegas.vdvm.net/xkWeD1" },
    { name:"Michael Jackson ONE — Cirque",       emoji:"🕺", price:"Desde $96",  dur:"1.5 hrs",    rating:4.8, desc:"Cirque du Soleil con MJ. El show más emotivo del Strip — ideal para toda la familia.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-michael-jackson-one-by-cirque-du-soleil-ticket-t400944/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Dig This — Maneja Excavadoras",      emoji:"🚜", price:"Desde $28",  dur:"1 hr",       rating:5.0, desc:"Maneja excavadoras y bulldozers reales en el desierto. La diversión más inesperada en Vegas.", url:"https://vegas.vdvm.net/QjbP19" },
    { name:"Interstellar Arc — AREA15",          emoji:"🌌", price:"Desde $44",  dur:"1 hr",       rating:4.8, desc:"Una instalación de arte extraterrestre dentro de AREA15. El futuro ya está aquí.", url:"https://vegas.vdvm.net/9VM075" },
    { name:"High Roller — La Noria Gigante",     emoji:"🎡", price:"Desde $21",  dur:"30 min",     rating:4.6, desc:"La vista más icónica de Las Vegas desde 167 metros. Perfecta para toda la familia.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t270522/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Torneo de Reyes — Cena Medieval",    emoji:"⚔️", price:"Desde $63",  dur:"1.5 hrs",    rating:4.5, desc:"Caballeros medievales, justas, explosiones y cena incluida. Excalibur. Los niños enloquecen.", url:"https://vegas.vdvm.net/oq1xGn" },
  ],

  deportes: [
    { name:"Circa Sportsbook — El Más Grande del Mundo", emoji:"🏆", price:"Gratis",     dur:"Cualquier hora", rating:4.9, desc:"El sportsbook más grande del mundo. 4 pisos, 350 pantallas, asientos de estadio.", url:"https://vegas.vdvm.net/jRnEoP" },
    { name:"Vegas Golden Knights — NHL",                 emoji:"🏒", price:"Desde $80",  dur:"3 hrs",          rating:4.9, desc:"T-Mobile Arena. La atmósfera más eléctrica de la NHL.", url:"https://vegas.vdvm.net/YVq55P" },
    { name:"Las Vegas Aces — WNBA",                      emoji:"🏀", price:"Desde $40",  dur:"2.5 hrs",        rating:4.8, desc:"Campeonas consecutivas de la WNBA. El baloncesto femenino más emocionante del mundo.", url:"https://vegas.vdvm.net/xJ2xx1" },
    { name:"Las Vegas Aviators — Béisbol",               emoji:"⚾", price:"Desde $20",  dur:"3 hrs",          rating:4.7, desc:"Béisbol Triple-A en Las Vegas Ballpark. Económico y divertido para todas las edades.", url:"https://vegas.vdvm.net/PzrLLe" },
    { name:"Tour Allegiant Stadium — Raiders",           emoji:"🏟️", price:"Desde $59",  dur:"1.5 hrs",        rating:4.8, desc:"Descubre los bastidores del estadio más tecnológico de la NFL. La casa de los Raiders.", url:"https://vegas.vdvm.net/9VM05e" },
    { name:"Formula 1 Gran Premio Las Vegas",            emoji:"🏎️", price:"Desde $500", dur:"Todo el día",    rating:4.9, desc:"F1 en el Strip de Las Vegas de noche. El evento deportivo más espectacular del mundo.", url:"https://vegas.vdvm.net/dy9xyW" },
  ],
};

const CAT_META = {
  shows:        { label:"Shows",               emoji:"🎭", destaque:"En Destaque" },
  atracciones:  { label:"Atracciones",         emoji:"🎡", destaque:"En Destaque" },
  tours:        { label:"Tours",               emoji:"🏔️", destaque:"En Destaque" },
  experiencias: { label:"Experiencias",        emoji:"⚡", destaque:"En Destaque" },
  nightlife:    { label:"Fiestas & Nightlife", emoji:"🔥", destaque:"Mayores de 21" },
  ninos:        { label:"Con niños",           emoji:"👨‍👩‍👧", destaque:"Familia" },
  deportes:     { label:"Deportes",            emoji:"🏆", destaque:"En Destaque" },
};

const CATEGORIAS = [
  { id:"shows",        label:"Shows",               emoji:"🎭" },
  { id:"atracciones",  label:"Atracciones",         emoji:"🎡" },
  { id:"tours",        label:"Tours",               emoji:"🏔️" },
  { id:"experiencias", label:"Experiencias",        emoji:"⚡" },
  { id:"nightlife",    label:"Fiestas & Nightlife", emoji:"🔥" },
  { id:"ninos",        label:"Con niños",           emoji:"👨‍👩‍👧" },
  { id:"deportes",     label:"Deportes",            emoji:"🏆" },
];

const MAX_SEL = 3;

// ─── ESTILOS ──────────────────────────────────────────────────────────────
const S = {
  app: { minHeight:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Inter', sans-serif", color:"#fff", position:"relative", overflow:"hidden" },
  inner: { width:"100%", maxWidth:"420px", display:"flex", flexDirection:"column", minHeight:"100vh", position:"relative", zIndex:2 },

  // Header
  header: { padding:"14px 24px 12px", textAlign:"center", borderBottom:"1px solid rgba(224,0,200,0.18)", flexShrink:0 },
  logo: { fontFamily:"'Playfair Display', serif", fontSize:"26px", fontWeight:900, letterSpacing:"2px", textTransform:"uppercase", color:"#fff" },
  logoSpan: { color:"#e000c8", textShadow:"0 0 18px rgba(200,0,180,1), 0 0 50px rgba(200,0,180,0.5)" },
  headerSub: { fontSize:"11px", fontWeight:600, letterSpacing:"3.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.85)", marginTop:"6px" },

  // Splash
  splashBody: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"4px 28px 48px", textAlign:"center" },
  loquepasa: { fontFamily:"'Playfair Display', serif", fontSize:"20px", fontStyle:"italic", color:"rgba(255,255,255,0.75)", lineHeight:1.4, marginBottom:"4px" },
  solopasa: { fontFamily:"'Playfair Display', serif", fontSize:"22px", fontStyle:"italic", fontWeight:700, color:"#e000c8", textShadow:"0 0 16px rgba(200,0,180,0.7)", marginBottom:"28px" },
  deco: { width:"56px", height:"1px", background:"linear-gradient(90deg, transparent, #e000c8, transparent)", boxShadow:"0 0 8px rgba(200,0,180,0.5)", margin:"0 auto 48px" },
  city: { fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:"72px", lineHeight:0.9, color:"#fff", letterSpacing:"-1px", marginBottom:"16px" },
  subtitulo: { fontFamily:"'Inter', sans-serif", fontSize:"15px", fontWeight:600, letterSpacing:"4px", textTransform:"uppercase", color:"rgba(255,255,255,0.75)", marginBottom:"4px" },
  destaque: { fontFamily:"'Playfair Display', serif", fontSize:"28px", fontWeight:700, color:"#fff", marginBottom:"52px" },
  categorias: { display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:"6px", marginBottom:"56px", fontFamily:"'Inter', sans-serif", fontSize:"13px", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#e000c8", textShadow:"0 0 12px rgba(200,0,180,0.6)" },
  sep: { color:"rgba(255,255,255,0.25)", fontWeight:300 },

  // CTA
  cta: { background:"linear-gradient(135deg, #d400bc 0%, #8800a0 100%)", color:"#fff", border:"none", borderRadius:"8px", padding:0, width:"100%", maxWidth:"300px", cursor:"pointer", fontFamily:"'Inter', sans-serif", boxShadow:"0 0 28px rgba(200,0,180,0.45), 0 8px 28px rgba(0,0,0,0.5)", transition:"all 0.2s", overflow:"hidden" },
  ctaMain: { display:"block", padding:"18px 24px 14px", fontSize:"19px", fontWeight:700, borderBottom:"1px solid rgba(255,255,255,0.12)" },
  ctaSub: { display:"block", padding:"10px 24px 13px", fontSize:"10px", fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.65)" },

  // Filtros
  filtrosBody: { flex:1, display:"flex", flexDirection:"column", padding:"24px 20px 40px", overflowY:"auto" },
  filtrosTitulo: { fontFamily:"'Playfair Display', serif", fontSize:"24px", fontWeight:700, color:"#fff", textAlign:"center", marginBottom:"6px" },
  filtrosSub: { fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"24px", letterSpacing:"1px" },
  filtrosGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"28px" },
  filtroBtn: (sel) => ({ background: sel ? "rgba(224,0,200,0.12)" : "rgba(255,255,255,0.04)", border: sel ? "1.5px solid #e000c8" : "1.5px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"16px 10px", cursor:"pointer", fontFamily:"'Inter', sans-serif", color: sel ? "#fff" : "rgba(255,255,255,0.6)", fontSize:"12px", fontWeight:600, textAlign:"center", transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:"7px", boxShadow: sel ? "0 0 16px rgba(224,0,200,0.25)" : "none" }),
  filtroEmoji: { fontSize:"26px", lineHeight:1 },
  contador: (ativo) => ({ textAlign:"center", fontSize:"11px", fontWeight:500, letterSpacing:"2px", textTransform:"uppercase", color: ativo ? "#e000c8" : "rgba(255,255,255,0.3)", marginBottom:"20px", minHeight:"18px", textShadow: ativo ? "0 0 8px rgba(200,0,180,0.5)" : "none" }),
  ctaDisabled: { opacity:0.35, pointerEvents:"none" },

  // Resultados
  resBody: { flex:1, overflowY:"auto", padding:"20px 16px 48px" },
  resBack: { background:"none", border:"none", color:"rgba(255,255,255,0.5)", fontSize:"12px", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", cursor:"pointer", fontFamily:"'Inter', sans-serif", marginBottom:"20px", display:"flex", alignItems:"center", gap:"6px", padding:0 },
  avisoLegal: { fontSize:"10px", color:"rgba(255,255,255,0.25)", fontStyle:"italic", lineHeight:1.6, marginBottom:"24px", padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.05)" },
  catHeader: { display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px", paddingBottom:"10px", borderBottom:"1px solid rgba(224,0,200,0.2)" },
  catEmoji: { fontSize:"22px" },
  catTitulo: { fontFamily:"'Playfair Display', serif", fontSize:"20px", fontWeight:700, color:"#fff" },
  catDestaque: { fontSize:"10px", fontWeight:700, letterSpacing:"3px", textTransform:"uppercase", color:"#e000c8", background:"rgba(224,0,200,0.1)", padding:"3px 10px", borderRadius:"20px", border:"1px solid rgba(224,0,200,0.3)", marginLeft:"auto", whiteSpace:"nowrap" },
  card: { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"14px", padding:"16px", marginBottom:"10px", transition:"all 0.2s" },
  cardTop: { display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"10px" },
  cardEmoji: { fontSize:"32px", lineHeight:1, flexShrink:0 },
  cardInfo: { flex:1 },
  cardName: { fontFamily:"'Inter', sans-serif", fontSize:"14px", fontWeight:700, color:"#fff", marginBottom:"6px", lineHeight:1.3 },
  cardTags: { display:"flex", flexWrap:"wrap", gap:"4px" },
  tagDur: { fontSize:"10px", padding:"2px 8px", borderRadius:"20px", fontWeight:500, background:"rgba(255,215,0,0.1)", color:"#ffd700", border:"1px solid rgba(255,215,0,0.2)" },
  tagRating: { fontSize:"10px", padding:"2px 8px", borderRadius:"20px", fontWeight:500, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.1)" },
  cardPrice: { fontSize:"16px", fontWeight:700, color:"#ffd700", whiteSpace:"nowrap", marginLeft:"8px", flexShrink:0 },
  cardDesc: { fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:"12px" },
  cardBtn: { display:"block", background:"linear-gradient(135deg, #d400bc, #8800a0)", color:"#fff", textAlign:"center", padding:"12px", borderRadius:"8px", textDecoration:"none", fontSize:"13px", fontWeight:700, fontFamily:"'Inter', sans-serif", letterSpacing:"0.5px", boxShadow:"0 4px 16px rgba(200,0,180,0.3)" },
};

// ─── COMPONENTES ──────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={S.header}>
      <div style={S.logo}>Tu Vegas <span style={S.logoSpan}>Tickets</span></div>
      <div style={S.headerSub}>Experiencias Auténticas</div>
    </div>
  );
}

function ExpCard({ exp }) {
  return (
    <div style={S.card}>
      <div style={S.cardTop}>
        <span style={S.cardEmoji}>{exp.emoji}</span>
        <div style={S.cardInfo}>
          <div style={S.cardName}>{exp.name}</div>
          <div style={S.cardTags}>
            {exp.dur && <span style={S.tagDur}>⏱ {exp.dur}</span>}
            {exp.rating && <span style={S.tagRating}>⭐ {exp.rating}</span>}
          </div>
        </div>
        <div style={S.cardPrice}>{exp.price}</div>
      </div>
      <div style={S.cardDesc}>{exp.desc}</div>
      <a href={exp.url} target="_blank" rel="noopener noreferrer" style={S.cardBtn}>🎟️ Reservar Ahora</a>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash"); // splash | filtros | resultados
  const [seleccionados, setSeleccionados] = useState([]);

  function toggleCat(id) {
    setSeleccionados(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      if (prev.length >= MAX_SEL) return prev;
      return [...prev, id];
    });
  }

  function buildResultados() {
    const vistos = new Set();
    return seleccionados.map(cat => {
      const meta = CAT_META[cat];
      const items = (DB[cat] || []).filter(item => {
        if (vistos.has(item.name)) return false;
        vistos.add(item.name);
        return true;
      });
      return { cat, meta, items };
    }).filter(b => b.items.length > 0);
  }

  const bloques = screen === "resultados" ? buildResultados() : [];
  const canVer = seleccionados.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000; }
        a:hover { opacity: 0.85 !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #e000c8; border-radius: 2px; }
      `}</style>

      <div style={S.app}>
        {/* Glows */}
        <div style={{ position:"fixed", top:"-120px", left:"50%", transform:"translateX(-50%)", width:"400px", height:"400px", background:"radial-gradient(circle, rgba(210,0,185,0.13) 0%, transparent 65%)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", bottom:"-80px", left:"50%", transform:"translateX(-50%)", width:"360px", height:"360px", background:"radial-gradient(circle, rgba(210,0,185,0.10) 0%, transparent 65%)", pointerEvents:"none", zIndex:0 }} />
        {/* Side lines */}
        <div style={{ position:"fixed", top:0, left:"calc(50% - 210px)", width:"2px", height:"100%", background:"linear-gradient(180deg, transparent, #e000c8 50%, transparent)", opacity:0.3, pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"fixed", top:0, left:"calc(50% + 210px)", width:"2px", height:"100%", background:"linear-gradient(180deg, transparent, #e000c8 50%, transparent)", opacity:0.3, pointerEvents:"none", zIndex:0 }} />

        <div style={S.inner}>
          <Header />

          {/* ══ SPLASH ══ */}
          {screen === "splash" && (
            <div style={S.splashBody}>
              <div style={S.loquepasa}>Lo que pasa en Vegas...</div>
              <div style={S.solopasa}>¡solo pasa en Vegas!</div>
              <div style={S.deco} />
              <div style={S.city}>Las Vegas</div>
              <div style={S.subtitulo}>la capital mundial</div>
              <div style={S.destaque}>del Entretenimiento</div>
              <div style={S.categorias}>
                <span>Tickets</span><span style={S.sep}> · </span>
                <span>Shows</span><span style={S.sep}> · </span>
                <span>Tours</span><span style={S.sep}> · </span>
                <span>Atracciones</span>
              </div>
              <button style={S.cta} onClick={() => setScreen("filtros")}>
                <span style={S.ctaMain}>¡Empieza aquí! →</span>
                <span style={S.ctaSub}>¡Quiero mis tickets ahora!</span>
              </button>
            </div>
          )}

          {/* ══ FILTROS ══ */}
          {screen === "filtros" && (
            <div style={S.filtrosBody}>
              <div style={S.filtrosTitulo}>¿Qué quieres hacer?</div>
              <div style={S.filtrosSub}>Elige hasta <span style={{ color:"#e000c8", fontWeight:600 }}>3 opciones</span></div>
              <div style={S.filtrosGrid}>
                {CATEGORIAS.map(cat => {
                  const sel = seleccionados.includes(cat.id);
                  return (
                    <button key={cat.id} style={S.filtroBtn(sel)} onClick={() => toggleCat(cat.id)}>
                      <span style={S.filtroEmoji}>{cat.emoji}</span>
                      {cat.label}
                    </button>
                  );
                })}
              </div>
              <div style={S.contador(canVer)}>
                {seleccionados.length === 0 ? "Selecciona al menos una opción"
                  : seleccionados.length === MAX_SEL ? "✦ Máximo alcanzado ✦"
                  : `${seleccionados.length} de ${MAX_SEL} seleccionadas`}
              </div>
              <div style={{ display:"flex", justifyContent:"center" }}>
                <button
                  style={{ ...S.cta, ...(canVer ? {} : S.ctaDisabled) }}
                  onClick={() => canVer && setScreen("resultados")}
                >
                  <span style={S.ctaMain}>¡Ver opciones! →</span>
                  <span style={S.ctaSub}>Mostrar todo disponible</span>
                </button>
              </div>
            </div>
          )}

          {/* ══ RESULTADOS ══ */}
          {screen === "resultados" && (
            <div style={S.resBody}>
              <button style={S.resBack} onClick={() => setScreen("filtros")}>← Cambiar filtros</button>
              <div style={S.avisoLegal}>* Los precios son referenciales y están sujetos a disponibilidad. Las tarifas pueden cambiar sin previo aviso. No nos hacemos responsables por variaciones en el precio al momento de la reserva.</div>
              {bloques.map(({ cat, meta, items }) => (
                <div key={cat} style={{ marginBottom:"36px" }}>
                  <div style={S.catHeader}>
                    <span style={S.catEmoji}>{meta.emoji}</span>
                    <span style={S.catTitulo}>{meta.label}</span>
                    <span style={S.catDestaque}>{meta.destaque}</span>
                  </div>
                  {items.map(exp => <ExpCard key={exp.name} exp={exp} />)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
