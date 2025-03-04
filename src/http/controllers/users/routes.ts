import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { refreshToken } from "./refresh-token";
import { logout } from "./logout";
import { register } from "./register";

export async function userRoutes(app: FastifyInstance) {
     app.post('/users', register)

     app.post('/sessions', authenticate)

     app.post('/sessions/refresh-token', refreshToken)

     app.delete('/sessions', logout)
}