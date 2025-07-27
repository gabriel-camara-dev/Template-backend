import { type USER_ROLE } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

export function verifyPermissions(allowedRoles: USER_ROLE[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = request.userId ?? '' // Para garantir que userId não seja null ou undefined

    const usersRepository = new PrismaUsersRepository()

    const user = await usersRepository.findbyId(userId)

    if (user === null) {
      throw new Error()
    }

    if (!allowedRoles.includes(user.role)) {
      return await reply.status(403).send({
        message: 'User does not have permission to use this resource.',
      })
    }
  }
}
