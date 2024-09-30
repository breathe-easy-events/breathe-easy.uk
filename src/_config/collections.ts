export const collections = (eleventyConfig: any) => {
	eleventyConfig.addCollection("menu", (collectionApi) => {
		// get unsorted items
		const collection = collectionApi.getAll().filter((page) => page.data.menu);

		// collection.forEach((element) => {
		// 	console.log(element.url);
		// });

		return collection;
	});
};
