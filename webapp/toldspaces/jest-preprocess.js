//https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/#mocking-gatsby
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}

module.exports = require("babel-jest").default.createTransformer(babelOptions)