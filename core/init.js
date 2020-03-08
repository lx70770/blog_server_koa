const Router = require('koa-router')
const requireDirectory = require('require-directory')
const apiPath = `${process.cwd()}/app/api`

// 此处可以做一些初始化操作  引入routes  设置全局变量等等
class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoaderRouters()
    InitManager.loadConfig()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoaderRouters() {
    requireDirectory(module, apiPath, { visit: whenLoadModule })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
}

module.exports = InitManager
