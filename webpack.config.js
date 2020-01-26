const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
        publicPath: "dist/"
    },
    devServer: {
        overlay: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
                    }],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })],
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production
        ? false
        : "eval-sourcemap";

    return conf;
};