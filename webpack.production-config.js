const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: "production",
  //devtool: "none",

  entry: {
    main: "./src/scripts/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      }),
      new TerserPlugin()
    ],
  },

  module: {
    rules: [
      {
        test: /\.exec\.js$/,
        exclude: /node_modules/,
        use: [ 'script-loader' ]
      },

      {
        test: /\.html$/i,
        use: ['html-loader'],
      },

      {
        test: /\.(svg|png|jpe?g|gif)$/i,

        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[hash].[ext]",
            outputPath: 'images',
            esModule: false, //////////////////// [object Module]
          },
        }

      },

      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
        },
        'css-loader'
        ],
      },

    ],

  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
       }
    }),
    new MiniCssExtractPlugin({
     filename: './styles/[name].[contentHash].css',
     // chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
  ],

}
