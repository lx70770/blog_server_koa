const Sequelize = require('sequelize')

const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: true,
  timezone: '+08:00',
  define: {
    // 是否默认显示时间
    timestamps: true,
    paranoid: true,
    createAt: 'create_at',
    updateAt: 'update_at',
    deleteAt: 'delete_at',
    underscored: true
  }
})

sequelize.sync({
  force: false
})

module.exports = { sequelize }
