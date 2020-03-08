// 分析后端会出现的异常  如何返回给前端
// 除了状态码  还要明确错误详情
// 所以需要自定义错误码 error_code  请求url
// 区分已知错误  和未知错误
const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (!isHttpException && isDev) {
      throw error
    }
    if (isHttpException) {
      const { msg, code, errorCode, data } = error
      ctx.body = {
        msg,
        error_code: errorCode,
        request: `${ctx.method} ${ctx.path}`,
        data
      }
      ctx.status = code
    } else {
      // 全局异常处理
      ctx.body = {
        msg: 'we make a mistake !!!',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
