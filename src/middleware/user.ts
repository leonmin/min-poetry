import Koa from 'koa'
import { db } from '../lib/utils'

export const user = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx && ctx.state && ctx.state.jwt && ctx.state.jwt.openid) {
    ctx.state.user = await db('users')
      .first()
      .where({
        openid: ctx.state.jwt.openid
      })
  }
  return next()
}
