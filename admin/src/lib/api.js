const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');
const API_BASE_URL = rawApiBaseUrl.endsWith('/api') ? rawApiBaseUrl : `${rawApiBaseUrl}/api`;
const ADMIN_TOKEN_KEY = 'admin_token';

const buildUrl = (path) =>
  new URL(`${API_BASE_URL}/${String(path).replace(/^\/+/, '')}`, window.location.origin).toString();

const getAuthToken = () => localStorage.getItem(ADMIN_TOKEN_KEY) || '';
const setAuthToken = (token) => localStorage.setItem(ADMIN_TOKEN_KEY, token);
const clearAuthToken = () => localStorage.removeItem(ADMIN_TOKEN_KEY);

const fetchJson = async (path, options = {}) => {
  const { method = 'GET', body, auth = false } = options;
  const headers = {};

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      // keep fallback message
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const api = {
  loginAdmin: (body) => fetchJson('/auth/login', { method: 'POST', body }),
  getAdminOverview: () => fetchJson('/admin/overview', { auth: true }),
  createChallenge: (body) => fetchJson('/admin/challenges', { method: 'POST', body, auth: true }),
  updateChallenge: (id, body) =>
    fetchJson(`/admin/challenges/${id}`, { method: 'PUT', body, auth: true }),
  deleteChallenge: (id) => fetchJson(`/admin/challenges/${id}`, { method: 'DELETE', auth: true }),
  createQuestion: (body) => fetchJson('/admin/questions', { method: 'POST', body, auth: true }),
  updateQuestion: (id, body) =>
    fetchJson(`/admin/questions/${id}`, { method: 'PUT', body, auth: true }),
  deleteQuestion: (id) => fetchJson(`/admin/questions/${id}`, { method: 'DELETE', auth: true }),
  createLeaderboardEntry: (body) =>
    fetchJson('/admin/leaderboard', { method: 'POST', body, auth: true }),
  updateLeaderboardEntry: (id, body) =>
    fetchJson(`/admin/leaderboard/${id}`, { method: 'PUT', body, auth: true }),
  deleteLeaderboardEntry: (id) =>
    fetchJson(`/admin/leaderboard/${id}`, { method: 'DELETE', auth: true }),
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};
