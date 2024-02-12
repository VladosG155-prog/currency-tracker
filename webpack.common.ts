import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const babelLoader = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
};

const cssLoaderWithModules = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[path][name]__[local]--[hash:base64:5]',
    },
  },
};

const scssLoader = {
  test: /\.(sa|sc|c)ss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoaderWithModules,
    {
      loader: 'sass-loader',
      options: {
        additionalData: '@import "src/styles/_mixins.scss";',
      },
    },
  ],
};

const assetLoader = {
  test: /\.(png|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
};
const svgLoader = {
  test: /\.svg$/i,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        icon: true,
      },
    },
  ],
};

const commonConfig: Configuration = {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@root': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@store': path.resolve(__dirname, './src/store'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  module: {
    rules: [babelLoader, scssLoader, assetLoader, svgLoader],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new DotEnv({
      path: '.env' || '',
      safe: true,
    }),
    new MiniCssExtractPlugin({}),
  ],
};

export default commonConfig;
