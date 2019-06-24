const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader'},
                    { loader: 'postcss-loader',
                    	options: 
                    	{ 
                    		plugins: [
                    		require('autoprefixer'),
                    		require('postcss-css-variables')
                    		] 
                    	} 
                    },
                    { loader: 'sass-loader'}
                ],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		new OptimizeCssAssetsPlugin({})
	]
});