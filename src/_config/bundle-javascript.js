const esbuild = require("esbuild");

const defaults = {
  entryPoint: "./src/js/index.js",
  ts: false,
};

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const opts = { ...defaults, ...pluginOptions };
  const ft = opts.ts ? "ts" : "js";

  eleventyConfig.addTemplateFormats(ft);

  eleventyConfig.addExtension(ft, {
    outputFileExtension: "js",
    compile: async (_, path) => {
      if (path !== opts.entryPoint) {
        return;
      }

      return async () => {
        let { outputFiles } = await esbuild.build({
          target: "es2020",
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false,
        });

        return outputFiles[0].text;
      };
    },
  });
};
