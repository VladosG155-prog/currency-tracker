import path from 'path';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import merge from 'webpack-merge';

import { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import commonConfig from './webpack.common';

interface ConfigurationWithDevServer extends Configuration {
  devServer: WebpackDevServerConfiguration;
}

const devConfig: ConfigurationWithDevServer = {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    client: {
      overlay: true,
    },
    port: 5003,
    historyApiFallback: true,
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin()],
};

export default merge(commonConfig, devConfig);
