const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const buildUrl = (path, params) => {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
};

const fetchJson = async (path, options = {}) => {
  const { params, method = 'GET', body } = options;
  const headers = {};

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(buildUrl(path, params), {
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
      // Ignore JSON parse errors and use fallback message.
    }

    throw new Error(message);
  }

  return response.json();
};

export const api = {
  getTodayChallenge: () => fetchJson('/today-challenge'),
  getQuestions: (params) => fetchJson('/questions', { params }),
  getLeaderboard: (type) => fetchJson('/leaderboard', { params: { type } }),
};
