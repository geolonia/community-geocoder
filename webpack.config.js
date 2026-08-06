const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js',
    api: './src/api.js',
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        // package.json の "type": "commonjs" により、webpack は .js を
        // javascript/dynamic として扱い ESM 構文を解析できなくなる。
        // babel-loader に渡す前の判定を auto に戻す。
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
