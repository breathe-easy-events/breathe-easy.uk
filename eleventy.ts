/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 */

type CollectionItem = {
	template: any;
	rawInput: string;
	groupNumber: number;
	data: any[];
	page: any[];
	inputPath: string;
	fileSlug: string;
	filePathStem: string;
	date: string;
	outputPath: string;
	url: string;
	templateContent: any[];
	content: any[];
};

export type ViewProps = {
	baseUrl: string;
	content: string;
	description?: string; // " for opengraph metadata"
	emoji?: string; // " for insertion to favicon"
	page: any;
	socialImage?: string; // " for opengraph metadata (external link or path to file)"
	socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
	title: string;
	collections: { string: CollectionItem[] };
};
