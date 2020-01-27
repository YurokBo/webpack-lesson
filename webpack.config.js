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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    /*{
                        loader: "style-loader"
                    }*//*,*/
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

        ]
    },
    plugins: [
        new MiniCssExtractPlugin(/*{
            filename: '[name].css',
            /!*chunkFilename: '[id].css',*!/
        }*/)
    ],
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production
        ? false
        : "eval-sourcemap";

    return conf;
};