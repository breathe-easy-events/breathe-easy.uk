import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import { jsxToString } from "jsx-async-runtime";
import { bundleJavascript } from "./src/_config/bundle-javascript";
import { hashAssets } from "./src/_config/hash-assets";
import { collections } from "./src/_config/collections.ts";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default function (eleventyConfig: any) {
  // data
  eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL || "");

  // static files
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/admin");

  // process css
  eleventyConfig.addPlugin(eleventySass);

  // eleventy typescript / TSX support
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });
  eleventyConfig.addTransform("tsx", async (content: JSX.Element) => {
    if (content && content.tag === "html") {
      const result = await jsxToString(content);
      return `<!doctype html>
			${result}`;
    } else {
      return content;
    }
  });

  // client TS support
  eleventyConfig.addPlugin(bundleJavascript, {
    entryPoint: "./src/js/index.ts",
    ts: true,
  });

  // break cache on static assets like CSS
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });

  // add custom collections
  eleventyConfig.addPlugin(collections);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
