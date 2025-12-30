const getBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  // Jika URL tidak diakhiri dengan /api, tambahkan /api (untuk mencegah error di production)
  if (!url.endsWith('/api') && !url.includes('/api/')) {
    url = url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  return url;
};

const API_URL = getBaseUrl();
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || API_URL.replace('/api', '/storage');

/**
 * Helper untuk mendapatkan URL gambar dari storage Laravel
 */
export function getStorageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  // Menghapus storage/ jika ada di path (karena sudah ada di STORAGE_URL)
  const cleanPath = path.replace(/^storage\//, '');
  return `${STORAGE_URL}/${cleanPath}`;
}

/* ---------------------------------------------
   Public API (No Auth)
----------------------------------------------*/
export async function apiGet(url) {
  const res = await fetch(`${API_URL}/${url}`, {
    headers: { "Accept": "application/json" },
  });
  if (!res.ok) {
    if (res.status === 413) {
      throw new Error("Ukuran file terlalu besar (Maksimal 10MB)");
    }
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `API Error: ${res.status}`);
  }
  return res.json();
}

/* ---------------------------------------------
   Auth API (Login / Register)
----------------------------------------------*/
export async function authPost(url, data) {
  // Menangani url login/register/admin/login
  const targetUrl = url.includes('admin') ? `${API_URL}/admin/login` : `${API_URL}/${url}`;

  const res = await fetch(targetUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* ---------------------------------------------
   Admin API (Dashboard - with Bearer Token)
----------------------------------------------*/
export async function adminGet(url, token) {
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.json();
}

export async function adminPost(url, data, token) {
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminPut(url, data, token) {
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDelete(url, token) {
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  if (res.status === 204) return true;
  return res.json();
}

export async function adminPostMultipart(url, formData, token) {
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 413) {
      throw new Error("Ukuran file terlalu besar (Maksimal 10MB)");
    }
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `API Error: ${res.status}`);
  }
  return res.json();
}

export async function adminPutMultipart(url, formData, token) {
  formData.append('_method', 'PUT');
  const res = await fetch(`${API_URL}/dashboard/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 413) {
      throw new Error("Ukuran file terlalu besar (Maksimal 10MB)");
    }
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || `API Error: ${res.status}`);
  }
  return res.json();
}

/* ---------------------------------------------
   User API (Profile, Addresses, Orders)
----------------------------------------------*/
export async function userGet(url, token) {
  const res = await fetch(`${API_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.json();
}

export async function userPost(url, data, token) {
  const res = await fetch(`${API_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function userPut(url, data, token) {
  const res = await fetch(`${API_URL}/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function userDelete(url, token) {
  const res = await fetch(`${API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
