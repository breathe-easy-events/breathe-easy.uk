export const collections = (eleventyConfig: any) => {
  eleventyConfig.addCollection("menu", (collectionApi) => {
    // get unsorted items
    const collection = collectionApi
      .getAll()
      .filter((element) => element.data.menu);

    collection.forEach((element) => {
      console.log(element.data.title);
    });

    return collection;
  });
};
