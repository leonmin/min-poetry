const config = {
  secret: 'secret',
  server: {
    host: '0.0.0.0',
    port: 1667
  },
  env: {
    environment: 'local',
    logLevel: 'debug',
    name: 'min-poetry',
    version: '0.0.1'
  },
  db: {
    client: 'mysql2',
    connection: {
      host: 'cdb-ck7xzqbm.bj.tencentcdb.com',
      port: 10053,
      user: 'root',
      password: 'ouyapingsql1',
      database: 'min_poetry'
    }
  },
  wx: {
    appid: 'wxdcfd0968c5f2fe7d',
    secret: '8ae9c7fef6e141861aa19c7802dc070e'
  }
}

export default config
