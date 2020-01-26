module.exports = {
    plugins: [
        require('autoprefixer'),
        require('mqpacker'),
        require('postcss-nested'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        }),

    ]
}