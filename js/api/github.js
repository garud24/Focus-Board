export async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
  if (!res.ok) throw new Error('GitHub lookup failed');
  return res.json();
}
