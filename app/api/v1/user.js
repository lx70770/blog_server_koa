const Router = require('koa-router')
const { RegisterValidator, LoginValidator } = require('../../validators/validator')
const { User } = require('../../models/user')
const { success } = require('../../lib/helper')
const { generateToken } = require('../../../core/util')
// const { Auth } = require('../../../middleware/auth')

const user = new Router()
user.prefix('/v1/user')

user.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    username: v.get('body.username'),
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  await User.create(user)
  success()
})

user.post('/login', async ctx => {
  const v = await new LoginValidator().validate(ctx)
  const token = await LoginCheck(v.get('body.username'), v.get('body.password'))
  ctx.body = {
    token
  }
})

async function LoginCheck(username, password) {
  const user = await User.verifyUserPassword(username, password)
  const token = generateToken(user.uuid, 2)
  return token
}

module.exports = user
