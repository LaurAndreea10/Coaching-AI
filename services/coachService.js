export async function getCoachReplyFromService(message, config = {}) {
  if (!config.coachApiEnabled || !config.coachApiEndpoint) {
    return null;
  }

  const response = await fetch(config.coachApiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error(`Coach service error: ${response.status}`);
  }

  const payload = await response.json();
  return payload.reply || null;
}
