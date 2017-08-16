const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}},
						'sass-loader'
					]
				}),
				exclude: /node_modules/
			},
			{
				test: /\.s[ac]ss/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { modules: false }},
						'sass-loader'
					]
				}),
				include: /node_modules/
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ filename: '[name].bundle.css' }),
		new HtmlWebpackPlugin({
			title: 'WaniKani Leech Detector',
			template: 'src/index.ejs'
		})
	]
};
