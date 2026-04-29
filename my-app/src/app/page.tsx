"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "./lib/api"
import { Post } from "./lib/types"
import PostCard from "./components/PostCard"
import CreatePost from "./components/CreatePost"
import { getToken } from "./lib/cookies"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)

  async function loadPosts() {
    const data = await apiFetch<{ posts: Post[] }>(
      `/posts?page=${page}`
    )
    setPosts(prev => [...prev, ...data.posts])
  }

  useEffect(() => {
  const token = getToken()
  if (!token) {
    window.location.href = "/login"
    return
  }

  loadPosts()
}, [page])

  return (
    <div className="container">
      <CreatePost onPostCreated={loadPosts} />

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      <button className="load-more" onClick={() => setPage(p => p + 1)}>
        Más
      </button>
    </div>
  )
}