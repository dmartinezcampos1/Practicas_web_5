import { Post } from "../lib/types"
import { apiFetch } from "../lib/api"

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  async function handleLike() {
    await apiFetch(`/posts/${post.id}/like`, {
      method: "POST",
    })
  }

  async function handleRetweet() {
    await apiFetch(`/posts/${post.id}/retweet`, {
      method: "POST",
    })
  }

  return (
    <div className="post">
      <p className="post-content">{post.content}</p>
      <p className="post-user">@{post.author?.username}</p>
      <div className="post-actions">
        <button onClick={handleLike}>
            ❤️ {post.likes}
        </button>

        <button onClick={handleRetweet}>
            🔁 {post.retweets}
        </button>
      </div>
    </div>
  )
}