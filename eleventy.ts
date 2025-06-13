import { z } from "zod";

const MenuSchema = z
  .object({
    data: z.object({ title: z.string() }),
    url: z.string(),
  })
  .transform((entry) => ({
    title: entry.data.title,
    url: entry.url,
  }))
  .array();

export const ViewSchema = z
  .object({
    collections: z.object({ menu: MenuSchema }).default({ menu: [] }),
    page: z.object({ url: z.string() }),
    content: z.string().nonempty(),
    title: z.string().nonempty(),
  })
  .transform((data) => ({
    content: data.content,
    currentUrl: data.page.url,
    links: data.collections.menu,
    title: data.title,
  }));

export type ViewProps = z.infer<typeof ViewSchema>;
export type Links = z.infer<typeof MenuSchema>;

const absoluteUrl = (base: string, url: string): string | URL => {
  if (base) {
    try {
      return new URL(url, base).href;
    } catch (err) {
      console.error(err);
      return url;
    }
  } else {
    return url;
  }
};

export const headDefaultProps = {
  baseUrl: "",
  title: "Breathe Easy",
  description:
    "Covid-safer social and cultural events in the UK, designed with enhanced safety measures in place to reduce transmission risk",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy",
};

export const HeadSchema = z
  .object({
    baseUrl: z.string().default(headDefaultProps.baseUrl),
    description: z.string().default(headDefaultProps.description),
    socialImage: z.string().default(headDefaultProps.socialImage),
    socialImageAlt: z.string().default(headDefaultProps.socialImageAlt),
    title: z.string(),
    page: z.object({ url: z.string() }),
  })
  .transform((props) => {
    return {
      description: props.description,
      socialImage:
        // if no alt description for image is provided fallback to default
        props.socialImageAlt === headDefaultProps.socialImageAlt
          ? absoluteUrl(props.baseUrl, headDefaultProps.socialImage)
          : absoluteUrl(props.baseUrl, props.socialImage),
      socialImageAlt:
        // prevent alt description being overridden when custom social image not in use
        props.socialImage === headDefaultProps.socialImage
          ? headDefaultProps.socialImageAlt
          : props.socialImageAlt,
      title:
        props.page.url === "/"
          ? props.title
          : `${headDefaultProps.title} | ${props.title}`,
      url: absoluteUrl(props.baseUrl, props.page.url),
    };
  });

export type HeadProps = z.infer<typeof HeadSchema>;

/**
 * These are really just notes to for myself to keep track of the shape of data incomming to an 11ty page.
 *
 * We rely on the zod parsers to ensure the data we want is there at build time and produce reliable types.
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

export type ViewInput = {
  baseUrl?: string;
  content?: string;
  description?: string; // " for opengraph metadata"
  page?: Page;
  socialImage?: string; // " for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
  title?: string;
  collections?: { [k: string]: CollectionItem[] };
};
