import type { FastifyRequest, FastifyReply } from 'fastify'
import { env } from '../../../env'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (error) {
    // Esse tanto de if/else é só uma forma de tratar os erros possíveis após verificação do token
    if (error instanceof Error) {
      if (
        error.message ===
        'Authorization token is invalid: The token is malformed.'
      ) {
        return await reply.status(401).send({ message: 'Invalid token' })
      } else if (error.message === 'Authorization token expired') {
        return await reply.status(401).send({ message: 'Token expired' })
      } else if (
        error.message === 'No Authorization was found in request.cookies'
      ) {
        return await reply.status(401).send({ message: 'No token provided' })
      } else {
        throw error
      }
    } else {
      throw error
    }
  }

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: (request.user as { sub: string }).sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: (request.user as { sub: string }).sub,
        expiresIn: '7d',
      },
    },
  )

  return await reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
      httpOnly: true,
    })
    .status(200)
    .send({ accessToken })
}