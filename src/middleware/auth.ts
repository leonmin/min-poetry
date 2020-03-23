import Koa from 'koa'
import { format } from '../lib/utils'
export const auth = async (ctx: Koa.Context, next: Koa.Next) => {
  if (!ctx.state.user) {
    ctx.body = format(401)
  }
  return next()
}
