const postcssConfig = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {}
  }
};

if (process.env.NODE_ENV === 'production')
  postcssConfig.plugins['cssnano'] = {};

module.exports = postcssConfig;
