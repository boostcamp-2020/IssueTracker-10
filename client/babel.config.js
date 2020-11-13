module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Components': './src/Components',
          '@Common': './src/Components/Common',
          '@Svg': './src/Components/static',
          '@Util': './src/utils',
          '@Context': './src/Context/',
        },
      },
    ],
  ],
};
