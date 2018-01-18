module.exports = {
  ident: 'postcss',
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
    require('postcss-custom-properties'),
    require('postcss-for'),
    require('postcss-hexrgba'),
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-nested'),
    require('postcss-random'),
    require('postcss-simple-vars')({
      variables: function variables() {
        return require('./src/styles/variables');
      },
      unknown: function unknown(node, name, result) {
        node.warn(result, 'Unknown variable ' + name)
      },
    }),
    require('postcss-custom-media')({
      'extensions': {
        '--xs-screen': '(max-width: 480px)',
        '--s-screen': '(max-width: 768px)',
        '--m-screen': '(max-width: 992px)',
        '--l-screen': '(max-width: 1200px)',
        '--xl-screen': '(max-width: 1600px)',
      }
    }),
    require('postcss-math'),
  ],
};
