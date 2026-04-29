import { apiFetch } from "../../lib/api"
import { User, Post } from "../../lib/types"

interface Props {
  params: { username: string }
}

export default async function Profile({ params }: Props) {
  const user = await apiFetch<User>(
    `/users/${params.username}`
  )

  const posts = await apiFetch<{ posts: Post[] }>(
    `/users/${params.username}/posts`
  )

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>

      {posts.posts.map(post => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  )
}