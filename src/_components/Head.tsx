export type HeadProps = {
  baseUrl?: string;
  description?: string; // "[optional] for opengraph metadata"
  socialImage?: string; // "[optional] for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // "[optional] alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
  title: string;
  url: string;
};

const defaultProps = {
  baseUrl: "",
  title: "Breathe Easy Sheffield",
  description:
    "An eclectic series of Covid safer social & cultural events, designed with enhanced safety measures in place to reduce transmission risk. Launching autumn 2024.",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy's logo",
};

const absoluteUrl = (base, url) => {
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

export const Head = ({
  baseUrl = defaultProps.baseUrl,
  description = defaultProps.description,
  socialImage = defaultProps.socialImage,
  socialImageAlt = defaultProps.socialImageAlt,
  title,
  url,
}: HeadProps): JSX.Element => {
  const title_ = url === "/" ? title : `${defaultProps.title} | ${title}`;
  const url_ = absoluteUrl(baseUrl, url);
  const socialImage_ =
    socialImageAlt === defaultProps.socialImageAlt
      ? absoluteUrl(baseUrl, defaultProps.socialImage)
      : absoluteUrl(baseUrl, socialImage);
  const socialImageAlt_ =
    socialImageAlt === defaultProps.socialImageAlt ||
    socialImage === defaultProps.socialImage
      ? defaultProps.socialImageAlt
      : socialImageAlt;
  return (
    <head>
      <meta charset="UTF-8" />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/static/img/favicon.png" />
      <title>{title_}</title>
      <meta name="title" content={title_} />
      <meta property="og:title" content={title_} />
      <link rel="canonical" href={url_} />
      <meta property="og:url" content={url_} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage_} />
      <meta property="og:image:alt" content={socialImageAlt_} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#044156" />
      <link data-asset-hash href="/css/styles.css" rel="stylesheet" />
    </head>
  );
};
