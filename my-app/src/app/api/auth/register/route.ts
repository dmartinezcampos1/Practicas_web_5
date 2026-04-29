import { users } from "../../../../app/lib/db"

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password, username } = body

    const exists = users.find(u => u.email === email)

    if (exists) {
        return Response.json(
            { error: "Usuario ya existe" },
            { status: 400 }
        )
    }

    users.push({ email, password, username })

    return Response.json({ message: "Usuario creado" })
}