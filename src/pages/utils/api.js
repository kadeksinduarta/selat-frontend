const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

/* ---------------------------------------------
   Public API (No Auth)
----------------------------------------------*/
export async function apiGet(url) {
  const res = await fetch(`${API_URL}/${url}`, {
    headers: {
      "Accept": "application/json",
    },
  });
  if (!res.ok) {
    // Attempt to read json if possible, otherwise throw error
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `API Error: ${res.status}`);
    } catch (e) {
      throw new Error(`API Error: ${res.statusText} (${res.status})`);
    }
  }
  return res.json();
}

/* ---------------------------------------------
   Auth API (Login / Register Admin)
----------------------------------------------*/
export async function authPost(url, data) {
  const res = await fetch(`${AUTH_API_URL}/${url}`, {
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
  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.json();
}

export async function adminPost(url, data, token) {
  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
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
  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
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
  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    },
  });

  if (res.status === 204) {
    return true; // Success, no content
  }

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `API Error: ${res.status}`);
    } catch (e) {
      throw new Error(`API Error: ${res.statusText} (${res.status})`);
    }
  }

  return res.json();
}

export async function adminPostMultipart(url, formData, token) {
  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
      // Content-Type header is explicitly omitted to let browser set it with boundary
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `API Error: ${res.status}`);
    } catch (e) {
      // If parse fails, use the original error from json or generic
      if (e.message.startsWith('API Error')) throw e;
      throw new Error(`API Error: ${res.statusText} (${res.status}) - ${text.substring(0, 50)}...`);
    }
  }

  return res.json();
}

export async function adminPutMultipart(url, formData, token) {
  // Use POST with _method = PUT for Laravel if needed, or PUT directly.
  // Laravel sometimes struggles with PUT and multipart/form-data.
  // Using POST with _method field is safer for file uploads in Laravel.
  formData.append('_method', 'PUT');

  const res = await fetch(`${ADMIN_API_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `API Error: ${res.status}`);
    } catch (e) {
      if (e.message.startsWith('API Error')) throw e;
      throw new Error(`API Error: ${res.statusText} (${res.status}) - ${text.substring(0, 50)}...`);
    }
  }

  return res.json();
}

/* ---------------------------------------------
   User API (Profile, Addresses, Orders - with Bearer Token)
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
