const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  target: 'web', // specifies where our app will run
  devServer: {
    port: '5000',
    static: {
      directory: path.join(__dirname, 'public')
},
    open: true, // automatically open the browser after it had bundled our files
    hot: true, // enables webpack Hot module replacement exchanges, adds, or removes modules while an application is running, without a full reload. to improve performance
    liveReload: true, // automatically update the app as you make changes
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],   // tells Webpack files to consider when building our app you can specifies files with several extensions
  },
  module: {  // where we specify rules about how Webpack will handle different files when building our app
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: 'babel-loader', 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
           {
            loader: "css-loader",
            options: { importLoaders: 1 },
           },
           {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,

            // Translates CSS into CommonJS
            "css-loader",
            "postcss-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
       },
       {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new MiniCssExtractPlugin({
        filename: 'css/main.css',
    })
  ]
};