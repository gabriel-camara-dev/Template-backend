import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
     create: (data: Prisma.UserCreateInput) => Promise<User>
     findById: (id: number) => Promise<User | null>
     findByPublicId: (publicId: string) => Promise<User | null>
     findByEmail: (email: string) => Promise<User | null>
     setLastLogin: (id: number) => Promise<void>
     delete: (id: number) => Promise<void>
     update: (id: number, data: Prisma.UserUpdateInput) => Promise<User>
}