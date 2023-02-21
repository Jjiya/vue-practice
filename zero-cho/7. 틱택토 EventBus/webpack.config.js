const {VueLoaderPlugin} = require("vue-loader");
const path = require("path");

module.exports = {
  mode: 'development',
  devtool: "eval",
  resolve: {  //
    extensions: [".js", ".vue"],
  },
  entry: {
    app: path.join(__dirname, "main.js"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    }
  },
};