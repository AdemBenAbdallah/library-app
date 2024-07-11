// @ts-check
const { withBlitz } = require("@blitzjs/next");

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  pageExtensions: ["page.tsx", "page.ts", "pages.jsx", "page.js"],
  experimental: {
    esmExternals: false,
  },
};

module.exports = withBlitz(config);
