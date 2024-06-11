import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_PASSWORD: string
    }
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
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
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const blog = await prisma.blogs.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get('userId')
            }
        })
        c.status(200)
        return c.json({
            blog: blog,
            message: "blog created!"
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({
            message: error.message
        })
    }
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const blog = await prisma.blogs.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        c.status(200)
        return c.json({
            blog: blog,
            message: "blog updated!"
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({
            message: error.message
        })
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blogs.findMany()
        c.status(200)
        return c.json({
            blog
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({
            message: error.message
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const blog = await prisma.blogs.findFirst({
            where: {
                id: c.req.param('id')
            }
        })
        c.status(200)
        return c.json({
            blog: blog,
            message: "blog found!"
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({
            message: error.message
        })
    }
})
