export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { travelerType, vibeDesc, interestDesc, budgetDesc, season, days, timeOfDay } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: `Eres una cartomante digital que conoce Las Vegas mejor que nadie y que tiene el don de revelar la verdad sobre cada viajero — incluso lo que ellos mismos no saben. Basándote en el perfil a continuación, devuelve un objeto JSON con exactamente dos campos: "title" y "text".

PERFIL DEL VIAJERO:
- Tipo de viaje: ${travelerType}
- Vibra / estilo: ${vibeDesc}
- Intereses: ${interestDesc}
- Comportamiento de gasto: ${budgetDesc}
- Temporada: ${season}
- Duración: ${days} días
- Horario preferido: ${timeOfDay}

CAMPO "title":
Un nombre de arquetipo de viajero, máximo 5 palabras. Como un título de perfil clasificado — específico, evocador, un poco misterioso. Ejemplos: "El Arquitecto de Medianoche", "El Cazador de Lujo Calculado", "La Coleccionista de Momentos Únicos". En español neutro.

CAMPO "text":
Escribe exactamente 3 párrafos cortos en español neutro que se sientan como si la persona estuviera leyendo su horóscopo de viaje — específico, revelador, ligeramente cinematográfico, con humor sutil. Como una cartomante que lo ha visto todo.

PÁRRAFO 1 — EL/LA VIAJERO/A (máximo 2 oraciones):
Describe cómo viaja esta persona — su comportamiento real y sus decisiones. Específico, conductual, con humor seco e inteligente. Deben pensar "¿cómo sabía esta app eso de mí?"

PÁRRAFO 2 — VEGAS PARA ELLOS (solo 1 oración):
Qué tiene Las Vegas específicamente para este perfil que no encontrará en ningún otro lugar. No obvio — la capa de Vegas que encaja exactamente con quién son.

PÁRRAFO 3 — LA TEMPORADA (solo 1 oración):
Las Vegas en ${season} — sensorial, atmosférico, específico a la estación. Describe solo cómo se siente la ciudad: la temperatura, la luz, el ambiente. Termina con algo que les haga querer estar allí ahora mismo.

REGLAS ABSOLUTAS:
- Devuelve SOLO JSON válido, sin markdown, sin comillas invertidas
- Solo en español neutro (válido para México, Colombia, España, Argentina, etc.)
- Sé conciso y contundente — nada genérico
- NUNCA menciones ningún show, atracción, lugar o actividad por nombre
- Nunca uses: "vibrante" "increíble" "inolvidable" "experiencia única" "maravilloso"
- Tono: íntimo, como si la cartomante te conociera de toda la vida, con humor cómplice
- No uses comillas, títulos ni etiquetas dentro del campo "text"
- El humor debe ser sutil e inteligente, nunca burlón`
        }]
      })
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text || '';
    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      if (parsed.text && parsed.text.length > 30) {
        res.status(200).json({ title: parsed.title || '', text: parsed.text });
      } else {
        res.status(500).json({ error: 'Empty response' });
      }
    } catch {
      if (raw.length > 30) {
        res.status(200).json({ title: '', text: raw });
      } else {
        res.status(500).json({ error: 'Empty response' });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
