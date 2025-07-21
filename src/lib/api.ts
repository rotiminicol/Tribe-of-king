const API_BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:meQ6sgQh';
const AUTH_BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:lgBeohiU';

export async function api(endpoint: string, options: RequestInit = {}, auth: boolean = false) {
  const token = localStorage.getItem('token');
  const headers: any = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (auth && token) headers['Authorization'] = `Bearer ${token}`;
  const base = endpoint.startsWith('auth') ? AUTH_BASE : API_BASE;
  const res = await fetch(`${base}/${endpoint}`, { ...options, headers });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 