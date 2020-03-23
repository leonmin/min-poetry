import fs from 'fs'
import Knex from 'knex'
import http from 'http'
import path from 'path'
import config from 'config'
import rp from 'request-promise'
import { knexfile } from '../config/knexfile'
import { MinFormat, MinToken } from './types'



const file = path.join(__dirname, './wx/token.txt')

// get token
const getToken = async () => {
  const token = await readFile()
  return JSON.parse(token)
}
// set token
const setToken = async (data: MinToken) => {
  await writeFile(JSON.stringify(data))
}

// fs.read
const readFile = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}
// fs.write
const writeFile = (data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

// using weixin api take token
const queryToken = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      grant_type: 'client_credential',
      appid: config.get('wx.appid'),
      secret: config.get('wx.secret')
    },
    json: true
  }
  const res = await rp(options)
  if (res && res.access_token) {
    const t = {
      token: res.access_token,
      expiresTime: Date.now() + (res.expires_in - 10) * 1000
    }
    await setToken(t)
    return res.access_token
  }
}

// [util] db instance
export const db = Knex(knexfile)

// [util] response format
export const format = (code: number, data?: any, msg?: string, c?: number) => {
  const body = {
    statusCode: code || 200
  } as MinFormat
  if (body.statusCode === 200) {
    body.data = data
  } else {
    body.message = msg || http.STATUS_CODES[c || code] || '未知系统错误'
  }
  return body
}

// [util] client get wx token for user login
export const getWxToken = async () => {
  const res = await getToken()
  const now = new Date().getTime()
  if (res && res.token && res.expiresTime && res.expiresTime > now) {
    return res.token
  } else {
    return queryToken()
  }
}