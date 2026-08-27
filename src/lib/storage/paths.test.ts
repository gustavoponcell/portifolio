import { describe, expect, it } from "vitest";

import {
  createDesignProjectCoverPath,
  createDesignProjectGalleryPath,
  createProfileAvatarPath,
} from "@/lib/storage/paths";

describe("storage paths", () => {
  it("never contains path traversal or absolute segments", () => {
    const path = createProfileAvatarPath("../../evil.png", "image/png");

    expect(path).not.toContain("..");
    expect(path.startsWith("/")).toBe(false);
  });

  it("slugifies the project slug and keeps the folder prefix", () => {
    const path = createDesignProjectCoverPath("Projeto Ção!", "capa.png", "image/png");

    expect(path.startsWith("projects/design/covers/projeto-cao/")).toBe(true);
    expect(path.endsWith(".png")).toBe(true);
  });

  it("falls back to a safe slug when the project slug is empty", () => {
    const path = createDesignProjectGalleryPath("", "foto.jpg", "image/jpeg");

    expect(path.startsWith("projects/design/gallery/projeto/")).toBe(true);
  });

  it("derives the extension from the content type, not a spoofed file name", () => {
    const path = createProfileAvatarPath("foto.png.exe", "image/webp");

    expect(path.endsWith(".webp")).toBe(true);
  });
});
