import { ParameterizedContext } from "koa"
import Router from "@koa/router"
import { db, format } from '../lib/utils'

export default {
  get: async (ctx: ParameterizedContext<any, Router.RouterParamContext<any, {}>>) => {
    await db('poetries')
      .first()
      .where({
        author: '柳永'
      })
      .then((res: any): void => {
        ctx.body = format(200, res)
      })
      .catch((err: any): void => {
        ctx.body = format(500, null, err + '')
      })
  }
}