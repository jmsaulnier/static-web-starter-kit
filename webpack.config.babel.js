import path from 'path';
import fs from 'fs';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

module.exports = {

	entry: {
		vendors: [
      'domready',
      'gsap',
      'gsap-then',
			'redux',
			'react',
			'react-dom',
			'react-redux',
			'react-router-dom'
			],
    app: ENV==='production' ? [
			'./src/index.js'
		] : [
      'react-hot-loader/patch', // activate HMR for React
			'webpack-dev-server/client?http://localhost:8080',
			'./src/index.js'
    ]
	},

	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: '/',
		filename: ENV==='production' ? '[name].[chunkhash].js' : '[name].js',
		chunkFilename: '[id].[chunkhash].js',
	},

	module: {
		rules: [
			{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src')
        ],
      },
      {
        test: /\.css$/,
        loader: ENV==='production' ? ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                localIdentName: '[local]___[hash:base64:5]',
                importLoaders: 2,
                modules: true,
              },
            },
            'postcss-loader',
          ],
        }) : [
          'style-loader',
          'css-loader?modules&localIdentName=[local]_[hash:base64:3]',
          'postcss-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        query: {
          name: '[name].[ext]?[hash:4]',
        },
      },
      {
        test: /\.(xml|html|txt|md)$/,
        loader: 'raw-loader',
        query: {
          name: '[name].[ext]?[hash:4]',
        },
      },
      {
        test: /\.jpg$|\.gif$|\.png$|\.woff$|\.woff2$|\.ttf$|\.svg$|\.eot$|\.wav$|\.mp3$|\.bin$/,
        loader: ENV==='production' ? 'file?name=[path][name]_[hash:base64:4].[ext]' : 'url-loader',
        query: {
          name: '[name].[ext]?[hash:4]',
        },
      },
      // GLSL
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader' }
    ]
} ,

	plugins: ([

		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),

		new HtmlWebpackPlugin({
			hash: true,
      filename: 'index.html',
      template: 'index.template.ejs',
      inject: true,
			googleAnalyticsID: ENV==='production' ? 'UA-XXXXXXXX-X' : 'UA-XXXXXXXX-X',
			//FBAppId: ENV==='production' ? '' : '',
			version: pkg.version,
			chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),

	]).concat(ENV==='production' ? [

		new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
    }),

		// extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css'),

    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),

		new webpack.LoaderOptionsPlugin({
      minimize: true,
			debug: false
		}),

    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
    }),

    new CompressionPlugin(),

		//new BundleAnalyzerPlugin(),

    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: 'index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
	] : []).concat(ENV==='development' ? [

		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),

	] : []),

	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		publicPath: '/',
		contentBase: ['./src', './static'],
		historyApiFallback: true,
		hot: true,  // enable HMR on the server
		//https: {
		//	key: fs.readFileSync('localhost.pem', 'utf8'),
		//	cert: fs.readFileSync('localhost.pem', 'utf8')
		//},
		proxy: {
			// OPTIONAL: proxy configuration:
			// '/optional-prefix/**': { // path pattern to rewrite
			//   target: 'http://target-host.com',
			//   pathRewrite: path => path.replace(/^\/[^\/]+\//, '')   // strip first path segment
			// }
		}
	}
};
