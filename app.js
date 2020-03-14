const Koa = require('koa')
const Koa_Logger = require('koa-logger')
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middleware/exception')

const app = new Koa()
const logger = Koa_Logger()

app.use(parser())
app.use(catchError)
app.use(logger)

InitManager.initCore(app)
app.listen(3000)
