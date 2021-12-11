const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

/* config-overrides.js */
module.exports = function override(config, env) {
	config = rewireAliases.aliasesOptions({
    '@': path.resolve(__dirname, `${paths.appSrc}`),
  })(config, env);
  config.target = "electron-renderer";
  return config;
}
