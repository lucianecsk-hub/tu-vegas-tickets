import { useState, useEffect } from "react";

// ─── BASE DE DATOS ────────────────────────────────────────────────────────
const DB = {
  // ── SIN FILTRO DE FECHA ──────────────────────────────────────────────
  atracciones: [
    { name:"The Neon Museum",                       emoji:"🌟", price:"Desde $36",  dur:"1 hr",    rating:4.7, desc:"El cementerio de los carteles de neón que hicieron famosa a Las Vegas. Una visita nocturna imprescindible.", url:"https://vegas.vdvm.net/QyoarY" },
    { name:"Torre Eiffel — Mirador Las Vegas",      emoji:"🗼", price:"Desde $35",  dur:"1 hr",    rating:4.6, desc:"París recreada en el Strip. Vistas desde 46 pisos al atardecer — una de las mejores fotos de tu viaje.", url:"https://gyg.me/zvZksqFf" },
    { name:"Big Apple Coaster — New York-New York", emoji:"🎢", price:"Desde $26",  dur:"30 min",  rating:4.5, desc:"La montaña rusa más icónica del Strip. Rodea el hotel New York-New York a toda velocidad.", url:"https://vegas.vdvm.net/baxr9b" },
    { name:"Bodies… The Exhibition",               emoji:"🫀", price:"Desde $36",  dur:"1.5 hrs", rating:4.6, desc:"Cuerpos humanos reales preservados. Una experiencia científica y artística única. Solo en Las Vegas.", url:"https://vegas.vdvm.net/k0BoGM" },
    { name:"SkyJump — The STRAT",                  emoji:"🪂", price:"Desde $35",  dur:"30 min",  rating:4.8, desc:"Salta desde 260 metros de altura desde la torre más alta de Vegas. La caída libre más espectacular de América.", url:"https://vegas.vdvm.net/WyO7me" },
    { name:"Madame Tussauds Las Vegas",             emoji:"🗿", price:"Desde $30",  dur:"1.5 hrs", rating:4.3, desc:"Las figuras de cera más famosas del mundo en el corazón del Strip. Foto perfecta garantizada.", url:"https://vegas.vdvm.net/g1jmB5" },
    { name:"High Roller — La Noria Gigante",       emoji:"🎡", price:"Desde $21",  dur:"30 min",  rating:4.6, desc:"La vista más icónica de Las Vegas desde 167 metros de altura. De día o de noche, solo o en pareja.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t270522/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Interstellar Arc — AREA15",            emoji:"🌌", price:"Desde $47",  dur:"1 hr",    rating:4.8, desc:"Una instalación de arte extraterrestre dentro de AREA15. El futuro ya está aquí.", url:"https://vegas.vdvm.net/9VM075" },
    { name:"Exposición Titanic — Luxor",           emoji:"🚢", price:"Desde $44",  dur:"1.5 hrs", rating:4.6, desc:"Artefactos reales del Titanic. El barco que cambió la historia, dentro de una pirámide. Solo en Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/luxor-hotel-titanic-the-artifact-exhibition-entry-ticket-t395730/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  ninos: [
    { name:"Flyover Las Vegas",                  emoji:"🪂", price:"Desde $36",  dur:"30 min",  rating:4.7, desc:"Un vuelo simulado sobre Las Vegas. Viento, aromas, movimiento — olvidarás que estás dentro de un edificio.", url:"https://vegas.vdvm.net/a1LxZQ" },
    { name:"Meow Wolf's Omega Mart",             emoji:"🛒", price:"Desde $50",  dur:"2 hrs",   rating:4.8, desc:"Un supermercado que esconde portales a mundos alternativos. Arte inmersivo que enloquece a niños y adultos.", url:"https://vegas.vdvm.net/NkZ5bq" },
    { name:"Dig This — Maneja Excavadoras",      emoji:"🚜", price:"Desde $28",  dur:"1 hr",    rating:5.0, desc:"Maneja excavadoras y bulldozers reales en el desierto. La diversión más inesperada que tendrás en Vegas.", url:"https://vegas.vdvm.net/QjbP19" },
    { name:"Torneo de Reyes — Cena Medieval",    emoji:"⚔️", price:"Desde $63",  dur:"1.5 hrs", rating:4.5, desc:"Caballeros medievales, justas, explosiones y cena incluida. Excalibur. Los niños enloquecen — y los adultos también.", url:"https://vegas.vdvm.net/oq1xGn" },
    { name:"Shark Reef Aquarium — Mandalay Bay", emoji:"🦈", price:"Desde $30",  dur:"1.5 hrs", rating:4.7, desc:"Más de 2,000 animales de 100 especies en el único acuario acreditado de Nevada. Tiburones, dragón de Komodo y tortugas marinas.", url:"https://vegas.vdvm.net/anqbLb" },
  ],

  experiencias: [
    { name:"Universal Horror Unleashed",            emoji:"👹", price:"Desde $45",  dur:"3 hrs",  rating:4.7, desc:"Terror real en Vegas. Los monstruos más icónicos del cine cobran vida. Solo apto para valientes.", url:"https://vegas.vdvm.net/aO76jj" },
    { name:"Machine Guns Vegas",                    emoji:"🔫", price:"Desde $50",  dur:"1 hr",   rating:4.8, desc:"Armas reales en un campo de tiro supervisado. El único lugar del mundo donde esto tiene tanto sentido.", url:"https://vegas.vdvm.net/Py36Z6" },
    { name:"Exotics Racing — Ferrari y Lamborghini",emoji:"🏎️", price:"Desde $109", dur:"1 hr",   rating:4.8, desc:"Maneja un Lamborghini, Ferrari o Porsche en un circuito real. Al sur del Strip. Vidas que cambian aquí.", url:"https://vegas.vdvm.net/eK4ZeZ" },
    { name:"Blackout — Dining in the Dark",         emoji:"🖤", price:"Desde $85",  dur:"2 hrs",  rating:4.6, desc:"Una cena gourmet completamente a oscuras. Sin vista, los demás sentidos explotan. Una experiencia que no olvidarás.", url:"https://vegas.vdvm.net/0ZWgjN" },
    { name:"FLY LINQ — Zipline sobre el Strip",     emoji:"🤸", price:"Desde $49",  dur:"30 min", rating:4.5, desc:"Deslízate en tirolesa sobre el Strip de Las Vegas. Vista aérea única desde el LINQ.", url:"https://vegas.vdvm.net/4eLyeG" },
    { name:"Helicóptero Nocturno sobre el Strip",   emoji:"🚁", price:"Desde $129", dur:"15 min", rating:4.6, desc:"El Strip desde un helicóptero de noche. La vista más icónica de América desde 300 metros de altura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-strip-helicopter-flight-without-transfers-t33967/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Boda o renovación de votos en la capilla de Graceland con temática de Elvis", emoji:"💍", price:"Desde $356", dur:"1.5 hrs", rating:4.8, desc:"La primera capilla del mundo en celebrar bodas temáticas de Elvis desde 1977. Limusina incluida, impersonador de Elvis en vivo, ramo de rosas y fotógrafo. Hasta 30 personas.", url:"https://gyg.me/aDqAHYeg" },
  ],

  nightlife: [
    { name:"FANTASY Burlesque — Luxor",         emoji:"💃", price:"Desde $34",  dur:"1.5 hrs", rating:4.7, desc:"El show para adultos más longevo del Strip. Artistas increíbles, glamour de Vegas. Solo mayores de 21.", url:"https://vegas.vdvm.net/4P13Po" },
    { name:"Magic Mike Live",                   emoji:"🔥", price:"Desde $54",  dur:"1.5 hrs", rating:4.7, desc:"El show del que todos hablan durante años. SAHARA Las Vegas. Ya sabes de qué va.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-magic-mike-live-at-the-sahara-t525549/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Chippendales — Planet Hollywood",   emoji:"💪", price:"Desde $67",  dur:"1.5 hrs", rating:4.6, desc:"Planet Hollywood. El original. La noche más salvaje del Strip.", url:"https://vegas.vdvm.net/DyOEj2" },
    { name:"Thunder From Down Under",           emoji:"⚡", price:"Desde $74",  dur:"1.5 hrs", rating:4.5, desc:"Australianos. Excalibur. El show de despedida de soltera que lo empezó todo.", url:"https://vegas.vdvm.net/VmROXR" },
    { name:"ROUGE — Cabaret Sensual",           emoji:"❤️", price:"Desde $54",  dur:"1.5 hrs", rating:4.4, desc:"El cabaret solo para adultos del STRAT. Sensual, atrevido, íntimo. La noche perfecta en el Strip.", url:"https://vegas.vdvm.net/m5znGa" },
    { name:"Club Crawl VIP + Barra Libre",      emoji:"🥂", price:"Desde $60",  dur:"5 hrs",   rating:4.9, desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs del Strip. La noche que nunca termina.", url:"https://gyg.me/JMj9b8Kx" },
    { name:"Pool Party en Bus de Fiesta",       emoji:"🏊", price:"Desde $55",  dur:"5 hrs",   rating:4.5, desc:"Bus de fiesta a una pool party de Vegas con bebidas gratis y entrada VIP.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-pool-party-crawl-by-party-bus-t439815/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Las Vegas: Tour VIP de la Vida Nocturna a Bar, Club Nocturno y Strip Club", emoji:"🍾", price:"Desde $44", dur:"4 hrs", rating:4.7, desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs de Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/strip-club-crawl-open-bar-party-bus-t442598/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Limo + Champán + Club VIP",         emoji:"🚘", price:"Desde $499", dur:"4 hrs",   rating:4.8, desc:"Limusina stretch, champán en el camino, entrada VIP al club. La noche de despedida de soltera para la que Vegas fue construida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-limo-tour-with-champagne-and-nightclub-entry-t981477/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Bares desconocidos: el tour de bares original de Las Vegas Strip", emoji:"🍸", price:"Desde $39", dur:"3 hrs", rating:5.0, desc:"Los bares escondidos del Strip. La mayoría de turistas los pasa de largo cada noche sin saberlo.", url:"https://www.getyourguide.com/las-vegas-l58/bars-unknown-the-las-vegas-strip-bar-crawl-t708411/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"High Roller — Cabina Open Bar",     emoji:"🎡", price:"Desde $48",  dur:"30 min",  rating:4.6, desc:"El Strip desde 167 metros. Barra libre. Sin límites. Mejor al atardecer.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t436735/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Atomic Saloon Show",                emoji:"🤠", price:"Desde $64",  dur:"75 min",  rating:4.4, desc:"Comedia, acrobacias y burlesque en el Lejano Oeste. The Venetian. Un show que mezcla humor adulto y espectáculo.", url:"https://vegas.vdvm.net/jRJ1mM" },
    { name:"X Burlesque — Sexy Topless Revue",  emoji:"🌹", price:"Desde $65",  dur:"75 min",  rating:4.0, desc:"El show topless más icónico del Strip. Flamingo Las Vegas. Glamour, sensualidad y energía desde 1999.", url:"https://vegas.vdvm.net/Pzma7j" },
    { name:"X Country — Kick'n Topless Revue",  emoji:"🤠", price:"Desde $46",  dur:"90 min",  rating:4.5, desc:"Country music, botas y un show topless lleno de energía. Harrah's Cabaret. Para los que quieren Vegas con sabor a Oeste.", url:"https://vegas.vdvm.net/VO2476" },
  ],

  shows: [
    { name:"Mystère — Cirque du Soleil",      emoji:"🎭", price:"Desde $49",  dur:"1.5 hrs", rating:4.6, desc:"El Cirque original en Vegas. Treasure Island. Más de 30 años de acrobacias que desafían la física.", url:"https://vegas.vdvm.net/LKVW3L" },
    { name:"Cirque du Soleil O",              emoji:"🌊", price:"Desde $158", dur:"1.5 hrs", rating:4.8, desc:"Agua. Acróbatas. Un escenario que desafía la física. El espectáculo que define Las Vegas.", url:"https://gyg.me/O2w14MLI" },
    { name:"Michael Jackson ONE — Cirque",   emoji:"🕺", price:"Desde $96",  dur:"1.5 hrs", rating:4.8, desc:"Cirque du Soleil con MJ. Mandalay Bay. El show más emotivo del Strip.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-michael-jackson-one-by-cirque-du-soleil-ticket-t400944/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"KÀ — Cirque du Soleil VIP",      emoji:"🎪", price:"Desde $70",  dur:"3 hrs",   rating:5.0, desc:"El espectáculo más grandioso del Cirque — backstage, encuentro con artistas, lounge VIP. Una vez en la vida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-ka-by-cirque-du-soleil-at-mgm-grand-ticket-t405483/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Awakening — Wynn",               emoji:"💫", price:"Desde $65",  dur:"1.5 hrs", rating:4.4, desc:"Un original del Wynn. Danza, ilusión, tecnología — así son los espectáculos de Vegas en 2026.", url:"https://vegas.vdvm.net/MmJP2n" },
    { name:"VEGAS! THE SHOW",                emoji:"🎰", price:"Desde $49",  dur:"75 min",  rating:4.6, desc:"La historia de Las Vegas en un show: showgirls, Elvis, Sinatra y más. Planet Hollywood. Un clásico del Strip.", url:"https://vegas.vdvm.net/R0O77N" },
    { name:"Criss Angel MINDFREAK",          emoji:"🎩", price:"Desde $97",  dur:"75 min",  rating:4.3, desc:"El mago más extremo del mundo en su teatro propio en Planet Hollywood. Ilusiones que desafían lo imposible.", url:"https://vegas.vdvm.net/R02RbX" },
    { name:"Mat Franco — Magic Reinvented Nightly", emoji:"✨", price:"Desde $50", dur:"90 min", rating:4.8, desc:"El ganador de America's Got Talent. LINQ Hotel. Magia íntima y sorprendente que deja al público sin palabras.", url:"https://vegas.vdvm.net/KByxz7" },
    { name:"V — The Ultimate Variety Show",  emoji:"🎪", price:"Desde $33",  dur:"75 min",  rating:4.3, desc:"Comedia, magia, acrobacias y más en el corazón del Strip. Planet Hollywood. El show que tiene algo para todos.", url:"https://vegas.vdvm.net/m4onrq" },
    { name:"WOW – The Vegas Spectacular",    emoji:"💧", price:"Desde $60",  dur:"90 min",  rating:4.5, desc:"Más de 30 artistas internacionales. Acróbatas, bailarines y efectos de agua. Rio Hotel. Ganador de 4 premios Best of Las Vegas.", url:"https://vegas.vdvm.net/KByxNz" },
    { name:"Tape Face",                      emoji:"📼", price:"Desde $60",  dur:"75 min",  rating:4.4, desc:"Como visto en America's Got Talent. MGM Grand. Una comedia física sin palabras que hace reír a todas las edades.", url:"https://vegas.vdvm.net/enkRY1" },
    { name:"Allstars of Magic",              emoji:"🪄", price:"Desde $26",  dur:"75 min",  rating:4.0, desc:"Varios magistas en un mismo escenario. Planet Hollywood. El show perfecto para los amantes de la magia a precio accesible.", url:"https://vegas.vdvm.net/B5RK7B" },
  ],

  tours: [
    { name:"Tour Valle de Fuego",                  emoji:"🔥", price:"Desde $99",  dur:"6 hrs",   rating:4.8, desc:"50 millas de roca roja ancestral. Traslado incluido. Petroglifos, silencio, Marte en la Tierra.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-small-group-valley-of-fire-tour-t356680/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Excursión al Cañón del Antílope y Horseshoe Bend en la Hora Dorada", emoji:"🏞️", price:"Desde $209", dur:"15 hrs", rating:4.7, desc:"El cañón de ranura más fotografiado del planeta, más Horseshoe Bend. Traslado incluido.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-antelope-canyon-horseshoe-bend-tour-t404294/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Tour panorámico de lujo por Bryce y Zion con almuerzo", emoji:"🌲", price:"Desde $219", dur:"13 hrs", rating:4.7, desc:"Dos de los parques nacionales más espectaculares de América en un día. Hoodoos y arcos rojos.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-bryce-and-zion-national-parks-tour-with-lunch-t304518/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Tour Área 51 — Día Completo",          emoji:"👽", price:"Desde $242", dur:"10 hrs",  rating:4.8, desc:"La base clasificada. El buzón negro. Traslado incluido. Creas o no — esto da escalofríos.", url:"https://www.getyourguide.com/las-vegas-l58/area-51-tour-from-las-vegas-t47582/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Kayak — Cueva Esmeralda",              emoji:"🚣", price:"Desde $119", dur:"4 hrs",   rating:4.7, desc:"Kayak hacia una cueva esmeralda brillante en el Río Colorado. Traslado incluido.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-emerald-cave-kayak-tour-with-hotel-pickup-t856688/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Tour ATV en el Desierto",              emoji:"🏜️", price:"Desde $109", dur:"3 hrs",   rating:4.7, desc:"ATVs reales en el Mojave auténtico. Nada entre tú y el desierto. Adrenalina pura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-guided-las-vegas-desert-atv-tour-t417683/?partner_id=FIT427X&utm_medium=online_publisher" },
  ],

  tributos: [
    { name:"All Shook Up — Tributo a Elvis Presley",             emoji:"🕺", price:"Desde $30",  dur:"75 min",  rating:4.7, desc:"El único show en Las Vegas dedicado exclusivamente a Elvis. Alexis Park. Con banda en vivo — los más auténticos hits del Rey.", url:"https://vegas.vdvm.net/MKRKQn" },
    { name:"The King Comes Home — Tributo a Elvis",              emoji:"👑", price:"Desde $41",  dur:"90 min",  rating:4.7, desc:"Elvis en el mismo hotel donde actuó 636 noches consecutivas. Westgate Las Vegas. La experiencia más histórica del Strip.", url:"https://vegas.vdvm.net/5gXJVN" },
    { name:"Piano Man — Tributo a Elton John y Billy Joel",      emoji:"🎹", price:"Desde $42",  dur:"75 min",  rating:4.7, desc:"El ganador de Broadway que fue elegido por Billy Joel en persona. Planet Hollywood. 17 grandes éxitos en un show de alta energía.", url:"https://vegas.vdvm.net/qWEY35" },
    { name:"Australian Bee Gees",                                emoji:"🕺", price:"Desde $30",  dur:"90 min",  rating:4.8, desc:"Más de 6,500 actuaciones en 55 países. Excalibur. Dos veces elegido Mejor Tributo en Las Vegas. Disco fever guaranteed.", url:"https://vegas.vdvm.net/1raAmm" },
    { name:"Sinatra Live! — Starring Michael Sinatra",           emoji:"🎙️", price:"Desde $55",  dur:"70 min",  rating:4.8, desc:"El nieto de Frank Sinatra en un íntimo supper club. Alexis Park. Fly Me to the Moon, My Way y los clásicos del Rat Pack.", url:"https://vegas.vdvm.net/bkDYz9" },
    { name:"All Tina and Whitney",                               emoji:"👸", price:"Desde $20",  dur:"60 min",  rating:4.0, desc:"Dos leyendas del pop en un solo show. Lamarre Theater. La voz de Tina Turner y Whitney Houston en una noche épica.", url:"https://vegas.vdvm.net/5k1kA1" },
    { name:"Ikons of Rock",                                      emoji:"🎸", price:"Desde $62",  dur:"90 min",  rating:4.8, desc:"Los grandes clásicos del rock en vivo. Hard Rock Cafe. Led Zeppelin, Queen, Bowie y más — tocados como nunca antes.", url:"https://vegas.vdvm.net/PzmzKN" },
    { name:"Queen Selena — Tributo a Selena Quintanilla",        emoji:"🌹", price:"Desde $40",  dur:"70 min",  rating:4.7, desc:"Bidi Bidi Bom Bom, Como La Flor y Dreaming of You en vivo. Alexis Park. El tributo más emotivo a la Reina del Pop Latino.", url:"https://vegas.vdvm.net/AgRgmN" },
    { name:"MJ Live — Tributo a Michael Jackson",                emoji:"🌟", price:"Desde $62",  dur:"85 min",  rating:4.7, desc:"El tributo #1 a Michael Jackson en el mundo. Harrah's Las Vegas. Bad, Billie Jean, Thriller — como si el Rey del Pop estuviera ahí.", url:"https://vegas.vdvm.net/B5R5Px" },
    { name:"Chase Brown's Vegas Country",                        emoji:"🤠", price:"Desde $41",  dur:"90 min",  rating:4.9, desc:"El Singing Cowboy de Fremont Street. Notoriety — Neonopolis. Country clásico con energía moderna. Solo para mayores de 18.", url:"https://vegas.vdvm.net/3kmkNn" },
    { name:"Purple Reign — THE Prince Tribute Show",             emoji:"💜", price:"Desde $27",  dur:"90 min",  rating:4.5, desc:"El tributo a Prince más aclamado de Las Vegas. Planet Hollywood. Purple Rain, Kiss, When Doves Cry — pura magia morada.", url:"https://vegas.vdvm.net/4agaN3" },
    { name:"Carpenters Legacy",                                  emoji:"🎵", price:"Desde $44",  dur:"75 min",  rating:4.2, desc:"Seis veces ganador del Best of Las Vegas. V Theater. We've Only Just Begun, Yesterday Once More y el solo de batería de Karen.", url:"https://vegas.vdvm.net/KByB5e" },
  ],

  // ── CON FILTRO DE FECHA ───────────────────────────────────────────────
  deportes: [
    { name:"Circa Sportsbook — El Más Grande del Mundo", emoji:"🏆", price:"Gratis",      dur:"Cualquier hora", rating:4.9, dates:[], desc:"El sportsbook más grande del mundo. 4 pisos, 350 pantallas, asientos de estadio. Ve cualquier partido como en ningún otro lugar.", url:"https://vegas.vdvm.net/jRnEoP" },
    { name:"Vegas Golden Knights — NHL",                 emoji:"🏒", price:"Desde $80",   dur:"3 hrs",          rating:4.9, dates:["2026-10-01","2026-12-31"], desc:"T-Mobile Arena. El equipo que convirtió Vegas en ciudad deportiva real. La atmósfera más eléctrica de la NHL.", url:"https://vegas.vdvm.net/YVq55P" },
    { name:"Las Vegas Aces — WNBA",                      emoji:"🏀", price:"Desde $40",   dur:"2.5 hrs",        rating:4.8, dates:["2026-06-18","2026-09-22"], desc:"Campeonas de la WNBA. Michelob Ultra Arena. El baloncesto femenino más emocionante del mundo.", url:"https://vegas.vdvm.net/xJ2xx1" },
    { name:"Las Vegas Aviators — Béisbol",               emoji:"⚾", price:"Desde $20",   dur:"3 hrs",          rating:4.7, dates:["2026-07-01","2026-09-21"], desc:"Béisbol Triple-A en Las Vegas Ballpark. Económico, familiar y muy divertido.", url:"https://vegas.vdvm.net/PzrLLe" },
    { name:"Tour Allegiant Stadium — Raiders",           emoji:"🏟️", price:"Desde $72",   dur:"1.5 hrs",        rating:4.8, dates:[], desc:"Descubre los bastidores del estadio más tecnológico de la NFL. La casa de los Raiders de Las Vegas.", url:"https://vegas.vdvm.net/9VM05e" },
    { name:"NBA Summer League",                          emoji:"🏀", price:"Desde $35",   dur:"Todo el día",    rating:4.7, dates:["2026-07-09","2026-07-19"], desc:"Todos los equipos de la NBA en Las Vegas. Thomas & Mack Center / UNLV. 9 al 19 de julio. Los próximos grandes del basket.", url:"https://vegas.vdvm.net/B5zj5B" },
    { name:"NASCAR — South Point 400",                   emoji:"🏁", price:"Desde $50",   dur:"Todo el día",    rating:4.7, dates:["2026-10-04","2026-10-04"], desc:"NASCAR Cup Series. Las Vegas Motor Speedway. 4 de octubre. Coches a 300 km/h a pocos kilómetros del Strip.", url:"https://vegas.vdvm.net/6kPvkQ" },
    { name:"NHRA Nationals — Drag Racing",               emoji:"🚗", price:"Desde $50",   dur:"Todo el día",    rating:4.7, dates:["2026-10-29","2026-11-01"], desc:"El campeonato de drag racing más rápido del mundo. Las Vegas Motor Speedway. 29 oct – 1 nov. Velocidades de más de 500 km/h.", url:"https://vegas.vdvm.net/enrDn1" },
    { name:"PBR Team Series Championship",               emoji:"🤠", price:"Desde $50",   dur:"3 hrs",          rating:4.8, dates:["2026-11-06","2026-11-08"], desc:"La final del campeonato de bull riding. T-Mobile Arena. 6 al 8 de noviembre. Los mejores jinetes del mundo.", url:"https://vegas.vdvm.net/9Vyg44" },
    { name:"NFR — National Finals Rodeo",                emoji:"🐎", price:"Desde $95",   dur:"3 hrs",          rating:4.9, dates:["2026-12-03","2026-12-12"], desc:"El Super Bowl del rodeo. Thomas & Mack Center. 3 al 12 de diciembre. 10 noches que transforman Las Vegas en el Oeste.", url:"https://vegas.vdvm.net/JkRze2" },
    { name:"Formula 1 Gran Premio Las Vegas",            emoji:"🏎️", price:"Desde $500",  dur:"Todo el día",    rating:4.9, dates:["2026-11-19","2026-11-21"], desc:"F1 en el Strip de Las Vegas de noche. 19 al 21 de noviembre. El evento deportivo más espectacular del mundo — aquí mismo.", url:"https://vegas.vdvm.net/dy9xyW" },
  ],

  conciertos: [
    { name:"Santana — An Intimate Evening: Greatest Hits Live", emoji:"🎸", price:"Desde $99",  dur:"2 hrs",   rating:4.8, dates:["2026-09-16","2026-09-27"], desc:"14 años de residencia. House of Blues — Mandalay Bay. Septiembre. El maestro de la guitarra en un venue íntimo único.", url:"https://vegas.vdvm.net/QY2YO9" },
    { name:"Kelly Clarkson: Studio Sessions",              emoji:"🎤", price:"Desde $99",  dur:"2 hrs",   rating:4.7, dates:["2026-07-17","2026-08-15"], desc:"La ganadora de American Idol en el Colosseum de Caesars Palace. Julio y agosto. Stronger, Since U Been Gone y más.", url:"https://vegas.vdvm.net/k4J4jx" },
    { name:"Scorpions — Coming Home to Las Vegas",         emoji:"🦂", price:"Desde $80",  dur:"2 hrs",   rating:4.7, dates:["2026-09-17","2026-10-03"], desc:"Los legendarios rockeros alemanes en Planet Hollywood. 17 sep – 3 oct. Wind of Change y Rock You Like a Hurricane en vivo.", url:"https://vegas.vdvm.net/Pzr7P6" },
    { name:"New Kids on the Block: The Right Stuff",       emoji:"🎶", price:"Desde $79",  dur:"2 hrs",   rating:4.6, dates:["2026-06-19","2026-07-04","2026-10-02","2026-10-17"], desc:"El boy band que reinventó Vegas. Dolby Live — Park MGM. Junio, julio y octubre. Hangin' Tough nunca sonó tan bien.", url:"https://vegas.vdvm.net/B5z74y" },
    { name:"Barry Manilow: The Hits Come Home",            emoji:"🎹", price:"Desde $69",  dur:"2 hrs",   rating:4.8, dates:["2026-07-01","2026-12-19"], desc:"Residencia de por vida. Westgate Las Vegas. Julio a diciembre. Mandy, Copacabana y el show más vendido de la ciudad.", url:"https://vegas.vdvm.net/enknK1" },
    { name:"Wayne Newton: Up Close and Personal",          emoji:"🎙️", price:"Desde $55",  dur:"90 min",  rating:4.6, dates:["2026-09-01","2026-12-31"], desc:"Mr. Las Vegas en el Flamingo. Septiembre a diciembre. 50 años sobre los escenarios de Vegas. Danke Schoen en persona.", url:"https://vegas.vdvm.net/ZVYVQK" },
    { name:"Mary J. Blige: My Life, My Story",             emoji:"👑", price:"Desde $80",  dur:"2 hrs",   rating:4.8, dates:["2026-05-06","2026-10-31"], desc:"La Reina del Hip-Hop Soul en Dolby Live — Park MGM. Mayo, julio, agosto y octubre. Family Affair, No More Drama y más.", url:"https://vegas.vdvm.net/zznzN0" },
    { name:"Rod Stewart: The Encore Shows",                emoji:"🎸", price:"Desde $99",  dur:"2 hrs",   rating:4.7, dates:["2026-05-27","2026-08-22"], desc:"El Caballero del rock en el Colosseum de Caesars Palace. Mayo, junio y agosto. Do Ya Think I'm Sexy y Tonight's the Night.", url:"https://vegas.vdvm.net/n4W4LV" },
    { name:"LISA — Viva La LISA",                          emoji:"💃", price:"Desde $100", dur:"90 min",  rating:4.8, dates:["2026-11-13","2026-11-28"], desc:"La estrella global de BLACKPINK en el Colosseum de Caesars Palace. 13 y 14 nov + 27 y 28 nov. Coreografía y pop de otro nivel.", url:"https://vegas.vdvm.net/7X1X5Y" },
    { name:"Rosalía — Lux Tour",                           emoji:"🌹", price:"Desde $46",  dur:"2 hrs",   rating:4.9, dates:["2026-06-27","2026-06-27"], desc:"La artista española más importante del momento. T-Mobile Arena. 27 de junio. Flamenco, avant-pop y electrónica. Sublime.", url:"https://vegas.vdvm.net/qWOgDY" },
    { name:"Keyshia Cole",                                 emoji:"🎵", price:"Desde $93",  dur:"2 hrs",   rating:4.7, dates:["2026-06-26","2026-06-27"], desc:"La reina del R&B de soul. Encore Theater — Wynn Las Vegas. 26 y 27 de junio. Love, I Just Want It to Be Over y más clásicos.", url:"https://vegas.vdvm.net/vDE2Z3" },
    { name:"One Night of Queen",                           emoji:"🎸", price:"Desde $50",  dur:"2 hrs",   rating:4.7, dates:["2026-07-24","2026-07-24"], desc:"El tributo internacional a Queen. Bel-Aire Backyard. 24 de julio. Bohemian Rhapsody, We Are the Champions y más en vivo.", url:"https://vegas.vdvm.net/DWRWQa" },
  ],

  sphere: [
    { name:"The Wizard of Oz at Sphere",     emoji:"🌐", price:"Desde $114", dur:"75 min",  rating:4.5, dates:[], desc:"160,000 m² de LED. El Mago de Oz como nunca lo habías visto. Múltiples sesiones diarias. La experiencia inmersiva más espectacular del mundo.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-the-sphere-experience-the-wizard-of-oz-t969545/?partner_id=FIT427X&utm_medium=online_publisher" },
    { name:"Kenny Chesney — Live at Sphere", emoji:"🤠", price:"Desde $96",  dur:"2 hrs",   rating:4.8, dates:["2026-06-19","2026-07-11"], desc:"El rey del country en la Sphere. 19 jun – 11 jul. Una playa de neón y 167,000 altavoces. El show de verano perfecto.", url:"https://vegas.vdvm.net/AgRg0J" },
    { name:"Illenium — Presents Odyssey",    emoji:"🎧", price:"Desde $99",  dur:"2 hrs",   rating:4.9, dates:["2026-07-03","2026-07-04"], desc:"El productor electrónico más ambicioso en el venue más avanzado del mundo. 3 y 4 de julio. Un viaje sensorial sin igual.", url:"https://vegas.vdvm.net/L0RKyV" },
    { name:"Backstreet Boys — Into the Millennium", emoji:"🎤", price:"Desde $120", dur:"2 hrs", rating:4.9, dates:["2026-07-16","2026-08-29"], desc:"Los primeros artistas pop en Sphere. 16 jul – 29 ago. 21 shows. I Want It That Way en 360 grados. Nostalgia máxima.", url:"https://vegas.vdvm.net/JkL7EN" },
    { name:"Carín León at Sphere",           emoji:"🌵", price:"Desde $80",  dur:"2 hrs",   rating:4.9, dates:["2026-09-04","2026-09-13"], desc:"El fenómeno del regional mexicano en la Sphere. 4 al 13 de septiembre. Primera cita, Que Vuelvas — música con alma en el venue del futuro.", url:"https://vegas.vdvm.net/5k15e2" },
    { name:"Eagles — Live at Sphere",        emoji:"🦅", price:"Desde $145", dur:"2 hrs",   rating:4.9, dates:["2026-09-18","2026-11-28"], desc:"La residencia más larga en Sphere. Sep, nov. Hotel California y 50 años de hits envolviendo al público en 16K. Histórico.", url:"https://vegas.vdvm.net/DWRyZ5" },
    { name:"Metallica — Life Burns Faster",  emoji:"🎸", price:"Desde $283", dur:"2.5 hrs", rating:4.9, dates:["2026-10-01","2026-11-07"], desc:"Los maestros del metal en Sphere. Oct y nov. No Repeat Weekend — dos noches, dos setlists diferentes. El rock más épico de la historia.", url:"https://vegas.vdvm.net/4arXkG" },
  ],

  // ── RESTAURANTES ─────────────────────────────────────────────────────
  restaurantes: [
    // Con Vista al Bellagio
    { name:"Spago — Wolfgang Puck",       emoji:"🌊", cat:"Con Vista al Bellagio", tipo:"Cocina de Autor · Mediterránea", preco:"$$$",  local:"Bellagio",          rating:4.2, tags:[], desc:"Terraza al aire libre frente a las fuentes del Bellagio. Sientes el agua. Cocina mediterránea de autor con pastas frescas y platos elegantes. La mejor relación vista-precio del Bellagio.", maps:"https://www.google.com/maps/search/Spago+Wolfgang+Puck+Bellagio+Las+Vegas" },
    { name:"Mon Ami Gabi",                emoji:"🥐", cat:"Con Vista al Bellagio", tipo:"Bistró Francés",                 preco:"$$",   local:"Paris Las Vegas",    rating:4.7, tags:["gf"], desc:"Bistró francés con terraza al nivel de la calle, justo frente a las fuentes. Crepes, steak frites y desayunos increíbles. Con viento en los shows, puedes sentir el agua desde la mesa.", maps:"https://www.google.com/maps/search/Mon+Ami+Gabi+Paris+Las+Vegas" },
    { name:"Chéri Rooftop",               emoji:"🗼", cat:"Con Vista al Bellagio", tipo:"Cócteles · Francesa",            preco:"$$",   local:"Paris Las Vegas",    rating:4.3, tags:[], desc:"Rooftop bajo la Torre Eiffel de París con vista directa al Bellagio. Ambiente de jardín parisino de los años 50, cócteles creativos y platos franceses. El secreto mejor guardado.", maps:"https://www.google.com/maps/search/Cheri+Rooftop+Paris+Las+Vegas" },
    { name:"Eiffel Tower Restaurant",     emoji:"🗼", cat:"Con Vista al Bellagio", tipo:"Alta Cocina Francesa",           preco:"$$$$", local:"Paris Las Vegas",    rating:4.6, tags:[], desc:"Cena en el piso 11 de la Torre Eiffel de Vegas. Vista panorámica directa a las fuentes del Bellagio. El más romántico del Strip.", maps:"https://www.google.com/maps/search/Eiffel+Tower+Restaurant+Paris+Las+Vegas" },
    // Rooftop
    { name:"Beer Park",                   emoji:"🍺", cat:"Rooftop",              tipo:"Cervezas · Hamburguesas",        preco:"$$",   local:"Paris Las Vegas",    rating:4.2, tags:[], desc:"Terraza abierta sobre el Strip con vista al Bellagio. Cervezas artesanales, hamburguesas y el mejor atardecer de Vegas. Ideal para ver el Strip sin gastar de más.", maps:"https://www.google.com/maps/search/Beer+Park+Paris+Las+Vegas" },
    { name:"BrewDog Las Vegas",           emoji:"🍻", cat:"Rooftop",              tipo:"Craft Beer · Bar & Grill",       preco:"$$",   local:"Las Vegas Strip",    rating:4.7, tags:[], desc:"Rooftop bar escocés con vistas al Strip. Múltiples barras, cervezas artesanales, hamburguesas y ambiente relajado. Uno de los favoritos de los locales.", maps:"https://www.google.com/maps/search/BrewDog+Las+Vegas+Strip" },
    { name:"Ole Red Las Vegas",           emoji:"🤠", cat:"Rooftop",              tipo:"Bar Country · Cocina Tejana",    preco:"$$",   local:"Horseshoe Las Vegas", rating:4.6, tags:[], desc:"Bar country de 3 pisos con música en vivo todas las noches. Comida tejana, karaoke, rooftop y ambiente de fiesta hasta las 4am. El favorito de los fans del country.", maps:"https://www.google.com/maps/search/Ole+Red+Las+Vegas+Horseshoe" },
    { name:"Hard Rock Cafe",              emoji:"🎸", cat:"Rooftop",              tipo:"Hamburguesas · Rock & Roll",     preco:"$$",   local:"Las Vegas Strip",    rating:4.4, tags:[], desc:"El templo del rock and roll. Guitarras icónicas, memorabilia legendaria y hamburguesas enormes. Terraza con vista al Strip. Abierto desde 7:30am.", maps:"https://www.google.com/maps/search/Hard+Rock+Cafe+Las+Vegas+Strip" },
    { name:"Top of the World",            emoji:"🌆", cat:"Rooftop",              tipo:"Americana · Restaurante Giratorio", preco:"$$$$", local:"The STRAT",        rating:4.3, tags:[], desc:"Cena giratoria a 264 metros de altura. Las Vegas entera bajo tus pies, una vuelta completa cada 80 minutos. Romántico, espectacular e imprescindible.", maps:"https://www.google.com/maps/search/Top+of+the+World+Restaurant+Strat+Las+Vegas" },
    { name:"Giada",                       emoji:"🍝", cat:"Rooftop",              tipo:"Italiana",                       preco:"$$$",  local:"The Cromwell",       rating:4.6, tags:[], desc:"La chef Giada De Laurentiis trae la cocina italiana moderna al Strip. Terraza con vistas únicas al Boulevard — una de las más bonitas de Vegas.", maps:"https://www.google.com/maps/search/Giada+Restaurant+Cromwell+Las+Vegas" },
    // Fine Dining
    { name:"Gordon Ramsay Hell's Kitchen",emoji:"🔥", cat:"Fine Dining",          tipo:"Steakhouse · Británica",         preco:"$$$",  local:"Caesars Palace",     rating:4.7, tags:["gf"], desc:"El restaurante más famoso del Strip. Beef Wellington legendario en el teatro más icónico de Gordon Ramsay. Reserva con anticipación — siempre lleno.", maps:"https://www.google.com/maps/search/Gordon+Ramsay+Hells+Kitchen+Caesars+Palace+Las+Vegas" },
    { name:"Joël Robuchon",               emoji:"👨‍🍳", cat:"Fine Dining",          tipo:"Alta Cocina Francesa",           preco:"$$$$", local:"MGM Grand",          rating:4.9, tags:[], desc:"El único restaurante con 3 estrellas Michelin en Las Vegas. La experiencia gastronómica más exclusiva de Nevada. Una noche que no olvidarás.", maps:"https://www.google.com/maps/search/Joel+Robuchon+MGM+Grand+Las+Vegas" },
    { name:"STK Steakhouse",              emoji:"🥩", cat:"Fine Dining",          tipo:"Steakhouse Moderna",             preco:"$$$",  local:"Cosmopolitan",       rating:4.5, tags:[], desc:"El steakhouse más cool de Vegas. Ambiente de club, música en vivo y los mejores cortes. Ideal para grupos y celebraciones especiales.", maps:"https://www.google.com/maps/search/STK+Steakhouse+Cosmopolitan+Las+Vegas" },
    { name:"Nobu Las Vegas",              emoji:"🍣", cat:"Fine Dining",          tipo:"Japonesa · Peruana",             preco:"$$$",  local:"Caesars Palace",     rating:4.6, tags:["gf"], desc:"El templo mundial de la cocina japonesa-peruana. Black Cod with Miso — el plato más imitado del mundo. Una visita obligatoria en el Strip.", maps:"https://www.google.com/maps/search/Nobu+Las+Vegas+Caesars+Palace" },
    { name:"Mizumi",                      emoji:"🎋", cat:"Fine Dining",          tipo:"Japonesa · Teppanyaki",          preco:"$$$",  local:"Wynn Las Vegas",     rating:4.5, tags:[], desc:"Japonés de alta gama dentro del Wynn. Teppanyaki espectacular con vistas al lago y cascada. Sushi, mariscos y wagyu de primera. Abre solo jueves a domingo.", maps:"https://www.google.com/maps/search/Mizumi+Restaurant+Wynn+Las+Vegas" },
    { name:"Tao Las Vegas",               emoji:"🏮", cat:"Fine Dining",          tipo:"Asiática · Japonesa · Dim Sum",  preco:"$$$",  local:"The Venetian",       rating:4.4, tags:[], desc:"El restaurante asiático más icónico del Strip. Buda gigante, dim sum, sushi y platos asiáticos de autor en un ambiente espectacular de dos pisos. Una experiencia única.", maps:"https://www.google.com/maps/search/Tao+Restaurant+Venetian+Las+Vegas" },
    { name:"The Buffet at Wynn",          emoji:"🦞", cat:"Fine Dining",          tipo:"Buffet Premium",                 preco:"$$$",  local:"Wynn Las Vegas",     rating:4.2, tags:[], desc:"El buffet más premium de Las Vegas. Cangrejos, carnes a la parrilla, estaciones gourmet y postres de autor. Solo viernes, sábado y domingo.", maps:"https://www.google.com/maps/search/The+Buffet+Wynn+Las+Vegas" },
    { name:"Joe's Seafood Prime Steak",   emoji:"🦀", cat:"Fine Dining",          tipo:"Stone Crab · Mariscos Frescos",  preco:"$$$$", local:"Forum Shops, Caesars", rating:4.7, tags:["gf"], desc:"Stone crab, prime steak y mariscos frescos en el corazón del Strip. Menú GF dedicado. Uno de los favoritos de temporada para celebraciones especiales.", maps:"https://www.google.com/maps/search/Joes+Seafood+Prime+Steak+Stone+Crab+Las+Vegas" },
    // Casual
    { name:"Grand Lux Cafe",              emoji:"✨", cat:"Casual",               tipo:"Americana · Abierto 24hrs",      preco:"$$",   local:"The Venetian",       rating:4.5, tags:["gf"], desc:"Abierto 24 horas. El restaurante del Venetian que lo tiene todo: desayunos espectaculares, pasta, pollo y los postres más irresistibles del Strip.", maps:"https://www.google.com/maps/search/Grand+Lux+Cafe+Venetian+Las+Vegas" },
    { name:"Virgil's Real BBQ",           emoji:"🍖", cat:"Casual",               tipo:"BBQ Americano",                  preco:"$$",   local:"LINQ",               rating:4.3, tags:[], desc:"BBQ americano de verdad en el corazón del Strip. Costillas, brisket y pulled pork que se deshacen solos. Vista al High Roller incluida.", maps:"https://www.google.com/maps/search/Virgils+Real+BBQ+LINQ+Las+Vegas" },
    { name:"The Cheesecake Factory",      emoji:"🍰", cat:"Casual",               tipo:"Americana · Internacional",      preco:"$$",   local:"Forum Shops, Caesars", rating:4.4, tags:["gf"], desc:"Menú enorme con más de 200 platos y porciones gigantes — comparte con alguien. El cheesecake de chocolate Godiva es obligatorio.", maps:"https://www.google.com/maps/search/Cheesecake+Factory+Forum+Shops+Las+Vegas" },
    { name:"Olive Garden",                emoji:"🍝", cat:"Casual",               tipo:"Italiana",                       preco:"$$",   local:"Las Vegas Strip",    rating:4.6, tags:["gf"], desc:"Pastas, sopas y el pan de ajo más famoso de América. Justo en el Strip, precio accesible y porciones generosas. Ideal para familias.", maps:"https://www.google.com/maps/search/Olive+Garden+Las+Vegas+Strip" },
    { name:"Yardbird",                    emoji:"🍗", cat:"Casual",               tipo:"Pollo Frito Sureño",             preco:"$$",   local:"The Venetian",       rating:4.6, tags:["gf"], desc:"El mejor pollo frito de Las Vegas — con harina de arroz, es gluten friendly. Cocina sureña reconfortante y cócteles increíbles.", maps:"https://www.google.com/maps/search/Yardbird+Venetian+Las+Vegas" },
    { name:"Shake Shack",                 emoji:"🍔", cat:"Casual",               tipo:"Hamburguesas",                   preco:"$$",   local:"New York-New York",   rating:4.4, tags:[], desc:"La hamburguesería más de moda de América. ShackBurger jugoso, papas crinkle y milkshakes espesos. Abierto desde las 6am hasta las 4am.", maps:"https://www.google.com/maps/search/Shake+Shack+New+York+New+York+Las+Vegas" },
    { name:"Black Tap CrazyShakes",       emoji:"🥤", cat:"Casual",               tipo:"Milkshakes · Hamburguesas",      preco:"$$",   local:"The Venetian",       rating:4.3, tags:[], desc:"Los milkshakes más absurdos del mundo — coronados con tortas enteras, algodón de azúcar y dulces. Instagram obligatorio. Abierto hasta la 1am.", maps:"https://www.google.com/maps/search/Black+Tap+Venetian+Las+Vegas" },
    { name:"In-N-Out Burger",             emoji:"🍔", cat:"Casual",               tipo:"Hamburguesas",                   preco:"$",    local:"Las Vegas Strip",    rating:4.8, tags:["gf"], desc:"La hamburguesa más famosa del Oeste americano. Pide el menú secreto 'Animal Style'. Para GF: pide 'Protein Style' en lechuga — sin cruces.", maps:"https://www.google.com/maps/search/In-N-Out+Burger+near+Las+Vegas+Strip" },
    { name:"Raising Cane's",              emoji:"🍗", cat:"Casual",               tipo:"Pollo Frito",                    preco:"$",    local:"Las Vegas Strip",    rating:4.6, tags:[], desc:"El pollo frito más adictivo del Strip. Solo tenders, papas, ensalada y la Cane's Sauce secreta. Abierto hasta las 4am. Rápido, sabroso y barato.", maps:"https://www.google.com/maps/search/Raising+Canes+Las+Vegas+Strip" },
    { name:"Wicked Spoon",                emoji:"🍽️", cat:"Casual",               tipo:"Buffet Gourmet",                 preco:"$$$",  local:"Cosmopolitan",       rating:4.5, tags:["gf"], desc:"El buffet más instagrameable de Las Vegas. Estaciones gourmet, mariscos frescos y postres de autor. Opciones sin gluten disponibles. Vale cada dólar.", maps:"https://www.google.com/maps/search/Wicked+Spoon+Cosmopolitan+Las+Vegas" },
    // Desayuno
    { name:"Siegel's Bagelmania",         emoji:"🥯", cat:"Desayuno",             tipo:"Bagels · Deli",                  preco:"$$",   local:"Convention Center",  rating:4.6, tags:["gf"], desc:"El deli más querido de Las Vegas. Bagels frescos horneados cada mañana con docenas de cream cheese. Tienen bagels sin gluten. Abre a las 6am.", maps:"https://www.google.com/maps/search/Siegels+Bagelmania+Las+Vegas" },
    { name:"Urth Caffé",                  emoji:"☕", cat:"Desayuno",             tipo:"Café Orgánico",                  preco:"$$",   local:"Wynn Las Vegas",     rating:4.2, tags:[], desc:"El café más instagrameable de Las Vegas. Dentro del Wynn, con jardín interior, fuente y ambiente europeo. Lattes de pistacho y desayunos orgánicos.", maps:"https://www.google.com/maps/search/Urth+Caffe+Wynn+Las+Vegas" },
    { name:"Denny's",                     emoji:"🍳", cat:"Desayuno",             tipo:"Desayuno Americano",             preco:"$",    local:"Las Vegas Strip",    rating:4.3, tags:[], desc:"Abierto 24 horas. El desayuno americano clásico: pancakes esponjosos, huevos y café sin límite. El lugar favorito de Vegas a las 3am.", maps:"https://www.google.com/maps/search/Denny's+near+me+Las+Vegas+Strip" },
    { name:"Hash House A Go Go",          emoji:"🥞", cat:"Desayuno",             tipo:"Desayuno Gigante",               preco:"$$",   local:"The LINQ",           rating:4.8, tags:[], desc:"Las porciones más ridículas de Vegas — los pancakes son del tamaño de tu cara. Pollo con waffles legendario. Llega temprano porque la fila crece rápido.", maps:"https://www.google.com/maps/search/Hash+House+A+Go+Go+LINQ+Las+Vegas" },
    { name:"Eggslut",                     emoji:"🥚", cat:"Desayuno",             tipo:"Sándwiches de Huevo",            preco:"$$",   local:"Cosmopolitan",       rating:4.3, tags:["gf"], desc:"El sandwich de huevo más famoso de Instagram. Brioche suave, huevos sedosos y las truffle hashbrowns más adictivas del Strip. Pide el omelet bowl — es GF.", maps:"https://www.google.com/maps/search/Eggslut+Cosmopolitan+Las+Vegas" },
    { name:"Peppermill Restaurant",       emoji:"☕", cat:"Desayuno",             tipo:"Diner Americano",                preco:"$$",   local:"Las Vegas Strip",    rating:4.5, tags:[], desc:"El diner más icónico de Las Vegas desde 1972. Porciones enormes, ambiente retro de los 70s y el Fireside Lounge de fuego vivo. Abierto 24 horas los fines de semana.", maps:"https://www.google.com/maps/search/Peppermill+Restaurant+Las+Vegas" },
    { name:"Black Bear Diner",            emoji:"🐻", cat:"Desayuno",             tipo:"Diner Familiar",                 preco:"$",    local:"Las Vegas Strip",    rating:4.5, tags:[], desc:"Diner familiar estilo cabaña americana con porciones gigantes. Desayuno todo el día, pancakes esponjosos y el chicken fried steak más generoso de Vegas.", maps:"https://www.google.com/maps/search/Black+Bear+Diner+Las+Vegas" },
    { name:"IHOP",                        emoji:"🥞", cat:"Desayuno",             tipo:"Pancakes · Desayuno",            preco:"$",    local:"Las Vegas Strip",    rating:4.4, tags:[], desc:"El templo internacional de los pancakes. Abierto 24 horas. Prueba el Tres Leches off-menu que todos piden.", maps:"https://www.google.com/maps/search/IHOP+near+Las+Vegas+Strip" },
    // Famosos de la TV
    { name:"Big Chicken — Shaquille O'Neal", emoji:"🏀", cat:"Famosos de la TV",  tipo:"Pollo Frito",                    preco:"$$",   local:"Paradise Rd",        rating:4.6, tags:[], desc:"El restaurante del legendario Shaquille O'Neal. Sándwich de pollo doble empanado, mac & cheese y banana pudding. El más querido de los famosos de Vegas.", maps:"https://www.google.com/maps/search/Big+Chicken+Shaquille+ONeal+Las+Vegas" },
    { name:"Guy Fieri's Vegas Kitchen",   emoji:"🔥", cat:"Famosos de la TV",    tipo:"Americana Extrema",              preco:"$$",   local:"LINQ",               rating:3.9, tags:[], desc:"El rey del Food Network en el Strip. Trash Can Nachos, mac & cheese burgers y alas de pollo con whisky. Comida americana exagerada — exactamente como en TV.", maps:"https://www.google.com/maps/search/Guy+Fieri+Vegas+Kitchen+LINQ+Las+Vegas" },
    { name:"Carlo's Bakery — Cake Boss",  emoji:"🎂", cat:"Famosos de la TV",    tipo:"Pastelería Italiana",            preco:"$$",   local:"The Venetian",       rating:3.7, tags:[], desc:"La famosa panadería del Cake Boss Buddy Valastro de TLC. Lobster Tail, cannolis, Rainbow Cake y pasteles de autor. El lugar más fotografiado del Venetian.", maps:"https://www.google.com/maps/search/Carlos+Bakery+Venetian+Las+Vegas" },
    { name:"Buddy V's Ristorante",        emoji:"🍝", cat:"Famosos de la TV",    tipo:"Italiana · Pasta",               preco:"$$$",  local:"The Venetian",       rating:4.5, tags:[], desc:"El restaurante italiano de Buddy Valastro (Cake Boss). Mozzarella estirada en vivo, pasta hecha a mano y la pizza más auténtica del Strip. Un show en sí mismo.", maps:"https://www.google.com/maps/search/Buddy+Vs+Ristorante+Venetian+Las+Vegas" },
    { name:"Gordon Ramsay Hell's Kitchen (TV)", emoji:"👨‍🍳", cat:"Famosos de la TV", tipo:"Steakhouse · Hell's Kitchen", preco:"$$$", local:"Caesars Palace",    rating:4.7, tags:["gf"], desc:"El restaurante de la serie Hell's Kitchen de Fox. Beef Wellington, pan de salmón y el menú exacto del programa. Reserva con semanas de anticipación.", maps:"https://www.google.com/maps/search/Gordon+Ramsay+Hells+Kitchen+Caesars+Palace+Las+Vegas" },
    { name:"Amalfi — Bobby Flay",         emoji:"🐟", cat:"Famosos de la TV",    tipo:"Italiana · Mariscos",            preco:"$$$",  local:"Caesars Palace",     rating:4.4, tags:[], desc:"El campeón de Iron Chef trae la Costa Amalfitana al Strip. Pescado fresco del día, pasta y mariscos con técnica italiana auténtica. Abre solo a la cena.", maps:"https://www.google.com/maps/search/Amalfi+Bobby+Flay+Caesars+Palace+Las+Vegas" },
    { name:"Bazaar Meat — José Andrés",   emoji:"🥩", cat:"Famosos de la TV",    tipo:"Carnes · Cocina de Vanguardia",  preco:"$$$$", local:"The Venetian",       rating:4.5, tags:[], desc:"El chef español más famoso del mundo — conocido por su disputa con Trump — trae su churrasco de autor al Venetian. Cotton candy foie gras, vaca vieja y espectáculo total.", maps:"https://www.google.com/maps/search/Bazaar+Meat+Jose+Andres+Venetian+Las+Vegas" },
    // Confeitaria
    { name:"Hershey's Chocolate World",   emoji:"🍫", cat:"Confeitaria",          tipo:"Chocolates",                     preco:"$",    local:"New York-New York",   rating:4.5, tags:[], desc:"El mundo del chocolate de Hershey's — como entrar a la fábrica de Willy Wonka. Chocolates, helados y souvenirs. Perfecto para llevar de regalo. Abierto hasta la 1am.", maps:"https://www.google.com/maps/search/Hersheys+Chocolate+World+Las+Vegas" },
    { name:"Donutique",                   emoji:"🍩", cat:"Confeitaria",          tipo:"Donuts Gourmet",                 preco:"$$",   local:"The Venetian",       rating:4.2, tags:[], desc:"Donuts gourmet europeos en el corazón del Venetian. Cada pieza es una obra de arte: tiramisu, pistacho, crema de limón. Opciones veganas y sin gluten.", maps:"https://www.google.com/maps/search/Donutique+Venetian+Las+Vegas" },
    { name:"Zeppola Cafe",                emoji:"🥐", cat:"Confeitaria",          tipo:"Croissants · Café",              preco:"$$",   local:"The Venetian",       rating:4.3, tags:[], desc:"El café viral de la Piazza San Marco en el Venetian. Los Cube Croissants y Rolly Croissants son los más fotografiados de Las Vegas. Receta familiar italiana desde las 4am.", maps:"https://www.google.com/maps/search/Zeppola+Cafe+Venetian+Las+Vegas" },
    { name:"Dominique Ansel",             emoji:"🌸", cat:"Confeitaria",          tipo:"Pastelería Francesa",            preco:"$$$",  local:"Paris Las Vegas",    rating:4.0, tags:[], desc:"El inventor del Cronut. Pastelería de autor francesa con creaciones únicas cada temporada. El Cookie Shot (llenado con leche al momento) es imprescindible.", maps:"https://www.google.com/maps/search/Dominique+Ansel+Paris+Las+Vegas" },
    // Vegano
    { name:"Tacotarian",                  emoji:"🌮", cat:"Vegano",               tipo:"Tacos Veganos",                  preco:"$",    local:"Planet Hollywood",   rating:4.6, tags:["gf","vegan"], desc:"100% plant-based. Los mejores tacos veganos del Strip — birria, chorizo y al pastor sin carne que engañan hasta a los carnívoros. Tortillas de maíz GF.", maps:"https://www.google.com/maps/search/Tacotarian+Las+Vegas" },
    { name:"True Food Kitchen",           emoji:"🥗", cat:"Vegano",               tipo:"Saludable · Orgánico",           preco:"$$",   local:"Forum Shops, Caesars", rating:4.5, tags:["gf","vegan"], desc:"Cocina saludable y orgánica con menú amplio vegano y GF. Edamame dumplings, bowls de quinoa y hamburguesas plant-based. En el Forum Shops de Caesars.", maps:"https://www.google.com/maps/search/True+Food+Kitchen+Las+Vegas+Forum+Shops" },
    { name:"Nacho Daddy",                 emoji:"🧀", cat:"Vegano",               tipo:"Mexicano Vegano",                preco:"$$",   local:"Las Vegas Strip",    rating:4.4, tags:["vegan"], desc:"Bar mexicano con menú vegano completo — nachos, burritos y chimichanga de pollo plant-based. Ambiente de sports bar, abierto hasta las 3am.", maps:"https://www.google.com/maps/search/Nacho+Daddy+Las+Vegas" },
    { name:"Crossroads Kitchen",          emoji:"🌿", cat:"Vegano",               tipo:"Alta Cocina Vegana",             preco:"$$$",  local:"Resorts World",      rating:4.5, tags:["gf","vegan"], desc:"El único restaurante vegano fine dining en el Strip. Chef Tal Ronnen. Calamares veganos, pasta carbonara plant-based y brunch buffet los domingos. Impresionante.", maps:"https://www.google.com/maps/search/Crossroads+Kitchen+Resorts+World+Las+Vegas" },
  ],

  // ── CHURRASCARIAS ────────────────────────────────────────────────────
  churrascarias: [
    { name:"Galpão Gaucho",   emoji:"🏆", cat:"Churrascaria", tipo:"Churrasco Brasileño", preco:"$$$",  local:"Las Vegas Strip",        rating:4.8, desc:"La mejor churrascaria del Strip. 18 cortes de la parrilla incluyendo el legendario Golden Steak® bañado en oro. Barra de ensaladas con 45 opciones. Servicio impecable, ambiente elegante.", maps:"https://www.google.com/maps/search/Galpao+Gaucho+Las+Vegas" },
    { name:"Fogo de Chão",    emoji:"🔥", cat:"Churrascaria", tipo:"Churrasco Brasileño", preco:"$$$",  local:"The Venetian",           rating:4.7, desc:"Picanha, fraldinha y filet mignon asados en brasa abierta y cortados en la mesa por gauchos. Dos niveles, parrilla a la vista y el Market Table más completo de Vegas.", maps:"https://www.google.com/maps/search/Fogo+de+Chao+Venetian+Las+Vegas" },
    { name:"Texas de Brazil",  emoji:"🤠", cat:"Churrascaria", tipo:"Churrasco Brasileño", preco:"$$$",  local:"Town Square",            rating:4.5, desc:"Churrascaria al estilo texano-brasileño con cortes de res, cerdo, cordero, pollo y chorizo a voluntad. Barra de ensaladas con más de 50 opciones. Ideal para grupos grandes.", maps:"https://www.google.com/maps/search/Texas+de+Brazil+Las+Vegas+Town+Square" },
  ],
};
    { name:"Mon Ami Gabi",                emoji:"🥐", cat:"Con Vista al Bellagio", preco:"$$",   local:"Paris Las Vegas, 3655 Las Vegas Blvd",    rating:4.7, desc:"Bistró francés con terraza al nivel de la calle, justo frente a las fuentes. Crepes, steak frites y desayunos increíbles. Con viento en los shows, puedes sentir el agua desde la mesa.", maps:"https://maps.app.goo.gl/MFxK1kGq3pjvVCaj8" },
    { name:"Chéri Rooftop",               emoji:"🗼", cat:"Con Vista al Bellagio", preco:"$$",   local:"Paris Las Vegas, 3655 Las Vegas Blvd",    rating:4.3, desc:"Rooftop bajo la Torre Eiffel de París con vista directa al Bellagio. Ambiente de jardín parisino de los años 50, cócteles creativos y platos franceses. El secreto mejor guardado de Paris Las Vegas.", maps:"https://maps.app.goo.gl/ZCYfHPmE7TK3i6j68" },
    { name:"Eiffel Tower Restaurant",     emoji:"🗼", cat:"Con Vista al Bellagio", preco:"$$$$", local:"Paris Las Vegas, 3655 Las Vegas Blvd",    rating:4.6, desc:"Cena en el piso 11 de la Torre Eiffel de Vegas. Vista panorámica directa a las fuentes del Bellagio. El más romántico del Strip.", maps:"https://maps.app.goo.gl/EiffelTowerRestaurant" },
    // Rooftop
    { name:"Beer Park",                   emoji:"🍺", cat:"Rooftop",              preco:"$$",   local:"Paris Las Vegas, 3655 Las Vegas Blvd",    rating:4.2, desc:"Terraza abierta sobre el Strip con vista al Bellagio. Cervezas artesanales, hamburguesas y el mejor atardecer de Vegas. Ideal para ver el Strip sin gastar de más.", maps:"https://maps.app.goo.gl/S8xBqL9e2mBPNJL49" },
    { name:"BrewDog Las Vegas",           emoji:"🍻", cat:"Rooftop",              preco:"$$",   local:"3767 Las Vegas Blvd S",                   rating:4.7, desc:"Rooftop bar escocés con vistas al Strip, múltiples barras, cervezas artesanales y ambiente relajado. Uno de los favoritos de los locales — y pocos turistas lo conocen.", maps:"https://maps.app.goo.gl/nAGhUHxkobFHNqCH9" },
    { name:"Ole Red Las Vegas",           emoji:"🤠", cat:"Rooftop",              preco:"$$",   local:"Bally's, 3627 Las Vegas Blvd S",          rating:4.6, desc:"Bar country de 3 pisos con música en vivo todas las noches. Comida sureña, karaoke, rooftop y ambiente de fiesta hasta las 4am. El favorito de los fans del country.", maps:"https://maps.app.goo.gl/FMFWdQN1SFuVjZcQ9" },
    { name:"Hard Rock Cafe",              emoji:"🎸", cat:"Rooftop",              preco:"$$",   local:"3771 Las Vegas Blvd S",                   rating:4.4, desc:"El templo del rock and roll. Guitarras icónicas, memorabilia legendaria y hamburguesas enormes. Terraza con vista al Strip. Abierto desde 7:30am.", maps:"https://maps.app.goo.gl/v5GUZEmZjMXrXz5RA" },
    { name:"Top of the World",            emoji:"🌆", cat:"Rooftop",              preco:"$$$$", local:"The STRAT, 2000 Las Vegas Blvd",          rating:4.3, desc:"Cena giratoria a 264 metros de altura. Las Vegas entera bajo tus pies, una vuelta completa cada 80 minutos. Romántico, espectacular e imprescindible.", maps:"https://maps.app.goo.gl/2d5b1VGnHxK4VYqf7" },
    { name:"Giada",                       emoji:"🍝", cat:"Rooftop",              preco:"$$$",  local:"The Cromwell, 3595 Las Vegas Blvd",       rating:4.6, desc:"La chef Giada De Laurentiis trae la cocina italiana moderna al Strip. Terraza con vistas únicas al Boulevard — una de las más bonitas de Vegas.", maps:"https://maps.app.goo.gl/GiadaLasVegas" },
    // Fine Dining
    { name:"Gordon Ramsay Hell's Kitchen",emoji:"🔥", cat:"Fine Dining",          preco:"$$$",  local:"Caesars Palace, 3570 Las Vegas Blvd",    rating:4.7, tags:["gf"], desc:"El restaurante más famoso del Strip. Beef Wellington legendario en el teatro más icónico de Gordon Ramsay. Reserva con anticipación — siempre lleno.", maps:"https://maps.app.goo.gl/GordonRamsayHellsKitchen" },
    { name:"Joël Robuchon",               emoji:"👨‍🍳", cat:"Fine Dining",          preco:"$$$$", local:"MGM Grand, 3799 Las Vegas Blvd",         rating:4.9, tags:[], desc:"El único restaurante con 3 estrellas Michelin en Las Vegas. La experiencia gastronómica más exclusiva de Nevada. Una noche que no olvidarás.", maps:"https://maps.app.goo.gl/JoelRobuchonLV" },
    { name:"STK Steakhouse",              emoji:"🥩", cat:"Fine Dining",          preco:"$$$",  local:"Cosmopolitan, 3708 Las Vegas Blvd",       rating:4.5, tags:[], desc:"El steakhouse más cool de Vegas. Ambiente de club, música en vivo y los mejores cortes. Ideal para grupos y celebraciones especiales.", maps:"https://maps.app.goo.gl/STKSteakhouseLV" },
    { name:"Nobu Las Vegas",              emoji:"🍣", cat:"Fine Dining",          preco:"$$$",  local:"Caesars Palace, 3570 Las Vegas Blvd",    rating:4.6, tags:["gf"], desc:"El templo mundial de la cocina japonesa-peruana. Black Cod with Miso — el plato más imitado del mundo. Una visita obligatoria en el Strip.", maps:"https://maps.app.goo.gl/NobuLasVegas" },
    { name:"Mizumi",                      emoji:"🎋", cat:"Fine Dining",          preco:"$$$",  local:"Wynn Las Vegas, 3131 Las Vegas Blvd",    rating:4.5, tags:[], desc:"Japonés de alta gama dentro del Wynn. Teppanyaki espectacular con vistas al lago y cascada. Sushi, mariscos y wagyu de primera. Abre solo jueves a domingo.", maps:"https://maps.app.goo.gl/MizumiWynnLV" },
    { name:"The Buffet at Wynn",          emoji:"🦞", cat:"Fine Dining",          preco:"$$$",  local:"Wynn Las Vegas, 3131 Las Vegas Blvd",    rating:4.2, tags:[], desc:"El buffet más premium de Las Vegas. Cangrejos, carnes a la parrilla, estaciones gourmet y postres de autor. Solo viernes, sábado y domingo.", maps:"https://maps.app.goo.gl/WynnBuffetLV" },
    { name:"Joe's Seafood Prime Steak",   emoji:"🦀", cat:"Fine Dining",          preco:"$$$$", local:"Forum Shops, 3500 Las Vegas Blvd",       rating:4.7, tags:["gf"], desc:"Stone crab, prime steak y mariscos frescos en el corazón del Strip. Menú GF dedicado. Uno de los favoritos de temporada para celebraciones especiales.", maps:"https://maps.app.goo.gl/JoesSeafoodLV" },
    // Casual
    { name:"Grand Lux Cafe",              emoji:"✨", cat:"Casual",               preco:"$$",   local:"The Venetian, 3355 Las Vegas Blvd",      rating:4.5, tags:["gf"], desc:"Abierto 24 horas. El restaurante del Venetian que lo tiene todo: desayunos espectaculares, pasta, pollo y los postres más irresistibles del Strip.", maps:"https://maps.app.goo.gl/ZCzrxAe41uuqFxBQ9" },
    { name:"Virgil's Real BBQ",           emoji:"🍖", cat:"Casual",               preco:"$$",   local:"LINQ, 3545 Las Vegas Blvd S",            rating:4.3, tags:[], desc:"BBQ americano de verdad en el corazón del Strip. Costillas, brisket y pulled pork que se deshacen solos. Vista al High Roller incluida.", maps:"https://maps.app.goo.gl/KBzpJMxVETkFqcUT6" },
    { name:"The Cheesecake Factory",      emoji:"🍰", cat:"Casual",               preco:"$$",   local:"Forum Shops, 3500 Las Vegas Blvd",       rating:4.4, tags:["gf"], desc:"Menú enorme con más de 200 platos y porciones gigantes — comparte con alguien. El cheesecake de chocolate Godiva es obligatorio.", maps:"https://maps.app.goo.gl/VHxvSgU5cBCZJ2H6A" },
    { name:"Olive Garden",                emoji:"🍝", cat:"Casual",               preco:"$$",   local:"3767 Las Vegas Blvd S, Piso 3",          rating:4.6, tags:["gf"], desc:"Pastas, sopas y el pan de ajo más famoso de América. Justo en el Strip, precio accesible y porciones generosas. Ideal para familias.", maps:"https://maps.app.goo.gl/H3LH3HiLwdBvSwxz6" },
    { name:"Yardbird",                    emoji:"🍗", cat:"Casual",               preco:"$$",   local:"The Venetian, 3355 Las Vegas Blvd",      rating:4.6, tags:["gf"], desc:"El mejor pollo frito de Las Vegas — con harina de arroz, es gluten friendly. Cocina sureña reconfortante y cócteles increíbles.", maps:"https://maps.app.goo.gl/YardbirdLV" },
    { name:"Shake Shack",                 emoji:"🍔", cat:"Casual",               preco:"$$",   local:"New York-New York, 3790 Las Vegas Blvd", rating:4.4, tags:[], desc:"La hamburguesería más de moda de América. ShackBurger jugoso, papas crinkle y milkshakes espesos. Abierto desde las 6am hasta las 4am.", maps:"https://maps.app.goo.gl/ShakeShackNYNYLV" },
    { name:"Black Tap CrazyShakes",       emoji:"🥤", cat:"Casual",               preco:"$$",   local:"The Venetian, 3355 Las Vegas Blvd",      rating:4.3, tags:[], desc:"Los milkshakes más absurdos del mundo — coronados con tortas enteras, algodón de azúcar y dulces. Instagram obligatorio. Abierto hasta la 1am.", maps:"https://maps.app.goo.gl/BlackTapVenetianLV" },
    { name:"In-N-Out Burger",             emoji:"🍔", cat:"Casual",               preco:"$",    local:"Strip / varios locales",                 rating:4.8, tags:["gf"], desc:"La hamburguesa más famosa del Oeste americano. Pide el menú secreto 'Animal Style'. Para GF: pide 'Protein Style' en lechuga — sin cruces.", maps:"https://maps.app.goo.gl/InNOutLasVegas" },
    { name:"Raising Cane's",              emoji:"🍗", cat:"Casual",               preco:"$",    local:"3791 Las Vegas Blvd S",                  rating:4.6, tags:[], desc:"El pollo frito más adictivo del Strip. Solo tenders, papas, ensalada y la Cane's Sauce secreta. Abierto hasta las 4am. Rápido, sabroso y barato.", maps:"https://maps.app.goo.gl/RaisingCanesLV" },
    { name:"Wicked Spoon",                emoji:"🍽️", cat:"Casual",               preco:"$$$",  local:"Cosmopolitan, 3708 Las Vegas Blvd",       rating:4.5, tags:[], desc:"El buffet más instagrameable de Las Vegas. Estaciones gourmet, mariscos frescos y postres de autor. Vale cada dólar.", maps:"https://maps.app.goo.gl/WickedSpoonLV" },
    // Desayuno
    { name:"Siegel's Bagelmania",         emoji:"🥯", cat:"Desayuno",             preco:"$$",   local:"252 Convention Center Dr",               rating:4.6, tags:["gf"], desc:"El deli más querido de Las Vegas. Bagels frescos horneados cada mañana con docenas de cream cheese. Tienen bagels sin gluten. Abre a las 6am.", maps:"https://maps.app.goo.gl/BagelmaniaLV" },
    { name:"Urth Caffé",                  emoji:"☕", cat:"Desayuno",             preco:"$$",   local:"Wynn Las Vegas, 3131 Las Vegas Blvd",    rating:4.2, tags:[], desc:"El café más instagrameable de Las Vegas. Dentro del Wynn, con jardín interior, fuente y ambiente europeo. Lattes de pistacho y desayunos orgánicos.", maps:"https://maps.app.goo.gl/UrthCaffeWynnLV" },
    { name:"Denny's",                     emoji:"🍳", cat:"Desayuno",             preco:"$",    local:"3771 Las Vegas Blvd S",                  rating:4.3, tags:[], desc:"Abierto 24 horas. El desayuno americano clásico: pancakes esponjosos, huevos y café sin límite. El lugar favorito de Vegas a las 3am.", maps:"https://maps.app.goo.gl/kDXd3cGb3DLqsPLi7" },
    { name:"Hash House A Go Go",          emoji:"🥞", cat:"Desayuno",             preco:"$$",   local:"The LINQ, 3535 Las Vegas Blvd",          rating:4.8, tags:[], desc:"Las porciones más ridículas de Vegas — los pancakes son del tamaño de tu cara. Pollo con waffles legendario. Llega temprano porque la fila crece rápido.", maps:"https://maps.app.goo.gl/HashHouseLINQ" },
    { name:"Eggslut",                     emoji:"🥚", cat:"Desayuno",             preco:"$$",   local:"Cosmopolitan, 3708 Las Vegas Blvd",      rating:4.3, tags:[], desc:"El sandwich de huevo más famoso de Instagram. Brioche suave, huevos sedosos y las truffle hashbrowns más adictivas del Strip.", maps:"https://maps.app.goo.gl/EggslutLV" },
    { name:"Peppermill Restaurant",       emoji:"☕", cat:"Desayuno",             preco:"$$",   local:"2985 Las Vegas Blvd S",                  rating:4.5, tags:[], desc:"El diner más icónico de Las Vegas desde 1972. Porciones enormes, ambiente retro de los 70s y el Fireside Lounge de fuego vivo. Abierto 24 horas los fines de semana.", maps:"https://maps.app.goo.gl/PeppermillLV" },
    { name:"Black Bear Diner",            emoji:"🐻", cat:"Desayuno",             preco:"$",    local:"7680 Las Vegas Blvd S",                  rating:4.5, tags:[], desc:"Diner familiar estilo cabaña americana con porciones gigantes. Desayuno todo el día, pancakes esponjosos y el chicken fried steak más generoso de Vegas.", maps:"https://maps.app.goo.gl/BlackBearDinerLV" },
    { name:"IHOP",                        emoji:"🥞", cat:"Desayuno",             preco:"$",    local:"1809 Las Vegas Blvd S",                  rating:4.4, tags:[], desc:"El templo internacional de los pancakes. Abierto 24 horas. Prueba el Tres Leches off-menu que todos piden.", maps:"https://maps.app.goo.gl/IHOPLasVegas" },
    // Famosos de la TV
    { name:"Big Chicken — Shaquille O'Neal", emoji:"🏀", cat:"Famosos de la TV",  preco:"$$",   local:"4480 Paradise Rd",                       rating:4.6, tags:[], desc:"El restaurante del legendario Shaquille O'Neal. Sándwich de pollo doble empanado, mac & cheese y banana pudding. El más querido de los famosos de Vegas.", maps:"https://maps.app.goo.gl/BigChickenLV" },
    { name:"Guy Fieri's Vegas Kitchen",   emoji:"🔥", cat:"Famosos de la TV",    preco:"$$",   local:"LINQ, 3535 Las Vegas Blvd S",            rating:3.9, tags:[], desc:"El rey del Food Network en el Strip. Trash Can Nachos, mac & cheese burgers y alas de pollo con whisky. Comida americana exagerada — exactamente como en TV.", maps:"https://maps.app.goo.gl/GuyFieriLV" },
    { name:"Carlo's Bakery — Cake Boss",  emoji:"🎂", cat:"Famosos de la TV",    preco:"$$",   local:"The Venetian, 3327 Las Vegas Blvd",      rating:3.7, tags:[], desc:"La famosa panadería del Cake Boss Buddy Valastro de TLC. Lobster Tail, cannolis, Rainbow Cake y pasteles de autor. El lugar más fotografiado del Venetian.", maps:"https://maps.app.goo.gl/CarlosBakeryVenetian" },
    { name:"Buddy V's Ristorante",        emoji:"🍝", cat:"Famosos de la TV",    preco:"$$$",  local:"The Venetian, 3327 Las Vegas Blvd",      rating:4.5, tags:[], desc:"El restaurante italiano de Buddy Valastro (Cake Boss). Mozzarella estirada en vivo, pasta hecha a mano y la pizza más auténtica del Strip. Un show en sí mismo.", maps:"https://maps.app.goo.gl/BuddyVsVenetian" },
    { name:"Gordon Ramsay Hell's Kitchen (TV)", emoji:"👨‍🍳", cat:"Famosos de la TV", preco:"$$$", local:"Caesars Palace, 3570 Las Vegas Blvd", rating:4.7, tags:["gf"], desc:"El restaurante de la serie Hell's Kitchen de Fox. Beef Wellington, pan de salmón y el menú exacto del programa. Reserva con semanas de anticipación.", maps:"https://maps.app.goo.gl/GordonRamsayHellsKitchen" },
    { name:"Amalfi — Bobby Flay",         emoji:"🐟", cat:"Famosos de la TV",    preco:"$$$",  local:"Caesars Palace, 3570 Las Vegas Blvd",    rating:4.4, tags:[], desc:"El campeón de Iron Chef trae la Costa Amalfitana al Strip. Pescado fresco del día, pasta y mariscos con técnica italiana auténtica. Abre solo a la cena.", maps:"https://maps.app.goo.gl/AmalfiBobbyflayCaesars" },
    { name:"Bazaar Meat — José Andrés",   emoji:"🥩", cat:"Famosos de la TV",    preco:"$$$$", local:"The Venetian, 3325 Las Vegas Blvd",      rating:4.5, tags:[], desc:"El chef español más famoso del mundo — conocido por su disputa con Trump — trae su churrasco de autor al Venetian. Cotton candy foie gras, vaca vieja y espectáculo total.", maps:"https://maps.app.goo.gl/BazaarMeatVenetian" },
    // Confeitarias
    { name:"Hershey's Chocolate World",   emoji:"🍫", cat:"Confeitaria",          preco:"$",    local:"New York-New York, 3790 Las Vegas Blvd", rating:4.5, tags:[], desc:"El mundo del chocolate de Hershey's — como entrar a la fábrica de Willy Wonka. Chocolates, helados y souvenirs. Perfecto para llevar de regalo. Abierto hasta la 1am.", maps:"https://maps.app.goo.gl/HersheysLV" },
    { name:"Donutique",                   emoji:"🍩", cat:"Confeitaria",          preco:"$$",   local:"The Venetian, 3327 Las Vegas Blvd",      rating:4.2, tags:[], desc:"Donuts gourmet europeos en el corazón del Venetian. Cada pieza es una obra de arte: tiramisu, pistacho, crema de limón. Opciones veganas y sin gluten.", maps:"https://maps.app.goo.gl/DonutiqueVenetian" },
    { name:"Zeppola Cafe",                emoji:"🥐", cat:"Confeitaria",          preco:"$$",   local:"The Venetian, 3377 Las Vegas Blvd",      rating:4.3, tags:[], desc:"El café viral de la Piazza San Marco en el Venetian. Los Cube Croissants y Rolly Croissants son los más fotografiados de Las Vegas. Receta familiar italiana desde las 4am.", maps:"https://maps.app.goo.gl/ZeppolaCafeVenetian" },
    { name:"Dominique Ansel",             emoji:"🌸", cat:"Confeitaria",          preco:"$$$",  local:"Paris Las Vegas, 3570 Las Vegas Blvd",   rating:4.0, tags:[], desc:"El inventor del Cronut. Pastelería de autor francesa con creaciones únicas cada temporada. El Cookie Shot (llenado con leche al momento) es imprescindible.", maps:"https://maps.app.goo.gl/DominiqueAnselLV" },
    // Vegano
    { name:"Tacotarian",                  emoji:"🌮", cat:"Vegano",               preco:"$",    local:"Miracle Mile, Planet Hollywood",         rating:4.6, tags:["gf","vegan"], desc:"100% plant-based. Los mejores tacos veganos del Strip — birria, chorizo y al pastor sin carne que engañan hasta a los carnívoros. Tortillas de maíz GF.", maps:"https://maps.app.goo.gl/TacotarianMiracleMile" },
    { name:"True Food Kitchen",           emoji:"🥗", cat:"Vegano",               preco:"$$",   local:"Forum Shops, Caesars, 3500 Las Vegas Blvd", rating:4.5, tags:["gf","vegan"], desc:"Cocina saludable y orgánica con menú amplio vegano y GF. Edamame dumplings, bowls de quinoa y hamburguesas plant-based. En el Forum Shops de Caesars.", maps:"https://maps.app.goo.gl/TrueFoodKitchenLV" },
    { name:"Nacho Daddy",                 emoji:"🧀", cat:"Vegano",               preco:"$$",   local:"3663 Las Vegas Blvd S",                  rating:4.4, tags:["vegan"], desc:"Bar mexicano con menú vegano completo — nachos, burritos y chimichanga de pollo plant-based. Ambiente de sports bar, abierto hasta las 3am.", maps:"https://maps.app.goo.gl/NachoDaddyLV" },
    { name:"Crossroads Kitchen",          emoji:"🌿", cat:"Vegano",               preco:"$$$",  local:"Resorts World, 3000 Las Vegas Blvd",     rating:4.5, tags:["gf","vegan"], desc:"El único restaurante vegano fine dining en el Strip. Chef Tal Ronnen. Calamares veganos, pasta carbonara plant-based y brunch buffet los domingos. Impresionante.", maps:"https://maps.app.goo.gl/CrossroadsKitchenLV" },
  ],

  // ── CHURRASCARIAS ────────────────────────────────────────────────────
  churrascarias: [
    { name:"Galpão Gaucho",   emoji:"🏆", cat:"Churrascaria", preco:"$$$",  local:"3200 Las Vegas Blvd S, Strip",        rating:4.8, desc:"La mejor churrascaria del Strip. 18 cortes de la parrilla incluyendo el legendario Golden Steak® bañado en oro. Barra de ensaladas con 45 opciones. Servicio impecable, ambiente elegante.", maps:"https://maps.app.goo.gl/GalpaoGauchoLV" },
    { name:"Fogo de Chão",    emoji:"🔥", cat:"Churrascaria", preco:"$$$",  local:"The Venetian, 3377 Las Vegas Blvd",   rating:4.7, desc:"Picanha, fraldinha y filet mignon asados en brasa abierta y cortados en la mesa por gauchos. Dos niveles, parrilla a la vista y el Market Table más completo de Vegas.", maps:"https://maps.app.goo.gl/aSFtJ2K8sWQhCTGK6" },
    { name:"Texas de Brazil",  emoji:"🤠", cat:"Churrascaria", preco:"$$$",  local:"Town Square, 6533 Las Vegas Blvd S", rating:4.5, desc:"Churrascaria al estilo texano-brasileño con cortes de res, cerdo, cordero, pollo y chorizo a voluntad. Barra de ensaladas con más de 50 opciones. Ideal para grupos grandes.", maps:"https://maps.app.goo.gl/TexasDeBrazilLV" },
  ],
};

const CAT_META = {
  atracciones:  { label:"Atracciones",         emoji:"🎡", destaque:"En Destaque",    hasFecha:false },
  sphere:       { label:"The Sphere",          emoji:"🌐", destaque:"En Destaque",    hasFecha:true  },
  conciertos:   { label:"Conciertos",          emoji:"🎤", destaque:"En Destaque",    hasFecha:true  },
  deportes:     { label:"Deportes",            emoji:"🏆", destaque:"En Destaque",    hasFecha:true  },
  shows:        { label:"Shows",               emoji:"🎭", destaque:"En Destaque",    hasFecha:false },
  tributos:     { label:"Tributos",            emoji:"🎵", destaque:"En Destaque",    hasFecha:false },
  tours:        { label:"Tours",               emoji:"🏔️", destaque:"En Destaque",    hasFecha:false },
  nightlife:    { label:"Fiestas & Nightlife", emoji:"🔥", destaque:"Mayores de 21",  hasFecha:false },
  experiencias: { label:"Experiencias",        emoji:"⚡", destaque:"En Destaque",    hasFecha:false },
  ninos:        { label:"Con niños",           emoji:"👨‍👩‍👧", destaque:"Familia",       hasFecha:false },
  restaurantes: { label:"Bares & Restaurantes",emoji:"🍻", destaque:"Comer & Beber",  hasFecha:false },
};

const CATEGORIAS = Object.entries(CAT_META).map(([id, m]) => ({ id, label:m.label, emoji:m.emoji, hasFecha:m.hasFecha }));
const MAX_SEL = 3;

// ─── COLORES POR SUBCATEGORÍA DE RESTAURANTE ─────────────────────────────
const CAT_COLORS = {
  "Con Vista al Bellagio": { bg:"rgba(99,179,237,0.18)",  border:"rgba(99,179,237,0.6)",  text:"#90cdf4" },
  "Rooftop":               { bg:"rgba(251,146,60,0.18)",  border:"rgba(251,146,60,0.6)",  text:"#fdba74" },
  "Fine Dining":           { bg:"rgba(255,215,0,0.15)",   border:"rgba(255,215,0,0.6)",   text:"#ffd700" },
  "Casual":                { bg:"rgba(104,211,145,0.15)", border:"rgba(104,211,145,0.6)", text:"#6ee7a0" },
  "Desayuno":              { bg:"rgba(246,173,85,0.15)",  border:"rgba(246,173,85,0.6)",  text:"#fbbf6a" },
  "Churrascaria":          { bg:"rgba(220,38,38,0.15)",   border:"rgba(220,38,38,0.6)",   text:"#fca5a5" },
  "Famosos de la TV":      { bg:"rgba(167,139,250,0.15)", border:"rgba(167,139,250,0.6)", text:"#c4b5fd" },
  "Confeitaria":           { bg:"rgba(244,114,182,0.15)", border:"rgba(244,114,182,0.6)", text:"#f9a8d4" },
  "Vegano":                { bg:"rgba(52,211,153,0.15)",  border:"rgba(52,211,153,0.6)",  text:"#6ee7b7" },
};

// ─── ORDEN DE PRECIO ─────────────────────────────────────────────────────
const PRECO_ORDER = { "$":1, "$$":2, "$$$":3, "$$$$":4 };

// ─── ESTILOS ──────────────────────────────────────────────────────────────
const S = {
  app: { minHeight:"100vh", height:"100vh", background:"#080808", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Inter', sans-serif", color:"#fff", position:"relative", overflow:"hidden" },
  inner: { width:"100%", maxWidth:"420px", display:"flex", flexDirection:"column", height:"100vh", position:"relative", zIndex:2 },
  header: { padding:"10px 24px 8px", textAlign:"center", borderBottom:"1px solid rgba(224,0,200,0.18)", flexShrink:0 },
  logo: { fontFamily:"'Playfair Display', serif", fontSize:"24px", fontWeight:900, letterSpacing:"2px", textTransform:"uppercase", color:"#fff" },
  logoSpan: { color:"#e000c8", textShadow:"0 0 18px rgba(200,0,180,1), 0 0 50px rgba(200,0,180,0.5)" },
  headerSub: { fontSize:"10px", fontWeight:700, letterSpacing:"4px", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginTop:"3px" },
  splashBody: { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"16px 28px 24px", textAlign:"center" },
  city: { fontFamily:"'Playfair Display', serif", fontWeight:900, fontSize:"clamp(44px,13vw,60px)", lineHeight:0.88, color:"#fff", letterSpacing:"-2px" },
  subtitulo: { fontSize:"10px", fontWeight:700, letterSpacing:"5px", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", margin:"8px 0 2px" },
  destaque: { fontFamily:"'Playfair Display', serif", fontSize:"20px", fontWeight:700, color:"#fff" },
  deco: { width:"36px", height:"1px", background:"linear-gradient(90deg, transparent, #e000c8, transparent)", boxShadow:"0 0 8px rgba(200,0,180,0.5)", margin:"0 auto 6px" },
  loquepasa: { fontFamily:"'Playfair Display', serif", fontSize:"17px", fontStyle:"italic", color:"#e000c8", lineHeight:1.3, marginBottom:"2px" },
  solopasa: { fontFamily:"'Playfair Display', serif", fontSize:"30px", fontStyle:"italic", fontWeight:900, color:"#fff", lineHeight:1.1 },
  categorias: { display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"nowrap", gap:"5px", fontSize:"10px", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", color:"#e000c8", textShadow:"0 0 10px rgba(200,0,180,0.7)" },
  sep: { color:"rgba(224,0,200,0.4)", fontWeight:300 },
  cta: { background:"linear-gradient(135deg, #d400bc 0%, #8800a0 100%)", color:"#fff", border:"none", borderRadius:"8px", padding:0, width:"100%", maxWidth:"300px", cursor:"pointer", fontFamily:"'Inter', sans-serif", boxShadow:"0 0 28px rgba(200,0,180,0.45), 0 8px 28px rgba(0,0,0,0.5)", transition:"all 0.2s", overflow:"hidden" },
  ctaMain: { display:"block", padding:"18px 24px 14px", fontSize:"19px", fontWeight:700, borderBottom:"1px solid rgba(255,255,255,0.12)" },
  ctaSub: { display:"block", padding:"10px 24px 13px", fontSize:"10px", fontWeight:600, letterSpacing:"2.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.65)" },
  filtrosBody: { flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight:0 },
  filtrosScroll: { flex:1, overflowY:"auto", padding:"24px 20px 8px", WebkitOverflowScrolling:"touch" },
  filtrosFooter: { flexShrink:0, padding:"12px 20px 28px", background:"linear-gradient(to top, #080808 75%, rgba(8,8,8,0))", borderTop:"none" },
  filtrosTitulo: { fontFamily:"'Playfair Display', serif", fontSize:"24px", fontWeight:700, color:"#fff", textAlign:"center", marginBottom:"8px" },
  filtrosSub: { fontSize:"16px", fontWeight:700, color:"#fff", textAlign:"center", marginBottom:"24px", letterSpacing:"0.5px" },
  filtrosGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"28px" },
  filtroBtn: (sel) => ({ background: sel ? "rgba(224,0,200,0.25)" : "rgba(255,255,255,0.09)", border: sel ? "2px solid #e000c8" : "1.5px solid rgba(255,255,255,0.25)", borderRadius:"12px", padding:"16px 10px", cursor:"pointer", fontFamily:"'Inter', sans-serif", color: sel ? "#fff" : "rgba(255,255,255,0.85)", fontSize:"12px", fontWeight:700, textAlign:"center", transition:"all 0.2s", display:"flex", flexDirection:"column", alignItems:"center", gap:"7px", boxShadow: sel ? "0 0 20px rgba(224,0,200,0.35)" : "0 2px 8px rgba(0,0,0,0.4)" }),
  filtroEmoji: { fontSize:"26px", lineHeight:1 },
  fechaBadge: { fontSize:"8px", background:"rgba(224,0,200,0.2)", color:"#e000c8", border:"1px solid rgba(224,0,200,0.4)", borderRadius:"10px", padding:"1px 6px", letterSpacing:"1px" },
  contador: (ativo) => ({ textAlign:"center", fontSize:"11px", fontWeight:500, letterSpacing:"2px", textTransform:"uppercase", color: ativo ? "#e000c8" : "rgba(255,255,255,0.3)", marginBottom:"20px", minHeight:"18px", textShadow: ativo ? "0 0 8px rgba(200,0,180,0.5)" : "none" }),
  resBody: { flex:1, overflowY:"auto", padding:"20px 16px 48px" },
  resBack: { background:"linear-gradient(135deg, #d400bc 0%, #8800a0 100%)", border:"none", color:"#fff", fontSize:"16px", fontWeight:700, letterSpacing:"1px", cursor:"pointer", fontFamily:"'Inter', sans-serif", marginBottom:"24px", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"14px 24px", borderRadius:"10px", width:"100%", boxShadow:"0 0 20px rgba(200,0,180,0.4)", transition:"all 0.2s" },
  avisoLegal: { fontSize:"10px", color:"rgba(255,255,255,0.25)", fontStyle:"italic", lineHeight:1.6, marginBottom:"24px", padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.05)" },
  avisoLegal: { fontSize:"12px", color:"rgba(255,255,255,0.6)", fontStyle:"italic", lineHeight:1.6, marginBottom:"20px", padding:"12px 16px", background:"rgba(255,255,255,0.04)", borderRadius:"8px", border:"1px solid rgba(255,255,255,0.1)" },
  catHeader: { marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid rgba(224,0,200,0.3)" },
  catTitulo: { fontFamily:"'Playfair Display', serif", fontSize:"24px", fontWeight:700, color:"#fff", display:"block" },
  catSubTitulo: { fontFamily:"'Playfair Display', serif", fontSize:"18px", fontWeight:700, color:"rgba(255,255,255,0.85)", marginBottom:"12px", marginTop:"20px", paddingBottom:"6px", borderBottom:"1px solid rgba(255,255,255,0.08)" },
  card: { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"14px", padding:"16px", marginBottom:"10px", transition:"all 0.2s" },
  cardEmoji: { fontSize:"32px", lineHeight:1, flexShrink:0 },
  cardTop: { display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"10px" },
  cardName: { fontFamily:"'Inter', sans-serif", fontSize:"14px", fontWeight:700, color:"#fff", marginBottom:"6px", lineHeight:1.3 },
  cardTags: { display:"flex", flexWrap:"wrap", gap:"4px" },
  tagDur: { fontSize:"10px", padding:"2px 8px", borderRadius:"20px", fontWeight:500, background:"rgba(255,215,0,0.1)", color:"#ffd700", border:"1px solid rgba(255,215,0,0.2)" },
  tagRating: { fontSize:"10px", padding:"2px 8px", borderRadius:"20px", fontWeight:500, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.1)" },
  cardPrice: { fontSize:"16px", fontWeight:700, color:"#ffd700", whiteSpace:"nowrap", marginLeft:"8px", flexShrink:0 },
  cardDesc: { fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:"12px" },
  cardBtn: { display:"block", background:"linear-gradient(135deg, #d400bc, #8800a0)", color:"#fff", textAlign:"center", padding:"12px", borderRadius:"8px", textDecoration:"none", fontSize:"13px", fontWeight:700, fontFamily:"'Inter', sans-serif", letterSpacing:"0.5px", boxShadow:"0 4px 16px rgba(200,0,180,0.3)" },
  calWrap: { background:"rgba(224,0,200,0.08)", border:"2px solid rgba(224,0,200,0.4)", borderRadius:"12px", padding:"16px", marginBottom:"20px" },
  calTitle: { fontSize:"14px", fontWeight:800, letterSpacing:"1px", textTransform:"uppercase", color:"#e000c8", marginBottom:"12px" },
  calInput: { width:"100%", background:"rgba(255,255,255,0.08)", border:"1.5px solid rgba(224,0,200,0.4)", borderRadius:"8px", padding:"12px 14px", color:"#fff", fontSize:"16px", fontFamily:"'Inter', sans-serif", outline:"none", cursor:"pointer" },
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

function Glow() {
  return (
    <>
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:"420px",height:"100vh",pointerEvents:"none",zIndex:1}}>
        <div style={{position:"absolute",top:"-120px",left:"50%",transform:"translateX(-50%)",width:400,height:400,background:"radial-gradient(circle,rgba(210,0,185,0.13) 0%,transparent 65%)"}}/>
        <div style={{position:"absolute",bottom:"-80px",left:"50%",transform:"translateX(-50%)",width:360,height:360,background:"radial-gradient(circle,rgba(210,0,185,0.10) 0%,transparent 65%)"}}/>
        <div style={{position:"absolute",top:0,left:0,width:"2px",height:"100%",background:"linear-gradient(180deg,transparent,#e000c8 50%,transparent)",opacity:0.5}}/>
        <div style={{position:"absolute",top:0,right:0,width:"2px",height:"100%",background:"linear-gradient(180deg,transparent,#e000c8 50%,transparent)",opacity:0.5}}/>
      </div>
    </>
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
            {exp.dur    && <span style={S.tagDur}>⏱ {exp.dur}</span>}
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

function RestCard({ rest }) {
  const c = CAT_COLORS[rest.cat] || CAT_COLORS["Casual"];
  const tagTipo = { fontSize:"10px", padding:"2px 8px", borderRadius:"20px", fontWeight:600, background:c.bg, color:c.text, border:`1px solid ${c.border}` };
  const tagPreco = { fontSize:"11px", padding:"2px 8px", borderRadius:"20px", fontWeight:700, background:"rgba(255,215,0,0.12)", color:"#ffd700", border:"1px solid rgba(255,215,0,0.3)" };
  const tagGF = { fontSize:"10px", padding:"2px 7px", borderRadius:"20px", fontWeight:600, background:"rgba(52,211,153,0.12)", color:"#6ee7b7", border:"1px solid rgba(52,211,153,0.4)" };
  const tagVegan = { fontSize:"10px", padding:"2px 7px", borderRadius:"20px", fontWeight:600, background:"rgba(52,211,153,0.18)", color:"#34d399", border:"1px solid rgba(52,211,153,0.5)" };
  return (
    <div style={S.card}>
      <div style={S.cardTop}>
        <span style={S.cardEmoji}>{rest.emoji}</span>
        <div style={S.cardInfo}>
          <div style={S.cardName}>{rest.name}</div>
          <div style={S.cardTags}>
            {rest.tipo && <span style={tagTipo}>{rest.tipo}</span>}
            {rest.preco && <span style={tagPreco}>{rest.preco}</span>}
            {rest.tags?.includes("gf") && <span style={tagGF}>🌾 GF</span>}
            {rest.tags?.includes("vegan") && <span style={tagVegan}>🌿 Vegano</span>}
            {rest.rating && <span style={S.tagRating}>⭐ {rest.rating}</span>}
          </div>
          {rest.local && <div style={{fontSize:"10px", color:"rgba(255,255,255,0.35)", marginTop:"5px"}}>📍 {rest.local}</div>}
        </div>
      </div>
      <div style={S.cardDesc}>{rest.desc}</div>
      <a href={rest.maps} target="_blank" rel="noopener noreferrer"
        style={{...S.cardBtn, background:"linear-gradient(135deg, #1a6a3a, #0d4a26)"}}>
        🗺️ Cómo llegar
      </a>
    </div>
  );
}

// ─── PANTALLA 1: SPLASH ───────────────────────────────────────────────────
function SplashScreen({ onStart }) {
  return (
    <div style={S.app}>
      <div style={S.inner}>
        <Glow />
        <Header />
        <div style={S.splashBody}>

          {/* BLOCO 1 — Cidade + Frase juntas */}
          <div style={{width:"100%"}}>
            <div style={S.city}>Las Vegas</div>
            <div style={S.subtitulo}>la capital mundial</div>
            <div style={S.destaque}>del Entretenimiento</div>
            <div style={{margin:"12px auto 6px", width:"36px", height:"1px", background:"linear-gradient(90deg,transparent,#e000c8,transparent)", boxShadow:"0 0 8px rgba(200,0,180,0.5)"}}/>
            <div style={S.loquepasa}>Lo que pasa en Vegas...</div>
            <div style={S.solopasa}>¡solo pasa en Vegas!</div>
          </div>

          {/* BLOCO 2 — Categorias */}
          <div style={{width:"100%", marginTop:"16px"}}>
            <div style={S.categorias}>
              <span>Tickets</span><span style={S.sep}>·</span>
              <span>Shows</span><span style={S.sep}>·</span>
              <span>Tours</span><span style={S.sep}>·</span>
              <span>Bares</span><span style={S.sep}>·</span>
              <span>Restaurantes</span>
            </div>
          </div>

          {/* BLOCO 3 — Badge + Botão */}
          <div style={{width:"100%", marginTop:"16px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px"}}>
            <div style={{display:"flex", alignItems:"center", gap:"6px", background:"rgba(224,0,200,0.1)", border:"1px solid rgba(224,0,200,0.3)", borderRadius:"20px", padding:"4px 14px"}}>
              <span style={{fontSize:"10px"}}>🔥</span>
              <span style={{fontSize:"10px", fontWeight:700, letterSpacing:"1px", color:"#e000c8"}}>+500 EXPERIENCIAS DISPONIBLES</span>
            </div>
            <button style={{...S.cta, maxWidth:"100%", animation:"neonPulse 2.5s ease-in-out infinite"}} onClick={onStart}>
              <span style={{display:"block", padding:"15px 24px 12px", fontSize:"20px", fontWeight:700, borderBottom:"1px solid rgba(255,255,255,0.12)"}}>¡Empieza aquí! →</span>
              <span style={{display:"block", padding:"8px 24px 10px", fontSize:"10px", fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.7)"}}>Gratis · Reserva sin compromiso</span>
            </button>
          </div>

        </div>
      </div>
      <style>{`@keyframes neonPulse{0%,100%{box-shadow:0 0 28px rgba(200,0,180,0.45),0 8px 28px rgba(0,0,0,0.5)}50%{box-shadow:0 0 48px rgba(200,0,180,0.75),0 12px 36px rgba(0,0,0,0.6)}}`}</style>
    </div>
  );
}

// ─── PANTALLA 2: FILTROS CON TABS ────────────────────────────────────────
const CATS_EXPERIENCIAS = Object.entries(CAT_META)
  .filter(([id]) => id !== "restaurantes")
  .map(([id, m]) => ({ id, label:m.label, emoji:m.emoji, hasFecha:m.hasFecha }));

function FiltrosScreen({ onResultados }) {
  const [aba, setAba]       = useState("exp"); // "exp" | "rest"
  const [selExp, setSelExp] = useState([]);
  const [selRest, setSelRest] = useState([]);

  const toggleExp = (id) => {
    setSelExp(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_SEL) return prev;
      return [...prev, id];
    });
  };

  const toggleRest = (id) => {
    setSelRest(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_SUBCAT) return prev;
      return [...prev, id];
    });
  };

  const totalSel = selExp.length + (selRest.length > 0 ? 1 : 0);
  const ativoExp = selExp.length > 0;
  const ativoRest = selRest.length > 0;
  const ativo = ativoExp || ativoRest;

  const handleVer = () => {
    if (!ativo) return;
    const cats = [...selExp];
    if (ativoRest) cats.push("restaurantes");
    onResultados(cats, selRest);
  };

  const tabStyle = (active) => ({
    flex:1, padding:"12px 8px", border:"none", cursor:"pointer",
    fontFamily:"'Inter', sans-serif", fontSize:"13px", fontWeight:700,
    letterSpacing:"0.5px", transition:"all 0.2s",
    background: active ? "rgba(224,0,200,0.2)" : "rgba(255,255,255,0.05)",
    color: active ? "#fff" : "rgba(255,255,255,0.45)",
    borderBottom: active ? "2px solid #e000c8" : "2px solid transparent",
    boxShadow: active ? "0 0 12px rgba(200,0,180,0.2)" : "none",
  });

  return (
    <div style={S.app}>
      <div style={S.inner}>
        <Glow />
        <Header />

        {/* ── ABAS ── */}
        <div style={{display:"flex", flexShrink:0, borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
          <button style={tabStyle(aba === "exp")} onClick={() => setAba("exp")}>
            🎭 Experiencias
            {ativoExp && <span style={{marginLeft:"6px", background:"#e000c8", color:"#fff", borderRadius:"10px", padding:"1px 6px", fontSize:"10px"}}>{selExp.length}</span>}
          </button>
          <button style={tabStyle(aba === "rest")} onClick={() => setAba("rest")}>
            🍻 Comer & Beber
            {ativoRest && <span style={{marginLeft:"6px", background:"#e000c8", color:"#fff", borderRadius:"10px", padding:"1px 6px", fontSize:"10px"}}>{selRest.length}</span>}
          </button>
        </div>

        <div style={S.filtrosBody}>
          <div style={S.filtrosScroll}>

            {/* ── ABA EXPERIENCIAS ── */}
            {aba === "exp" && (
              <>
                <div style={S.filtrosTitulo}>¿Qué quieres hacer?</div>
                <div style={S.filtrosSub}>Elige hasta <span style={{color:"#e000c8", textShadow:"0 0 12px rgba(200,0,180,0.8)"}}>{MAX_SEL} opciones</span></div>
                <div style={S.filtrosGrid}>
                  {CATS_EXPERIENCIAS.map((cat, i) => {
                    const isSel = selExp.includes(cat.id);
                    const isLast = i === CATS_EXPERIENCIAS.length - 1 && CATS_EXPERIENCIAS.length % 2 !== 0;
                    return (
                      <button key={cat.id} onClick={() => toggleExp(cat.id)}
                        style={{...S.filtroBtn(isSel), gridColumn: isLast ? "1 / -1" : undefined}}>
                        <span style={S.filtroEmoji}>{cat.emoji}</span>
                        {cat.label}
                        {cat.hasFecha && <span style={S.fechaBadge}>FECHAS</span>}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── ABA RESTAURANTES ── */}
            {aba === "rest" && (
              <>
                <div style={S.filtrosTitulo}>¿Dónde comer?</div>
                <div style={S.filtrosSub}>Elige hasta <span style={{color:"#e000c8", textShadow:"0 0 12px rgba(200,0,180,0.8)"}}>{MAX_SUBCAT} categorías</span></div>
                <div style={S.filtrosGrid}>
                  {SUBCATS.map((cat, i) => {
                    const isSel = selRest.includes(cat.id);
                    const isLast = i === SUBCATS.length - 1 && SUBCATS.length % 2 !== 0;
                    const c = CAT_COLORS[cat.id] || {};
                    return (
                      <button key={cat.id} onClick={() => toggleRest(cat.id)}
                        style={{
                          ...S.filtroBtn(isSel),
                          gridColumn: isLast ? "1 / -1" : undefined,
                          border: isSel ? `2px solid ${c.border || "#e000c8"}` : "1.5px solid rgba(255,255,255,0.25)",
                          background: isSel ? (c.bg || "rgba(224,0,200,0.25)") : "rgba(255,255,255,0.09)",
                          color: isSel ? (c.text || "#fff") : "rgba(255,255,255,0.85)",
                          boxShadow: isSel ? `0 0 16px ${c.border || "rgba(224,0,200,0.35)"}` : "0 2px 8px rgba(0,0,0,0.4)",
                        }}>
                        <span style={S.filtroEmoji}>{cat.emoji}</span>
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* ── RODAPÉ FIXO ── */}
          <div style={S.filtrosFooter}>
            <div style={S.contador(ativo)}>
              {!ativo && "Selecciona al menos una opción"}
              {ativo && `${ativoExp ? selExp.length + " experiencia(s)" : ""}${ativoExp && ativoRest ? " + " : ""}${ativoRest ? selRest.length + " restaurante(s)" : ""}`}
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              <button onClick={handleVer}
                style={{...S.cta, opacity: ativo ? 1 : 0.35, pointerEvents: ativo ? "auto" : "none",
                  boxShadow: ativo ? "0 0 28px rgba(200,0,180,0.45),0 8px 28px rgba(0,0,0,0.5)" : "none"}}>
                <span style={S.ctaMain}>¡Ver opciones! →</span>
                <span style={S.ctaSub}>Mostrar todo disponible</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PANTALLA 3: RESULTADOS ───────────────────────────────────────────────
function ResultadosScreen({ sel, subcatRest, onVolver }) {
  const [fecha, setFecha] = useState("");

  const filtrarPorFecha = (items, catId) => {
    if (!CAT_META[catId]?.hasFecha) return items;
    if (!fecha) return items;
    const d = new Date(fecha + "T00:00:00");
    return items.filter(item => {
      // Itens sem datas específicas só aparecem sem filtro
      if (!item.dates || item.dates.length === 0) return false;
      const ini = new Date(item.dates[0] + "T00:00:00");
      const fin = new Date(item.dates[item.dates.length - 1] + "T00:00:00");
      return d >= ini && d <= fin;
    });
  };

  const hasFecha = sel.some(id => CAT_META[id]?.hasFecha);
  const seen = new Set();

  const sections = sel.map(catId => {
    let items = (DB[catId] || []).filter(item => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
    // Filtrar por subcategoria se for restaurantes
    if (catId === "restaurantes" && subcatRest && subcatRest.length > 0) {
      items = items.filter(item => subcatRest.includes(item.cat));
    }
    // Churrascarias dentro de restaurantes
    if (catId === "restaurantes" && subcatRest && subcatRest.includes("Churrascaria")) {
      const churr = (DB["churrascarias"] || []).filter(item => {
        if (seen.has(item.name)) return false;
        seen.add(item.name);
        return true;
      });
      items = [...items, ...churr];
    }
    // Ordenar: shows mantém ordem original (mágicos juntos no final), resto alfabético
    if (catId !== "shows" && catId !== "restaurantes") {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name, "es"));
    }
    // Shows: mágicos juntos no final
    if (catId === "shows") {
      const magicos = ["Criss Angel MINDFREAK","Mat Franco — Magic Reinvented Nightly","Allstars of Magic","V — The Ultimate Variety Show"];
      items = [
        ...items.filter(i => !magicos.includes(i.name)),
        ...items.filter(i => magicos.includes(i.name)),
      ];
    }
    const filtered = filtrarPorFecha(items, catId);
    return { catId, meta: CAT_META[catId], items: filtered };
  }).filter(s => s.items.length > 0);

  return (
    <div style={S.app}>
      <div style={S.inner}>
        <Glow />
        <Header />
        <div style={S.resBody}>
          <button style={S.resBack} onClick={onVolver}>
            ← Volver
          </button>

          {hasFecha && (
            <div style={S.calWrap}>
              <div style={S.calTitle}>📅 ¿Cuándo estarás en Las Vegas?</div>
              <input type="date" style={S.calInput} value={fecha}
                onChange={e => setFecha(e.target.value)}
                min="2026-01-01" max="2027-12-31" />
              {fecha && (
                <div style={{fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"8px"}}>
                  Mostrando eventos disponibles el {new Date(fecha+"T00:00:00").toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}
                </div>
              )}
            </div>
          )}

          {/* Aviso legal apenas para categorias que não são restaurantes */}
          {sel.some(id => id !== "restaurantes") && (
            <div style={{fontSize:"12px", color:"rgba(255,255,255,0.55)", fontStyle:"italic", lineHeight:1.5, marginBottom:"20px", padding:"10px 14px", background:"rgba(255,255,255,0.04)", borderRadius:"8px", border:"1px solid rgba(255,255,255,0.1)"}}>
              * Precios referenciales, sujetos a disponibilidad y cambios sin previo aviso.
            </div>
          )}

          {sections.length === 0 && fecha && (
            <div style={{textAlign:"center",color:"rgba(255,255,255,0.5)",padding:"40px 20px"}}>
              <div style={{fontSize:"32px",marginBottom:"12px"}}>📅</div>
              <div style={{fontSize:"14px"}}>No hay eventos disponibles para esa fecha.</div>
              <div style={{fontSize:"12px",color:"rgba(255,255,255,0.3)",marginTop:"8px"}}>Prueba con otra fecha o elimina el filtro.</div>
            </div>
          )}

          {sections.map(({ catId, meta, items }, si) => {
            if (catId === "restaurantes") {
              // Agrupar por subcategoria e ordenar por preço dentro de cada uma
              const subcatOrder = ["Desayuno","Casual","Con Vista al Bellagio","Churrascaria","Rooftop","Fine Dining","Famosos de la TV","Confeitaria","Vegano"];
              const grupos = {};
              items.forEach(item => {
                const k = item.cat || "Outros";
                if (!grupos[k]) grupos[k] = [];
                grupos[k].push(item);
              });
              const subcatsPresentes = subcatOrder.filter(k => grupos[k]?.length > 0);
              return (
                <div key={catId} style={{marginBottom:"36px", animation:`fadeUp 0.45s ease ${si*0.08}s both`}}>
                  <div style={S.catHeader}>
                    <span style={S.catTitulo}>Bares & Restaurantes</span>
                  </div>
                  {subcatsPresentes.map(subcat => (
                    <div key={subcat}>
                      <div style={S.catSubTitulo}>{subcat}</div>
                      {grupos[subcat]
                        .sort((a,b) => (PRECO_ORDER[a.preco]||0) - (PRECO_ORDER[b.preco]||0))
                        .map(exp => <RestCard key={exp.name} rest={exp} />)}
                    </div>
                  ))}
                  {/* Botão voltar embaixo */}
                  <button style={{...S.resBack, marginTop:"16px"}} onClick={onVolver}>← Volver</button>
                </div>
              );
            }
            return (
              <div key={catId} style={{marginBottom:"36px", animation:`fadeUp 0.45s ease ${si*0.08}s both`}}>
                <div style={S.catHeader}>
                  <span style={S.catTitulo}>{meta.label}</span>
                </div>
                {items.map(exp => <ExpCard key={exp.name} exp={exp} />)}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ─── PANTALLA SUBCATEGORÍAS RESTAURANTES ─────────────────────────────────
const SUBCATS = [
  { id:"Desayuno",          label:"Desayuno",        emoji:"🍳" },
  { id:"Casual",            label:"Casual",          emoji:"🍔" },
  { id:"Con Vista al Bellagio", label:"Vista Bellagio", emoji:"🌊" },
  { id:"Churrascaria",      label:"Churrascaria",    emoji:"🔥" },
  { id:"Rooftop",           label:"Rooftop",         emoji:"🏙️" },
  { id:"Fine Dining",       label:"Fine Dining",     emoji:"✨" },
  { id:"Famosos de la TV",  label:"Famosos TV",      emoji:"📺" },
  { id:"Confeitaria",       label:"Dulces & Pasteles",emoji:"🍰" },
  { id:"Vegano",            label:"Vegano",          emoji:"🌿" },
];
const MAX_SUBCAT = 2;

function SubcatRestScreen({ onVolver, onResultados }) {
  const [sel, setSel] = useState([]);

  const toggle = (id) => {
    setSel(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= MAX_SUBCAT) return prev;
      return [...prev, id];
    });
  };

  const ativo = sel.length >= 1;
  const atMax = sel.length === MAX_SUBCAT;

  return (
    <div style={S.app}>
      <div style={S.inner}>
        <Glow />
        <Header />
        <div style={S.filtrosBody}>
          <div style={S.filtrosScroll}>
            {/* Botón volver */}
            <button onClick={onVolver}
              style={{background:"rgba(255,255,255,0.07)", border:"1.5px solid rgba(255,255,255,0.18)", borderRadius:"10px", color:"rgba(255,255,255,0.7)", fontSize:"13px", fontWeight:600, padding:"10px 16px", cursor:"pointer", fontFamily:"'Inter', sans-serif", marginBottom:"20px", display:"flex", alignItems:"center", gap:"6px"}}>
              ← Volver
            </button>

            <div style={S.filtrosTitulo}>Restaurantes</div>
            <div style={S.filtrosSub}>Elige hasta <span style={{color:"#e000c8", textShadow:"0 0 12px rgba(200,0,180,0.8)"}}>{MAX_SUBCAT} categorías</span></div>

            <div style={S.filtrosGrid}>
              {SUBCATS.map((cat, i) => {
                const isSel = sel.includes(cat.id);
                const isLast = i === SUBCATS.length - 1 && SUBCATS.length % 2 !== 0;
                const c = CAT_COLORS[cat.id] || {};
                return (
                  <button key={cat.id} onClick={() => toggle(cat.id)}
                    style={{
                      ...S.filtroBtn(isSel),
                      gridColumn: isLast ? "1 / -1" : undefined,
                      border: isSel ? `2px solid ${c.border || "#e000c8"}` : "1.5px solid rgba(255,255,255,0.25)",
                      background: isSel ? (c.bg || "rgba(224,0,200,0.25)") : "rgba(255,255,255,0.09)",
                      color: isSel ? (c.text || "#fff") : "rgba(255,255,255,0.85)",
                      boxShadow: isSel ? `0 0 16px ${c.border || "rgba(224,0,200,0.35)"}` : "0 2px 8px rgba(0,0,0,0.4)",
                    }}>
                    <span style={S.filtroEmoji}>{cat.emoji}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={S.filtrosFooter}>
            <div style={S.contador(ativo)}>
              {!ativo && "Selecciona al menos una categoría"}
              {ativo && !atMax && `${sel.length} de ${MAX_SUBCAT} seleccionadas`}
              {atMax && "✦ Máximo alcanzado ✦"}
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
              <button onClick={() => ativo && onResultados(sel)}
                style={{...S.cta, opacity: ativo ? 1 : 0.35, pointerEvents: ativo ? "auto" : "none",
                  boxShadow: ativo ? "0 0 28px rgba(200,0,180,0.45),0 8px 28px rgba(0,0,0,0.5)" : "none"}}>
                <span style={S.ctaMain}>¡Ver restaurantes! →</span>
                <span style={S.ctaSub}>Mostrar opciones disponibles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────
export default function TuVegasTickets() {
  const [screen, setScreen]             = useState("splash");
  const [sel, setSel]                   = useState([]);
  const [subcatRest, setSubcatRest]     = useState([]);
  const [abaAnterior, setAbaAnterior]   = useState("exp");

  // Controla a seta de voltar do telefone
  const navegarPara = (novaScreen) => {
    window.history.pushState({ screen: novaScreen }, "");
    setScreen(novaScreen);
  };

  useEffect(() => {
    const handlePopState = () => {
      setScreen(prev => {
        if (prev === "resultados") return "filtros";
        if (prev === "filtros") return "splash";
        return prev;
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleResultados = (cats, subcats) => {
    setSel(cats);
    setSubcatRest(subcats || []);
    const temRest = cats.includes("restaurantes");
    const temExp  = cats.some(c => c !== "restaurantes");
    setAbaAnterior(temRest && !temExp ? "rest" : "exp");
    navegarPara("resultados");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; background: #000; }
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #e000c8; border-radius: 2px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; cursor: pointer; }
      `}</style>

      {screen === "splash"     && <SplashScreen    onStart={() => navegarPara("filtros")} />}
      {screen === "filtros"    && <FiltrosScreen   onResultados={handleResultados} />}
      {screen === "resultados" && <ResultadosScreen
                                    sel={sel}
                                    subcatRest={subcatRest}
                                    onVolver={() => navegarPara("filtros")} />}
    </>
  );
}
