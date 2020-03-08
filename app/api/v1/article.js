const Router = require('koa-router')
const { ArticleListValidator, ArticleValidator } = require('../../validators/validator')
const { Article } = require('../../models/article')
const { success, successWithData } = require('../../lib/helper')
const { Auth } = require('../../../middleware/auth')

const article = new Router()
article.prefix('/v1/article')

article.get('/list', async ctx => {
  const v = await new ArticleListValidator().validate(ctx)
  const limit = v.get('query.limit')
  const offset = v.get('query.offset')
  const { total, article } = await Article.getList(limit, offset)
  successWithData({ total, list: article })
})

article.post('/create', new Auth().ckeck, async ctx => {
  const v = await new ArticleValidator().validate(ctx)
  const type = v.get('body.type')
  const title = v.get('body.title')
  const description = v.get('body.description')
  const content = v.get('body.content') || ''
  const { uuid } = ctx.auth
  await Article.addArticle(type, title, content, description, uuid)
  success()
})

module.exports = article
