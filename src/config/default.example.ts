const config = {
  // for jwt secret
  secret: 'secret',
  // koa server
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // for logger by pino
  env: {
    environment: 'local',
    logLevel: 'debug',
    name: 'koa-ts',
    version: '0.0.1'
  },
  // for db connection there is using mysql2 by knex
  db: {
    client: 'mysql2',
    connection: {
      host: 'yourmysqlhost.com',
      port: 10053,
      user: 'your_username',
      password: 'your_password',
      database: 'your_db'
    }
  },
  // for weixin miniprogram user login
  wx: {
    appid: 'wx_code',
    secret: 'wx_secret'
  }
}

export default config
