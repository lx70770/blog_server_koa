const { Success, SuccessWithData } = require('../../core/http-exception')

function success() {
  throw new Success()
}

function successWithData(data) {
  throw new SuccessWithData(data)
}

module.exports = { success, successWithData }
