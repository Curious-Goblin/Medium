import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from '@curious-goblin/medium-blogging-website-common';

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
        const date = new Date();
        const formattedDate = formatDate(date);
        const { success } = createPostInput.safeParse(body)
        if (!success) {
            c.status(403)
            return c.json({ msg: "inputs are not correct" })
        }
        const blog = await prisma.blogs.create({
            data: {
                title: body.title,
                content: body.content,
                date: formattedDate,
                authorId: c.get('userId')
            }
        })
        c.status(200)
        return c.json({
            id: blog.id,
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

blogRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json();
        const date = new Date();
        const formattedDate = formatDate(date);
        const { success } = updatePostInput.safeParse(body)
        if (!success) {
            c.status(403)
            return c.json({ msg: "inputs are not corrrect" })
        }
        const blog = await prisma.blogs.update({
            where: {
                id: c.req.param('id')
            },
            data: {
                title: body.title,
                content: body.content,
                date: formattedDate
            },
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
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
blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blogs.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                authorId: c.get("userId")
            }
        })
        c.status(200)
        return c.json({
            blog
        })
    }
    catch (error: any) {
        c.status(500)
        c.error
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
        const blog = await prisma.blogs.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        }
        )
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
        const blog = await prisma.blogs.findFirst({
            where: {
                id: c.req.param('id')
            },
            select: {
                content: true,
                title: true,
                id: true,
                date: true,
                author: {
                    select: {
                        name: true
                    }
                }
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

const formatDate = (date: Date): string => {
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    return `${day} ${month} ${year}`;
};
