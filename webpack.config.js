const HtmlWebPackPlugin = require("html-webpack-plugin");
const createLodashAliases = require("lodash-loader").createLodashAliases;
module.exports = {
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader"}
			},
			{
				test: /\.js$/,
				loader: "babel-loader!lodash-loader"
			},
			{
				test: /\.html$/,
				use: [
					{loader: "html-loader"}
				]
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]"
			},
			{
				test: /\.(scss|sass)$/,
				use:[
					"style-loader",
					"css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/"
						}  
					}
				]
			}
		]
	},
	resolve: {alias: createLodashAliases()},
	devServer: {
		historyApiFallback: true,
		contentBase: "./dist"
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	]
};
