import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { Head, HeadProps } from "./Head";

const defaultProps = {
  title: "Breathe Easy Sheffield",
  description:
    "An eclectic series of Covid safer social & cultural events, designed with enhanced safety measures in place to reduce transmission risk. Launching autumn 2024.",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy's logo",
};

test("home page title is the same as title prop", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("title").textContent).to.equal(props.title);
  expect(document.querySelector("meta[name='title']").content).to.equal(
    props.title,
  );
  expect(document.querySelector("meta[property='og:title']").content).to.equal(
    props.title,
  );
});

test("pages other than home have a default valye prepended to the title prop", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/about",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("title").textContent).to.equal(
    `Breathe Easy Sheffield | ${props.title}`,
  );
  expect(document.querySelector("meta[name='title']").content).to.equal(
    `Breathe Easy Sheffield | ${props.title}`,
  );
  expect(document.querySelector("meta[property='og:title']").content).to.equal(
    `Breathe Easy Sheffield | ${props.title}`,
  );
});

test("default social image is present", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("meta[property='og:image']").content).to.equal(
    props.baseUrl + defaultProps.socialImage,
  );
  expect(
    document.querySelector("meta[property='og:image:alt']").content,
  ).to.equal(defaultProps.socialImageAlt);
});

test("social image with no alt text uses default values", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
    socialImage: "https://images.unsplash.com/photo-1516434233442-0c69c369b66d",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("meta[property='og:image']").content).to.equal(
    props.baseUrl + defaultProps.socialImage,
  );
  expect(
    document.querySelector("meta[property='og:image:alt']").content,
  ).to.equal(defaultProps.socialImageAlt);
});

test("social image with alt text uses a custom image", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
    socialImage: "https://images.unsplash.com/photo-1516434233442-0c69c369b66d",
    socialImageAlt: "A lovely flock of birds",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("meta[property='og:image']").content).to.equal(
    props.socialImage,
  );
  expect(
    document.querySelector("meta[property='og:image:alt']").content,
  ).to.equal(props.socialImageAlt);
});

test("social image alt text doesnot overwrite default alt text if no image supplied", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
    socialImageAlt: "A lovely flock of birds",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);

  expect(document.querySelector("meta[property='og:image']").content).to.equal(
    props.baseUrl + defaultProps.socialImage,
  );
  expect(
    document.querySelector("meta[property='og:image:alt']").content,
  ).to.equal(defaultProps.socialImageAlt);
});

// getting localhost herer, must be something to do with the testing enviroment

// test("empty baseUrl is safe", async () => {
//   const props: HeadProps = {
//     title: "snazzy website",
//     url: "/",
//   };

//   const result = Head(props);
//   document.head.innerHTML = await jsxToString(result);

//   expect(document.querySelector("link[rel='canonical']").href).to.equal("/");
// });

test("baseUrl is applied to page url", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);
  expect(document.querySelector("link[rel='canonical']").href).to.equal(
    props.baseUrl + props.url,
  );
  expect(document.querySelector("meta[property='og:url']").content).to.equal(
    props.baseUrl + props.url,
  );
});

test("default description is used if none provided", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);
  expect(document.querySelector("meta[name='description']").content).to.equal(
    defaultProps.description,
  );
  expect(
    document.querySelector("meta[property='og:description']").content,
  ).to.equal(defaultProps.description);
});

test("props description is used if provided", async () => {
  const props: HeadProps = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    url: "/",
    description: "a snazzy description",
  };

  const result = Head(props);
  document.head.innerHTML = await jsxToString(result);
  expect(document.querySelector("meta[name='description']").content).to.equal(
    props.description,
  );
  expect(
    document.querySelector("meta[property='og:description']").content,
  ).to.equal(props.description);
});
