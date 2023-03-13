const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/start.js');
const webpackConfig = require('react-scripts/config/webpack.config');
const jsonImporter = require('node-sass-json-importer');

//In order to override the webpack configuration without ejecting the create-react-app
defaults.__set__('configFactory', (webpackEnv) => {
  let config = webpackConfig(webpackEnv);

  config.module.rules.forEach((rule) => {
    if (Array.isArray(rule.oneOf)) {
      rule.oneOf.forEach((r) => {
        if (r.test && r.test.toString().includes('scss|sass')) {
          const sassRule = r.use.find(
            (loader) => loader.loader && loader.loader.includes('sass-loader')
          );

          if (sassRule) {
            sassRule.options = {
              ...sassRule.options,
              sassOptions: {
                ...sassRule.options?.sassOptions,
                importer: jsonImporter(),
              },
            };
          }
        }
      });
    }
  });

  return config;
});
