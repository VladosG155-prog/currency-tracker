import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import { Configuration } from 'webpack';

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
      localIdentName: '[path][name]__[local]',
    },
  },
};

const scssLoader = {
  test: /\.(sa|sc|c)ss$/i,
  use: ['style-loader', cssLoaderWithModules, 'sass-loader'],
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
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              },
            },
          ],
        },
      },
    },
  ],
};

const commonConfig: Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
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
      path: './.env',
      safe: true,
    }),
  ],
};

export default commonConfig;
