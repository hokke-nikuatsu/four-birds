const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			publicPath: '/',
		}),
		new webpack.EnvironmentPlugin({
			ENV: 'development',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'public',
					to: '.',
					globOptions: {
						ignore: ['**/index.html'],
					},
				},
			],
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		compress: true,
		port: 3000,
		headers: {
			'Cross-Origin-Embedder-Policy': 'unsafe-none',
			'Cross-Origin-Opener-Policy': 'same-origin',
		},
		historyApiFallback: true,
	},
};
