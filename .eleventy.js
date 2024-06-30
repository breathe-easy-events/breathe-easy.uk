const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashAssets = require("./src/_config/hash-assets");
const bundleJavascript = require("./src/_config/bundle-javascript");
const sectionShortcode = require("./src/_config/shortcode/section");

module.exports = function (eleventyConfig) {
  // shortcodes
  eleventyConfig.addPlugin(sectionShortcode);

  // process assets
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(bundleJavascript, {
    entryPoint: "./src/js/index.ts",
    ts: true,
  });
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
