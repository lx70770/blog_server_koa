const environment = process.env.NODE_ENV

module.exports = {
  environment: 'dev',
  database: {
    dbName: 'blog_db',
    host: '172.0.0.1',
    port: 3306,
    user: 'root',
    password: environment === 'production' ? 'Walx00..!' : 'password'
  },
  security: { secretKey: 'walx70770', expiresIn: 60 * 60 }
}
