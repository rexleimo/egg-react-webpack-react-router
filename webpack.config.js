const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill', './app/src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/public'),
        publicPath: '/public/'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images/'
                        }
                    }
                ]
            }, {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader', {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                //exclude: /node_modules/,
                use: ExtractTextWebpackPlugin.extract({ fallback: "style-loader", use: "css-loader" })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'), require('autoprefixer')
    ],
    mode: 'development',
    resolve: {
        alias: {
            "adminpages": path.resolve(__dirname, 'app/src/pages/admin'),
            "component": path.resolve(__dirname, 'app/src/components'),
            "services": path.resolve(__dirname, 'app/src/services'),
            "libs": path.resolve(__dirname, 'app/src/libs')
        },
        extensions: ['.js']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                }
            }
        }
    }
}
