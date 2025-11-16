module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true
  },
  // For GitHub Pages deployment
  // Change 'bookstore-frontend' to match your GitHub repository name
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bookstore-frontend/'
    : '/'
}
