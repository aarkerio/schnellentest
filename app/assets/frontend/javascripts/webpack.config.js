var path = require("path");
module.exports = {
  entry: {
    app: ["./entry.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/app/assets/",
    filename: "bundle.js"
  }
};

