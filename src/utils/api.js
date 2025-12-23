const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const STORAGE_URL = API_URL.replace('/api', '') + '/storage';

async function request(endpoint, options = {}) {
  const { method = 'GET', data = null, token = null, isDashboard = false } = options;
  const baseUrl = isDashboard ? `${API_URL}/dashboard` : API_URL;
  const isFormData = data instanceof FormData;

  const headers = {
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(!isFormData && data && { 'Content-Type': 'application/json' })
  };

  const res = await fetch(`${baseUrl}/${endpoint}`, {
    method,
    headers,
    body: data ? (isFormData ? data : JSON.stringify(data)) : null
  });

  if (res.status === 204) return true;

  if (!res.ok) {
    const text = await res.text();
    let message = `API Error: ${res.status}`;
    try {
      const json = JSON.parse(text);
      message = json.message || message;
    } catch (e) {
      message = `${res.statusText} (${res.status}) - ${text.substring(0, 100)}`;
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * Modular API Modules
 */
export const apiAuth = {
  post: (url, data) => request(url, { method: 'POST', data }),
};

export const apiAdmin = {
  get: (url, token) => request(url, { token, isDashboard: true }),
  post: (url, data, token) => request(url, { method: 'POST', data, token, isDashboard: true }),
  put: (url, data, token) => request(url, { method: 'PUT', data, token, isDashboard: true }),
  delete: (url, token) => request(url, { method: 'DELETE', token, isDashboard: true }),
  postMultipart: (url, formData, token) => request(url, { method: 'POST', data: formData, token, isDashboard: true }),
  putMultipart: (url, formData, token) => {
    formData.append('_method', 'PUT');
    return request(url, { method: 'POST', data: formData, token, isDashboard: true });
  }
};

export const apiClient = {
  get: (url, token) => request(url, { token }),
  post: (url, data, token) => request(url, { method: 'POST', data, token }),
  put: (url, data, token) => request(url, { method: 'PUT', data, token }),
  delete: (url, token) => request(url, { method: 'DELETE', token }),
};

/**
 * Compatibility Exports
 */
export function getStorageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${STORAGE_URL}/${cleanPath}`;
}

export const apiGet = (url) => apiClient.get(url);
export const authPost = (url, data) => apiAuth.post(url, data);

export const adminGet = (url, token) => apiAdmin.get(url, token);
export const adminPost = (url, data, token) => apiAdmin.post(url, data, token);
export const adminPut = (url, data, token) => apiAdmin.put(url, data, token);
export const adminDelete = (url, token) => apiAdmin.delete(url, token);
export const adminPostMultipart = (url, formData, token) => apiAdmin.postMultipart(url, formData, token);
export const adminPutMultipart = (url, formData, token) => apiAdmin.putMultipart(url, formData, token);

export const userGet = (url, token) => apiClient.get(url, token);
export const userPost = (url, data, token) => apiClient.post(url, data, token);
export const userPut = (url, data, token) => apiClient.put(url, data, token);
export const userDelete = (url, token) => apiClient.delete(url, token);
