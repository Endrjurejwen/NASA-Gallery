const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	entry: ['babel-polyfill','./src/js/index.js'],
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
        		use: {
            			loader: 'file-loader',
            			options: {
            				name: '[name].[ext]',
            				outputPath: 'assets/img/',
            				publicPath: 'assets/img/'
            			}
         			 }
      		},
      		{
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts/'
                    },
                }]
            },
      		{
			  test: /\.(html)$/,
			  use: {
			    loader: 'html-loader',
			  }
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	],
}