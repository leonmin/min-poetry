import Koa from 'koa'
import http from 'http'
import util from 'util'
import pEvent from 'p-event'
import stoppable from 'stoppable'

export const createServerAndListen = async (app: Koa, port: number, host: string): Promise<stoppable.StoppableServer> => {
  const server = stoppable(http.createServer(app.callback()), 7000)
  server.listen(port, host)
  server.stop = util.promisify(server.stop)
  await pEvent(server, 'listening')
  return server
}
