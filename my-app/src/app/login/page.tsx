"use client"

import { useState } from "react"
import { apiFetch } from "../lib/api"
import { setToken } from "../lib/cookies"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"

            const body = isLogin
                ? { email, password }
                : { email, password, username }

            const data = await apiFetch<any>(endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            })

            if (isLogin) {
                if (!data?.token) {
                    alert("Error en login: no hay token")
                    return
                }

                setToken(data.token)
                document.cookie = `token=${data.token}; path=/`
                window.location.href = "/"

            } else {
                alert("Usuario registrado correctamente")
                setIsLogin(true)
            }

        } catch (err) {
            console.error(err)
            alert("Error en la petición atontao")
        } finally {
            setLoading(false)
        }
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

                <button type="submit" disabled={loading}>
                    {loading
                        ? "Cargando..."
                        : isLogin
                            ? "Entrar"
                            : "Registrarse"}
                </button>
            </form>

            <button onClick={() => setIsLogin(!isLogin)}>
                Cambiar a {isLogin ? "registro" : "login"}
            </button>
        </div>
    )
}