process.env['NODE_CONFIG_DIR'] = __dirname + '/config/'
import { createServerAndListen } from './lib/server'
import config from 'config'
import { app } from './lib/app'
import { db } from './lib/utils'
import { logger } from './lib/logger'
import pEvent from 'p-event'
 
const main = async () => {
  const host: string = config.get('server.host')
  const port: number = config.get('server.port')
  console.log('ccc', config.get('db'))
  let server
  try {
    await db.select(db.raw('1'))
    logger.debug('db connect..')
    server = await createServerAndListen(app, port, host)
    logger.debug(`server is listening on: ${host}:${port}`)
    await Promise.race([
      ...['SIGINT', 'SIGHUP', 'SIGTREM'].map(s =>
        pEvent(process, s, {
          rejectionEvents: ['uncaughtException', 'unhandledRejection']
        }))
    ])
  } catch (err) {
    process.exitCode = 1
    logger.fatal(err)
  } finally {
    if (server) {
      logger.debug('close server')
      await server.stop()
      logger.debug('server closed')
    }
    logger.debug('close database')
    await db.destroy()
    logger.debug('database closed')
    setTimeout(() => process.exit(), 10000).unref()
  }
}

main()
