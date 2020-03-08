const { Sequelize, Model } = require('sequelize')

const { Article } = require('./article')
const { sequelize } = require('../../core/db')
const { LikeError, DislikeError } = require('../../core/http-exception')

// 之前是define方法
class Star extends Model {
  static async like(article_uuid, uuid) {
    // 添加一个喜欢
    const start = await Star.findOne({ where: { article_uuid, uuid } })
    if (start) {
      throw new LikeError()
    }
    return sequelize.transaction(async t => {
      await Star.create({ article_uuid, uuid }, { transaction: t })
      const article = await Article.findOne({ where: { uuid: article_uuid } }, { transaction: t })
      await article.increment('star', { by: 1, transaction: t })
    })
  }
  static async dislike(article_uuid, uuid) {
    // 添加一个喜欢
    const start = await Star.findOne({ where: { article_uuid, uuid } })
    if (!start) {
      throw new DislikeError()
    }
    return sequelize.transaction(async t => {
      await start.destroy({ force: true, transaction: t })
      const article = await Article.findOne({ where: { uuid: article_uuid } }, { transaction: t })
      await article.decrement('star', { by: 1, transaction: t })
    })
  }
}

Star.init(
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true, // 主键
      defaultValue: Sequelize.UUIDV4
    },
    article_uuid: Sequelize.UUID
  },
  { sequelize, tableName: 'star' }
)

module.exports = { Star }
