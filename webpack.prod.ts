import path from 'path';
import { mergeWithRules } from 'webpack-merge';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import commonConfig from './webpack.common';

const prodConfig: Configuration = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ],
};

export default mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
})(commonConfig, prodConfig);
