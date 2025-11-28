module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/bookstore-frontend/' : '/',
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true,
    host: 'localhost',
    client: {
      webSocketURL: 'ws://localhost:8080/ws'
    }
  }
}
