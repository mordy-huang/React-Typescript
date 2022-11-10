

const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin")

const config = {
  mode: "development",
  cache: {
    type: "memory", // 使用内存缓存
  },
  optimization:{
    minimize:true,
    minimizer:[new TerserPlugin()]
  },
};

const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergedConfig;