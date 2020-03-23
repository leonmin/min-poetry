import Router from '@koa/router'
import { test } from './test'

export const router: Router = new Router()
const api: Router = new Router()

api.use(test)


router.use('/api', api.routes())