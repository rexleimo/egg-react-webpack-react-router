const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './app/src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/public')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude:/node_modules/,
                use: ExtractTextWebpackPlugin.extract(['style-loader', 'css-loader', "less-loader", 'postcss-loader']),
            }, {
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
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', {
                    loader:"less-loader",
                    options:{ javascriptEnabled: true } 
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'),
        require('autoprefixer'),
    ],
    mode: 'development',
    resolve: {
        alias: {},
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



























