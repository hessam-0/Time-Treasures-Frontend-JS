module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      ["@babel/plugin-transform-private-methods", { loose: true }],
      "@babel/plugin-transform-runtime",

      "react-native-reanimated/plugin",
    ],
  };
};
