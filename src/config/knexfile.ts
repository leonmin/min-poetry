import config from 'config'

const base = {
  client: '',
  connection: {
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
  }
}
const options = config.has('db') && config.get('db') as object

export const knexfile = {
  ...base,
  ...options
}