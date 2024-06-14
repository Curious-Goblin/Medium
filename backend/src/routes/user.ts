import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { Hono } from "hono";
import hashPassword from '../passwordHashing';
import { signupInput, signinInput } from '@curious-goblin/medium-blogging-website-common';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_PASSWORD: string
    }
    Variables: {
        userId: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body)
        if (!success) {
            c.status(403)
            return c.json({ msg: "inputs are not correct" })
        }
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
            message: "User successfully created",
            token: token
        }, 200)
    }
    catch (error: any) {
        return c.json({
            message: error.message
        }, 500)
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const { success } = signinInput.safeParse(body)
        if (!success) {
            c.status(403)
            return c.json({ msg: "inputs are not correct" })
        }
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

userRouter.post('/me', async (c, next) => {
    try {
        const jwt = c.req.header("Authorization");
        if (!jwt) {
            c.status(401)
            return c.json({ error: "unauthorized" })
        }
        const success = await verify(jwt, c.env.JWT_PASSWORD) as { id: string }
        if (success) {
            c.set("userId", success.id)
            await next()
        }
        else {
            c.status(403)
            return c.json({
                error: "you are not authenticated"
            })
        }
    }
    catch (error: any) {
        c.status(500)
        return c.json({ message: error.message })
    }
}, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const id = c.get('userId')
        const response = await prisma.user.findFirst({ where: { id: id } })
        if (response) {
            c.status(200)
            c.json({
                signal: true
            })
        }
        else {
            c.json({
                signal: false
            })
        }
    }
    catch (error) {
        c.status(500)
        c.json({
            signal: false,
            msg: error
        })
    }
})