/* eslint-disable */
const withCss = require('@zeit/next-css');

module.exports = withCss({
  publicRuntimeConfig: {
    SERVICE_URL: 'https://polls.apiblueprint.org',
  },
});
