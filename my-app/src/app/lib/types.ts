export type User ={
  id: string
  username: string
  bio?: string
  followersCount: number
  followingCount: number
}

export type Post ={
  id: string
  content: string
  createdAt: string
  likes: number
  retweets: number
  author: User
}

export type Comment ={
  id: string
  content: string
  createdAt: string
  author: User
}