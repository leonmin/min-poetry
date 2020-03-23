import Router from '@koa/router'
import { testCtrl } from '../controllers/index'
const router: Router = new Router()

router.get('/', testCtrl.get)
router.get('/test', async ctx => {
  console.log(ctx)
})

export const test: Router.Middleware = router.routes()
