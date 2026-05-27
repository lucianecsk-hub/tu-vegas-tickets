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
        model: 'claude-haiku-4-5',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Eres una experta en perfiles de viajeros que conoce Las Vegas en profundidad. Basándote en el perfil a continuación, devuelve un objeto JSON con exactamente dos campos: "title" y "text".
PERFIL DEL VIAJERO:
- Tipo de viaje: ${travelerType}
- Estilo / vibra: ${vibeDesc}
- Intereses: ${interestDesc}
- Comportamiento de gasto: ${budgetDesc}
- Temporada: ${season}
- Duración del viaje: ${days} días
- Horario preferido: ${timeOfDay}
CAMPO "title":
Un nombre de arquetipo de viajero, máximo 5 palabras. Como un título de perfil clasificado. Ejemplos: "El Arquitecto de Medianoche", "El Cazador de Lujo Calculado", "La Coleccionista de Sombras". Que se sienta personal y específico para este perfil.
CAMPO "text":
Escribe exactamente 3 párrafos cortos en español neutro que se sientan como si la persona estuviera leyendo su propio horóscopo de viaje — específico, revelador, ligeramente cinematográfico, nunca genérico. Como una cartomante que lo ha visto todo, con humor sutil e inteligente.
PÁRRAFO 1 — EL/LA VIAJERO/A (máximo 2 oraciones):
Describe cómo viaja esta persona — su comportamiento real y sus decisiones. Específico, conductual, con humor seco. Deben pensar "¿cómo sabía esta app eso de mí?"
PÁRRAFO 2 — VEGAS PARA ELLOS (solo 1 oración):
Qué tiene Las Vegas específicamente para este perfil que no encontrará en ningún otro lugar. No obvio — la capa de Vegas que encaja exactamente con quién son.
PÁRRAFO 3 — LA TEMPORADA (solo 1 oración):
Las Vegas en ${season} — sensorial, atmosférico, específico a la estación. Describe solo cómo se siente la ciudad: la temperatura, la luz, las multitudes, la energía. Termina con algo que les haga querer estar allí ahora mismo.
REGLAS:
- Devuelve SOLO JSON válido, sin markdown, sin comillas invertidas
- El campo "text" debe usar \\n\\n para separar los párrafos
- Solo en español neutro (válido para México, Colombia, España, Argentina, etc.)
- Sé conciso y contundente — nada genérico
- NUNCA menciones ningún show, atracción, lugar o actividad por nombre
- Nunca uses: "vibrante" "increíble" "inolvidable" "experiencia única" "maravilloso"
- Tono: íntimo, revelador, cinematográfico, con humor cómplice
- No uses comillas, títulos ni etiquetas dentro del campo "text"`
        }]
      })
    });
    const data = await response.json();
    const raw = data.content?.[0]?.text || '';
    try {
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      const jsonStr = cleaned.slice(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(jsonStr);
      if (parsed.text) parsed.text = parsed.text.replace(/\\n/g, '\n');
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
