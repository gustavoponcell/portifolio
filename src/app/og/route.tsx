import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#0f0f0f",
          color: "#f7f3e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              background: "#ffd84d",
              color: "#111111",
              fontWeight: 900,
              fontSize: 28,
              border: "4px solid #111111",
            }}
          >
            DESIGN
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              background: "#39ff88",
              color: "#111111",
              fontWeight: 900,
              fontSize: 28,
              border: "4px solid #111111",
            }}
          >
            DEV
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 80, fontWeight: 900, lineHeight: 1 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            marginTop: 20,
            color: "#d6d0c4",
          }}
        >
          {siteConfig.shortTitle}
        </div>
      </div>
    ),
    size
  );
}
