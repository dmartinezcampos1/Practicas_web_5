import { apiFetch } from "../../lib/api"
import { Post, Comment } from "../../lib/types"

interface Props {
  params: { id: string }
}

export default async function PostDetail({ params }: Props) {
  const post = await apiFetch<Post>(`/posts/${params.id}`)
  const comments = await apiFetch<Comment[]>(
    `/posts/${params.id}/comments`
  )

  return (
    <div>
      <h1>{post.content}</h1>
      <p>@{post.author.username}</p>

      <h2>Comentarios</h2>
      {comments.map(c => (
        <p key={c.id}>{c.content}</p>
      ))}
    </div>
  )
}