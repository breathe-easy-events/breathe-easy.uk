const { stringIdentity } = require("../utils");
html = stringIdentity;

module.exports = (eleventyConfig, _) => {
  eleventyConfig.addPairedShortcode("section", function (content) {
    return html`<div class="section-outer">
      <div class="section-inner">${content}</div>
    </div>`;
  });
};
