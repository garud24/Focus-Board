export async function getRandomQuote() {
  const res = await fetch('https://api.quotable.io/random');
  if (!res.ok) throw new Error('Quote API error');
  return res.json();
}
