import { verify } from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../env";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";

interface IPayload {
     sub: string
}

export async function authentication(request: FastifyRequest, reply: FastifyReply) {
     try {
          const headerAuthorization = request.headers.authorization
          if (headerAuthorization === undefined) {
               throw new Error()
          }

          const [, token] = headerAuthorization.split(' ')

          const { sub: user_id } = verify(token, env.JWT_SECRET) as IPayload

          const usersRepository = new PrismaUsersRepository()

          const user = await usersRepository.findbyId(user_id)

          if (user === null) {
               throw new Error()
          }

          request.userId = user_id
     } catch (err) {
          return await reply.status(401).send({ message: 'Usuário não autenticado.' })
     }
}