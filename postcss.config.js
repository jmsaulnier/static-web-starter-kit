module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '> 1% in JP',
        'not Chrome 49',
        'last 2 Edge versions',
        'last 2 iOS versions',
      ],
      flexbox: 'no-2009',
    }),
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('postcss-mixins'),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-random')
  ]
};
