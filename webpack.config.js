/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-21 22:45:05
 */

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.[hash:8].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true
            },
            hash: true
        })
       
    ],
    devServer: {
        port: 9009,
        progress: true,
        contentBase: "./dist"
    }
};
