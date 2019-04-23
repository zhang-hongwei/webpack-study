/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-23 13:51:25
 */

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let webpack = require("webpack");
let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        home: "./src/index.js",
        other: "./src/a.js"
    },
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
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-proposal-decorators",
                                { legacy: true }
                            ]
                        ]
                    }
                }
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
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new CopyWebpackPlugin([
            {
                from: "./docs",
                to: "./docs"
            }
        ]),
        new webpack.BannerPlugin("make 2019 zhw"),
        new webpack.DefinePlugin({ DEV: JSON.stringify("dev"),FLAG:"true" })
    ],
    externals: {
        jquery: "$"
    },
    devServer: {
        port: 9009
    }
};
