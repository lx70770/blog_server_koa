const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { PASSWORD_REG } = require('../../config/constant')

class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', 'is malformed')]
    this.username = [
      new Rule('isLength', 'length is between 4 and 12 characters', { min: 4, max: 12 })
    ]
    this.password1 = [
      new Rule('isLength', 'length is between 6 and 32 characters', { min: 6, max: 32 }),
      new Rule('matches', 'does not meet specifications', PASSWORD_REG)
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isOptional'),
      new Rule('isLength', 'length is between 6 and 32 characters', { min: 6, max: 32 })
    ]
  }

  validatePassword(values) {
    const { password1, password2 } = values.body
    if (password1 !== password2) {
      throw new Error('The two passwords must be the same')
    }
  }

  async validateUsername(values) {
    const { username } = values.body
    const user = await User.findOne({ where: { username } })
    if (user) {
      throw new Error('username already exists')
    }
  }

  async validateEmail(values) {
    const { email } = values.body
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw new Error('email already exists')
    }
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', 'length is between 4 and 12 characters', { min: 4, max: 12 })
    ]
    this.password = [
      new Rule('isLength', 'length is between 6 and 32 characters', { min: 6, max: 32 }),
      new Rule('matches', 'does not meet specifications', PASSWORD_REG)
    ]
  }
}

class ArticleListValidator extends LinValidator {
  constructor() {
    super()
    this.limit = [new Rule('isInt', 'should greater than 0', { min: 1 })]
    this.offset = [new Rule('isInt', 'should greater than 0', { min: 0 })]
  }
}

class ArticleValidator extends LinValidator {
  constructor() {
    super()
    this.type = [new Rule('isIn', 'not allowed', ['111', '222', '333'])]
    this.title = [
      new Rule('isLength', 'length is between 1 and 256 characters', { min: 1, max: 128 })
    ]
    this.content = [new Rule('isOptional')]
    this.description = [
      new Rule('isLength', 'length is between 1 and 512 characters', { min: 1, max: 512 })
    ]
  }
}

class StarValidator extends LinValidator {
  constructor() {
    super()
    this.article_uuid = [new Rule('isLength', 'not allowed', { min: 30 })]
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator,
  ArticleListValidator,
  ArticleValidator,
  StarValidator
}
