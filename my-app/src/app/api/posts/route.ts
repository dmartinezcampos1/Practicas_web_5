export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get("page") || 1)

    const posts = [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" }
    ]

    return Response.json({
        posts,
        page
    })
}