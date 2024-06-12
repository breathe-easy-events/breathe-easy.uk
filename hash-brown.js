const assetHash = require("asset-hash");
const { Window } = require("happy-dom");
const fs = require("fs");

const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const val = func.apply(null, args);
      cache[key] = val;
      return val;
    }
  };
};

const dom = (content) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

const content = (dom) => dom.documentElement.outerHTML;

const getHash = async (filePath) =>
  await assetHash.getHashedName(filePath).catch((err) => console.log(err));

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const SELECTOR = pluginOptions.selector || "[data-asset-hash]";

  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
      const getHashedName = memoize(getHash);

      /**
        assuming that assets are relative paths referncing the root dir
        eg
           /assets/css/styles.css
        if they are absolute paths this will break
        eg
           https://dome.tld/assets/css/styles.css
        if they are relative paths not referencing the root this will break
        eg
           on page https://dome.tld/posts/post-one.html
           assets/css/styles.css
			 */
      const fullPath = (link) => __dirname + "/" + dir.output + link;

      const hashedFileLink = (hashName, noneHashedPath) => {
        const link = noneHashedPath
          .split("/")
          .slice(0, -1)
          .concat(hashName)
          .join("/");
        fs.copyFileSync(fullPath(noneHashedPath), fullPath(link));
        return link;
      };

      const getHashedFileLink = memoize(hashedFileLink);

      const updateElement = async (element, attribute) => {
        const noneHashedPath = element[attribute];
        const name = await getHashedName(fullPath(noneHashedPath));
        if (name) {
          element[attribute] = getHashedFileLink(name, noneHashedPath);
        }
      };

      const pagesWithAssets = results.reduce((acc, resultObj) => {
        if (resultObj.outputPath.includes("html")) {
          const hdom = dom(resultObj.content);
          const assetLinks = hdom.querySelectorAll(SELECTOR);
          return assetLinks.length > 0
            ? [...acc, { ...resultObj, dom: hdom, assetLinks }]
            : acc;
        } else {
          return acc;
        }
      }, []);

      for (let page of pagesWithAssets) {
        for (let el of page.assetLinks) {
          switch (el.tagName) {
            case "LINK":
              await updateElement(el, "href");
              break;

            case "SCRIPT":
              await updateElement(el, "src");
              break;
            default:
              break;
          }
        }

        fs.writeFileSync(__dirname + "/" + page.outputPath, content(page.dom));
      }
    },
  );
};
