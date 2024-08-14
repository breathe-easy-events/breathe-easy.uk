import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { MainLayout } from "./MainLayout.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../../eleventy";

test("render MainLayout", async () => {
  const viewProps: ViewProps = {
    content: "<p>This is the <em>BODY</em></p>",
    title: "My site",
    page: { url: "/" },
    baseUrl: "",
  };

  const result = MainLayout(viewProps);
  document.body.innerHTML = await jsxToString(result);
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
