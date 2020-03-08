const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const { NotFound, AuthFailed } = require('../../core/http-exception')

// 之前是define方法
class User extends Model {
  static async verifyUserPassword(username, plainPassword) {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      throw new NotFound('user not found')
    } else {
      const correctPassword = bcrypt.compareSync(plainPassword, user.password)
      if (!correctPassword) {
        throw new AuthFailed('incorrect password')
      }
    }
    return user
  }
}

User.init(
  {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true, // 主键
      defaultValue: Sequelize.UUIDV4
    },
    username: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(val, salt)
        this.setDataValue('password', password)
      }
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  { sequelize, tableName: 'user' }
)

module.exports = { User }
