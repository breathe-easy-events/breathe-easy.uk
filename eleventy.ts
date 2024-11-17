/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 *
 * I'm experimenting with making everything optional as much of it seems ot be
 * in 11ty. This means I can run tests with very minimal object deffinitions and
 * still get clues about what shape the data should be in the application.
 *
 * Unfurtently it does not provide and real type safety.
 */

type CollectionItem = {
  content?: any[];
  data?: any[];
  date?: string;
  filePathStem?: string;
  fileSlug?: string;
  groupNumber?: number;
  inputPath?: string;
  outputPath?: string;
  page?: any[];
  rawInput?: string;
  template?: any;
  templateContent?: any[];
  url?: string;
};

type Page = {
  date?: Date;
  filePathStem?: string;
  fileSlug?: string;
  inputPath?: string;
  outputFileExtension?: string;
  outputPath?: string;
  rawInput?: string;
  templateSyntax?: string;
  url?: string;
};

export type ViewProps = {
  baseUrl?: string;
  content?: string;
  description?: string; // " for opengraph metadata"
  emoji?: string; // " for insertion to favicon"
  page?: Page;
  socialImage?: string; // " for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
  title?: string;
  collections?: { [k: string]: CollectionItem[] };
};
