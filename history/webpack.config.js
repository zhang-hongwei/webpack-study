/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-23 10:38:09
 */

let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: {
        home: './src/index.js',
        other:"./src/a.js"
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
    optimization: {
        minimizer: [new UglifyJsPlugin()]
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
        })
    ],
    externals: {
        jquery: "$"
    },
    devServer: {
        port: 9009,
        progress: true,
        contentBase: "./dist"
    }
    // ptimization: {
    //     minimize: false
    //   },
};
