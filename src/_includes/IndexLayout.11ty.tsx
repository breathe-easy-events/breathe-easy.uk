import { ViewProps } from "../../eleventy";
import { Hero } from "../_components/Hero";
import { Head } from "../_components/Head";
import { Section } from "../_components/Section";

export const IndexLayout = (data: ViewProps): JSX.Element => {
  const {
    baseUrl,
    content,
    description,
    emoji,
    page,
    socialImage,
    socialImageAlt,
    title,
  } = data;
  return (
    <html lang="en">
      {Head({
        baseUrl,
        description,
        emoji,
        socialImage,
        socialImageAlt,
        title,
        url: page.url,
      })}
      <body>
        <main id="main">
          <Section>
            <Hero title={title}></Hero>
            {content}
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
};

export const render = IndexLayout;
