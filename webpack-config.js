const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('./dist/main.css');

module.exports = {
    module: {
        rules: [ //Called loaders in WP v1
            {
                oneOf: [
                    {
                        test: (absolutePath) => {
                            return /(baseline-css[\/|\\]).*(\.css)/.test(absolutePath);
                        },
                        use: extractCss.extract([ 'css-loader' ])
                    },
                    {
                        test: /\.css$/,
                        exclude: /(baseline-css\/)/, //overkill?
                        use: ['style-loader', 'css-loader' ]
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /(baseline-css\/)/,
                use: 'awesome-typescript-loader'
            }
        ]
    },
    entry: {
        test: [
            './src/baseline-css/app.css',
            './src/js/app.ts'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './dist/main.js'
    },
    plugins: [
        extractCss
    ]
};