module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      'babel-preset-gatsby',
      {
        reactRuntime: 'automatic',
      },
    ],
  ],
};
