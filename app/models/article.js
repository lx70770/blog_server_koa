const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const { User } = require('./user')
const { NotFound } = require('../../core/http-exception')

// 之前是define方法
class Article extends Model {
  static async getList(limit, offset) {
    const total = await Article.count()
    const article = await Article.findAll({
      limit,
      offset,
      attributes: {
        // include: [],
        exclude: ['deletedAt', 'UserUuid']
      }
    })
    return { total, article }
  }

  static async addArticle(type, title, content, description, uuid) {
    const user = await User.findOne({ where: { uuid } })
    if (!user) throw new NotFound('user not found')
    sequelize.transaction(async t => {
      const article = await Article.create(
        { type, title, description, content },
        { transaction: t }
      )
      await user.addArticle(article, { transaction: t })
    })
  }
}

Article.init(
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true, // 主键
      defaultValue: Sequelize.UUIDV4
    },
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    content: {
      type: Sequelize.TEXT('long')
    },
    star: { type: Sequelize.INTEGER, defaultValue: 0 },
    description: Sequelize.STRING(1234)
  },
  {
    sequelize,
    tableName: 'article',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

User.hasMany(Article)
Article.belongsTo(User, { foreignKey: 'user_uuid' })

module.exports = { Article }
