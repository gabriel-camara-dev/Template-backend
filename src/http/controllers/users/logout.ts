import { type FastifyRequest, type FastifyReply } from 'fastify'
import { env } from '../../../env'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    // Esse tanto de if/else é só uma forma de tratar os erros possíveis após verificação do token
    if (error instanceof Error) {
      if (
        error.message ===
        'Authorization token is invalid: The token is malformed.'
      ) {
        return await reply.status(400).send({ message: 'Invalid token' })
      } else if (error.message === 'Authorization token expired') {
        return await reply.status(400).send({ message: 'Token expired' })
      } else if (
        error.message === 'No Authorization was found in request.cookies'
      ) {
        return await reply.status(400).send({ message: 'No token provided' })
      } else {
        throw error
      }
    } else {
      throw error
    }
  }

  return await reply
    .clearCookie('refreshToken', {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(200)
    .send({ message: 'Logout realizado com sucesso' })
}