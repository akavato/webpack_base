const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ignoredGSAPFiles = ['BezierPlugin', 'DirectionalRotationPlugin', 'RoundPropsPlugin'];

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false
        });
    });
}

module.exports = {
    mode: 'production',
    // watch: true,
    context: path.resolve(path.join(__dirname, 'src')),
    entry: {
        bundle: './js/common.js'
    },
    output: {
        path: path.resolve(path.join(__dirname, 'dist')),
        // publicPath: './',
        filename: './js/[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: ignoredGSAPFiles.map(fileName => path.resolve('node_modules/gsap/' + fileName)),
                use: [{
                    loader: 'null-loader'
                }]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                        // presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.html?$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        root: '../', // path.resolve(__dirname),
                        minimize: false,
                        interpolate: true,
                        attrs: [':data-src']
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: './',
                            // outputPath: 'img/',
                            limit: 2048
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: false,
                            name: '[path][name].[ext]',
                            publicPath: './',
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 2
                            },
                            gifsicle: {
                                optimizationLevel: 3,
                                interlaced: false
                            },
                            // webp: {
                            //     quality: 75
                            // },
                            svgo: {
                                enabled: true,
                                plugins: [
                                    { cleanupAttrs: true },
                                    { collapseGroups: true },
                                    { convertColors: true },
                                    { convertShapeToPath: false },
                                    { convertTransform: true },
                                    { minifyStyles: true },
                                    { removeComments: true },
                                    { removeDesc: true },
                                    { removeMetadata: true },
                                    { removeUselessDefs: true },
                                    { removeEditorsNSData: true },
                                    { removeEmptyAttrs: true },
                                    { removeEmptyText: true },
                                    { removeEmptyContainers: true },
                                    { removeViewBox: false },
                                    { removeUnknownsAndDefaults: true },
                                    { removeRasterImages: true },
                                    { removeUnusedNS: true }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'group-css-media-queries-loader',
                        options: { }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './[path][name].[ext]',
                        publicPath: '../',
                        useRelativePath: process.env.NODE_ENV === 'production'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './PHPMailer.php',
                to: './'
            },
            {
                from: './SMTP.php',
                to: './'
            },
            {
                from: './send.php',
                to: './'
            },
            {
                from: './robots.txt',
                to: './'
            }
        ]),
        new MiniCssExtractPlugin({
            filename: './css/main.min.css',
            chunkFilename: '[id].css'
        })
    ].concat(generateHtmlPlugins('./src/html')),
    resolve: {
        modules: [
            path.resolve(path.join(__dirname, 'node_modules')),
            path.resolve(__dirname, './js')
        ],
        alias: {
            img: path.resolve(__dirname, '../src/img')
        }
    },
    externals: {
        // jquery: 'jQuery'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        watchContentBase: true,
        compress: true,
        port: 3000,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/404.html' }
            ]
        }
    },
    stats: 'normal'
};
