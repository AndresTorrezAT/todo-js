const HtmlWebpackPlugin             = require('html-webpack-plugin');
const MiniCssExtractPlugin          = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                    = require('copy-webpack-plugin'); // - Remplaza "CopyPlugin" y "file-loader" por: (asset/resource) todo en 1 y mejorado
const { CleanWebpackPlugin }        = require('clean-webpack-plugin'); // borrar la carpeta dist

module.exports = {

    mode: 'production',
    output: {
        filename: 'main.[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {

                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
                generator: {

                    filename: 'assets/[name][ext]'

                },
               
            }
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            
            
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false

        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),

        new CleanWebpackPlugin(),

    ],
};


// optimize-css-assets-webpack-plugin DEPREACTED // Para hacer la minimizacion en css

// babel-minify-webpack-plugin DEPREACTED // Para hacer la minimizacion en js

