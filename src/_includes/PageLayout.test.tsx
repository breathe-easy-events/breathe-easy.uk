import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { PageLayout } from "./PageLayout.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../../eleventy";

test("render  PageLayout", async () => {
  const viewProps: ViewProps = {
    content: "<p>This is the <em>BODY</em></p>",
    title: "My site",
    page: { url: "/" },
    baseUrl: "",
    collections: {
      menu: [
        {
          data: { title: "About" },
          url: "/about",
        },
      ],
    },
  };

  const result = PageLayout(viewProps);
  document.body.innerHTML = await jsxToString(result);
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
