import config from 'config'
import koaJwt from 'koa-jwt'

export const jwt = koaJwt({
  getToken (ctx) {
    const { authorization } = ctx.header
    if (authorization) {
      return authorization.split(' ')[1]
    }
    return null
  },
  secret: config.get('secret'),
  passthrough: true,
  key: 'jwt'
})