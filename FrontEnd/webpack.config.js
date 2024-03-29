const path = require("path");
const { pathToFileURL } = require("url");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        teste: /\.js%/,
        exclude: /node_modules/,
        user: {
          loader: "babel-lader",
        },
      },
    ],
  },
};
