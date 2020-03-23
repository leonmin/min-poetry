import Koa from 'koa'
import cors from '@koa/cors'
import bodyparser from 'koa-bodyparser'

export const app = new Koa()

import { router } from '../routes'

import { camelize } from '../middleware/camelize'
import { jwt } from '../middleware/jwt'
import { user } from '../middleware/user'
import { pager } from '../middleware/pager'

app.use(camelize)

app.use(cors({
  origin: '*',
  exposeHeaders: ['Authorization'],
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Authorization', 'Content-Type'],
  keepHeadersOnError: true
}))

app.use(jwt)
app.use(bodyparser())

app.use(user)
app.use(pager)

app.use(router.routes())
app.use(router.allowedMethods())
