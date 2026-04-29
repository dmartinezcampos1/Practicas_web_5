export function setToken(token: string) {
  document.cookie = `token=${token}; path=/`
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null

  const match = document.cookie.match(/(^| )token=([^;]+)/)
  return match ? match[2] : null
}

export function removeToken() {
  document.cookie = "token=; path=/; max-age=0"
}