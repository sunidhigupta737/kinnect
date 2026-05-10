const API = 'http://localhost:8000/api';

function getToken() { return localStorage.getItem('kinnect_token'); }
function setToken(token) { localStorage.setItem('kinnect_token', token); }
function setUser(user) { localStorage.setItem('kinnect_user', JSON.stringify(user)); }
function getUser() {
  try { return JSON.parse(localStorage.getItem('kinnect_user')); }
  catch { return null; }
}
function logout() {
  localStorage.removeItem('kinnect_token');
  localStorage.removeItem('kinnect_user');
  window.location.href = '/caretaker/auth.html';
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const res = await fetch(API + endpoint, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' })
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => t.className = '', 3000);
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }