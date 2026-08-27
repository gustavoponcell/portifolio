import { describe, expect, it } from "vitest";

import { validateImageFile } from "@/lib/storage/validation";

function makeFile(name: string, type: string, size: number) {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

describe("validateImageFile", () => {
  it("accepts an allowed type within the size limit", () => {
    const result = validateImageFile(makeFile("foto.png", "image/png", 1024));
    expect(result.ok).toBe(true);
  });

  it("rejects a missing file", () => {
    const result = validateImageFile(null);
    expect(result.ok).toBe(false);
  });

  it("rejects an empty file", () => {
    const result = validateImageFile(makeFile("foto.png", "image/png", 0));
    expect(result.ok).toBe(false);
  });

  it("rejects a disallowed mime type", () => {
    const result = validateImageFile(makeFile("arquivo.pdf", "application/pdf", 1024));
    expect(result.ok).toBe(false);
  });

  it("rejects a file above the size limit", () => {
    const result = validateImageFile(
      makeFile("foto.png", "image/png", 5 * 1024 * 1024 + 1)
    );
    expect(result.ok).toBe(false);
  });

  it("rejects a file name with path traversal characters", () => {
    const result = validateImageFile(
      makeFile("../../etc/passwd.png", "image/png", 1024)
    );
    expect(result.ok).toBe(false);
  });
});
