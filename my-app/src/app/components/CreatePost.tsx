"use client"

import { useState } from "react"
import { apiFetch } from "../lib/api"

export default function CreatePost({
  onPostCreated,
}: {
  onPostCreated: () => void
}) {
  const [content, setContent] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await apiFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
    })

    setContent("")
    onPostCreated()
  }

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="¿Qué está pasando?"
      />
      <button type="submit">Publicar</button>
    </form>
  )
}