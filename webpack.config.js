'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
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
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //necessário para hot loader
    ],
    module: {
        rules: [{
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            include: /src/,
            loader: "eslint-loader"         
        }],
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: /src/,
            loader: 'babel', 
        }]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
}