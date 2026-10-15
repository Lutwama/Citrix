import { ImageResponse } from "next/og";

export const alt = "Citrix Solutions Ltd — Integrated Solutions for Modern Brand Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "linear-gradient(135deg, #004E9B 0%, #115B70 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg width="140" height="140" viewBox="0 0 100 100">
          <path d="M50 4 A46 46 0 0 0 50 96 A23 23 0 0 1 50 50 A23 23 0 0 0 50 4 Z" fill="#ffffff" />
          <path d="M50 96 A46 46 0 0 0 50 4 A23 23 0 0 1 50 50 A23 23 0 0 0 50 96 Z" fill="#BAE4F0" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>CITRIX</div>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#BAE4F0", lineHeight: 1.1 }}>SOLUTIONS LTD</div>
        </div>
      </div>
      <div style={{ marginTop: 48, fontSize: 40, fontStyle: "italic" }}>
        Integrated Solutions for Modern Brand Growth
      </div>
      <div style={{ marginTop: 24, fontSize: 28, color: "#BAE4F0" }}>
        Print · Design · Branding · Fabrication · Web · Events — Kampala, Uganda
      </div>
    </div>,
    size,
  );
}
