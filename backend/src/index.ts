import { Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign } from 'hono/jwt'
import hashPassword from './passwordHashing'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono()

app.route('/api/v1/user',userRouter);
app.route('api/v1/blog',blogRouter);

export default app
