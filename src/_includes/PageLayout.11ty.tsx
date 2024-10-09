import { ViewProps } from "../../eleventy";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Section } from "../_components/Section";

export const PageLayout = (data: ViewProps): JSX.Element => {
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

  const links = data.collections["menu"].map((entry) => [
    entry.data.title,
    entry.url,
  ]);

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
        <a href="#main" class="screen-reader-only">
          skip to content
        </a>
        {Header({ links, currentPage: data.page.url })}
        <main id="main">
          <Section>
            <h1>{title}</h1>
            {content}
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
};

export const render = PageLayout;
