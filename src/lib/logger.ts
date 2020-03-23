import os from 'os'
import pino from 'pino'
import config from 'config'
import { IncomingMessage } from 'http'

const serializers = {
  req: (req: IncomingMessage) => {
    return pino.stdSerializers.req(req)
  },
  res: pino.stdSerializers.res,
  err: pino.stdSerializers.err,
  error: pino.stdSerializers.err,
}
const opts = {
  level: config.get('env.logLevel') as string,
  serializers,
  base: {
    NODE_ENV: process.env.NODE_ENV,
    environment: config.get('env.environment'),
    version: config.get('env.version'),
    name: config.get('env.name'),
    pid: process.pid,
    hostname: os.hostname()
  }
}


export const logger = pino(opts)
