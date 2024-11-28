const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  config.transformer.unstable_allowRequireContext = true;
  return config;
})();
