/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-21 23:14:21
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
    module: {
        // loader 特点 : 功能单一，可以组合使用，需要主义顺序 右==>左 下==>上
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insertAt: "top"
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insertAt: "top"
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            minify: {
                // removeAttributeQuotes: true
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
