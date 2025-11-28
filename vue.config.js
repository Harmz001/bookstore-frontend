module.exports = {
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
