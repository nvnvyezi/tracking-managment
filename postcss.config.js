module.exports = {
  loader: 'postcss-loader',
  options: {
    exec: true,
    parser: 'sugarss',
    plugins: {
      'postcss-preset-env': {
        browsers: 'last 2 versions',
        autoprefixer: { grid: true },
      },
    },
  },
}
