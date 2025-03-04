import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async setLastLogin(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        last_login: new Date(),
      },
    })
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findbyId(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
