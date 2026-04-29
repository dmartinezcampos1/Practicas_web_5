import { getToken } from "./cookies"
const API_URL = "https://backend-p4-klvc.onrender.com"

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    const token = getToken()

    const res = await fetch(`${API_URL}${url}`, {
        method: options?.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options?.headers || {})
        },
        body: options?.body,
    })

    const text = await res.text()

    let data
    try {
        data = JSON.parse(text)
    } catch {
        console.error("Respuesta NO JSON:", text)
        throw new Error("La API devolvió HTML o error (probablemente backend caído o ruta incorrecta)")
    }

    if (!res.ok) {
        throw new Error(data?.error || "Error en la API")
    }

    return data
}