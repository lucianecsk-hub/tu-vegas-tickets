import { useState } from "react";

// ─── BASE DE DATOS DE EXPERIENCIAS ────────────────────────────────────────
const PAID = [
  // VISTAS / MIRADORES
  { id:1, name:"High Roller — La Noria Gigante", cat:"Vistas", price:21, rating:4.6, reviews:4458, dur:"30 min", emoji:"🎡", desc:"La vista más icónica de Las Vegas desde 167 metros de altura. De día o de noche, solo o en pareja.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t270522/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","work","kids"], vibes:["romantic","first-timer"], times:["morning","day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"budget" },
  { id:6, name:"Torre Eiffel — Mirador Las Vegas", cat:"Vistas", price:35, rating:4.6, reviews:1116, dur:"1 hr", emoji:"🗼", desc:"París recreada en el Strip. Vistas desde 46 pisos al atardecer — una de las mejores fotos de tu viaje.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-eiffel-tower-viewing-deck-skip-the-line-ticket-t276227/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","work","kids"], vibes:["first-timer"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"budget" },
  { id:18, name:"High Roller — Cabina Open Bar", cat:"Vistas", price:48, rating:4.6, reviews:1285, dur:"30 min", emoji:"🎡", desc:"El Strip desde 167 metros. Barra libre. Sin límites. Mejor al atardecer.", url:"https://www.getyourguide.com/las-vegas-l58/the-high-roller-ride-at-the-linq-ticket-t436735/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple","group","family"], vibes:[], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique","nightlife"], tier:"budget", girlsTrip:true },

  // AVENTURA
  { id:4, name:"Flyover Las Vegas", cat:"Aventura", price:25, rating:4.7, reviews:649, dur:"30 min", emoji:"🪂", desc:"Un vuelo simulado sobre Las Vegas. Viento, aromas, movimiento — olvidarás que estás dentro de un edificio.", url:"https://vegas.vdvm.net/a1LxZQ", provider:"VCO", tags:["family","kids"], vibes:["adventure"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"budget" },
  { id:5, name:"Dig This — Maneja Excavadoras", cat:"Único", price:28, rating:5.0, reviews:17, dur:"1 hr", emoji:"🚜", desc:"Maneja excavadoras y bulldozers reales en el desierto. La diversión más inesperada que tendrás en Vegas.", url:"https://vegas.vdvm.net/QjbP19", provider:"VCO", tags:["solo","couple","group","family","kids"], vibes:["romantic","first-timer"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"budget" },
  { id:21, name:"Machine Guns Vegas", cat:"Aventura", price:50, rating:4.8, reviews:144, dur:"1 hr", emoji:"🔫", desc:"Armas reales en un campo de tiro supervisado en Las Vegas. El único lugar del mundo donde esto tiene sentido.", url:"https://vegas.vdvm.net/Py36Z6", provider:"VCO", tags:["solo","couple","group","kids"], vibes:["dark"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"budget" },
  { id:40, name:"Tour ATV en el Desierto", cat:"Aventura", price:109, rating:4.7, reviews:712, dur:"3 hrs", emoji:"🏜️", desc:"ATVs reales en el Mojave auténtico. Nada entre tú y el desierto. Adrenalina pura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-guided-las-vegas-desert-atv-tour-t417683/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:[], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"mid" },
  { id:42, name:"Exotics Racing — Ferrari y Lamborghini", cat:"Aventura", price:109, rating:4.8, reviews:188, dur:"1 hr", emoji:"🏎️", desc:"Maneja un Lamborghini, Ferrari o Porsche en un circuito real. Al sur del Strip. Vidas que cambian aquí.", url:"https://vegas.vdvm.net/eK4ZeZ", provider:"VCO", tags:["solo","group"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"mid" },
  { id:45, name:"Helicóptero Nocturno sobre el Strip", cat:"Aventura", price:129, rating:4.6, reviews:1687, dur:"15 min", emoji:"🚁", desc:"El Strip desde un helicóptero de noche. La vista más icónica de América desde 300 metros de altura.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-strip-helicopter-flight-without-transfers-t33967/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family"], vibes:["adventure"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"mid", girlsTrip:true },
  { id:47, name:"Tiro con Ametralladoras — Exterior", cat:"Aventura", price:159, rating:4.9, reviews:264, dur:"3 hrs", emoji:"💥", desc:"Campo de tiro exterior con traslado incluido. La tarde más americana que vivirás en cualquier lugar.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-outdoor-machine-gun-and-rifle-shooting-w-pickup-t524974/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["luxury","adventure","romantic"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"premium" },
  { id:50, name:"Caballos en el Desierto + Cena BBQ", cat:"Aventura", price:160, rating:4.7, reviews:459, dur:"6 hrs", emoji:"🐴", desc:"Caballos en el Mojave al atardecer. Traslado incluido. Cena BBQ de cowboy real bajo las estrellas.", url:"https://www.getyourguide.com/las-vegas-l58/wild-west-sunset-bbq-dinner-horseback-ride-t5169/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family"], vibes:["adventure"], times:["day"], seasons:["spring","fall"], interests:["adventure"], tier:"premium", girlsTrip:true },
  { id:51, name:"Kayak — Cueva Esmeralda", cat:"Aventura", price:119, rating:4.7, reviews:269, dur:"4 hrs", emoji:"🚣", desc:"Kayak hacia una cueva esmeralda brillante en el Río Colorado. Traslado incluido. El mejor secreto al aire libre cerca de Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-emerald-cave-kayak-tour-with-hotel-pickup-t856688/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple"], vibes:["dark","adventure"], times:["morning","day"], seasons:["winter","spring","fall"], interests:["adventure"], tier:"mid" },
  { id:58, name:"Helicóptero — Aterrizaje Grand Canyon", cat:"Aventura", price:519, rating:4.8, reviews:1415, dur:"4.5 hrs", emoji:"🚁", desc:"Aterriza dentro del Gran Cañón. Picnic con champán en el fondo del cañón. Nada se compara a esto.", url:"https://www.getyourguide.com/las-vegas-l58/grand-canyon-helicopter-landing-tour-ecostar-t9617/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple","group","bachelorette"], vibes:["luxury"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure"], tier:"luxury" },
  { id:87, name:"Cowabunga Canyon — Parque Acuático", cat:"Aventura", price:45, rating:4.7, reviews:300, dur:"Todo el día", emoji:"💦", desc:"El mejor parque acuático de Vegas. Toboganes, río lento, piscina de olas — el día de verano perfecto para todas las edades.", url:"https://vegas.vdvm.net/xkWeD1", provider:"VCO", tags:["solo","couple","group","family","kids"], vibes:[], times:["morning","day"], seasons:["summer"], interests:["adventure","unique"], tier:"budget" },

  // SHOWS VISUALES
  { id:17, name:"Blue Man Group — Luxor", cat:"Show", price:47, rating:4.4, reviews:4893, dur:"1.5 hrs", emoji:"💙", desc:"Tres artistas de azul, máquinas musicales y caos total. Cero palabras. Impacto máximo. Universal.", url:"https://vegas.vdvm.net/21aPxA", provider:"VCO", tags:["family","kids"], vibes:["adventure"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"budget" },
  { id:22, name:"Mystère — Cirque du Soleil", cat:"Show", price:49, rating:4.6, reviews:5750, dur:"1.5 hrs", emoji:"🎭", desc:"El Cirque original en Vegas. Treasure Island. Más de 30 años de acrobacias que desafían la física.", url:"https://vegas.vdvm.net/LKVW3L", provider:"VCO", tags:["solo","couple","group","bachelorette","work"], vibes:["dark"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"budget" },
  { id:28, name:"Cirque du Soleil O", cat:"Show", price:64, rating:4.8, reviews:1564, dur:"1.5 hrs", emoji:"🌊", desc:"Agua. Acróbatas. Un escenario que desafía la física. El espectáculo que define Las Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-o-by-cirque-du-soleil-at-bellagio-t398243/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple","bachelorette"], vibes:["dark"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid", girlsTrip:true },
  { id:34, name:"Awakening — Wynn", cat:"Show", price:74, rating:4.4, reviews:1576, dur:"1.5 hrs", emoji:"💫", desc:"Un original del Wynn. Danza, ilusión, tecnología — así son los espectáculos de Vegas en 2026.", url:"https://vegas.vdvm.net/MmJP2n", provider:"VCO", tags:["solo","couple","group","bachelorette"], vibes:["dark"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid" },
  { id:38, name:"Wizard of Oz — The Sphere", cat:"Show", price:114, rating:4.5, reviews:1319, dur:"1.5 hrs", emoji:"🌐", desc:"La Sphere. 160,000 m² de LED. El Mago de Oz como nunca lo habías visto en tu vida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-the-sphere-experience-the-wizard-of-oz-t969545/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","kids"], vibes:["luxury","adventure","first-timer"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["show","unique"], tier:"mid" },
  { id:39, name:"Michael Jackson ONE — Cirque", cat:"Show", price:96, rating:4.8, reviews:1048, dur:"1.5 hrs", emoji:"🕺", desc:"Cirque du Soleil con MJ. Mandalay Bay. El show más emotivo del Strip — sin una sola palabra que importe.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-michael-jackson-one-by-cirque-du-soleil-ticket-t400944/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","work","kids"], vibes:["luxury"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid" },
  { id:59, name:"KÀ — Cirque du Soleil VIP", cat:"Show", price:370, rating:5.0, reviews:1, dur:"3 hrs", emoji:"🎪", desc:"El espectáculo más grandioso del Cirque — más acceso al backstage, encuentro con artistas, lounge VIP. Una vez en la vida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-ka-by-cirque-du-soleil-at-mgm-grand-ticket-t405483/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple"], vibes:["luxury","romantic"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"luxury" },
  { id:33, name:"Torneo de Reyes — Cena Medieval", cat:"Show", price:63, rating:4.5, reviews:1891, dur:"1.5 hrs", emoji:"⚔️", desc:"Caballeros medievales, justas, explosiones y cena incluida. Excalibur. Los niños enloquecen — y los adultos también.", url:"https://vegas.vdvm.net/oq1xGn", provider:"VCO", tags:["solo","couple","group","family"], vibes:["luxury","romantic"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid" },

  // SHOWS ADULTOS
  { id:8, name:"FANTASY Burlesque — Luxor", cat:"Show", price:37, rating:4.7, reviews:1014, dur:"1.5 hrs", emoji:"💃", desc:"El show para adultos más longevo del Strip. En el Luxor. Artistas increíbles, glamour de Vegas.", url:"https://vegas.vdvm.net/4P13Po", provider:"VCO", tags:["family","kids"], vibes:[], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"budget", guysTrip:true },
  { id:30, name:"Magic Mike Live", cat:"Show", price:54, rating:4.7, reviews:649, dur:"1.5 hrs", emoji:"🔥", desc:"El show del que todos hablan durante años. SAHARA Las Vegas. Ya sabes de qué va.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-magic-mike-live-at-the-sahara-t525549/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:[], times:["night"], seasons:["spring"], interests:["show"], tier:"mid", girlsTrip:true },
  { id:31, name:"Chippendales — Planet Hollywood", cat:"Show", price:67, rating:4.6, reviews:468, dur:"1.5 hrs", emoji:"💪", desc:"Planet Hollywood. El original. La noche más salvaje del Strip.", url:"https://vegas.vdvm.net/DyOEj2", provider:"VCO", tags:["solo","couple","group","work"], vibes:["adventure"], times:["night"], seasons:["winter","spring","fall"], interests:["show"], tier:"mid", girlsTrip:true },
  { id:35, name:"Thunder From Down Under", cat:"Show", price:74, rating:4.5, reviews:722, dur:"1.5 hrs", emoji:"⚡", desc:"Australianos. Excalibur. El show de despedida de soltera que lo empezó todo.", url:"https://vegas.vdvm.net/VmROXR", provider:"VCO", tags:["solo","couple","group"], vibes:["adventure"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid", girlsTrip:true },

  // CULTURA / MUSEOS
  { id:7, name:"Exposición Titanic — Luxor", cat:"Cultura", price:36, rating:4.6, reviews:305, dur:"1.5 hrs", emoji:"🚢", desc:"Artefactos reales del Titanic. El barco que cambió la historia, dentro de una pirámide. Solo en Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/luxor-hotel-titanic-the-artifact-exhibition-entry-ticket-t395730/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple"], vibes:["dark"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"budget" },
  { id:15, name:"Interstellar Arc — AREA15", cat:"Único", price:44, rating:4.8, reviews:14, dur:"1 hr", emoji:"🌌", desc:"Una instalación de arte extraterrestre dentro de AREA15. El futuro ya está aquí — Vegas simplemente no lo anuncia.", url:"https://vegas.vdvm.net/9VM075", provider:"VCO", tags:["group","family","kids"], vibes:[], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"budget" },
  { id:37, name:"Pawn Stars + Tour Shelby", cat:"Cultura", price:85, rating:4.5, reviews:486, dur:"4 hrs", emoji:"🏆", desc:"La tienda real de Pawn Stars, Count's Kustoms y el Museo Shelby. Vegas para los amantes de los autos y la TV.", url:"https://www.getyourguide.com/las-vegas-l58/vip-pawn-stars-tour-t39631/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","work"], vibes:[], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"mid" },
  { id:91, name:"Tour Allegiant Stadium", cat:"Cultura", price:59, rating:4.8, reviews:49, dur:"1.5 hrs", emoji:"🏟️", desc:"Descubre los bastidores del estadio más tecnológico de la NFL. La casa de los Raiders.", url:"https://vegas.vdvm.net/9VM05e", provider:"VCO", tags:["couple"], vibes:["luxury","romantic"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique","sports"], tier:"mid", guysTrip:true },
  { id:65, name:"Nelson Ghost Town y Tour de Mina", cat:"Oscuro", price:134, rating:4.7, reviews:68, dur:"4 hrs", emoji:"👻", desc:"Un pueblo minero abandonado de los años 1800 a 45 minutos de Vegas. Autos oxidados, historias de fantasmas, una mina real.", url:"https://www.getyourguide.com/nelson-ghost-town-nevada-l187538/las-vegas-nelson-ghost-town-with-mine-tour-option-t1221627/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple"], vibes:["luxury","romantic"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"mid" },

  // TOURS — NATURALEZA Y PARQUES
  { id:19, name:"Tour Mojave + 7 Magic Mountains", cat:"Tour", price:49, rating:4.7, reviews:362, dur:"2 hrs", emoji:"🏔️", desc:"Los tótems de neón en medio del desierto Mojave. Más el cartel de Vegas. Arte en medio de la nada.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-hoover-dam-boulder-city-7-magic-mountains-t1053002/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","group","work"], vibes:["adventure"], times:["day"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"budget" },
  { id:32, name:"Tour Presa Hoover — Mini VIP", cat:"Tour", price:70, rating:4.8, reviews:778, dur:"3 hrs", emoji:"🏗️", desc:"Una de las mayores hazañas de ingeniería de la historia. Traslado incluido. La mayoría de turistas nunca van.", url:"https://www.getyourguide.com/las-vegas-l58/award-winning-3-hour-vip-hoover-dam-small-group-mini-tour-t203887/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["family","kids"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"mid" },
  { id:36, name:"Tour en Hummer Militar", cat:"Tour", price:79, rating:4.8, reviews:95, dur:"2.5 hrs", emoji:"🪖", desc:"El Strip, los letreros de neón y el desierto — desde dentro de un Hummer militar. Vegas desde otro ángulo.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-strip-sightseeing-tour-in-a-military-hummer-t828401/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:[], times:["morning","day","night"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"mid" },
  { id:41, name:"Excursión Monte Charleston", cat:"Tour", price:109, rating:4.7, reviews:82, dur:"Medio día", emoji:"❄️", desc:"A 30 minutos del Strip. Traslado incluido. Nieve en invierno, bosques de pinos en primavera.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-mount-charleston-and-lee-canyon-day-trip-t371990/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","work"], vibes:[], times:["morning","day"], seasons:["winter"], interests:["adventure","unique"], tier:"mid" },
  { id:43, name:"Red Rock Canyon — Trekker", cat:"Tour", price:123, rating:4.8, reviews:125, dur:"4 hrs", emoji:"🪨", desc:"Los acantilados de arenisca roja que enmarcan Vegas — desde dentro. Traslado incluido. Grupo pequeño.", url:"https://www.getyourguide.com/las-vegas-l58/red-rock-canyon-and-the-whimsical-world-of-cactus-joe-s-t512424/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring"], interests:["adventure"], tier:"mid" },
  { id:44, name:"Gran Cañón + Presa Hoover", cat:"Tour", price:99, rating:4.8, reviews:3066, dur:"10.5 hrs", emoji:"🏔️", desc:"Dos maravillas naturales y de ingeniería en un solo día. Traslado incluido. El tour más reservado desde Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/vegas-grand-canyon-hoover-dam-lunchskywalk-options-wifi-t190065/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","work"], vibes:["luxury","adventure"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure","unique"], tier:"mid" },
  { id:46, name:"Tour Valle de Fuego", cat:"Tour", price:99, rating:4.8, reviews:572, dur:"6 hrs", emoji:"🔥", desc:"50 millas de roca roja ancestral. Traslado incluido. Petroglifos, silencio, Marte en la Tierra.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-small-group-valley-of-fire-tour-t356680/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","work","kids"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring","fall"], interests:["adventure","unique"], tier:"mid" },
  { id:48, name:"Parques Bryce + Zion", cat:"Tour", price:169, rating:4.7, reviews:1126, dur:"13 hrs", emoji:"🌲", desc:"Dos de los parques nacionales más espectaculares de América en un día. Traslado incluido. Hoodoos y arcos rojos.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-bryce-and-zion-national-parks-tour-with-lunch-t304518/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring","fall"], interests:["adventure","unique"], tier:"premium" },
  { id:49, name:"Death Valley — Atardecer y Estrellas", cat:"Tour", price:249, rating:4.9, reviews:242, dur:"12 hrs", emoji:"🌟", desc:"El punto más bajo de América del Norte al atardecer. Traslado incluido. Luego la Vía Láctea. Sin palabras.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-death-valley-rhyolite-ghost-town-private-tour-t430952/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","work"], vibes:["adventure"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["adventure","unique"], tier:"premium" },
  { id:53, name:"Antelope Canyon + Horseshoe Bend", cat:"Tour", price:189, rating:4.7, reviews:2104, dur:"15 hrs", emoji:"🏞️", desc:"El cañón de ranura más fotografiado del planeta, más Horseshoe Bend. Traslado incluido.", url:"https://www.getyourguide.com/las-vegas-l58/from-las-vegas-antelope-canyon-horseshoe-bend-tour-t404294/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family"], vibes:["adventure"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["adventure","unique"], tier:"premium" },
  { id:54, name:"Tour Área 51 — Día Completo", cat:"Tour", price:242, rating:4.8, reviews:252, dur:"10 hrs", emoji:"👽", desc:"La base clasificada. El buzón negro. Traslado incluido. Creas o no — esto da escalofríos.", url:"https://www.getyourguide.com/las-vegas-l58/area-51-tour-from-las-vegas-t47582/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family"], vibes:["dark","adventure","romantic"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["unique","adventure"], tier:"premium" },

  // VIDA NOCTURNA
  { id:11, name:"Club Crawl VIP + Barra Libre", cat:"Vida Nocturna", price:40, rating:4.9, reviews:40, dur:"5 hrs", emoji:"🥂", desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs del Strip. La noche que nunca termina.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-cocktail-class-party-bus-and-vip-club-entry-t1230903/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","bachelorette"], vibes:[], times:["night"], seasons:["winter","spring","summer","fall"], interests:["nightlife"], tier:"budget", girlsTrip:true },
  { id:24, name:"Bars Unknown — Bar Crawl", cat:"Vida Nocturna", price:54, rating:5.0, reviews:5, dur:"3 hrs", emoji:"🍸", desc:"Los bares escondidos del Strip. La mayoría de turistas los pasa de largo cada noche sin saberlo. Tú no.", url:"https://www.getyourguide.com/las-vegas-l58/bars-unknown-the-las-vegas-strip-bar-crawl-t708411/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","kids"], vibes:[], times:["night"], seasons:["winter","spring","summer","fall"], interests:["nightlife","unique"], tier:"budget", girlsTrip:true },
  { id:66, name:"Pool Party en Bus de Fiesta", cat:"Vida Nocturna", price:99, rating:4.5, reviews:110, dur:"5 hrs", emoji:"🏊", desc:"Bus de fiesta a una pool party de Vegas con bebidas gratis y entrada VIP. La experiencia definitiva del verano.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-pool-party-crawl-by-party-bus-t439815/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","work"], vibes:["luxury"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["nightlife"], tier:"mid", girlsTrip:true },
  { id:67, name:"Pool Party Crawl — 3 Paradas", cat:"Vida Nocturna", price:99, rating:4.5, reviews:110, dur:"5 hrs", emoji:"🎉", desc:"Bus de fiesta a 3 pool parties de Vegas en un día. Bebidas gratis, entrada VIP en cada parada.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-strip-3-stop-pool-party-crawl-with-party-bus-t384399/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["dark","adventure"], times:["morning","day"], seasons:["winter","spring","fall"], interests:["nightlife"], tier:"mid", girlsTrip:true },
  { id:56, name:"Limo + Champán + Club VIP", cat:"Vida Nocturna", price:499, rating:4.8, reviews:11, dur:"4 hrs", emoji:"🚘", desc:"Limusina stretch, champán en el camino, entrada VIP al club. La noche de despedida de soltera para la que Vegas fue construida.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-limo-tour-with-champagne-and-nightclub-entry-t981477/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["dark","adventure"], times:["day","night"], seasons:["winter","spring","fall"], interests:["nightlife"], tier:"luxury", girlsTrip:true },
  { id:74, name:"Strip Club Crawl + Barra Libre + Bus", cat:"Vida Nocturna", price:99, rating:4.7, reviews:150, dur:"4 hrs", emoji:"🍾", desc:"Bus de fiesta, barra libre y entrada VIP a los mejores clubs de Vegas. La noche de despedida de soltero para la que esta ciudad fue construida.", url:"https://www.getyourguide.com/las-vegas-l58/strip-club-crawl-open-bar-party-bus-t442598/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["luxury"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["nightlife"], tier:"mid", guysTrip:true },

  // LGBTQ
  { id:70, name:"Faaabulous! — Drag Brunch", cat:"Show", price:75, rating:4.9, reviews:150, dur:"2 hrs", emoji:"👑", desc:"El drag brunch más espectacular de Vegas. Batallas de lip sync, comedia, momentos con el público.", url:"https://vegas.vdvm.net/Gb06Em", provider:"VCO", tags:["solo","group"], vibes:["adventure"], times:["morning"], seasons:["spring"], interests:["show"], tier:"mid", lgbtq:true },
  { id:71, name:"Drag Brunch Las Vegas", cat:"Show", price:65, rating:4.8, reviews:120, dur:"2 hrs", emoji:"💅", desc:"Mimosas sin límite, drag queens y el brunch más divertido de tu vida. Reserva esencial.", url:"https://vegas.vdvm.net/n4ROgA", provider:"VCO", tags:["solo","couple","group"], vibes:["dark"], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid", lgbtq:true },
  { id:72, name:"RuPaul's Drag Race LIVE!", cat:"Show", price:99, rating:4.9, reviews:800, dur:"1.5 hrs", emoji:"🏆", desc:"Las reinas de RuPaul's Drag Race, en vivo en el Strip de Vegas. Icónico. Imperdible.", url:"https://vegas.vdvm.net/QYNqGY", provider:"VCO", tags:["solo","couple","group"], vibes:[], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid", lgbtq:true },
  { id:73, name:"Drag Your Sass — Hamburger Mary's", cat:"Show", price:55, rating:4.8, reviews:90, dur:"2 hrs", emoji:"🍔", desc:"El legendario drag brunch de Hamburger Mary's. Escandaloso, gracioso e inclusivo.", url:"https://vegas.vdvm.net/B5zWG9", provider:"VCO", tags:["solo","couple","group"], vibes:[], times:["morning","day"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"budget", lgbtq:true },
  { id:68, name:"EDC Las Vegas 2026", cat:"Festival", price:350, rating:4.9, reviews:500, dur:"3 noches", emoji:"🎡", desc:"Electric Daisy Carnival — el festival de EDM más icónico del mundo. Las Vegas Motor Speedway. Tres noches de libertad total.", url:"https://vegas.vdvm.net/L0xvKL", provider:"VCO", tags:["solo","couple","group","bachelorette"], vibes:["adventure"], times:["night"], seasons:["spring","summer"], interests:["show","nightlife"], tier:"luxury", lgbtq:true },

  // DEPORTES
  { id:75, name:"Circa Sportsbook — El Más Grande", cat:"Deportes", price:0, rating:4.9, reviews:300, dur:"Cualquier hora", emoji:"🏆", desc:"El sportsbook más grande del mundo. 4 pisos, 350 pantallas, asientos de estadio. Ve cualquier partido como en ningún otro lugar.", url:"https://vegas.vdvm.net/jRnEoP", provider:"VCO", tags:["solo","couple","group"], vibes:[], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["sports","unique"], tier:"budget", guysTrip:true },
  { id:77, name:"Vegas Golden Knights — NHL", cat:"Deportes", price:80, rating:4.9, reviews:500, dur:"3 hrs", emoji:"🏒", desc:"T-Mobile Arena. El equipo que convirtió Vegas en una ciudad deportiva real. La atmósfera más eléctrica de la NHL.", url:"https://vegas.vdvm.net/YVq55P", provider:"VCO", tags:["solo","couple","group","work"], vibes:["casino"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["sports"], tier:"mid", guysTrip:true },
  { id:78, name:"Las Vegas Aces — WNBA", cat:"Deportes", price:40, rating:4.8, reviews:200, dur:"2.5 hrs", emoji:"🏀", desc:"Campeonas consecutivas de la WNBA. Michelob Ultra Arena. El baloncesto femenino más emocionante del mundo.", url:"https://vegas.vdvm.net/xJ2xx1", provider:"VCO", tags:["solo","group","work"], vibes:["casino"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["sports"], tier:"budget", girlsTrip:true },
  { id:79, name:"Las Vegas Aviators — Béisbol", cat:"Deportes", price:20, rating:4.7, reviews:150, dur:"3 hrs", emoji:"⚾", desc:"Béisbol Triple-A en Las Vegas Ballpark. Económico, divertido para todas las edades. La mejor experiencia deportiva familiar.", url:"https://vegas.vdvm.net/PzrLLe", provider:"VCO", tags:["solo","couple","group","family","work"], vibes:["adventure"], times:["day","night"], seasons:["winter","spring","fall"], interests:["sports"], tier:"budget" },

  // ROMÁNTICO
  { id:57, name:"Boda Elvis — Graceland Chapel", cat:"Romántico", price:324, rating:4.9, reviews:331, dur:"1.5 hrs", emoji:"💍", desc:"La Graceland Wedding Chapel. Elvis oficia la ceremonia. Completamente legal. Completamente Vegas.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-traditional-wedding-or-vow-renewal-t437514/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple"], vibes:["luxury","romantic"], times:["morning","day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"luxury" },
  { id:60, name:"Boda en Helicóptero sobre el Strip", cat:"Romántico", price:1350, rating:5.0, reviews:2, dur:"2 hrs", emoji:"💒", desc:"Cásate en un helicóptero sobre el Strip de Las Vegas de noche. Lo más Vegas posible.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-night-strip-helicopter-wedding-ceremony-package-t774621/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","work"], vibes:["luxury","adventure","romantic"], times:["night"], seasons:["winter","spring","fall"], interests:["unique"], tier:"luxury" },
  { id:92, name:"Boda Elvis + Limusina", cat:"Romántico", price:549, rating:5.0, reviews:23, dur:"2 hrs", emoji:"🚘", desc:"Cásate con Elvis y luego escápate en una limusina stretch. El momento más Vegas de tu luna de miel.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-elvis-themed-wedding-with-limousine-t844123/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple","group","bachelorette"], vibes:["luxury"], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"luxury" },

  // BIENESTAR
  { id:61, name:"Spa Day — Four Seasons", cat:"Bienestar", price:150, rating:4.9, reviews:50, dur:"Todo el día", emoji:"💆", desc:"Forbes 5 estrellas. Piscinas minerales, terapeutas expertos, silencio total. El reset que Vegas realmente puede darte.", url:"https://vegas.vdvm.net/JkL7PE", provider:"VCO", tags:["solo","couple","work"], vibes:["luxury","romantic"], times:["morning"], seasons:["winter","spring","summer","fall"], interests:["wellness","unique"], tier:"premium", girlsTrip:true },
  { id:62, name:"Canyon Ranch Spa — The Venetian", cat:"Bienestar", price:120, rating:4.8, reviews:200, dur:"Medio día", emoji:"🧖", desc:"La marca de spa más famosa del mundo, dentro de The Venetian. Masajes, fitness, transformación completa.", url:"https://vegas.vdvm.net/xJ2YMv", provider:"VCO", tags:["couple"], vibes:["luxury","romantic"], times:["morning"], seasons:["winter","spring","summer","fall"], interests:["wellness","unique"], tier:"premium", girlsTrip:true },
  { id:64, name:"Vdara Spa & Salon", cat:"Bienestar", price:80, rating:4.7, reviews:100, dur:"Medio día", emoji:"🛁", desc:"Sin casino. Sin ruido. Solo un spa de clase mundial en el hotel más tranquilo del Strip.", url:"https://vegas.vdvm.net/6kPmjG", provider:"VCO", tags:["solo","couple","bachelorette","work"], vibes:["luxury","romantic"], times:["morning"], seasons:["winter","spring","summer","fall"], interests:["wellness","unique"], tier:"mid" },

  // FOTOGRAFÍA / EXPERIENCIAS
  { id:55, name:"Fotógrafo Personal de Viaje", cat:"Experiencia", price:304, rating:4.8, reviews:39, dur:"1-3 hrs", emoji:"📸", desc:"Un fotógrafo de viaje profesional. Todo tu viaje documentado. Vale cada centavo.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-personal-travel-vacation-photographer-t129907/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group"], vibes:["adventure","romantic"], times:["morning","day","night"], seasons:["spring","fall"], interests:["unique"], tier:"luxury", girlsTrip:true },
  { id:93, name:"Tour Arts District en Limo + Cena", cat:"Experiencia", price:199, rating:4.3, reviews:10, dur:"4 hrs", emoji:"🎨", desc:"Limusina stretch por el Arts District con cena incluida. El lado creativo de Vegas, con estilo.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-arts-district-tour-with-limo-ride-bubbly-meal-t844124/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["couple","bachelorette","group"], vibes:["luxury"], times:["day","night"], seasons:["spring","summer","fall","winter"], interests:["unique"], tier:"premium", girlsTrip:true },
  { id:26, name:"Hop-On Hop-Off — Bus Turístico", cat:"Tour", price:58, rating:4.3, reviews:907, dur:"24 hrs", emoji:"🚌", desc:"Recorre cada rincón del Strip a tu propio ritmo. El mejor amigo del que visita Vegas por primera vez.", url:"https://www.getyourguide.com/las-vegas-l58/las-vegas-24-or-48-hour-hop-on-hop-off-tour-t61878/?partner_id=FIT427X&utm_medium=online_publisher", provider:"GYG", tags:["solo","couple","group","family","work","kids"], vibes:["luxury","romantic","first-timer"], times:["morning","day","night"], seasons:["winter","spring","summer","fall"], interests:["unique"], tier:"budget" },

  // CONCIERTOS Y TIEMPO LIMITADO
  { id:86, name:"BTS — En Vivo en Las Vegas", cat:"Concierto", price:101, rating:4.9, reviews:200, dur:"2.5 hrs", emoji:"💜", desc:"BTS en vivo en Allegiant Stadium. Shows 23, 24, 27 y 28 de mayo. El evento K-pop más grande del año.", url:"https://vegas.vdvm.net/m4XeGa", provider:"VCO", tags:["solo","group","family"], vibes:["adventure"], times:["night"], seasons:["fall"], interests:["show"], tier:"mid", girlsTrip:true, lgbtq:true, limitedTime:"23–28 mayo 2026" },
  { id:88, name:"New Kids on the Block", cat:"Concierto", price:69, rating:4.9, reviews:23, dur:"2.5 hrs", emoji:"🎤", desc:"De vuelta al escenario en Park MGM. Los chicos vuelven — y Vegas es su escenario.", url:"https://vegas.vdvm.net/B5z74y", provider:"VCO", tags:["solo","group"], vibes:["adventure"], times:["night"], seasons:["fall"], interests:["show"], tier:"mid", girlsTrip:true, limitedTime:"Hasta 3 jul" },
  { id:89, name:"Ed Sheeran — Allegiant Stadium", cat:"Concierto", price:87, rating:4.8, reviews:50, dur:"2.5 hrs", emoji:"🎸", desc:"Ed Sheeran en vivo en Allegiant Stadium. Uno de los artistas de gira más grandes del mundo — aquí en Vegas.", url:"https://vegas.vdvm.net/k4aYxL", provider:"VCO", tags:["solo","couple","group","work"], vibes:["luxury","adventure"], times:["night"], seasons:["fall"], interests:["show"], tier:"mid", girlsTrip:true, limitedTime:"Hasta 17 jul" },
  { id:85, name:"Formula 1 Gran Premio Las Vegas", cat:"Deportes", price:500, rating:4.9, reviews:300, dur:"Todo el día", emoji:"🏎️", desc:"F1 en el Strip de Las Vegas de noche. El evento deportivo más espectacular del mundo — aquí mismo.", url:"https://vegas.vdvm.net/dy9xyW", provider:"VCO", tags:["group","family","kids"], vibes:["adventure"], times:["day","night"], seasons:["summer"], interests:["sports","adventure"], tier:"luxury", guysTrip:true, limitedTime:"Hasta 21 nov" },
  { id:90, name:"Scorpions — Planet Hollywood", cat:"Concierto", price:91, rating:4.6, reviews:44, dur:"2 hrs", emoji:"🦂", desc:"Leyendas del rock en Planet Hollywood. La residencia de los Scorpions — una noche de lista de deseos para fans del rock.", url:"https://vegas.vdvm.net/Pzr7P6", provider:"VCO", tags:["solo","couple","group","work"], vibes:["luxury","adventure"], times:["night"], seasons:["winter","spring","summer","fall"], interests:["show"], tier:"mid", guysTrip:true, limitedTime:"Hasta 2 oct" },
  { id:2, name:"Atomic Golf — Golf en Azotea", cat:"Entretenimiento", price:22, rating:0, reviews:0, dur:"2 hrs", emoji:"⛳", desc:"Complejo de entretenimiento en azotea con bahías de golf, comida y cócteles artesanales. Vegas reinventó el deporte.", url:"https://vegas.vdvm.net/dy9YAq", provider:"VCO", tags:["solo","couple","group"], vibes:[], times:["day","night"], seasons:["winter","spring","summer","fall"], interests:["unique","nightlife"], tier:"budget", isNew:true },
];

const FREE_EXPERIENCES = [
  { id:"f1", name:"Fuentes del Bellagio de Noche", loc:"Hotel Bellagio", time:"Después de las 8pm", emoji:"⛲", desc:"Cada 15-30 minutos después del anochecer. 1,000 chorros de agua coreografiados con música. Gratis. Imperdible.", url:"https://vegas.vdvm.net/oq11jb" },
  { id:"f3", name:"Fremont Street — Espectáculo LED", loc:"Downtown Vegas", time:"Al anochecer", emoji:"💡", desc:"Un techo de LED de 460 metros con shows gratis cada hora. El Vegas que el Strip no quiere que conozcas.", url:"https://vegas.vdvm.net/9gR3A3" },
  { id:"f5", name:"Grand Canal Shoppes — The Venetian", loc:"The Venetian", time:"Cualquier hora", emoji:"🛶", desc:"Venecia recreada dentro de un hotel. Camínalo gratis. Observa las góndolas gratis. Funciona.", url:"https://vegas.vdvm.net/MmJJG3" },
  { id:"f10", name:"Cartel de Bienvenida a Las Vegas", loc:"Sur del Strip", time:"Hora dorada", emoji:"📸", desc:"La foto. La hora dorada lo hace trascendente. Llega 30 minutos antes del atardecer.", url:"https://vegas.vdvm.net/DKPrk2" },
  { id:"f6", name:"Pinball Hall of Fame", loc:"Sur del Strip", time:"Cualquier hora", emoji:"🎮", desc:"Más de 500 máquinas vintage desde los años 50. Todas jugables por monedas. Entrada completamente gratis.", url:"https://vegas.vdvm.net/WqnZa3", tags:["budget"] },
  { id:"f2", name:"Jardín Conservatorio del Bellagio", loc:"Hotel Bellagio", time:"Cualquier hora", emoji:"🌸", desc:"Un jardín interior de 1,300 m² que cambia 5 veces al año. Actualmente la habitación más hermosa de Vegas.", url:"https://vegas.vdvm.net/Org2RN" },
  { id:"f9", name:"Caída de la Atlántida — Caesars", loc:"Forum Shops", time:"Cada hora", emoji:"🏛️", desc:"Un show animatrónico gratuito dentro de los Forum Shops de Caesars. Sorprendentemente espectacular.", url:"https://vegas.vdvm.net/g1jjyO", tags:["budget"] },
  { id:"f4", name:"Hábitat de Flamencos — Flamingo", loc:"Hotel Flamingo", time:"Por la mañana", emoji:"🦩", desc:"Flamencos reales viviendo dentro de un resort casino. Gratis. Ideal para familias — surrealista a las 8am.", tags:["family","kids"], url:"https://vegas.vdvm.net/6eOKEq" },
  { id:"f7", name:"M&M's World Las Vegas", loc:"Las Vegas Blvd", time:"Cualquier hora", emoji:"🍬", desc:"4 pisos de caos de chocolate. Entrada gratis. La tienda de M&M's más grande del mundo.", url:"https://vegas.vdvm.net/JzGaLE", tags:["family","kids"] },
  { id:"f8", name:"Hershey's Chocolate World", loc:"New York-New York", time:"Cualquier hora", emoji:"🍫", desc:"Dentro de un casino. Una experiencia Hershey's gigante — gratis para pasear, opcional para comprar.", url:"https://vegas.vdvm.net/rQZ9R5", tags:["family","kids"] },
];

// ─── PREGUNTAS ────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:"tripType", question:"¿Con quién vas a Las Vegas?", subtitle:"Esto define toda tu experiencia", cols:3, multi:false,
    options:[
      {v:"solo",label:"Solo/a",emoji:"🕶️",desc:"Yo solo/a — cero compromisos"},
      {v:"couple",label:"En Pareja",emoji:"❤️",desc:"Creando recuerdos juntos"},
      {v:"group",label:"El Grupo",emoji:"🥂",desc:"Cuantos más, mejor"},
      {v:"family",label:"Viaje Familiar",emoji:"👨‍👩‍👧",desc:"Diversión para todos"},
      {v:"bachelorette",label:"Despedida de Soltera/o",emoji:"👰",desc:"La última noche de libertad"},
      {v:"work",label:"Viaje de Trabajo",emoji:"💼",desc:"Por negocios, me quedo por Vegas"},
    ]},
  { id:"groupGender", question:"¿Cómo es tu grupo?", subtitle:"Nos ayuda a personalizar tu experiencia", cols:2, multi:false,
    familyVersion: true,
    options:[
      {v:"girls",label:"Chicas / Mujeres",emoji:"👯‍♀️",desc:"Noche de chicas — esta ciudad es nuestra"},
      {v:"guys",label:"Chicos / Hombres",emoji:"🤙",desc:"Viaje de chicos — sin reglas"},
      {v:"lgbtq",label:"LGBTQ+",emoji:"🏳️‍🌈",desc:"Orgullosos y listos para Vegas"},
      {v:"mixed",label:"Grupo Mixto",emoji:"👫",desc:"Todos juntos — todos bienvenidos"},
    ],
    coupleOptions:[
      {v:"mixed",label:"Hombre y Mujer",emoji:"👫",desc:"Pareja clásica — Vegas es tuya"},
      {v:"lgbtq",label:"LGBTQ+",emoji:"🏳️‍🌈",desc:"Orgullosos y listos para Vegas"},
    ],
    soloOptions:[
      {v:"girls",label:"Mujer",emoji:"👩",desc:"Viajando sola como mujer"},
      {v:"guys",label:"Hombre",emoji:"👨",desc:"Viajando solo como hombre"},
      {v:"lgbtq",label:"LGBTQ+",emoji:"🏳️‍🌈",desc:"Orgulloso/a y listo/a para Vegas"},
    ],
    familyOptions:[
      {v:"under6",label:"Pequeños",emoji:"🧸",desc:"Menos de 6 años — animales, atracciones y diversión fácil"},
      {v:"kids",label:"Niños",emoji:"🧒",desc:"6-12 años — aventuras y descubrimiento"},
      {v:"teens",label:"Adolescentes",emoji:"🧑",desc:"13-17 años — adrenalina y experiencias cool"},
      {v:"mixedages",label:"Edades Mixtas",emoji:"👨‍👩‍👧‍👦",desc:"Diferentes edades — algo para todos"},
    ]},
  { id:"vibe", question:"¿Cuál es tu vibra en Vegas?", subtitle:"Elige hasta 2 — tu itinerario cubre ambas", cols:3, multi:true, max:2,
    options:[
      {v:"dark",label:"Oscuro y Misterioso",emoji:"🌑",desc:"Tours de fantasmas, bares ocultos y el lado oscuro de Vegas"},
      {v:"luxury",label:"Lujo Total",emoji:"💎",desc:"Solo lo mejor, siempre"},
      {v:"adventure",label:"Buscador de Emociones",emoji:"⚡",desc:"Adrenalina y velocidad"},
      {v:"casino",label:"Casino y Apuestas",emoji:"🎲",desc:"El juego dentro del juego"},
      {v:"nightout",label:"Noche de Fiesta",emoji:"🥃",desc:"Clubs, shows y sin reglas"},
      {v:"first-timer",label:"Primera Vez en Vegas",emoji:"🎰",desc:"Lo icónico, hecho a la perfección"},
    ],
    lgbtqOptions:[
      {v:"dark",label:"Oscuro y Misterioso",emoji:"🌑",desc:"Tours de fantasmas, bares ocultos y el lado oscuro de Vegas"},
      {v:"luxury",label:"Lujo Total",emoji:"💎",desc:"Solo lo mejor, siempre"},
      {v:"adventure",label:"Buscador de Emociones",emoji:"⚡",desc:"Adrenalina y velocidad"},
      {v:"casino",label:"Apuestas y Deportes",emoji:"🎲",desc:"Sportsbooks, partidos en vivo y acción en el casino"},
      {v:"nightout",label:"Noche Salvaje",emoji:"🥂",desc:"Clubs, shows y sin reglas"},
      {v:"first-timer",label:"Primera Vez en Vegas",emoji:"🎰",desc:"Lo icónico, hecho a la perfección"},
    ],
    familyMulti: true, familyMax: 2,
    familyOptions:[
      {v:"thrill",label:"Aventura y Emociones",emoji:"⚡",desc:"Atracciones, ATV y adrenalina al aire libre"},
      {v:"show",label:"Shows y Entretenimiento",emoji:"🎭",desc:"Cirque, magia y shows en vivo"},
      {v:"explore",label:"Explorar y Descubrir",emoji:"🔭",desc:"Parques, museos y nuevas experiencias"},
      {v:"relaxed",label:"Relajado y Tranquilo",emoji:"😎",desc:"Diversión sin agotarse"},
    ],
    girlsOptions:[
      {v:"girlswild",label:"Noche Salvaje",emoji:"🥂",desc:"Clubs, shows y sin reglas"},
      {v:"girlsspa",label:"Mimar y Relajar",emoji:"💆",desc:"Días de spa y experiencias de lujo"},
      {v:"girlsadventure",label:"Chicas Aventureras",emoji:"⚡",desc:"Emociones, aire libre y adrenalina"},
      {v:"girlsmix",label:"Mezcla de Todo",emoji:"🔥",desc:"Un poco de todo"},
    ],
    guysOptions:[
      {v:"dark",label:"Oscuro y Misterioso",emoji:"🌑",desc:"Tours de fantasmas, bares ocultos y el lado oscuro de Vegas"},
      {v:"adventure",label:"Buscador de Emociones",emoji:"⚡",desc:"Adrenalina y velocidad"},
      {v:"casino",label:"Apuestas y Deportes",emoji:"🎲",desc:"Sportsbooks, partidos en vivo y acción en el casino"},
      {v:"nightout",label:"Noche de Fiesta",emoji:"🥃",desc:"Clubs, shows y sin reglas"},
      {v:"first-timer",label:"Primera Vez en Vegas",emoji:"🎰",desc:"Lo icónico, hecho a la perfección"},
    ]},
  { id:"interest", question:"¿Qué te llama de Las Vegas?", subtitle:"", cols:2, multi:true, max:3,
    options:[
      {v:"show",label:"Shows y Entretenimiento",emoji:"🎭",desc:"Cirque, Sphere, conciertos y tributos"},
      {v:"nightlife",label:"Noches Salvajes",emoji:"🥂",desc:"Clubs, bar crawls y pool parties"},
      {v:"nature",label:"Naturaleza y Parques",emoji:"🏜️",desc:"Gran Cañón, desiertos y aire libre"},
      {v:"wellness",label:"Spa y Bienestar",emoji:"💆",desc:"Descanso, reset y días de spa de lujo"},
      {v:"unique",label:"Joyas Únicas y Ocultas",emoji:"🔮",desc:"Cosas que solo son posibles en Vegas"},
      {v:"sports",label:"Deportes y Acción",emoji:"🏆",desc:"Partidos en vivo y sportsbooks"},
      {v:"adventure",label:"Aventura y Adrenalina",emoji:"⚡",desc:"ATV, helicóptero y adrenalina"},
      {v:"luxury",label:"Lujo Total",emoji:"💎",desc:"Solo lo mejor — sin compromisos"},
    ]},
  { id:"season", question:"¿Cuándo vas a visitar?", subtitle:"Vegas se transforma completamente con cada estación", cols:2, multi:false,
    options:[
      {v:"winter",label:"Invierno",emoji:"❄️",desc:"Dic – Feb · 2°C a 14°C · Noches frescas, nieve en Monte Charleston"},
      {v:"spring",label:"Primavera",emoji:"🌸",desc:"Mar – May · 10°C a 28°C · Clima perfecto"},
      {v:"summer",label:"Verano",emoji:"☀️",desc:"Jun – Sep · 25°C a 42°C · Calor extremo, pool parties"},
      {v:"fall",label:"Otoño",emoji:"🍂",desc:"Oct – Nov · 8°C a 25°C · Clima dorado"},
    ]},
  { id:"days", question:"¿Cuántos días te quedas?", subtitle:"Ajustaremos tu itinerario a la perfección", cols:2, multi:false,
    options:[
      {v:"1-2",label:"1-2 Días",emoji:"⚡",desc:"Rápido — solo lo mejor"},
      {v:"3-4",label:"3-4 Días",emoji:"🎯",desc:"El viaje clásico a Vegas"},
      {v:"5-7",label:"5-7 Días",emoji:"🗺️",desc:"Inmersión profunda en todo"},
      {v:"1week",label:"1 Semana+",emoji:"👑",desc:"Inmersión total"},
    ]},
  { id:"timeOfDay", question:"¿Cuándo eres más tú?", subtitle:"Tu ritmo define el itinerario perfecto", cols:2, multi:false,
    options:[
      {v:"morning",label:"Madrugador/a",emoji:"🌅",desc:"Levanto al amanecer — las mañanas son mi momento"},
      {v:"night",label:"Noctámbulo/a",emoji:"🌙",desc:"Me activo después del anochecer"},
      {v:"day",label:"Explorador/a de Tarde",emoji:"☀️",desc:"Las tardes son mi punto dulce"},
      {v:"allday",label:"A Todas Horas",emoji:"🔥",desc:"Duermo cuando vuelva a casa"},
    ]},
  { id:"budget", question:"¿Presupuesto por experiencia?", subtitle:"Por persona · Sin juicios — solo mejores elecciones", cols:2, multi:false,
    options:[
      {v:"budget",label:"Menos de $75",emoji:"🎰",desc:"Elecciones inteligentes, máximo impacto"},
      {v:"mid",label:"$75 – $150",emoji:"🃏",desc:"El punto dulce de la calidad"},
      {v:"high",label:"$150 – $250",emoji:"🥃",desc:"Premium — vale cada dólar"},
      {v:"vip",label:"$250+",emoji:"👑",desc:"VIP. Sin preguntas."},
    ]},
];

// ─── LÓGICA DE FILTRADO ───────────────────────────────────────────────────
function getMaxCards(days) {
  return {["1-2"]:6,["3-4"]:8,["5-7"]:14,["1week"]:16}[days]||8;
}

function filterExperiences(ans) {
  const interests = Array.isArray(ans.interest) ? ans.interest : [ans.interest].filter(Boolean);
  const isGirlsTrip = ans.groupGender === "girls" || ans.tripType === "bachelorette";
  const isGuysTrip = ans.groupGender === "guys";
  const isLGBTQ = ans.groupGender === "lgbtq";
  const kidsAge = ans.groupGender;

  const UNDER6_IDS  = [26,17,24,25,4,7,10];
  const KIDS6_IDS   = [5,4,7,38,17,26];
  const TEENS_IDS   = [5,38,1,47,42,40,4,21,43];
  const maxCards = getMaxCards(ans.days);
  const wantsNature = interests.includes("nature");
  const wantsWellness = interests.includes("wellness");
  const wantsNightlife = interests.includes("nightlife");
  const wantsSports = interests.includes("sports");
  const wantsAdventure = interests.includes("adventure");
  const wantsLuxury = interests.includes("luxury");
  const SPORTS_IDS = [75,76,77,78,79,80,45,82,83,84,85];

  const budgetMatch = (price) => {
    if(price===0) return true;
    if(ans.budget==="budget") return price<=75;
    if(ans.budget==="mid") return price<=150;
    if(ans.budget==="high") return price<=250;
    return true;
  };

  const NATURE_IDS = [40,41,43,44,46,47,48,49,50,51,53,54,58,65];
  const WELLNESS_IDS = [61,62,63,64];
  const NIGHTLIFE_IDS = [11,14,24,30,31,35,66,67];
  const SPHERE_ID = 38;
  const GIRLS_IDS = [18,30,31,35,56,61,62,63];
  const GUYS_IDS = [8,14,21,47,40,42,11,66,67,36,74];
  const LGBTQ_IDS = [68,69,70,71,72,73];

  const scored = PAID.map(exp => {
    let s=0;
    const vibes = Array.isArray(ans.vibe) ? ans.vibe : [ans.vibe].filter(Boolean);
    vibes.forEach(v => {
      if(v==="nightout") { if(exp.interests?.includes("nightlife")||exp.tags.includes("nightlife")) s+=4; }
      else if(v==="casino") {
        if(exp.interests?.includes("sports")||SPORTS_IDS.includes(exp.id)) s+=4;
        if(exp.vibes?.includes("casino")) s+=4;
      }
      else if(exp.vibes.includes(v)) s+=4;
    });

    if(isGirlsTrip) {
      if(vibes.includes("girlswild") && [30,31,35,11,56,14,8,66,67].includes(exp.id)) s+=5;
      if(vibes.includes("girlsspa") && WELLNESS_IDS.includes(exp.id)) s+=6;
      if(vibes.includes("girlsspa") && [62,63,61,64].includes(exp.id)) s+=4;
      if(vibes.includes("girlsadventure") && exp.tags.includes("adventure")) s+=4;
      if(vibes.includes("girlsadventure") && [45,50,58].includes(exp.id)) s+=3;
      if(vibes.includes("girlsmix") && exp.girlsTrip) s+=3;
    }

    if(isGuysTrip && ans.tripType==="solo") {
      if(vibes.includes("nightout") && [74,11,24,66,67].includes(exp.id)) s+=5;
      if(vibes.includes("casino") && (SPORTS_IDS.includes(exp.id)||exp.vibes?.includes("casino"))) s+=5;
      if(vibes.includes("adventure") && exp.tags.includes("adventure")) s+=3;
      if(vibes.includes("dark") && exp.vibes?.includes("dark")) s+=3;
    }

    if(ans.tripType==="family") {
      if(vibes.includes("thrill") && TEENS_IDS.includes(exp.id)) s+=4;
      if(vibes.includes("thrill") && exp.tags.includes("adventure")) s+=3;
      if(vibes.includes("show") && exp.tags.includes("family")) s+=4;
      if(vibes.includes("show") && exp.interests?.includes("show")) s+=3;
      if(vibes.includes("explore") && (exp.tags.includes("family")||NATURE_IDS.includes(exp.id)||exp.cat==="Cultura")) s+=4;
      if(vibes.includes("relaxed") && [1,18,26,7,10,6,2,3].includes(exp.id)) s+=4;
      if(vibes.includes("relaxed") && exp.price<=60) s+=2;
    }
    if(ans.tripType && exp.tags.includes(ans.tripType)) s+=3;

    if(isGirlsTrip && exp.girlsTrip) s+=5;
    if(isGirlsTrip && GIRLS_IDS.includes(exp.id)) s+=3;
    if(isGuysTrip && exp.guysTrip) s+=5;
    if(isGuysTrip && GUYS_IDS.includes(exp.id)) s+=3;
    if(isLGBTQ && exp.lgbtq) s+=6;
    if(isLGBTQ && LGBTQ_IDS.includes(exp.id)) s+=4;

    if(ans.tripType==="family") {
      if(kidsAge==="under6" && UNDER6_IDS.includes(exp.id)) s+=6;
      if(kidsAge==="under6" && !UNDER6_IDS.includes(exp.id) && !exp.tags.includes("family")) s-=4;
      if(kidsAge==="kids" && KIDS6_IDS.includes(exp.id)) s+=6;
      if(kidsAge==="kids" && !KIDS6_IDS.includes(exp.id) && !exp.tags.includes("family")) s-=3;
      if(kidsAge==="teens" && TEENS_IDS.includes(exp.id)) s+=6;
      if(kidsAge==="mixedages" && exp.tags.includes("family")) s+=4;
      if([8,14,27,30,31,35,56,74,68,69,70,71,72,73].includes(exp.id)) s-=8;
    }

    if(isGuysTrip && [70,71,72,73].includes(exp.id)) s-=6;
    if(!isLGBTQ && [68,69,70,71,72,73].includes(exp.id)) s-=5;
    if(isGirlsTrip && [74].includes(exp.id)) s-=4;

    const isBachelorette = ans.tripType === "bachelorette";
    if(!isGirlsTrip && !isBachelorette && [31,35].includes(exp.id)) s-=8;
    if(isGirlsTrip && [8,27,29].includes(exp.id)) s-=8;
    if(isBachelorette && [8,27,29].includes(exp.id)) s-=8;

    const isLuxuryBudget = ans.budget === "vip" || ans.budget === "high";
    if(isLuxuryBudget) {
      if([26].includes(exp.id)) s-=15;
      if([33].includes(exp.id)) s-=15;
      if([44].includes(exp.id)) s-=12;
      if([1,6].includes(exp.id)) s-=8;
      if([58].includes(exp.id)) s+=10;
    }

    interests.forEach(i=>{
      if(exp.interests&&exp.interests.includes(i)) s+=3;
      if(exp.tags.includes(i)) s+=2;
    });

    if(wantsNature && NATURE_IDS.includes(exp.id)) s+=4;
    if(wantsNature && !NATURE_IDS.includes(exp.id) && !exp.vibes.includes("adventure")) s-=2;
    if(wantsWellness && WELLNESS_IDS.includes(exp.id)) s+=4;
    if(wantsNightlife && NIGHTLIFE_IDS.includes(exp.id)) s+=3;
    if(wantsSports && SPORTS_IDS.includes(exp.id)) s+=5;
    if(!wantsSports && SPORTS_IDS.includes(exp.id) && !exp.tags.includes(ans.tripType)) s-=2;
    if(wantsAdventure && exp.tags.includes("adventure")) s+=3;
    if(wantsAdventure && NATURE_IDS.includes(exp.id)) s+=2;
    if(wantsLuxury && exp.vibes.includes("luxury")) s+=4;
    if(wantsLuxury && exp.tier==="luxury") s+=3;
    if(exp.id===SPHERE_ID && budgetMatch(exp.price)) s+=3;
    if(ans.timeOfDay && exp.times.includes(ans.timeOfDay)) s+=2;
    if(ans.season && exp.seasons.includes(ans.season)) s+=2;
    if(budgetMatch(exp.price)) s+=3;
    else s-=2;
    if(ans.timeOfDay!=="allday" && !exp.times.includes(ans.timeOfDay)) s-=3;
    return {...exp,score:s};
  }).sort((a,b)=>b.score-a.score);

  const SPA_IDS = [61,62,63,64];
  const MALE_REVUE_IDS = [31,35];
  const FEMALE_REVUE_IDS = [8,27,29];
  const DRAG_IDS = [70,71,72,73];
  const TOUR_IDS = [19,26,32,36,40,41,43,44,45,46,47,48,49,50,51,53,54,58,65,93];
  const NIGHTLIFE_CAT_IDS = [11, 24, 56, 66, 67];
  const STRIP_CLUB_IDS = [74];
  const GRAND_CANYON_IDS = [44, 45, 58];
  const WEDDING_IDS = [57, 60, 92];

  const result=[]; const used=new Set();
  const dayPairs = {["1-2"]:3,["3-4"]:4,["5-7"]:7,["1week"]:8}[ans.days]||4;
  const minTours = (ans.days==="5-7"||ans.days==="1week") ? 4 : 0;

  const state = { spaAdded:false, maleRevueAdded:false, femaleRevueAdded:false, dragAdded:false, toursAdded:0, nightlifeAdded:false, adultShowAdded:false, stripClubAdded:false, grandCanyonAdded:false, weddingAdded:false };

  const canAdd = (exp) => {
    if(used.has(exp.id)) return false;
    if(!budgetMatch(exp.price)) return false;
    if(SPA_IDS.includes(exp.id) && state.spaAdded) return false;
    if(MALE_REVUE_IDS.includes(exp.id) && state.maleRevueAdded) return false;
    if(FEMALE_REVUE_IDS.includes(exp.id) && state.femaleRevueAdded) return false;
    if(DRAG_IDS.includes(exp.id) && state.dragAdded) return false;
    if(NIGHTLIFE_CAT_IDS.includes(exp.id) && state.nightlifeAdded) return false;
    if(STRIP_CLUB_IDS.includes(exp.id) && state.stripClubAdded) return false;
    if(GRAND_CANYON_IDS.includes(exp.id) && state.grandCanyonAdded) return false;
    if(WEDDING_IDS.includes(exp.id) && state.weddingAdded) return false;
    return true;
  };

  const trackAdded = (exp) => {
    used.add(exp.id);
    if(SPA_IDS.includes(exp.id)) state.spaAdded = true;
    if(MALE_REVUE_IDS.includes(exp.id)) state.maleRevueAdded = true;
    if(FEMALE_REVUE_IDS.includes(exp.id)) state.femaleRevueAdded = true;
    if(DRAG_IDS.includes(exp.id)) state.dragAdded = true;
    if(NIGHTLIFE_CAT_IDS.includes(exp.id)) state.nightlifeAdded = true;
    if(STRIP_CLUB_IDS.includes(exp.id)) state.stripClubAdded = true;
    if(GRAND_CANYON_IDS.includes(exp.id)) state.grandCanyonAdded = true;
    if(WEDDING_IDS.includes(exp.id)) state.weddingAdded = true;
    if(TOUR_IDS.includes(exp.id)) state.toursAdded++;
  };

  const dayScored = scored.filter(e=>
    (e.times.includes("morning")||e.times.includes("day")) && budgetMatch(e.price)
  );
  const nightScored = scored.filter(e=>
    e.times.includes("night") && budgetMatch(e.price)
  );

  let dayIdx=0, nightIdx=0;
  for(let i=0; i<dayPairs; i++){
    while(dayIdx<dayScored.length && !canAdd(dayScored[dayIdx])) dayIdx++;
    if(dayIdx<dayScored.length){ trackAdded(dayScored[dayIdx]); result.push({...dayScored[dayIdx], timeSlot:"day"}); dayIdx++; }
    while(nightIdx<nightScored.length && !canAdd(nightScored[nightIdx])) nightIdx++;
    if(nightIdx<nightScored.length){ trackAdded(nightScored[nightIdx]); result.push({...nightScored[nightIdx], timeSlot:"night"}); nightIdx++; }
  }

  if(minTours > 0 && state.toursAdded < minTours) {
    const tourCandidates = scored.filter(e=>TOUR_IDS.includes(e.id)&&!used.has(e.id)&&budgetMatch(e.price));
    let added = 0;
    for(const tour of tourCandidates) {
      if(state.toursAdded + added >= minTours) break;
      const lastNight = result.findIndex(e=>e.timeSlot==="night"&&!TOUR_IDS.includes(e.id));
      if(lastNight>=0) { used.delete(result[lastNight].id); result[lastNight] = {...tour, timeSlot:"day"}; used.add(tour.id); added++; }
    }
  }

  const CIRQUE_IDS = [22, 28, 39, 59];
  const hasCirque = result.some(e => CIRQUE_IDS.includes(e.id));
  if(!hasCirque && ans.tripType !== "family") {
    const cirqueCandidates = scored.filter(e =>
      CIRQUE_IDS.includes(e.id) && !used.has(e.id) && budgetMatch(e.price)
    );
    if(cirqueCandidates.length > 0) {
      const best = cirqueCandidates[0];
      const replaceIdx = result.findIndex(e =>
        e.timeSlot === "night" && !CIRQUE_IDS.includes(e.id) && e.cat === "Show"
      );
      if(replaceIdx >= 0) {
        used.delete(result[replaceIdx].id);
        result[replaceIdx] = {...best, timeSlot:"night"};
        used.add(best.id);
      } else if(result.length > 0) {
        const last = result.length - 1;
        used.delete(result[last].id);
        result[last] = {...best, timeSlot:"night"};
        used.add(best.id);
      }
    }
  }

  return result;
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────
export default function TuVegasTickets() {
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [selected,setSelected]=useState(null);
  const [loading,setLoading]=useState(false);
  const [itinerary,setItinerary]=useState([]);
  const [freeExp,setFreeExp]=useState([]);
  const [aiStory,setAiStory]=useState("");
  const [aiTitle,setAiTitle]=useState("");
  const [aiReady,setAiReady]=useState(false);

  const totalSteps=QUESTIONS.length;
  const isFamily = answers.tripType === "family";
  const isSolo = answers.tripType === "solo";
  const isCouple = answers.tripType === "couple";
  const isGirls = answers.groupGender === "girls" || (answers.tripType === "bachelorette" && answers.groupGender !== "guys" && answers.groupGender !== "lgbtq");
  const isGuys = answers.groupGender === "guys";
  const isLGBTQ = answers.groupGender === "lgbtq";
  const rawQ = QUESTIONS[step-1];
  const currentQ = rawQ ? {
    ...rawQ,
    question: rawQ.id==="groupGender" && isFamily ? "¿Cuántos años tienen los niños?"
            : rawQ.id==="groupGender" && isSolo ? "¿Cómo te identificas?"
            : rawQ.id==="groupGender" && isCouple ? "¿Cómo se identifican como pareja?"
            : rawQ.id==="vibe" && isFamily ? "¿Cuál es la energía de este viaje?"
            : rawQ.id==="vibe" && isGirls ? "¿Qué tipo de viaje de chicas es este?"
            : rawQ.id==="vibe" && isGuys ? "¿Cuál es tu vibra en Vegas?"
            : rawQ.question,
    subtitle: rawQ.id==="groupGender" && isFamily ? "Adaptaremos el itinerario para ellos"
            : rawQ.id==="groupGender" && (isSolo||isCouple) ? "Nos ayuda a personalizar tu experiencia"
            : rawQ.id==="vibe" && isFamily ? "Elige hasta 2 — día y noche cubiertos"
            : rawQ.id==="vibe" && isGirls ? "Elige la vibra que te llama"
            : rawQ.id==="vibe" && isGuys ? "Elige hasta 2 — cubrimos ambas"
            : rawQ.subtitle,
    cols: rawQ.id==="groupGender" && (isSolo||isCouple) ? 1 : rawQ.id==="vibe" && (isFamily||isGirls||isGuys) ? 2 : rawQ.cols,
    multi: rawQ.id==="vibe" && (isFamily||isGuys) ? true : rawQ.multi,
    max: rawQ.id==="vibe" && isFamily ? rawQ.familyMax : rawQ.id==="vibe" && isGuys ? 2 : rawQ.max,
    options: rawQ.id==="groupGender" && isFamily ? rawQ.familyOptions
           : rawQ.id==="groupGender" && isSolo ? rawQ.soloOptions
           : rawQ.id==="groupGender" && isCouple ? rawQ.coupleOptions
           : rawQ.id==="vibe" && isFamily ? rawQ.familyOptions
           : rawQ.id==="vibe" && isGirls ? rawQ.girlsOptions
           : rawQ.id==="vibe" && isGuys ? rawQ.guysOptions
           : rawQ.id==="vibe" && isLGBTQ ? rawQ.lgbtqOptions
           : rawQ.options,
  } : null;

  function handleSelect(v){
    if(!currentQ?.multi){setSelected(v);return;}
    const max=currentQ.max||2;
    setSelected(prev=>{
      const arr=Array.isArray(prev)?prev:[];
      if(arr.includes(v)) return arr.filter(x=>x!==v);
      if(arr.length>=max) return arr;
      return [...arr,v];
    });
  }

  const canContinue=step===0||(!currentQ?.multi&&selected!==null)||(currentQ?.multi&&Array.isArray(selected)&&selected.length>0);
  const multiCount=currentQ?.multi&&Array.isArray(selected)?selected.length:0;

  async function handleNext(){
    if(step===0){setStep(1);return;}
    const newAns={...answers,[currentQ.id]:selected};
    setAnswers(newAns);
    setSelected(null);

    if(step<totalSteps){
      const nextStep = step+1;
      const nextQ = QUESTIONS[nextStep-1];
      const isGuysNow = newAns.groupGender === "guys";
      const isLGBTQNow = newAns.groupGender === "lgbtq";
      const skipVibe = !isGuysNow && !isLGBTQNow && newAns.tripType !== "family";

      if(nextQ?.id==="vibe" && skipVibe){ setStep(nextStep+1); return; }

      if(nextQ?.id==="interest" && newAns.tripType==="family"){
        const familyVibes = Array.isArray(newAns.vibe) ? newAns.vibe : [newAns.vibe];
        const autoInterests = [];
        if(familyVibes.includes("show")) autoInterests.push("show");
        if(familyVibes.includes("explore")) autoInterests.push("nature","unique");
        if(familyVibes.includes("thrill")) autoInterests.push("adventure");
        if(familyVibes.includes("relaxed")) autoInterests.push("unique");
        const finalAns = {...newAns, interest: autoInterests.length>0 ? autoInterests : ["unique"]};
        setAnswers(finalAns);
        setStep(nextStep+1);
      } else {
        setStep(nextStep);
      }
      return;
    }

    setLoading(true);
    const results = filterExperiences(newAns);
    const kidsAge = newAns.groupGender;
    const isYoungFamily = newAns.tripType==="family" && (kidsAge==="under6"||kidsAge==="kids");
    const maxDays = {["1-2"]:3,["3-4"]:4,["5-7"]:7,["1week"]:8}[newAns.days]||4;
    const freeResults = FREE_EXPERIENCES.filter(f => {
      if(isYoungFamily && f.id==="f3") return false;
      if(newAns.tripType==="family" && kidsAge==="under6" && f.time==="Después de las 8pm") return false;
      if(f.tags && f.tags.includes("kids") && newAns.tripType!=="family") return false;
      if(f.tags && f.tags.includes("family") && newAns.tripType!=="family") return false;
      if((newAns.budget==="vip"||newAns.budget==="high") && f.tags && f.tags.includes("budget")) return false;
      return true;
    }).reduce((acc, f) => {
      const hasFountains = acc.some(x=>x.id==="f1");
      const hasConservatory = acc.some(x=>x.id==="f2");
      if(f.id==="f2" && hasFountains) return acc;
      if(f.id==="f1" && hasConservatory) return acc;
      if(acc.length>=maxDays) return acc;
      return [...acc, f];
    }, []);

    setItinerary(results);
    setFreeExp(freeResults);
    const fallback = `Llegas a Las Vegas con una energía que la ciudad reconoce al instante. No eres turista — eres exactamente el tipo de viajero para el que esta ciudad fue construida. Tu itinerario está listo.`;
    setAiStory(fallback);
    setLoading(false);
    setStep(totalSteps+1);

    const tripLabels={solo:"viajero/a solo/a",couple:"pareja",group:"grupo de amigos",family:"familia",bachelorette:"despedida de soltera/o",work:"viajero/a de negocios"};
    const genderLabels={girls:"mujer",guys:"hombre",lgbtq:"viajero/a LGBTQ+",mixed:"",under6:"familia con pequeños",kids:"familia con niños",teens:"familia con adolescentes",mixedages:"familia"};
    const vibeLabels={dark:"atraído/a por el lado oscuro y misterioso de Vegas",luxury:"buscador/a de lujo puro",adventure:"buscador/a de emociones",casino:"amante del casino y los deportes",romantic:"romántico/a empedernido/a","first-timer":"experimentando Vegas por primera vez",girlswild:"lista para una noche salvaje",girlsspa:"buscando lujo y relajación",girlsadventure:"viajera aventurera",girlsmix:"buscando la mezcla perfecta",thrill:"ávido/a de aventura y adrenalina",show:"amante del entretenimiento en vivo",explore:"explorador/a de corazón",relaxed:"buscando experiencias tranquilas y divertidas",nightout:"aquí para la vida nocturna"};
    const budgetDesc={budget:"busca la mejor experiencia al menor costo",mid:"equilibra el gasto conscientemente",high:"viaja cómodamente sin preocuparse demasiado por los precios",vip:"el costo nunca es el factor decisivo — solo lo mejor"}[newAns.budget]||"";
    const genderPrefix=genderLabels[newAns.groupGender]||"";
    const travelerType=genderPrefix?`${genderPrefix} ${tripLabels[newAns.tripType]||""}`.trim():tripLabels[newAns.tripType]||"viajero/a";
    const vibeDesc=vibeLabels[Array.isArray(newAns.vibe)?newAns.vibe[0]:newAns.vibe]||"";
    const interestDesc=Array.isArray(newAns.interest)?newAns.interest.join(" y "):newAns.interest||"";

    fetch("/api/briefing",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({travelerType,vibeDesc,interestDesc,budgetDesc,season:newAns.season,days:newAns.days,timeOfDay:newAns.timeOfDay})
    }).then(r=>r.json()).then(data=>{
      if(data.text&&data.text.length>30){setAiStory(data.text);if(data.title)setAiTitle(data.title);}
      setAiReady(true);
    }).catch(err=>{console.error("Briefing error:",err);setAiReady(true);});
  }

  const seasonLabels={winter:"Invierno",spring:"Primavera",summer:"Verano",fall:"Otoño"};
  const daysLabels={"1-2":"3 días","3-4":"4 días","5-7":"7 días","1week":"8 días"};

  return (
    <div style={{minHeight:"100vh",background:"#fdf6f0",fontFamily:"'Georgia',serif",color:"#1a1a1a",overflow:"hidden",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;600&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.15}50%{opacity:.7}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes flicker{0%,88%,90%,92%,100%{opacity:1}89%,91%{opacity:.4}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#2ecc71;border-radius:2px}
        a:hover{opacity:.85!important;transition:opacity .2s}
        body{background:#fdf6f0}
      `}</style>
      {[...Array(30)].map((_,i)=>(
        <div key={i} style={{position:"fixed",borderRadius:"50%",pointerEvents:"none",width:`${(i%3)+1}px`,height:`${(i%3)+1}px`,background:["#2ecc71","#f0c040","#a8d8a8","#c0c0c0","#27ae60"][i%5],left:`${(i*3.7)%100}%`,top:`${(i*7.1)%100}%`,animation:`pulse ${2+(i%4)}s ease-in-out infinite`,animationDelay:`${i*0.18}s`,opacity:.4}}/>
      ))}
      <div style={{maxWidth:"680px",margin:"0 auto",padding:"28px 18px",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"36px",animation:"fadeUp .6s ease"}}>
          <div style={{fontSize:"0.85rem",letterSpacing:"0.45em",color:"#c0392b",marginBottom:"10px",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",fontWeight:700}}>✦ TU GUÍA SECRETA ✦</div>
          <h1 style={{fontSize:"clamp(2rem,7vw,3.4rem)",margin:"0 0 6px",fontFamily:"'Playfair Display',serif",fontWeight:700,background:"linear-gradient(135deg,#c0392b 0%,#e74c3c 40%,#b8860b 75%,#c0392b 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"flicker 9s infinite, shimmer 5s linear infinite",lineHeight:1.1,letterSpacing:"0.02em"}}>TU VEGAS TICKETS</h1>
          <p style={{color:"#7a1a1a",fontSize:"0.9rem",margin:0,letterSpacing:"0.12em",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>Lo que Vegas no pone en los folletos</p>
        </div>
        {step===0&&(
          <div style={{animation:"fadeUp .6s ease .2s both"}}>
            <div style={{background:"#ffffff",border:"1px solid #e0e8e2",borderRadius:"22px",padding:"40px 28px",textAlign:"center",marginBottom:"24px",boxShadow:"0 4px 24px rgba(26,107,58,.07)"}}>
              <div style={{fontSize:"3rem",marginBottom:"20px",animation:"sway 3s ease-in-out infinite"}}>🎰</div>
              <h2 style={{fontSize:"1.45rem",color:"#1a1a1a",margin:"0 0 18px",fontFamily:"'Playfair Display',serif",fontWeight:700,lineHeight:1.4}}>Hay un lado de Las Vegas que <em style={{color:"#1a6b3a",fontStyle:"italic"}}>la mayoría nunca descubre.</em></h2>
              <p style={{color:"#333",lineHeight:1.9,margin:"0 0 10px",fontSize:"0.95rem",fontFamily:"'DM Sans',sans-serif"}}>Responde unas preguntas y revelaremos tu perfil de viajero — luego construimos un itinerario tan único como tú.</p>
              <p style={{color:"#888",fontSize:"0.83rem",margin:0,fontStyle:"italic",fontFamily:"'DM Sans',sans-serif"}}>Rápido, personal, gratis.</p>
            </div>
            <button onClick={handleNext} style={{width:"100%",padding:"20px",borderRadius:"14px",border:"none",background:"linear-gradient(135deg,#27ae60,#2ecc71,#f0c040)",color:"#0a1a0f",fontSize:"1rem",fontWeight:"700",cursor:"pointer",letterSpacing:"0.1em",textTransform:"uppercase",boxShadow:"0 8px 32px rgba(46,204,113,.4)",fontFamily:"'DM Sans',sans-serif",transition:"all .25s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 44px rgba(46,204,113,.6)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(46,204,113,.4)"}}>
              REVELAR MI ITINERARIO SECRETO →
            </button>
            <p style={{textAlign:"center",color:"#1a6b3a",fontSize:"0.82rem",margin:"14px 0 0",fontStyle:"italic",fontFamily:"'DM Sans',sans-serif"}}>✨ Incluye joyas ocultas que solo conocen los locales</p>
          </div>
        )}
        {step>=1&&step<=totalSteps&&!loading&&(
          <div key={step} style={{animation:"fadeUp .35s ease"}}>
            <div style={{marginBottom:"26px"}}>
              <div style={{height:"2px",background:"rgba(0,0,0,.08)",borderRadius:"2px"}}>
                <div style={{height:"100%",borderRadius:"2px",background:"linear-gradient(90deg,#1a6b3a,#27ae60,#b8860b)",width:`${(step/totalSteps)*100}%`,transition:"width .5s ease"}}/>
              </div>
            </div>
            <h2 style={{fontSize:"1.4rem",color:"#1a1a1a",margin:"0 0 5px",fontFamily:"'Playfair Display',serif",fontWeight:700}}>{currentQ.question}</h2>
            <p style={{color:"#1a6b3a",fontSize:"0.82rem",margin:"0 0 18px",fontStyle:"italic",fontFamily:"'DM Sans',sans-serif"}}>{currentQ.subtitle}</p>
            {currentQ.multi&&(
              <div style={{background:"rgba(184,134,11,.12)",border:"2px solid rgba(184,134,11,.5)",borderRadius:"10px",padding:"12px 16px",marginBottom:"14px",display:"flex",alignItems:"center",gap:"10px"}}>
                <span style={{fontSize:"1.1rem"}}>✨</span>
                <span style={{color:"#7a5c00",fontSize:"0.92rem",fontWeight:"700",fontFamily:"'DM Sans',sans-serif"}}>
                  {multiCount===0?`Elige hasta ${currentQ.max} — cubrimos todas`:multiCount<currentQ.max?`${multiCount} elegida(s) — elige una más`:`${multiCount} elegidas — ¡listo!`}
                </span>
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:currentQ.cols===3?"repeat(3,1fr)":"repeat(2,1fr)",gap:"10px",marginBottom:"20px"}}>
              {currentQ.options.map(opt=>{
                const isSel=currentQ.multi?Array.isArray(selected)&&selected.includes(opt.v):selected===opt.v;
                const isDisabled=currentQ.multi&&!isSel&&multiCount>=(currentQ.max||2);
                return (
                  <button key={opt.v} onClick={()=>!isDisabled&&handleSelect(opt.v)} style={{padding:"16px 12px",borderRadius:"14px",border:"none",cursor:isDisabled?"not-allowed":"pointer",background:isSel?"linear-gradient(135deg,#f0faf4,#fffde7)":"#ffffff",outline:isSel?"2px solid #1a6b3a":"1.5px solid #e0e8e2",opacity:isDisabled&&!isSel?.4:1,color:"#1a1a1a",textAlign:"left",transition:"all .2s",transform:isSel?"scale(1.03)":"scale(1)",boxShadow:isSel?"0 4px 16px rgba(26,107,58,.12)":"0 2px 8px rgba(0,0,0,.04)"}}>
                    <div style={{fontSize:"1.4rem",marginBottom:"6px"}}>{opt.emoji}</div>
                    <div style={{fontWeight:"700",fontSize:"0.92rem",marginBottom:"4px",color:isSel?"#1a6b3a":"#1a1a1a",fontFamily:"'DM Sans',sans-serif"}}>{opt.label}</div>
                    <div style={{color:"#666",fontSize:"0.78rem",lineHeight:1.5,fontFamily:"'DM Sans',sans-serif"}}>{opt.desc}</div>
                    {isSel&&<div style={{marginTop:"6px",color:"#1a6b3a",fontSize:"0.75rem"}}>✓</div>}
                  </button>
                );
              })}
            </div>
            <div style={{position:"sticky",bottom:"16px",zIndex:100,marginTop:"16px"}}>
              <button onClick={handleNext} disabled={!canContinue} style={{width:"100%",padding:"16px",borderRadius:"12px",border:"none",background:canContinue?"linear-gradient(135deg,#1a6b3a,#27ae60,#b8860b)":"#e8e8e8",color:canContinue?"#fff":"#999",fontSize:"0.92rem",fontWeight:"700",cursor:canContinue?"pointer":"not-allowed",letterSpacing:"0.08em",textTransform:"uppercase",transition:"all .3s",fontFamily:"'DM Sans',sans-serif",boxShadow:canContinue?"0 6px 24px rgba(26,107,58,.4)":"none"}}>
                {step===totalSteps?"🔓 Desbloquear Mi Itinerario":canContinue?"Continuar →":"Selecciona una opción"}
              </button>
            </div>
          </div>
        )}
        {loading&&(
          <div style={{textAlign:"center",padding:"60px 0",animation:"fadeUp .4s ease"}}>
            <div style={{position:"relative",width:"70px",height:"70px",margin:"0 auto 24px"}}>
              {[0,1,2].map(i=>(<div key={i} style={{position:"absolute",inset:`${i*8}px`,borderRadius:"50%",border:"2px solid transparent",borderTopColor:i%2===0?"#2ecc71":"#f0c040",animation:`spin ${1+i*.5}s linear infinite ${i%2?"reverse":""}`}}/>))}
            </div>
            <p style={{color:"#2ecc71",fontSize:"0.95rem",margin:"0 0 6px",fontFamily:"'DM Sans',sans-serif"}}>Accediendo al underground...</p>
            <p style={{color:"#5a9a6a",fontSize:"0.78rem",fontFamily:"'DM Sans',sans-serif"}}>Construyendo tu itinerario secreto de Vegas</p>
          </div>
        )}
        {step===totalSteps+1&&!loading&&(
          <div style={{animation:"fadeUp .5s ease"}}>
            <div style={{background:"linear-gradient(135deg,#1a0a0a,#0d1a10)",border:"1px solid rgba(240,192,64,.2)",borderLeft:"3px solid #c0392b",borderRadius:"18px",padding:"24px",marginBottom:"18px",boxShadow:"0 4px 24px rgba(0,0,0,.15)"}}>
                 <div style={{color:"#c0392b",fontSize:"0.75rem",letterSpacing:"0.18em",marginBottom:"12px",fontFamily:"'DM Sans',sans-serif,fontWeight:"700",textTransform:"uppercase"}}> TU PERFIL DE VIAJERO</div>          {!aiReady?(
                <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0"}}>
                  <div style={{position:"relative",width:"28px",height:"28px",flexShrink:0}}>
                    {[0,1,2].map(i=>(<div key={i} style={{position:"absolute",inset:`${i*4}px`,borderRadius:"50%",border:"1.5px solid transparent",borderTopColor:i%2===0?"#c0392b":"#f0c040",animation:`spin ${0.8+i*.3}s linear infinite ${i%2?"reverse":""}`}}/>))}
                  </div>
                  <div>
                    <p style={{color:"#f0c040",fontSize:"0.8rem",margin:"0 0 3px",fontWeight:"700",fontFamily:"'DM Sans',sans-serif"}}>Analizando tu perfil de viajero...</p>
                    <p style={{color:"#888",fontSize:"0.72rem",margin:0,fontFamily:"'DM Sans',sans-serif"}}>Tu revelación personal aparecerá en unos segundos ✨</p>
                  </div>
                </div>
              ):(
                <div style={{animation:"fadeUp .5s ease"}}>
                  {aiTitle&&(<div style={{marginBottom:"14px"}}>
                  style={{fontSize:"1.08rem",fontWeight:"700",color:"#f0c040",fontFamily:"'Playfair Display',serif",marginTop:"4px"}}>{aiTitle}</div></div>)}
                  {aiStory.split("\n\n").filter(p=>p.trim()).map((para,i,arr)=>(
                    <p key={i} style={{color:"#ddd",lineHeight:1.9,margin:"0 0 14px 0",fontStyle:"italic",fontSize:"0.92rem",fontFamily:"'DM Sans',sans-serif"}}>{i===0?"\"":""}{para}{i===arr.length-1?"\"":""}</p>
                  ))}
                </div>
              )}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"24px"}}>
              {[`${seasonLabels[answers.season]} en Vegas`,`Viaje de ${daysLabels[answers.days]}`].map(b=>(<div key={b} style={{background:"rgba(46,204,113,.08)",border:"1px solid rgba(46,204,113,.2)",borderRadius:"20px",padding:"5px 14px",color:"#2ecc71",fontSize:"0.72rem",letterSpacing:"0.06em",fontFamily:"'DM Sans',sans-serif"}}>{b}</div>))}
            </div>
            <h2 style={{color:"#1a1a1a",fontSize:"1.2rem",margin:"0 0 4px",fontFamily:"'Playfair Display',serif",fontWeight:700}}>Tu Itinerario</h2>
            <p style={{color:"#666",fontSize:"0.78rem",margin:"0 0 4px",fontFamily:"'DM Sans',sans-serif"}}>Reserva directamente — enlaces abajo</p>
            <p style={{color:"#999",fontSize:"0.68rem",margin:"0 0 18px",fontStyle:"italic",fontFamily:"'DM Sans',sans-serif"}}>* Los precios son referenciales y están sujetos a disponibilidad. Las tarifas pueden cambiar sin previo aviso. No nos hacemos responsables por variaciones en el precio al momento de la reserva.</p>
            <div style={{display:"flex",flexDirection:"column",gap:"22px",marginBottom:"30px"}}>
              {(()=>{
                const combined=[];
                const dayPairs=Math.ceil(itinerary.length/2);
                let freeIdx=0;
                for(let d=0;d<dayPairs;d++){
                  const dayExp=itinerary[d*2];
                  const nightExp=itinerary[d*2+1];
                  const freeForThisDay=freeExp[freeIdx]||null;
                  if(freeForThisDay) freeIdx++;
                  combined.push(
                    <div key={`day-${d+1}`}>
                      <div style={{color:"#1a6b3a",fontSize:"1rem",fontWeight:"700",letterSpacing:"0.06em",margin:"0 0 10px",fontFamily:"'Playfair Display',serif",borderBottom:"1px solid #d4e8da",paddingBottom:"6px"}}>Día {d+1}</div>
                      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        {dayExp&&<ExperienceCard key={dayExp.id} exp={dayExp} index={d*2} isFree={false} timeLabel="🌅 Día"/>}
                        {freeForThisDay&&<ExperienceCard key={freeForThisDay.id} exp={freeForThisDay} index={d*2} isFree={true}/>}
                        {nightExp&&<ExperienceCard key={nightExp.id} exp={nightExp} index={d*2+1} isFree={false} timeLabel="🌙 Noche"/>}
                      </div>
                    </div>
                  );
                }
                return combined;
              })()}
            </div>
            {answers.tripType==="family"&&(
              <div style={{background:"rgba(240,192,64,.05)",border:"1px solid rgba(240,192,64,.15)",borderRadius:"16px",padding:"20px",marginBottom:"24px"}}>
                <div style={{color:"#f0c040",fontSize:"0.62rem",letterSpacing:"0.2em",marginBottom:"12px",fontFamily:"'DM Sans',sans-serif"}}>✦ CONSEJOS — VEGAS CON NIÑOS</div>
                <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                  {[{emoji:"🎂",tip:"La edad importa en Vegas — los menores de 21 no pueden sentarse en barras ni quedarse en casinos."},{emoji:"☀️",tip:"Evita junio-septiembre si es posible. El calor supera los 40°C y agota a los niños rápidamente."},{emoji:"💧",tip:"Lleva botellas de agua siempre. El aire seco del desierto deshidrata a los niños más rápido de lo que esperas."},{emoji:"🎰",tip:"Los niños pueden caminar por los casinos pero no pueden detenerse ni sentarse — incluso con un adulto."},{emoji:"🌅",tip:"Planifica actividades al aire libre por la mañana (antes de las 10am) y regresa al interior durante el pico de calor."},{emoji:"🚗",tip:"Considera alquilar un coche — mucho más fácil con niños pequeños que caminar por el Strip."}].map((item,i)=>(
                    <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                      <span style={{fontSize:"1rem",minWidth:"24px"}}>{item.emoji}</span>
                      <p style={{color:"#7ec8a0",fontSize:"0.78rem",lineHeight:1.6,margin:0,fontFamily:"'DM Sans',sans-serif"}}>{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{marginBottom:"22px"}}>
              <p style={{color:"#1a1a1a",fontSize:"0.85rem",margin:"0 0 10px",textAlign:"center",fontWeight:"600",fontFamily:"'DM Sans',sans-serif"}}>¿Conoces a alguien que lo necesita? ¡Compártelo!</p>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>{const t="¿Vas a Las Vegas? Descubre tu perfil de viajero 🎰\n"+window.location.href;if(navigator.clipboard?.writeText){navigator.clipboard.writeText(t).then(()=>alert("¡Copiado!")).catch(()=>prompt("Copia:",t));}else{prompt("Copia:",t);}}} style={{flex:1,padding:"13px",borderRadius:"9px",border:"1.5px solid #d4e8da",background:"#fff",color:"#333",fontSize:"0.82rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:"600"}}>🔗 Copiar Enlace</button>
                <button onClick={()=>{const t="¿Vas a Las Vegas? Descubre tu perfil de viajero 🎰";if(navigator.share){navigator.share({title:"Tu Vegas Tickets",text:t,url:window.location.href});}else{prompt("Copia:",t+"\n"+window.location.href);}}} style={{flex:1,padding:"13px",borderRadius:"9px",border:"none",background:"linear-gradient(135deg,#1a6b3a,#27ae60)",color:"#fff",fontSize:"0.82rem",cursor:"pointer",fontWeight:"700",fontFamily:"'DM Sans',sans-serif"}}>💬 Compartir con Amigos</button>
              </div>
            </div>
            <div style={{background:"linear-gradient(135deg,#fffde7,#fff8e1)",border:"2px solid #e6c200",borderRadius:"14px",padding:"22px",marginBottom:"18px",textAlign:"center"}}>
              <p style={{color:"#1a1a1a",fontSize:"0.92rem",margin:"0 0 6px",fontWeight:"700",fontFamily:"'DM Sans',sans-serif"}}>🎰 ¿Falta algo en tu itinerario?</p>
              <p style={{color:"#555",fontSize:"0.8rem",margin:"0 0 16px",fontFamily:"'DM Sans',sans-serif"}}>Las Vegas te espera con los brazos abiertos.</p>
              <a href="mailto:unveiledvegas@gmail.com?subject=Feedback Tu Vegas Tickets" style={{display:"inline-block",padding:"12px 28px",borderRadius:"9px",background:"linear-gradient(135deg,#b8860b,#f0c040)",color:"#fff",fontSize:"0.85rem",textDecoration:"none",fontWeight:"700",fontFamily:"'DM Sans',sans-serif"}}>Deja Tu Opinión →</a>
            </div>
            <button onClick={()=>{setStep(0);setAnswers({});setSelected(null);setAiStory("");setAiTitle("");setAiReady(false);setItinerary([]);setFreeExp([]);}} style={{width:"100%",padding:"16px",borderRadius:"10px",background:"linear-gradient(135deg,#1a6b3a,#27ae60)",border:"none",color:"#fff",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 4px 16px rgba(26,107,58,.3)"}}>↩ Empezar de Nuevo — Crear Otro Itinerario</button>
            <p style={{textAlign:"center",color:"#bbb",fontSize:"0.65rem",marginTop:"16px",fontFamily:"'DM Sans',sans-serif"}}>Los enlaces de reserva pueden incluir asociaciones de afiliados · Precios sujetos a disponibilidad</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({exp,index,isFree,timeLabel}){
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?"#f0faf4":"#ffffff",border:hov?`1px solid ${isFree?"#27ae60":"#1a6b3a"}`:"1px solid #e0e8e2",borderRadius:"15px",padding:"18px",transition:"all .3s",transform:hov?"translateY(-2px)":"none",animation:`fadeUp .5s ease ${index*.07}s both`,boxShadow:hov?"0 6px 24px rgba(26,107,58,.1)":"0 2px 8px rgba(0,0,0,.04)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
        <div style={{display:"flex",gap:"12px",alignItems:"flex-start",flex:1}}>
          <div style={{minWidth:"44px",textAlign:"center"}}><span style={{fontSize:"1.9rem"}}>{exp.emoji}</span></div>
          <div style={{flex:1}}>
            <div style={{color:"#1a1a1a",fontWeight:"700",fontSize:"0.98rem",marginBottom:"6px",lineHeight:1.3,fontFamily:"'DM Sans',sans-serif"}}>{exp.name}</div>
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
              {!isFree&&timeLabel&&<span style={{background:"#f0faf4",color:"#1a6b3a",fontSize:"0.7rem",padding:"2px 10px",borderRadius:"20px",border:"1px solid #c8e6d0",fontFamily:"'DM Sans',sans-serif"}}>{timeLabel}</span>}
              {exp.dur&&<span style={{background:"#fffde7",color:"#7a5c00",fontSize:"0.7rem",padding:"2px 10px",borderRadius:"20px",border:"1px solid #e6c200",fontFamily:"'DM Sans',sans-serif"}}>{exp.dur}</span>}
              {exp.rating>0&&<span style={{background:"#f5f5f5",color:"#444",fontSize:"0.7rem",padding:"2px 10px",borderRadius:"20px",border:"1px solid #ddd",fontFamily:"'DM Sans',sans-serif"}}>⭐ {exp.rating}</span>}
              {exp.isNew&&<span style={{background:"#f0faf4",color:"#1a6b3a",fontSize:"0.7rem",padding:"2px 10px",borderRadius:"20px",border:"1px solid #c8e6d0",fontFamily:"'DM Sans',sans-serif"}}>✨ Nuevo</span>}
              {exp.limitedTime&&<span style={{background:"#fffde7",color:"#7a5c00",fontSize:"0.7rem",padding:"2px 10px",borderRadius:"20px",border:"1px solid #e6c200",fontFamily:"'DM Sans',sans-serif"}}>⏰ {exp.limitedTime}</span>}
            </div>
          </div>
        </div>
        {isFree?<span style={{background:"#f0faf4",border:"1px solid #c8e6d0",color:"#1a6b3a",fontSize:"0.75rem",fontWeight:"700",padding:"4px 12px",borderRadius:"20px",whiteSpace:"nowrap",marginLeft:"8px",fontFamily:"'DM Sans',sans-serif"}}>GRATIS</span>:<span style={{color:"#b8860b",fontSize:"0.95rem",fontWeight:"bold",marginLeft:"10px",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>Desde ${exp.price}</span>}
      </div>
      <p style={{color:"#333",fontSize:"0.84rem",lineHeight:1.75,margin:"0 0 12px",fontFamily:"'DM Sans',sans-serif"}}>{exp.desc}</p>
      <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{display:"block",background:isFree?"#f0faf4":"linear-gradient(135deg,#1a6b3a,#27ae60)",border:isFree?"1px solid #c8e6d0":"none",color:isFree?"#1a6b3a":"#fff",padding:"13px 16px",borderRadius:"10px",textDecoration:"none",fontSize:"0.88rem",fontWeight:"700",textAlign:"center",fontFamily:"'DM Sans',sans-serif"}}>
        {isFree?"🔗 Más Información":"🎟️ Reservar Ahora"}
      </a>
    </div>
  );
}
