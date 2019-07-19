module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: ['./**/*.html'],
            // keyframes: true,
            // fontFace: true,
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
        }),
        require('cssnano')({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        })
    ],
    options: {
        ident: 'postcss',
        sourceMap: true
    }
};
