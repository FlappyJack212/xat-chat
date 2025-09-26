const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    
    entry: {
        main: './src/client/js/index.js',
        chat: './src/client/js/core/ChatCore.js',
        auth: './src/client/modules/auth-system.js'
    },
    
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'js/[name].[contenthash].js',
        publicPath: '/',
        clean: true
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production' 
                        ? MiniCssExtractPlugin.loader 
                        : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/sounds/[name].[contenthash][ext]'
                }
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            filename: 'index.html',
            chunks: ['main', 'auth']
        }),
        
        new HtmlWebpackPlugin({
            template: './src/client/chat-interface.html',
            filename: 'chat.html',
            chunks: ['chat', 'auth']
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/client/assets',
                    to: 'assets',
                    noErrorOnMissing: true
                },
                {
                    from: './src/client/sounds',
                    to: 'sounds',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/client')
        },
        hot: true,
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true
            }
        }
    },
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/client'),
            '@components': path.resolve(__dirname, 'src/client/components'),
            '@modules': path.resolve(__dirname, 'src/client/modules'),
            '@core': path.resolve(__dirname, 'src/client/js/core')
        }
    },
    
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map'
};