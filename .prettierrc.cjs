const fs = require('fs');
const path = require('path');

module.exports = {
  ...JSON.parse(
    fs
      .readFileSync(
        path.join(
          __dirname,
          'node_modules',
          '@robot-grimpeur',
          'eslint-config',
          '.prettierrc'
        )
      )
      .toString()
  ),
  svelteSortOrder: 'options-scripts-styles-markup',
};
