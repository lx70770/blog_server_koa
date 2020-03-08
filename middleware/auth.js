const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { Forbbiden } = require('../core/http-exception')

class Auth {
  constructor() {}

  get ckeck() {
    return async (ctx, next) => {
      let decode = null
      const userToken = basicAuth(ctx.req)
      if (!userToken || !userToken.name) {
        throw new Forbbiden()
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new Forbbiden('Token expired')
        }
        throw new Forbbiden()
      }
      // 上下文保存UUID和scope
      const { uuid, scope } = decode
      if (uuid && scope) {
        ctx.auth = { uuid, scope }
      }
      await next()
    }
  }
}

module.exports = { Auth }
