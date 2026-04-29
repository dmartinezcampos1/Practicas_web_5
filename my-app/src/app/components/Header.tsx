"use client"
import { removeToken } from "../lib/cookies"

import Link from "next/link"

export default function Header() {
  function logout() {
    removeToken()
    document.cookie = "token=; path=/; max-age=0"
    window.location.href = "/login"
  }

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile/me">Perfil</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  )
}