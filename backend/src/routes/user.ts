import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { Hono } from "hono";
import hashPassword from '../passwordHashing';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_PASSWORD: string
    }
    Variables: {
        userId: string
    }
}>();

userRouter.post('/api/v1/user/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const password = await hashPassword(body.password)
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: password
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_PASSWORD)
        return c.json({
            user: user,
            message: "User successfully created"
        }, 200)
    }
    catch (error: any) {
        return c.json({
            message: error.message
        }, 500)
    }
})

userRouter.post('/api/v1/user/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

        const body = await c.req.json();
        const password = await hashPassword(body.password)
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: password
            }
        })
        if (!user) {
            c.status(403)
            return c.json({ message: "user does not exist in the database" })
        }
        const token = await sign({ id: user.id }, c.env.JWT_PASSWORD)
        return c.json({
            token: token,
            message: "you are signed in"
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({
            message: error.message
        })
    }
})