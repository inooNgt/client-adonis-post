const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.argv.indexOf('-p') !== -1;
const buildPath = path.join(__dirname, '../dist');
const sourcePath = path.join(__dirname, '../src');

// Common plugins
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'index.html'),
    path: buildPath,
    filename: 'index.html'
  })
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.css/,
    loader: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap: !isProduction, importLoaders: 1 }
      },
      {
        loader: 'postcss-loader',
        options: {
          modules: true, //模块化类名
          importLoaders: 1,
          localIdentName: '[name]_[local]_[hash:base64]',
          sourceMap: !isProduction,
          plugins: loader => [
            autoprefixer({
              browsers: [
                'last 3 version',
                'ie >= 10',
                'iOS >= 7',
                'Android >= 4.1'
              ]
            })
          ]
        }
      }
    ]
  },
  {
    test: /\.(scss|sass)$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      // Using source maps breaks urls in the CSS loader
      // https://github.com/webpack/css-loader/issues/232
      // This comment solves it, but breaks testing from a local network
      // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
      // 'css-loader?sourceMap',
      {
        loader: 'css-loader',
        options: { sourceMap: !isProduction, importLoaders: 2 }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: !isProduction,
          plugins: loader => [
            autoprefixer({
              browsers: [
                'last 3 version',
                'ie >= 10',
                'iOS >= 7',
                'Android >= 4.1'
              ]
            })
          ]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProduction
        }
      }
    ]
  },
  /*   {
    test: /\.(png|gif|jpg|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 20480
        }
      }
    ]
  }, */
  {
    test: /\.(png|jpg|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  }
];

const PORT = 9091;

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: {
    js: ['@babel/polyfill', resolve(`${sourcePath}/app.js`)]
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: 'app-[hash].js'
  },
  module: {
    rules
  },
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx',
      '.scss'
    ],
    alias: {
      components: resolve('../src/components'),
      src: resolve('../src'),
      static: resolve('../static'),
      utils: resolve('../src/utils'),
      store: resolve('../src/store'),
      scss: resolve('../src/scss')
    }
  },
  plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: isProduction
        }
      })
    ]
  },
  /* https://github.com/webpack-contrib/webpack-serve */
  serve: {
    port: PORT,
    dev: {
      logLevel: 'warn'
    },
    hot: {
      logLevel: 'warn'
    },
    add: (app, middleware, options) => {
      app.use(
        convert(
          proxy('/api', {
            target: 'http://inoongt.tech',
            changeOrigin: true
          })
        )
      );
      app.use(convert(history({})));
    },
    on: {
      'build-started': () => {}
    }
  }
};
