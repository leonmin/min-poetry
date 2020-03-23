import Koa from 'koa'
import humps from 'humps'

export const camelize = async (ctx: Koa.Context, next: Koa.Next) => {
  await next()
  if (ctx.body && typeof ctx.body === 'object') {
    ctx.body = humps.camelizeKeys(ctx.body)
  }
}