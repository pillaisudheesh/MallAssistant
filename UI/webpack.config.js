const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //entry: path.join(__dirname, "./src/widget/Index.jsx"),
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        fallback: {
          crypto: false,
        }
    },
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      server: {
        type: 'https',
      },
      port: 6500,
      liveReload: true,
      hot: true,
      open: true,
      historyApiFallback: true,
      // historyApiFallback: {
      //   index: 'index.html'
      // },
      proxy: [
        {
          context: '/mallassistant/api',
          target: 'http://localhost:8000',
          // router: () => 'https://localhost:5601',
          logLevel: 'debug',
          secure: false,
          changeOrigin: true
        }
      ]
    },
    plugins: [
          new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"), 
          }),
          new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            },
            
          },
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader','css-loader','postcss-loader']
          },
          
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    includePaths: ['node_modules']
                  }
                }
              }
            ]
          },
          {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|webp)(\?[a-z0-9=.]+)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
              }
            ]
          }
        ]
      },
};