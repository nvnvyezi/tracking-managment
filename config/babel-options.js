const presets = [
  [
    '@babel/preset-env',
    {
      // useBuiltIns: 'usage',
      modules: false,
      // corejs: 3,
    },
  ],
  ['@babel/preset-typescript'],
  ['@babel/preset-react'],
]

const plugins = [
  '@babel/plugin-proposal-export-default-from',
  [
    'import',
    {
      libraryName: 'antd',
      style: 'css',
    },
  ],
  ['transform-class-properties', { spec: true }],
  [
    '@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: 3,
      helpers: true,
      regenerator: true,
      useESModules: true,
    },
  ],
  [
    'styled-jsx/babel',
    {
      sourceMaps: true,
      vendorPrefixes: true,
    },
  ],
]

module.exports = {
  presets,
  plugins,
  babelrc: false,
}
