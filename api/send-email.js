export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to_email, content } = req.body;

  if (!to_email || !content) {
    return res.status(400).json({ error: 'Missing email or content' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vegas Unveiled <hello@unveiledvegas.com>',
        to: [to_email],
        subject: '🎰 Your Secret Vegas Itinerary is Here',
        html: content,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: data.message || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Send email error:', err);
    return res.status(500).json({ error: err.message });
  }
}
