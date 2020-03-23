import qs from 'qs'
import Koa from 'koa'

const filters = [] as string[]

export const pager = (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.method !== 'GET') {
    return next()
  }

  ctx.query = qs.parse(ctx.querystring)

  const { query } = ctx
  query.limit = parseInt(query.limit, 10) || 5
  query.skip = query.offset = parseInt(query.offset, 10) || 0

  if (query.page) {
    query.page = parseInt(query.page, 10)
    query.skip = query.offset = (query.page - 1) * query.limit
  }

  filters.forEach(f => {
    if (!query[f] || Array.isArray(query[f])) return
    if (!query[f]) {
      query[f] = [query[f]]
    }
  })
  return next()
}
