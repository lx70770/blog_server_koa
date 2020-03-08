const Router = require('koa-router')
const { StarValidator } = require('../../validators/validator')
const { Star } = require('../../models/star')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middleware/auth')

const star = new Router()
star.prefix('/v1/star')

star.post('/', new Auth().ckeck, async ctx => {
  const v = await new StarValidator().validate(ctx)
  const article_uuid = v.get('body.article_uuid')
  const uuid = ctx.auth.uuid
  await Star.like(article_uuid, uuid)
  success()
})

star.post('/cancel', new Auth().ckeck, async ctx => {
  const v = await new StarValidator().validate(ctx)
  const article_uuid = v.get('body.article_uuid')
  const uuid = ctx.auth.uuid
  await Star.dislike(article_uuid, uuid)
  success()
})

module.exports = star
