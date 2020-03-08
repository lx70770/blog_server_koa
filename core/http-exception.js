/*
 * 自定义异常类
 */

class HttpException extends Error {
  constructor(msg = 'something warong', code = 400, errorCode = 10000) {
    super()
    this.msg = msg
    this.code = code
    this.errorCode = errorCode
  }
}

// 操作成功也作为一种异常抛出
class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'ok'
    this.code = 201
    this.errorCode = errorCode || 0
  }
}

// 操作成功携带数据
class SuccessWithData extends HttpException {
  constructor(data) {
    super()
    this.msg = 'ok'
    this.code = 200
    this.data = data
    this.errorCode = 0
  }
}

// 参数错误
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.code = 400
    this.errorCode = errorCode || 10000
  }
}

// 资源未找到
class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'resource not found'
    this.code = 404
    this.errorCode = errorCode || 10000
  }
}

// 授权失败
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'authorization failed'
    this.code = 401
    this.errorCode = errorCode || 10004
  }
}

// 禁止访问
class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'authorization failed'
    this.code = 403
    this.errorCode = errorCode || 10006
  }
}

// 已经喜欢
class LikeError extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'do not like again'
    this.code = 400
    this.errorCode = errorCode || 60001
  }
}

// 已经不喜欢
class DislikeError extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || 'do not dislike again'
    this.code = 400
    this.errorCode = errorCode || 60002
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  SuccessWithData,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError
}
