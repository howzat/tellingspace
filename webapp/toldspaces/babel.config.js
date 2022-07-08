// this is only used to make Jest happy with working with Typescript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
    ["babel-preset-gatsby-package", {"browser": true, "esm": true}]
  ],
};