const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

/* ---------------------------------------------
   Public API (No Auth)
----------------------------------------------*/
export async function apiGet(url) {
  const res = await fetch(`${API_URL}/${url}`);
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
    },
  });
  return res.json();
}
