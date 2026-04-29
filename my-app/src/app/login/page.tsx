"use client"

import { useState } from "react"
import { apiFetch } from "../lib/api"
import { setToken } from "../lib/cookies"



export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
    
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const endpoint = isLogin ? "/auth/login" : "/auth/register"

    const body = isLogin
      ? { email, password }
      : { email, password, username }

    const data = await apiFetch<{ token: string }>(
      endpoint,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    )
setToken(data.token)
    document.cookie = `token=${data.token}; path=/`
    window.location.href = "/"
  }

  return (
    <div>
      <h1>{isLogin ? "Login" : "Registro"}</h1>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        )}

        <input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>

      <button onClick={() => setIsLogin(p => !p)}>
        Cambiar a {isLogin ? "registro" : "login"}
      </button>
    </div>
  )
}