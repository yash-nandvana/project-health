import { ImageResponse } from "next/og";

export const alt = "check-project-health — Terminal health dashboard for developers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            padding: "8px 16px",
            background: "rgba(0, 255, 135, 0.1)",
            border: "1px solid rgba(0, 255, 135, 0.3)",
            borderRadius: 100,
            fontSize: 14,
            color: "#00ff87",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Terminal health dashboard
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          Your codebase has a{" "}
          <span style={{ color: "#00ff87" }}>heartbeat.</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 24,
            color: "#555",
            marginTop: 24,
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          One command. Dependencies, Git, security, tests — scored and graded.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "14px 24px",
            background: "#00ff87",
            color: "#000",
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 8,
          }}
        >
          npm install -g check-project-health
        </div>
      </div>
    ),
    { ...size }
  );
}
