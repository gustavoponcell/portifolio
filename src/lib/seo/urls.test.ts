import { describe, expect, it } from "vitest";

import { absoluteUrl } from "@/lib/seo/urls";

describe("absoluteUrl", () => {
  it("prefixes a relative path with the site URL", () => {
    expect(absoluteUrl("/contato")).toBe("http://localhost:3000/contato");
  });

  it("adds a leading slash when missing", () => {
    expect(absoluteUrl("contato")).toBe("http://localhost:3000/contato");
  });

  it("defaults to the home path", () => {
    expect(absoluteUrl()).toBe("http://localhost:3000/");
  });

  it("returns an already-absolute URL unchanged", () => {
    expect(absoluteUrl("https://example.com/x")).toBe("https://example.com/x");
  });
});
