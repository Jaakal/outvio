const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const jsonImporter = require('node-sass-json-importer');

//In order to override the webpack configuration without ejecting the create-react-app
const config = defaults.__get__('config');

config.module.rules.forEach((rule) => {
  if (Array.isArray(rule.oneOf)) {
    rule.oneOf.forEach((_rule) => {
      if (_rule.test && _rule.test.toString().includes('scss|sass')) {
        const sassRule = _rule.use.find(
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
