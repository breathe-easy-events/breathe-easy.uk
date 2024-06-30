/**
 * `stringIdentity` simply returns the expected result of a template literal
 * but it allows you to identify the content of that tag literal. Which can
 * help the editor and reader reason about the program.
 *
 * ```
 * html = stringIdentity
 * html`<p>${expression}</p>`
 * ```
 */
const stringIdentity = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);

module.exports = { stringIdentity };
