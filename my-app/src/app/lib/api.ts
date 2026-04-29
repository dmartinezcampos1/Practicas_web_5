import { getToken } from "./cookies"
const API_URL = "https://backend-p4-klvc.onrender.com"

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-nombre": "TU_NOMBRE_AQUI",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (res.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login"
  }

  if (!res.ok) throw new Error("Error en la API")

  return res.json()
}