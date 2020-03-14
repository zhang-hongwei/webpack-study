/*
 * @Author: ZHW
 * @LastEditors: ZHW
 * @Description:
 * @Date: 2019-04-21 21:54:34
 * @LastEditTime: 2019-04-23 22:41:34
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
    entry: "./src/index.js",
    output: {
        filename: "main.[hash:8].js",
        path: path.resolve(__dirname, "dist"),
        // library: "ab"
    },

    module: {
        rules: [
            {
                test: /\.(css|less)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(js|jsx)/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object"),
            ENV: JSON.stringify("dev"),
            DEV: JSON.stringify("dev")
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};
