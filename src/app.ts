import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { userRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(cors, {
     origin: env.FRONTEND_URL,
     credentials: true,
   })

app.register(fastifyCookie)

app.register(fastifyJwt, {
     secret: env.JWT_SECRET,
     cookie: {
       cookieName: 'refreshToken',
       signed: false,
     },
     sign: {
       expiresIn: '5m',
     },
})

app.register(userRoutes)

app.setErrorHandler((error, _, reply) => {
     if (error instanceof ZodError) {
       return reply
         .status(400)
         .send({ message: 'Validation error!', issues: error.format() })
     }
   
     if (env.NODE_ENV !== 'production') {
       console.error(error)
     } else {
       // TODO: Send error to monitoring service
     }
   
     reply.status(500).send({ message: 'Internal server error' })
})