import { users } from "@/app/lib/db"

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body

    const user = users.find(
        u => u.email === email && u.password === password
    )

    if (!user) {
        return Response.json(
            { error: "Credenciales incorrectas" },
            { status: 401 }
        )
    }

    return Response.json({
        token: "fake-jwt-token",
        user
    })
}