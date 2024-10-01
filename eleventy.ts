/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 */

type CollectionItem = {
	content: any[];
	data: any[];
	date: string;
	filePathStem: string;
	fileSlug: string;
	groupNumber: number;
	inputPath: string;
	outputPath: string;
	page: any[];
	rawInput: string;
	template: any;
	templateContent: any[];
	url: string;
};

type Page = {
	date: Date;
	filePathStem: string;
	fileSlug: string;
	inputPath: string;
	outputFileExtension: string;
	outputPath: string;
	rawInput: string;
	templateSyntax: string;
	url: string;
};

export type ViewProps = {
	baseUrl: string;
	content: string;
	description?: string; // " for opengraph metadata"
	emoji?: string; // " for insertion to favicon"
	page: Page;
	socialImage?: string; // " for opengraph metadata (external link or path to file)"
	socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
	title: string;
	collections: { string: CollectionItem[] };
};
