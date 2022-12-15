const config = require('../webpack.config')

module.exports = {
  ...config,
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  devtool: 'inline-source-map',

  devServer: {
    open: true,
    liveReload: true,
    static: {
      directory: __dirname,
      watch: {
        poll: 500
      }
    },
    host: 'localhost',
    port: 3000,
    allowedHosts: 'all'
  },
}
