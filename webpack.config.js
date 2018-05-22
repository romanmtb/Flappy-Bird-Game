const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
  },
  module: {

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,

        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: [/\.css$/, /\.scss$/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/css'], // <<<
            },
          },
        ],
      },

      //{
      //  test: /\.(svg|png|jpg|gif)$/,
      //  use: [{
      //    loader: 'file-loader',
      //    options: {
      //      includePaths: ['./src/img'], // <<<
      //    },
      //  }],
      //},

      //{
      //  test: /\.html$/,
      //  use: [
      //    {
      //      loader: 'html-loader',
      //      options: { minimize: true },
      //    },
      //  ],
      //},

    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
