'use strict'

const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    node: {
        fs: 'empty'
    },
    mode: 'none',
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3456',
        'webpack/hot/only-dev-server',
        path.join(__dirname, 'src', 'index'),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-[hash].js',
        publicPath: ''
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //necessário para hot loader
        new Dotenv(),
        new HtmlPlugin({
            title: 'GitHub App',
            template: path.join(__dirname, 'src', 'html', 'template.html')
        })
    ],
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     include: /src/,
            //     loader: "eslint-loader"         
            // },            
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: /src/,
                loader: 'babel', 
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: /src/,
                loaders: ['style','raw'], 
            },    
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
}